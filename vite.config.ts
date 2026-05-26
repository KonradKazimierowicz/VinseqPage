import path from "path";
import { IncomingMessage, ServerResponse } from "node:http";
import react from "@vitejs/plugin-react";
import { Resend } from "resend";
import { Plugin, defineConfig, loadEnv } from "vite";

const sendJson = (res: ServerResponse, statusCode: number, payload: Record<string, unknown>) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const readBody = async (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

const parseContactPayload = async (req: IncomingMessage) => {
  const raw = await readBody(req);
  const parsed = JSON.parse(raw || "{}") as {
    name?: string;
    companyName?: string;
    email?: string;
    service?: string;
    message?: string;
  };

  const payload = {
    name: parsed.name?.trim() ?? "",
    companyName: parsed.companyName?.trim() ?? "",
    email: parsed.email?.trim() ?? "",
    service: parsed.service?.trim() ?? "",
    message: parsed.message?.trim() ?? "",
  };

  if (!payload.name || !payload.message) {
    throw new Error("MISSING_REQUIRED_FIELDS");
  }

  return payload;
};

const contactHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  env: Record<string, string>,
) => {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const resendApiKey = env.RESEND_API_KEY;
  const resendToEmail = env.RESEND_TO_EMAIL || "vinseq7@gmail.com";
  const resendFromEmail = env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!resendApiKey) {
    sendJson(res, 500, {
      error:
        "Missing RESEND_API_KEY environment variable. Replace re_xxxxxxxxx with your real API key.",
    });
    return;
  }

  try {
    const payload = await parseContactPayload(req);
    const resend = new Resend(resendApiKey);

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

    await resend.emails.send({
      from: resendFromEmail,
      to: resendToEmail,
      subject: `Nowe zapytanie: ${payload.service || "Kontakt"}`,
      html,
    });

    sendJson(res, 200, { ok: true });
  } catch (error) {
    const isBadPayload = error instanceof Error && error.message === "MISSING_REQUIRED_FIELDS";
    sendJson(res, isBadPayload ? 400 : 500, {
      error: isBadPayload ? "Missing required fields" : "Failed to send email",
    });
  }
};

const contactApiPlugin = (env: Record<string, string>): Plugin => ({
  name: "contact-api-plugin",
  configureServer(server) {
    server.middlewares.use("/api/contact", (req, res) => contactHandler(req, res, env));
  },
  configurePreviewServer(server) {
    server.middlewares.use("/api/contact", (req, res) => contactHandler(req, res, env));
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), contactApiPlugin(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});