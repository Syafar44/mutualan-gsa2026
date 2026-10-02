import type { NextResponse } from "next/server";

/** Nama cookie yang menyimpan username instagram pengguna yang sedang masuk. */
export const COOKIE_SAYA = "saya";

const SETAHUN = 60 * 60 * 24 * 365;

export function pasangSesi(res: NextResponse, username: string): NextResponse {
  res.cookies.set(COOKIE_SAYA, username, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SETAHUN,
  });
  return res;
}

export function hapusSesi(res: NextResponse): NextResponse {
  res.cookies.set(COOKIE_SAYA, "", { path: "/", maxAge: 0 });
  return res;
}
