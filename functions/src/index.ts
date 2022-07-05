import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import sgMail from '@sendgrid/mail';

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
    if (!listing) return;
    // On listing irrelevant changes, do nothing
    if (!shouldSendAlert(listing, previousListing)) return;

    const snapshots = await db.collection('alerts').get();
    const alerts = snapshots.docs.map((doc) => doc.data());

    for (const alert of alerts) {
      if (
        listing.title.toLowerCase().includes(alert.search.toLowerCase()) ||
        listing.tags
          .join(' ')
          .toLowerCase()
          .includes(alert.search.toLowerCase())
      ) {
        const msg: sgMail.MailDataRequired = {
          to: alert.userEmail,
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
