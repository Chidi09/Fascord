import { z } from "zod";

export const QuoteRequestSchema = z.object({
  originCountry: z.string().min(1, "Origin country is required"),
  destinationCountry: z.string().min(1, "Destination country is required"),
  weight: z.coerce.number().min(0.1, "Weight must be at least 0.1 kg"),
  length: z.coerce.number().min(1).default(20),
  width: z.coerce.number().min(1).default(15),
  height: z.coerce.number().min(1).default(10),
  packageType: z.enum(["parcel", "document"]).default("parcel"),
});

export type QuoteRequestInput = z.infer<typeof QuoteRequestSchema>;

export const BookingRequestSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  serviceName: z.string().min(1, "Service name is required"),
  originCountry: z.string().min(1, "Origin country is required"),
  destinationCountry: z.string().min(1, "Destination country is required"),
  weight: z.coerce.number().min(0.1),
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  packageType: z.enum(["parcel", "document"]).default("parcel"),
  senderName: z.string().min(2, "Sender name must be at least 2 characters"),
  senderEmail: z.string().email("Please enter a valid sender email"),
  senderAddress: z.string().min(5, "Sender collection address is required"),
  recipientName: z
    .string()
    .min(2, "Recipient name must be at least 2 characters"),
  recipientEmail: z.string().email().optional().or(z.literal("")),
  recipientAddress: z.string().min(5, "Recipient delivery address is required"),
});

export type BookingRequestInput = z.infer<typeof BookingRequestSchema>;

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name is required (min 2 characters)"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().default(""),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
