"use server";

import { Resend } from "resend";
import { z } from "zod";

const RESEND_RETRY_LIMIT = 2;

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .max(30)
    .regex(/^[+\d\s()\-]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Please select a service").max(100),
  date: z.string().max(20).optional(),
  notes: z.string().max(2000, "Notes must be under 2000 characters").optional(),
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
  const raw = Object.fromEntries(
    ["name", "email", "phone", "service", "date", "notes"].map((k) => [k, formData.get(k)])
  );

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      if (!errors[key]) errors[key] = issue.message;
    }
    return { status: "error", errors };
  }

  const { name, email, phone, service, date, notes } = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return { status: "failure", message: "Email service is not configured." };
  }

  const resend = new Resend(apiKey);

  const rows = [
    ["Name", name],
    ["Email", email],
    ...(phone ? [["Phone", phone]] : []),
    ["Service", service],
    ...(date ? [["Preferred date", date]] : []),
    ...(notes ? [["Notes", notes]] : []),
  ] as [string, string][];

  const textBody = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const htmlBody = `
    <h2 style="font-family:sans-serif;margin-bottom:24px">
      New booking request - Maison Noire
    </h2>
    <table style="font-family:sans-serif;border-collapse:collapse;width:100%">
      ${rows
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:#888;white-space:nowrap;vertical-align:top">${k}</td>
          <td style="padding:8px 0;color:#111">${v.replace(/\n/g, "<br>")}</td>
        </tr>`
        )
        .join("")}
    </table>
  `;

  let lastError: { name: string } | null = null;
  for (let attempt = 0; attempt <= RESEND_RETRY_LIMIT; attempt++) {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Booking request from ${name} - ${service}`,
      text: textBody,
      html: htmlBody,
    });

    if (!error) {
      return { status: "success", email };
    }

    lastError = error;
    if (error.name === "validation_error") break;
  }

  const msg = lastError?.name === "validation_error"
    ? "Your request could not be processed. Please check your details and try again."
    : "Something went wrong on our end. Please try again in a moment, or email us directly.";
  return { status: "failure", message: msg };

}
