import { FirebaseError } from "@firebase/util";

type ErrorCode = "auth/invalid-password" | "auth/email-already-exists";

export const getSignupErrorMessage = (error: FirebaseError) => {
  switch (error.code as ErrorCode) {
    case "auth/invalid-password":
      return "Need stronger password";

    case "auth/email-already-exists":
      return "Email has already been used";

    default:
      return "Something went wrong";
  }
};
