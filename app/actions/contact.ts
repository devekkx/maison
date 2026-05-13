"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email().max(200),
  phone: z.string().max(30).optional(),
  service: z.string().min(1).max(100),
  date: z.string().max(20).optional(),
  notes: z.string().max(2000).optional(),
});

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | { status: "error"; errors: Record<string, string> }
  | { status: "failure"; message: string };

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    date: formData.get("date"),
    notes: formData.get("notes"),
  };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors };
  }

  // In production: send via Resend / Postmark / SendGrid.
  // eslint-disable-next-line no-console
  console.log("[contact]", JSON.stringify({ ...result.data, submittedAt: new Date().toISOString() }));

  return { status: "success", email: result.data.email };
}
