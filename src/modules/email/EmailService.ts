import sgMail from '@sendgrid/mail';
import { Except } from 'type-fest';
import { DbListing, DbTransaction } from '../listing';

const SENDER = process.env.SENDGRID_SENDER;
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export class EmailService {
  static async sendMail(msg: Except<sgMail.MailDataRequired, 'from'>) {
    sgMail.send({ ...msg, from: SENDER });
  }

  static async sendContactMail(props: {
    to: string;
    buyerEmail: string;
    listing: DbListing;
  }) {
    const msg: sgMail.MailDataRequired = {
      to: props.to,
      from: SENDER,
      subject: 'Your listing are in for a transaction!',
      html: `Please contact <a href="mailto:${props.buyerEmail}">${
        props.buyerEmail
      }</a> for <a href="${new URL(
        `/listing/${props.listing.id}`,
        process.env.VERCEL_URL
      )}">${props.listing.title}</a>`,
    };

    await sgMail.send(msg);
  }
}
