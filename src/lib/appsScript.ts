import { NextResponse } from "next/server";

export type HasilScript = {
  ok: boolean;
  error?: string;
  nama?: string;
  univ?: string;
  diperbarui?: boolean;
};

/** Kirim satu aksi ke web app Apps Script (lihat docs/apps-script.gs). */
export async function panggilScript(aksi: Record<string, unknown>): Promise<HasilScript> {
  const url = process.env.APPS_SCRIPT_URL?.trim();
  if (!url) return { ok: false, error: "APPS_SCRIPT_URL belum diisi di .env.local" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...aksi, token: (process.env.APPS_SCRIPT_TOKEN ?? "").trim() }),
      redirect: "follow",
    });
    const hasil = await res.json();
    return {
      ok: hasil?.ok === true,
      error: hasil?.error,
      nama: hasil?.nama,
      univ: hasil?.univ,
      diperbarui: hasil?.diperbarui,
    };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function kirimKeSheet(aksi: Record<string, unknown>) {
  const hasil = await panggilScript(aksi);
  return NextResponse.json(hasil, { status: hasil.ok ? 200 : 400 });
}

export async function bacaBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? body : null;
  } catch {
    return null;
  }
}
