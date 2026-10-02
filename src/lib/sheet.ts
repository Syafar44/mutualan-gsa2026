export type Anggota = {
  nama: string;
  univ: string;
  /** Username instagram tanpa @, huruf kecil. */
  instagram: string;
};

/** Satu catatan: `follower` sudah memfollow `target` (keduanya username). */
export type Follow = {
  follower: string;
  target: string;
};

export type HasilData = {
  anggota: Anggota[];
  follows: Follow[];
  sumber: "sheet" | "demo";
  error?: string;
};

export const REGEX_USERNAME = /^[a-z0-9._]{1,30}$/;

/** Terima "@user", "user", atau link instagram.com/user → "user" (huruf kecil). */
export function bersihkanUsername(mentah: string): string {
  return mentah
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^@/, "")
    .split(/[/?#]/)[0]
    .toLowerCase();
}

const DEMO: Anggota[] = [
  { nama: "Contoh Satu", univ: "Universitas Contoh", instagram: "contoh.satu" },
  { nama: "Contoh Dua", univ: "Institut Contoh", instagram: "contoh.dua" },
];

const KOLOM_NAMA = ["nama", "nama lengkap", "name"];
const KOLOM_UNIV = ["univ", "universitas", "asal univ", "asal universitas", "kampus"];
const KOLOM_IG = ["instagram", "username", "ig", "akun"];
const KOLOM_FOLLOWER = ["follower", "pengikut"];
const KOLOM_TARGET = ["target", "difollow"];

function cariKolom(headers: string[], kandidat: string[]): number {
  const bersih = headers.map((h) => (h || "").toString().trim().toLowerCase());
  for (const k of kandidat) {
    const idx = bersih.findIndex((h) => h === k);
    if (idx !== -1) return idx;
  }
  for (const k of kandidat) {
    const idx = bersih.findIndex((h) => h.includes(k));
    if (idx !== -1) return idx;
  }
  return -1;
}

/** Ambil satu tab sebagai { header, baris }. Baris pertama selalu dianggap header. */
async function ambilTab(id: string, tab: string): Promise<{ header: string[]; baris: string[][] }> {
  const url =
    `https://docs.google.com/spreadsheets/d/${id}/gviz/tq` +
    `?tqx=out:json&sheet=${encodeURIComponent(tab)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const teks = await res.text();
  const cocok = teks.match(/setResponse\(([\s\S]*)\)/);
  if (!cocok) throw new Error("format balasan tidak dikenali");

  const json = JSON.parse(cocok[1]);
  const cols: string[] = (json.table?.cols ?? []).map((c: { label?: string }) => c?.label ?? "");
  const rows: string[][] = (json.table?.rows ?? []).map(
    (r: { c?: ({ f?: string; v?: unknown } | null)[] }) =>
      (r?.c ?? []).map((c) => (c?.f ?? c?.v ?? "").toString())
  );

  // Google memakai baris pertama sebagai label kolom hanya bila semuanya teks;
  // kalau label kosong, baris pertama ada di rows.
  if (cols.every((c) => !c)) {
    return { header: rows[0] ?? [], baris: rows.slice(1) };
  }
  return { header: cols, baris: rows };
}

function rapikanAnggota({ header, baris }: { header: string[]; baris: string[][] }): Anggota[] {
  const idxNama = Math.max(cariKolom(header, KOLOM_NAMA), 0);
  let idxUniv = cariKolom(header, KOLOM_UNIV);
  let idxIg = cariKolom(header, KOLOM_IG);
  if (idxUniv === -1) idxUniv = 1;
  if (idxIg === -1) idxIg = 2;

  const dilihat = new Set<string>();
  const hasil: Anggota[] = [];
  for (const r of baris) {
    const nama = (r[idxNama] ?? "").trim();
    const instagram = bersihkanUsername(r[idxIg] ?? "");
    if (!nama || !REGEX_USERNAME.test(instagram) || dilihat.has(instagram)) continue;
    dilihat.add(instagram);
    hasil.push({ nama, univ: (r[idxUniv] ?? "").trim() || "-", instagram });
  }
  return hasil;
}

function rapikanFollow({ header, baris }: { header: string[]; baris: string[][] }): Follow[] {
  const idxFollower = cariKolom(header, KOLOM_FOLLOWER);
  const idxTarget = cariKolom(header, KOLOM_TARGET);
  // Tab "Follow" belum ada → Google mengembalikan tab pertama, header-nya tidak cocok.
  if (idxFollower === -1 || idxTarget === -1) return [];

  const hasil: Follow[] = [];
  for (const r of baris) {
    const follower = bersihkanUsername(r[idxFollower] ?? "");
    const target = bersihkanUsername(r[idxTarget] ?? "");
    if (follower && target && follower !== target) hasil.push({ follower, target });
  }
  return hasil;
}

export async function getData(): Promise<HasilData> {
  const id = process.env.SHEET_ID?.trim();
  const tabAnggota = process.env.SHEET_NAME?.trim() || "Sheet1";
  const tabFollow = process.env.SHEET_FOLLOW?.trim() || "Follow";

  if (!id) {
    return {
      anggota: DEMO,
      follows: [],
      sumber: "demo",
      error: "SHEET_ID belum diisi — menampilkan data contoh.",
    };
  }

  try {
    const [a, f] = await Promise.all([
      ambilTab(id, tabAnggota),
      ambilTab(id, tabFollow).catch(() => ({ header: [], baris: [] })),
    ]);
    return { anggota: rapikanAnggota(a), follows: rapikanFollow(f), sumber: "sheet" };
  } catch (e) {
    return {
      anggota: DEMO,
      follows: [],
      sumber: "demo",
      error:
        `Gagal membaca Google Sheet (${(e as Error).message}). ` +
        `Pastikan sheet dibagikan sebagai "Anyone with the link — Viewer".`,
    };
  }
}
