import { z } from 'zod';

export const lenderApplicationSchema = z.object({
  governmentId: z.string().min(5, "Government ID is required"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  pickupAddress: z.string().min(10, "Please provide a complete pickup address"),
  idFrontUrl: z.string().url("ID front image is required"),
  selfieUrl: z.string().url("Selfie with ID is required"),
});
