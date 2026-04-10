import { cookies } from "next/headers";
import { createHmac, randomBytes, timingSafeEqual } from "crypto";

/**
 * Tiny session auth for the admin dashboard.
 *
 * - Login compares the user-supplied password (timing-safe) against
 *   ADMIN_PASSWORD env var
 * - On success we mint a signed token (HMAC of timestamp + random nonce)
 *   using ADMIN_SESSION_SECRET, drop it in an httpOnly cookie
 * - Verification recomputes the HMAC and timing-safe-compares
 * - Sessions expire after SESSION_TTL_MS (default 7 days)
 *
 * No external auth provider, no database, no JWT library — just enough
 * to keep /admin private behind a single shared password.
 */

const COOKIE_NAME = "mb_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "INSECURE_DEV_FALLBACK_DO_NOT_USE_IN_PROD"
  );
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function createSessionToken(): string {
  const issued = Date.now();
  const nonce = randomBytes(12).toString("hex");
  const payload = `${issued}.${nonce}`;
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [issuedStr, nonce, sig] = parts;
  const issued = Number(issuedStr);
  if (!Number.isFinite(issued)) return false;
  if (Date.now() - issued > SESSION_TTL_MS) return false;

  const expectedSig = sign(`${issued}.${nonce}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function isAuthed(): Promise<boolean> {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
export const SESSION_TTL_SECONDS = SESSION_TTL_MS / 1000;
