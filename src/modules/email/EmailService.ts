import sgMail from '@sendgrid/mail';
import { Except } from 'type-fest';
import { DbListing, DbTransaction } from '../listing';
import { DbUser } from '../user-profile';

const SENDER = process.env.SENDGRID_SENDER;
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export class EmailService {
  static async sendMail(msg: Except<sgMail.MailDataRequired, 'from'>) {
    sgMail.send({ ...msg, from: SENDER });
  }

  static async sendContactMail(props: {
    to: string;
    buyer: DbUser;
    listing: DbListing;
  }) {
    const base = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    const listingUrl = new URL(`/listing/${props.listing.id}`, base);
    const buyerUserUrl = new URL(`/user/${props.buyer.uid}`, base);
    const msg: sgMail.MailDataRequired = {
      to: props.to,
      from: SENDER,
      subject: 'Your listing are in for a transaction!',
      html: `<a href="${buyerUserUrl}">${props.buyer.displayName}</a> wants to buy <a href="${listingUrl}">${props.listing.title}</a>. Please contact <a href="mailto:${props.buyer.email}">${props.buyer.email}</a>.`,
    };

    await sgMail.send(msg);
  }
}
