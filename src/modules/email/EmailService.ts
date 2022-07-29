import sgMail from '@sendgrid/mail';
import { DbListing } from '../listing';
import { DbSuspension } from '../user-manage';
import { DbUser } from '../user-profile';
import { DbViolation } from '../violations';

const SENDER = process.env.SENDGRID_SENDER;
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const send = async (msg: sgMail.MailDataRequired) => {
  await sgMail.send(msg);
  console.log({ msg }, 'Sent!');
};

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const getListingUrl = (listing: DbListing) => {
  return new URL(`/listing/${listing.id}`, BASE_URL);
};

const getUserUrl = (user: DbUser) => {
  return new URL(`/user/${user.uid}`, BASE_URL);
};

export class EmailService {
  static async sendContactMail(props: {
    to: string;
    buyer: DbUser;
    listing: DbListing;
  }) {
    const listingUrl = getListingUrl(props.listing);
    const buyerUserUrl = getUserUrl(props.buyer);
    const msg: sgMail.MailDataRequired = {
      to: props.to,
      from: SENDER,
      subject: 'Your listing are in for a transaction!',
      html: `<a href="${buyerUserUrl}">${props.buyer.displayName}</a> wants to buy <a href="${listingUrl}">${props.listing.title}</a>. Please contact <a href="mailto:${props.buyer.email}">${props.buyer.email}</a>.`,
    };
    await send(msg);
  }

  static async sendRemoveListingMail(props: {
    to: string;
    listing: DbListing;
    violation: DbViolation;
  }) {
    const msg: sgMail.MailDataRequired = {
      to: props.to,
      from: SENDER,
      subject: 'IMPORTANT! Your listing has been removed!',
      html: `<a href="${getListingUrl(props.listing)}">${
        props.listing.title
      }</a> has been removed for the following reason: ${
        props.violation.type
      }.`,
    };
    await send(msg);
  }

  static async sendDeactivateEmail(props: {
    to: string;
    suspension: DbSuspension;
  }) {
    const msg: sgMail.MailDataRequired = {
      to: props.to,
      from: SENDER,
      subject: 'IMPORTANT! Your account has been suspended!',
      html: `Your account has been suspended for the following reason: ${props.suspension.reason}. Please contact us at ${SENDER}. Note that all your listing has been temporarily removed from the marketplace.`,
    };
    await send(msg);
  }

  static async sendActivateEmail(props: { to: string }) {
    const msg: sgMail.MailDataRequired = {
      to: props.to,
      from: SENDER,
      subject: 'IMPORTANT! Your account has been recovered!',
      html: `Your account and all your listings has been recovered. Sorry for the inconvenience.`,
    };
    await send(msg);
  }

  static async forwardUserMessage(props: {
    message: string;
    receiver: DbUser;
    sender: DbUser;
  }) {
    const msg: sgMail.MailDataRequired = {
      to: props.receiver.email,
      from: SENDER,
      subject: 'You have a new message!',
      html: `<a href="${getUserUrl(props.sender)}">${
        props.sender.displayName
      }</a> has sent you a new message: ${props.message}`,
    };
    await send(msg);
  }
}
