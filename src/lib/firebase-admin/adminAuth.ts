import { getAuth } from "firebase-admin/auth";
import { adminApp } from "./adminApp";

export const adminAuth = getAuth(adminApp);
