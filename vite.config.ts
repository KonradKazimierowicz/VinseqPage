import path from "path";
import { IncomingMessage, ServerResponse } from "node:http";
import react from "@vitejs/plugin-react";
import { Plugin, defineConfig, loadEnv } from "vite";
import { normalizeContactPayload, sendContactEmail } from "./server/resendContact.js";

const sendJson = (res: ServerResponse, statusCode: number, payload: Record<string, unknown>) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

const readBody = async (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

const contactHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  env: Record<string, string>,
) => {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw || "{}");
    const payload = normalizeContactPayload(body);
    const result = await sendContactEmail(payload, env);

    if (!result.ok) {
      const statusByCode: Record<string, number> = {
        MISSING_RESEND_API_KEY: 500,
        MISSING_RESEND_FROM_EMAIL: 500,
        MISSING_RESEND_TO_EMAIL: 500,
        INVALID_RESEND_FROM_EMAIL: 500,
        RESEND_SEND_FAILED: 502,
      };

      sendJson(res, statusByCode[result.code] ?? 500, { error: result.message });
      return;
    }

    sendJson(res, 200, { ok: true, id: result.data?.id });
  } catch (error) {
    const code = (error as Error & { code?: string }).code;

    if (code === "MISSING_REQUIRED_FIELDS") {
      sendJson(res, 400, { error: "Missing required fields" });
      return;
    }

    console.error("Dev contact form error:", error);
    sendJson(res, 500, { error: "Failed to send email" });
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
