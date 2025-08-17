import { z } from "zod";

export const FlagsSchema = z.object({
  auth: z.boolean(),
  db: z.boolean(),
  products: z.boolean(),
  orders: z.boolean(),
  checkout: z.boolean(),
  paymentProvider: z.string().optional(),
});

export type Flags = z.infer<typeof FlagsSchema>;
