import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed, isAdminConfigured } from "@/lib/admin/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin · MakoBytes",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLogin() {
  if (await isAuthed()) {
    redirect("/admin/dashboard");
  }

  const configured = isAdminConfigured();

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-ink-950 px-6 py-16">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-blue/10 blur-[150px]" />

      <div className="relative w-full max-w-md">
        <div className="glass rounded-2xl p-8 sm:p-10">
          <div className="mono-tag mb-3 text-glow-cyan">// admin access</div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            MakoBytes admin
          </h1>
          <p className="mt-3 text-sm text-white/60">
            Internal dashboard. Authorized users only.
          </p>

          {!configured ? (
            <div className="mt-6 rounded-lg border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm leading-relaxed text-yellow-200/90">
              <div className="mono-tag mb-1.5 text-yellow-400">
                // setup required
              </div>
              ADMIN_PASSWORD env var is not set on this Vercel deployment.
              Add it under Project Settings → Environment Variables, then
              redeploy.
            </div>
          ) : (
            <LoginForm />
          )}
        </div>

        <div className="mono-tag mt-6 text-center text-[10px] text-white/30">
          makobytes · admin v1
        </div>
      </div>
    </main>
  );
}
