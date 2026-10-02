import { cookies } from "next/headers";
import type { Metadata } from "next";
import Dekorasi from "@/components/Dekorasi";
import Gerbang from "@/components/Gerbang";
import { COOKIE_SAYA } from "@/lib/sesi";
import { daftarUnivUnik, getData } from "@/lib/sheet";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leaderboard — Mutualan GSA",
  description: "GSA yang paling banyak memfollow di mutualan Instagram",
};

const BATAS = 20;
const MEDALI = ["🥇", "🥈", "🥉"];

export default async function Leaderboard() {
  const { anggota, follows, sumber, error } = await getData();
  const tersambung = sumber === "sheet" && !!process.env.APPS_SCRIPT_URL?.trim();

  const username = (await cookies()).get(COOKIE_SAYA)?.value;
  const saya = anggota.find((a) => a.instagram === username) ?? null;

  const header = (
    <header className="page-head kecil">
      <Dekorasi jumlah={2} />
      <p className="eyebrow">Google Student Ambassador</p>
      <h1>Leaderboard</h1>
      <p className="sub-judul">GSA yang paling banyak memfollow teman-temannya</p>
    </header>
  );

  if (!saya) {
    // Seperti halaman utama, data tidak dikirim ke browser sebelum login.
    return (
      <>
        {header}
        {sumber === "demo" && <div className="notice">⚠️ {error}</div>}
        <Gerbang tersambung={tersambung} daftarUniv={daftarUnivUnik(anggota)} />
      </>
    );
  }

  // Hitung berapa akun unik yang sudah difollow tiap orang; hanya pasangan antar
  // anggota terdaftar yang dihitung.
  const terdaftar = new Set(anggota.map((a) => a.instagram));
  const difollow = new Map<string, Set<string>>();
  for (const f of follows) {
    if (f.follower === f.target || !terdaftar.has(f.follower) || !terdaftar.has(f.target)) continue;
    const set = difollow.get(f.follower) ?? new Set<string>();
    set.add(f.target);
    difollow.set(f.follower, set);
  }

  const peringkat = anggota
    .map((a) => ({ ...a, jumlah: difollow.get(a.instagram)?.size ?? 0 }))
    .filter((a) => a.jumlah > 0)
    .sort((x, y) => y.jumlah - x.jumlah || x.nama.localeCompare(y.nama, "id"))
    .slice(0, BATAS);

  const posisiSaya = peringkat.findIndex((a) => a.instagram === saya.instagram);

  return (
    <>
      {header}
      {sumber === "demo" && <div className="notice">⚠️ {error}</div>}

      <ol className="daftar rank-list">
        {peringkat.length === 0 ? (
          <li className="empty">Belum ada yang memfollow. Jadi yang pertama!</li>
        ) : (
          peringkat.map((a, i) => (
            <li key={a.instagram} className={`item${a.instagram === saya.instagram ? " saya" : ""}`}>
              <span className={`rank${i < 3 ? " top" : ""}`} aria-label={`Peringkat ${i + 1}`}>
                {i < 3 ? MEDALI[i] : i + 1}
              </span>
              <div className="item-info">
                <p className="item-nama">
                  {a.nama}
                  {a.instagram === saya.instagram && <span className="tag">kamu</span>}
                </p>
                <p className="item-univ" title={a.univ}>
                  {a.univ}
                </p>
              </div>
              <span className="skor">
                <b>{a.jumlah}</b>
                <small>difollow</small>
              </span>
            </li>
          ))
        )}
      </ol>

      <div className="stat-row">
        <span>
          {posisiSaya === -1
            ? `Kamu belum masuk top ${BATAS}${difollow.has(saya.instagram) ? "" : " — kamu belum memfollow siapa pun"}`
            : `Kamu di peringkat ${posisiSaya + 1}`}
        </span>
      </div>
    </>
  );
}
