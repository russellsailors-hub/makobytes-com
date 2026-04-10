import { NextRequest, NextResponse } from "next/server";
import { recordEvent, type EventRecord } from "@/lib/admin/storage";
import { randomBytes } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public event tracking endpoint.
 * Called from client components for page views and button clicks.
 *
 * Body: { type, page, meta? }
 * Response: { ok: true } — never returns an error to the client so a
 *   tracking failure never affects user-facing UX.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const type: string = String(body.type || "unknown").slice(0, 64);
    const page: string = String(body.page || "/").slice(0, 256);
    const meta = body.meta && typeof body.meta === "object" ? body.meta : undefined;

    const ref = req.headers.get("referer") || undefined;
    const ua = req.headers.get("user-agent") || undefined;

    const record: EventRecord = {
      id: randomBytes(8).toString("hex"),
      type,
      page,
      ts: Date.now(),
      ref: ref?.slice(0, 256),
      ua: ua?.slice(0, 256),
      meta,
    };

    await recordEvent(record);
  } catch (err) {
    console.error("[/api/track] failed", err);
  }
  return NextResponse.json({ ok: true });
}
