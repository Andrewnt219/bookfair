import z from "zod";

export const emailSchema = z
  .string()
  .email("Invalid email format")
  .min(1, "Email is required");
