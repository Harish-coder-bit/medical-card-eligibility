import { z } from "zod";

export const eligibilitySchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please provide a valid email address."),
  age: z
    .number({ invalid_type_error: "Age must be a number." })
    .int("Age must be a whole number.")
    .min(1, "Age must be at least 1.")
    .max(120, "Age must be at most 120."),
  medicalCondition: z.string().min(1, "Medical condition is required."),
  agreePrivacy: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy." }),
  }),
  state: z.string().min(1, "State is required."),
  stateSlug: z.string().min(1, "State slug is required."),
});

export const eligibilityFormSchema = eligibilitySchema.omit({
  state: true,
  stateSlug: true,
});
