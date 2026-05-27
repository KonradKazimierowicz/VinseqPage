import { randomUUID } from "node:crypto";
import { Resend } from "resend";

export const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const tagValue = (value) =>
  String(value)
    .replace(/[^\x20-\x7E]/g, "")
    .slice(0, 256);

export function formatFromAddress(fromEmail, displayName) {
  const email = fromEmail?.trim() ?? "";
  if (!email) {
    return null;
  }

  if (email.includes("<")) {
    return email;
  }

  const name = displayName?.trim();
  if (name) {
    return `${name} <${email}>`;
  }

  return email;
}

export function validateResendEnv(env = process.env) {
  const resendApiKey = env.RESEND_API_KEY?.trim();
  const resendToEmail = env.RESEND_TO_EMAIL?.trim();
  const from = formatFromAddress(env.RESEND_FROM_EMAIL, env.RESEND_FROM_NAME);

  if (!resendApiKey || resendApiKey === "re_xxxxxxxxx") {
    return {
      ok: false,
      code: "MISSING_RESEND_API_KEY",
      message: "Set RESEND_API_KEY in environment variables.",
    };
  }

  if (!from) {
    return {
      ok: false,
      code: "MISSING_RESEND_FROM_EMAIL",
      message:
        "Set RESEND_FROM_EMAIL to an address on your verified domain (see https://resend.com/domains).",
    };
  }

  const isProduction = env.NODE_ENV === "production";

  if (isProduction && /@resend\.dev$/i.test(from)) {
    return {
      ok: false,
      code: "INVALID_RESEND_FROM_EMAIL",
      message:
        "RESEND_FROM_EMAIL cannot use @resend.dev in production. Verify your domain and use that address.",
    };
  }

  if (!resendToEmail) {
    return {
      ok: false,
      code: "MISSING_RESEND_TO_EMAIL",
      message: "Set RESEND_TO_EMAIL to the inbox that should receive contact form messages.",
    };
  }

  return {
    ok: true,
    resendApiKey,
    from,
    to: [resendToEmail],
  };
}

export function normalizeContactPayload(body) {
  const payload = {
    name: body.name?.trim() ?? "",
    companyName: body.companyName?.trim() ?? "",
    email: body.email?.trim() ?? "",
    service: body.service?.trim() ?? "",
    message: body.message?.trim() ?? "",
  };

  if (!payload.name || !payload.message) {
    const error = new Error("MISSING_REQUIRED_FIELDS");
    error.code = "MISSING_REQUIRED_FIELDS";
    throw error;
  }

  return payload;
}

export async function sendContactEmail(payload, env = process.env) {
  const config = validateResendEnv(env);

  if (!config.ok) {
    return config;
  }

  const resend = new Resend(config.resendApiKey);

  const html = `
    <h2>Nowe zapytanie kontaktowe</h2>
    <p><strong>Imię i nazwisko:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Firma:</strong> ${escapeHtml(payload.companyName || "-")}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email || "-")}</p>
    <p><strong>Obszar:</strong> ${escapeHtml(payload.service || "-")}</p>
    <hr />
    <p><strong>Opis potrzeby:</strong></p>
    <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
  `;

  const { data, error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    subject: `Nowe zapytanie: ${payload.service || "Kontakt"}`,
    html,
    replyTo: payload.email || undefined,
    idempotencyKey: `contact-form/${randomUUID()}`,
    tags: [
      { name: "source", value: "contact-form" },
      { name: "service", value: tagValue(payload.service || "kontakt") },
    ],
  });

  if (error) {
    console.error("Resend API error:", error);
    return {
      ok: false,
      code: "RESEND_SEND_FAILED",
      message: error.message || "Failed to send email",
    };
  }

  return { ok: true, data };
}
