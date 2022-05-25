import { getStorage } from "firebase/storage";
import { app } from "./app";

export const firebaseStorage = getStorage(app);
