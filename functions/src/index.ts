import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import sgMail from '@sendgrid/mail';
import dayjs from 'dayjs';
// if (typeof process.env.SENDGRID_API_KEY !== 'string')
//   throw new Error('SENDGRID_API_KEY is not set');

// if (typeof process.env.SENDGRID_SENDER !== 'string')
//   throw new Error('SENDGRID_SENDER is not set');

// if (typeof process.env.APPLICATION_URL !== 'string')
//   throw new Error('APPLICATION_URL is not set');

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

const shouldSendAlert = (a: any, b: any) =>
  a.title !== b.title || a.tags.join('') !== b.tags.join('');

export const alertUsers = functions
  .region('us-east4')
  .firestore.document('listings/{listingId}')
  .onWrite(async (change, context) => {
    const listing = change.after.data();
    const previousListing = change.before.data();

    // On listing deleted, do nothing
    if (!listing) {
      functions.logger.warn('Listing not found');
      return;
    }
    // On listing irrelevant changes, do nothing
    if (!shouldSendAlert(listing, previousListing)) {
      functions.logger.warn("Won't change", { listing, previousListing });
      return;
    }

    const snapshots = await db
      .collection('alerts')
      .where('isActive', '==', true)
      .get();
    const alerts = snapshots.docs.map((doc) => doc.data());

    for (const alert of alerts) {
      // ignore user's own listings
      if (alert.userId === listing.userId) {
        functions.logger.warn('Same user', {
          buyer: alert.userId,
          seller: listing.userId,
        });
        continue;
      }

      if (
        listing.title.toLowerCase().includes(alert.search.toLowerCase()) ||
        listing.tags
          .join(' ')
          .toLowerCase()
          .includes(alert.search.toLowerCase())
      ) {
        const userRef = await db.collection('users').doc(alert.userId).get();
        const user = userRef.data();
        if (!user) {
          functions.logger.warn('User not found', { userId: alert.userId });
          continue;
        }
        const msg: sgMail.MailDataRequired = {
          to: user.email,
          from: process.env.SENDGRID_SENDER as string,
          subject: `${listing.title} is now available!`,
          html: `Check out <a href=${new URL(
            `/listing/${listing.id}`,
            process.env.APPLICATION_URL as string
          )}>${listing.title}</a>!`,
        };

        await sgMail.send(msg);
        functions.logger.info('Send mail', { msg });
      }
    }
  });

export const deleteExpiredAlerts = functions.pubsub
  .schedule('every day 00:00')
  .timeZone('America/Toronto')
  .onRun(async () => {
    const expireAt = dayjs().subtract(7, 'day').unix();
    const snapshots = await db
      .collection('alerts')
      .where('createdAt', '<', expireAt)
      .get();
    const batch = db.batch();
    for (const doc of snapshots.docs) {
      const ref = db.collection('alerts').doc(doc.id);
      batch.delete(ref);
    }
    await batch.commit();
  });

export const deleteListingsPromotion = functions.pubsub
  .schedule('every hour')
  .timeZone('America/Toronto')
  .onRun(async () => {
    const now = dayjs().unix();
    const snapshots = await db
      .collection('listings')
      .where('promote', '<', now)
      .get();

    const batch = db.batch();
    for (const doc of snapshots.docs) {
      const ref = db.collection('listings').doc(doc.id);
      batch.update(ref, { promote: null });
    }
    await batch.commit();
  });
