import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { normalizeContactPayload, sendContactEmail } from "./server/resendContact.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const distPath = path.join(__dirname, "dist");

const contactErrorStatus = {
  MISSING_REQUIRED_FIELDS: 400,
  MISSING_RESEND_API_KEY: 500,
  MISSING_RESEND_FROM_EMAIL: 500,
  MISSING_RESEND_TO_EMAIL: 500,
  INVALID_RESEND_FROM_EMAIL: 500,
  RESEND_SEND_FAILED: 502,
};

const contactErrorMessage = {
  MISSING_RESEND_API_KEY:
    "Brak RESEND_API_KEY na serwerze. Ustaw prawdziwy klucz w panelu Hostinger.",
  MISSING_RESEND_FROM_EMAIL:
    "Brak RESEND_FROM_EMAIL. Użyj adresu ze zweryfikowanej domeny w Resend.",
  MISSING_RESEND_TO_EMAIL: "Brak RESEND_TO_EMAIL na serwerze.",
  INVALID_RESEND_FROM_EMAIL:
    "RESEND_FROM_EMAIL nie może używać @resend.dev na produkcji. Zweryfikuj domenę w Resend.",
};

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.post("/api/contact", async (req, res) => {
  try {
    const payload = normalizeContactPayload(req.body ?? {});
    const result = await sendContactEmail(payload, process.env);

    if (!result.ok) {
      const status = contactErrorStatus[result.code] ?? 500;
      const message = contactErrorMessage[result.code] ?? result.message;

      if (result.code === "RESEND_SEND_FAILED") {
        console.error("Resend send failed:", result.message);
      }

      res.status(status).json({ error: message });
      return;
    }

    res.status(200).json({ ok: true, id: result.data?.id });
  } catch (error) {
    if (error?.code === "MISSING_REQUIRED_FIELDS") {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.use(express.static(distPath));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    next();
    return;
  }

  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

app.use((err, _req, res, _next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Vinseq server running on port ${PORT}`);
});
