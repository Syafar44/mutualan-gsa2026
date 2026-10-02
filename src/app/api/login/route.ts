import { NextResponse } from "next/server";
import { bacaBody } from "@/lib/appsScript";
import { pasangSesi } from "@/lib/sesi";
import { bersihkanUsername, getData, REGEX_USERNAME } from "@/lib/sheet";

export async function POST(request: Request) {
  const body = await bacaBody(request);
  const instagram = bersihkanUsername(String(body?.instagram ?? ""));

  if (!REGEX_USERNAME.test(instagram)) {
    return NextResponse.json({ ok: false, error: "Username instagram tidak valid." }, { status: 400 });
  }

  const { anggota, sumber, error } = await getData();
  if (sumber !== "sheet") {
    return NextResponse.json({ ok: false, error: error ?? "Spreadsheet belum tersambung." }, { status: 503 });
  }
  if (!anggota.some((a) => a.instagram === instagram)) {
    return NextResponse.json(
      { ok: false, error: "Username belum terdaftar. Silakan Daftar dulu." },
      { status: 404 }
    );
  }

  return pasangSesi(NextResponse.json({ ok: true }), instagram);
}
