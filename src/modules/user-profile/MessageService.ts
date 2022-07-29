import dayjs from 'dayjs';
import { businessRules } from '../../constants';
import { db } from '../../lib/firebase-admin';
import { DbMessage } from './types';

export class MessageService {
  static async getOne(id: string) {
    const ref = await db.message.doc(id).get();
    return ref.data();
  }

  static async getManyByReceiverId(receiverId: string) {
    const ref = await db.message.where('receiverId', '==', receiverId).get();
    return ref.docs.map((doc) => doc.data());
  }

  static async getManyBySenderId(senderId: string) {
    const ref = await db.message.where('senderId', '==', senderId).get();
    return ref.docs.map((doc) => doc.data());
  }

  static async createOne(message: DbMessage) {
    await db.message.doc(message.id).set(message);
  }

  static async getConversation(senderId: string, receiverId: string) {
    const messages = await db.message
      .where('senderId', '==', senderId)
      .where('receiverId', '==', receiverId)
      .orderBy('createdAt', 'desc')
      .get();
    return messages.docs.map((doc) => doc.data());
  }

  static async canSendMessage(senderId: string, receiverId: string) {
    const messages = await db.message
      .where('senderId', '==', senderId)
      .where('receiverId', '==', receiverId)
      .orderBy('createdAt', 'desc')
      .get();
    if (messages.empty) return true;
    // Already check if empty
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lastMessage = messages.docs[0]!.data();
    return dayjs
      .unix(lastMessage.createdAt)
      .add(businessRules.MESSAGE_PERIOD_DAY, 'day')
      .isBefore(dayjs());
  }
}
