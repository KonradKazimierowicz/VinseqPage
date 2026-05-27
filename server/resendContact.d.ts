export type ContactPayload = {
  name: string;
  companyName: string;
  email: string;
  service: string;
  message: string;
};

export type SendContactResult =
  | { ok: true; data: { id: string } }
  | { ok: false; code: string; message: string };

export function escapeHtml(value: string): string;

export function formatFromAddress(
  fromEmail: string | undefined,
  displayName?: string | undefined,
): string | null;

export function validateResendEnv(
  env?: Record<string, string | undefined>,
):
  | { ok: true; resendApiKey: string; from: string; to: string[] }
  | { ok: false; code: string; message: string };

export function normalizeContactPayload(body: Record<string, unknown>): ContactPayload;

export function sendContactEmail(
  payload: ContactPayload,
  env?: Record<string, string | undefined>,
): Promise<SendContactResult>;
