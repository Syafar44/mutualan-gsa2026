import { NextResponse } from "next/server";
import { hapusSesi } from "@/lib/sesi";

export async function POST() {
  return hapusSesi(NextResponse.json({ ok: true }));
}
