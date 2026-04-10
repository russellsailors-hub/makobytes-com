import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Auth.js v5 configuration for the MakoBytes admin dashboard.
 *
 * Strategy: Google OAuth + email allowlist.
 *   - Anyone can hit "Sign in with Google"
 *   - On callback, we check the user's email against ADMIN_ALLOWED_EMAILS
 *     (comma-separated env var). If not on the list, signIn returns false
 *     and the user is bounced back to the login screen with an error.
 *   - Sessions are JWT-based (no database) — token lives in an encrypted
 *     cookie signed with AUTH_SECRET.
 *
 * Required env vars (set in Vercel):
 *   AUTH_GOOGLE_ID         — OAuth client ID from Google Cloud Console
 *   AUTH_GOOGLE_SECRET     — OAuth client secret from Google Cloud Console
 *   AUTH_SECRET            — random 32+ char string for JWT signing
 *   ADMIN_ALLOWED_EMAILS   — comma-separated allowlist
 *   AUTH_TRUST_HOST=true   — required when running behind Vercel
 */

function getAllowedEmails(): string[] {
  const raw = process.env.ADMIN_ALLOWED_EMAILS || "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user }) {
      const allowed = getAllowedEmails();
      if (allowed.length === 0) {
        // Fail closed: if no allowlist is configured, no one gets in
        console.warn(
          "[auth] ADMIN_ALLOWED_EMAILS is not set — denying all sign-ins",
        );
        return false;
      }
      const email = (user.email || "").toLowerCase();
      if (!email) return false;
      return allowed.includes(email);
    },
    async session({ session }) {
      return session;
    },
  },
});

/**
 * Helper used across server components to check whether the current
 * request has an authenticated admin session. Replaces the old
 * isAuthed() function from lib/admin/auth.ts.
 */
export async function isAdminAuthed(): Promise<boolean> {
  const session = await auth();
  return Boolean(session?.user?.email);
}

export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.AUTH_GOOGLE_ID &&
      process.env.AUTH_GOOGLE_SECRET &&
      process.env.AUTH_SECRET &&
      process.env.ADMIN_ALLOWED_EMAILS,
  );
}
