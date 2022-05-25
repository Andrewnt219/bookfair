import { NextApiRequest } from "next";
import { HttpException } from "../errors";
import { adminAuth } from "../lib/firebase-admin";

export const authMiddleware = async (req: NextApiRequest) => {
  const { authorization } = req.headers;
  const idToken = authorization?.split(" ")[1];
  if (!idToken) {
    throw new HttpException(401, "Not authenticated");
  }

  try {
    await adminAuth.verifyIdToken(idToken);
    return req;
  } catch (error) {
    throw new HttpException(401, "Not authenticated");
  }
};
