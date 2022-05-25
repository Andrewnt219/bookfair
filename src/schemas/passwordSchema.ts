import z from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Password must have at least 6 characters");
