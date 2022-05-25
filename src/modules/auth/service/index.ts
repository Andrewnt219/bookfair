import { CreateRequest } from "firebase-admin/auth";
import { adminAuth } from "../../../lib/firebase-admin";

export class SignupService {
  static async createUser(data: CreateRequest) {
    return adminAuth.createUser({ ...data, emailVerified: true });
  }
}
