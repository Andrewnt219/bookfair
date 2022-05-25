import {
  displayNameSchema,
  emailSchema,
  passwordSchema,
} from "../../../schemas";

import z from "zod";

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    retypePassword: passwordSchema,
    displayName: displayNameSchema.min(1, "Display name is required"),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords don't match",
    path: ["retypePassword"],
  })
  .default({
    displayName: "",
    email: "",
    password: "",
    retypePassword: "",
  });

export type SignupSchema = z.infer<typeof signupSchema>;
