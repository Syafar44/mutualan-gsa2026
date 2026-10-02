import { NextResponse } from "next/server";
import { bacaBody, panggilScript } from "@/lib/appsScript";
import { pasangSesi } from "@/lib/sesi";
import { bersihkanUsername, getData, REGEX_USERNAME } from "@/lib/sheet";

const tunggu = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Daftar baru, atau perbarui nama & univ bila username sudah terdaftar. Lalu masuk. */
export async function POST(request: Request) {
  const body = await bacaBody(request);
  const nama = String(body?.nama ?? "").trim().replace(/\s+/g, " ");
  const univ = String(body?.univ ?? "").trim().replace(/\s+/g, " ");
  const instagram = bersihkanUsername(String(body?.instagram ?? ""));

  if (!nama || nama.length > 80 || !univ || univ.length > 100) {
    return NextResponse.json({ ok: false, error: "Nama, univ, dan instagram wajib diisi." }, { status: 400 });
  }
  if (!REGEX_USERNAME.test(instagram)) {
    return NextResponse.json({ ok: false, error: "Username instagram tidak valid." }, { status: 400 });
  }

  // Data persis sama dengan akun yang sudah ada → cukup masukkan, tanpa menulis ke sheet.
  const { anggota: ada, sumber } = await getData();
  const kembar = ada.find(
    (a) => a.instagram === instagram && a.nama === nama && a.univ.toLowerCase() === univ.toLowerCase()
  );
  if (sumber === "sheet" && kembar) {
    return pasangSesi(NextResponse.json({ ok: true, diperbarui: false }), instagram);
  }

  const hasil = await panggilScript({ aksi: "daftar", nama, univ, instagram });
  if (!hasil.ok) {
    return NextResponse.json({ ok: false, error: hasil.error }, { status: 400 });
  }

  // Sheet publik kadang butuh beberapa detik untuk menampilkan baris baru;
  // tunggu sebentar agar halaman berikutnya sudah mengenali akun ini.
  for (let i = 0; i < 5; i++) {
    const { anggota, sumber } = await getData();
    if (sumber !== "sheet" || anggota.some((a) => a.instagram === instagram)) break;
    await tunggu(800);
  }

  return pasangSesi(NextResponse.json({ ok: true, diperbarui: hasil.diperbarui === true }), instagram);
}
