import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { bacaBody, kirimKeSheet } from "@/lib/appsScript";
import { COOKIE_SAYA } from "@/lib/sesi";
import { REGEX_USERNAME } from "@/lib/sheet";

export async function POST(request: Request) {
  const body = await bacaBody(request);
  // Pengikut selalu diambil dari sesi login, bukan dari body, agar tidak bisa dipalsukan.
  const follower = (await cookies()).get(COOKIE_SAYA)?.value ?? "";
  const target = String(body?.target ?? "");

  if (!follower) {
    return NextResponse.json({ ok: false, error: "Silakan login dulu." }, { status: 401 });
  }
  if (
    !REGEX_USERNAME.test(follower) ||
    !REGEX_USERNAME.test(target) ||
    follower === target ||
    typeof body?.followed !== "boolean"
  ) {
    return NextResponse.json({ ok: false, error: "data tidak valid" }, { status: 400 });
  }

  return kirimKeSheet({ aksi: "follow", follower, target, followed: body.followed });
}
