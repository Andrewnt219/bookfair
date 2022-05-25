import { getFirestore } from "firebase/firestore/lite";
import { app } from "./app";

export const firestore = getFirestore(app);
