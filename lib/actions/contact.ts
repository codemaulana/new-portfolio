"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(), // Bot trap
});

export type ContactActionState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function sendContactMessageAction(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const reqHeaders = await headers();
  const ip = reqHeaders.get("x-forwarded-for") || reqHeaders.get("x-real-ip") || "unknown-ip";

  // Rate limiting (max 3 messages per IP per 15 minutes)
  const rateStatus = checkRateLimit({
    key: `contact:${ip}`,
    limit: 3,
    windowMs: 15 * 60 * 1000,
  });

  if (!rateStatus.allowed) {
    return {
      success: false,
      message: `Too many messages sent. Please wait ${rateStatus.retryAfterSeconds} seconds before trying again.`,
    };
  }

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    honeypot: formData.get("honeypot"),
  };

  const parsed = contactSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      message: "Form validation failed. Please check your entries.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // If honeypot is filled, silently discard (bot detected)
  if (parsed.data.honeypot && parsed.data.honeypot.trim() !== "") {
    return {
      success: true,
      message: "Thanks for reaching out! Your message was received.",
    };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase().trim(),
        subject: parsed.data.subject || "Portfolio Inquiry",
        message: parsed.data.message,
        ipHash: ip.slice(0, 32),
      },
    });

    return {
      success: true,
      message: "Thanks for reaching out! Your message was sent, and I'll get back to you shortly.",
    };
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return {
      success: false,
      message: "Something went wrong while sending your message. Please reach out directly via email.",
    };
  }
}
