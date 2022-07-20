import sgMail from '@sendgrid/mail';
import { Except } from 'type-fest';
import { DbListing, DbTransaction } from '../listing';
import { DbUser } from '../user-profile';
import { DbViolation } from '../violations';

const SENDER = process.env.SENDGRID_SENDER;
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

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

    await sgMail.send(msg);
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
    console.log({ msg });
    await sgMail.send(msg);
  }
}
