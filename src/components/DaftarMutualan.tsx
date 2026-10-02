"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import AkunSaya from "@/components/AkunSaya";
import type { Anggota, Follow } from "@/lib/sheet";

type Filter = "semua" | "belum" | "sudah";

function Sorot({ teks, kunci }: { teks: string; kunci: string }) {
  const q = kunci.trim();
  if (!q) return <>{teks}</>;
  const posisi = teks.toLowerCase().indexOf(q.toLowerCase());
  if (posisi === -1) return <>{teks}</>;
  return (
    <>
      {teks.slice(0, posisi)}
      <mark>{teks.slice(posisi, posisi + q.length)}</mark>
      {teks.slice(posisi + q.length)}
    </>
  );
}

const pasangan = (follower: string, target: string) => `${follower}>${target}`;

export default function DaftarMutualan({
  saya,
  anggota,
  follows,
}: {
  saya: Anggota;
  anggota: Anggota[];
  follows: Follow[];
}) {
  const router = useRouter();

  const [kunci, setKunci] = useState("");
  const [univ, setUniv] = useState("");
  const [filter, setFilter] = useState<Filter>("semua");
  // Perubahan yang dibuat di sesi ini, menimpa data sheet sampai halaman dimuat ulang.
  const [ubahan, setUbahan] = useState<Record<string, boolean>>({});
  const [gagal, setGagal] = useState<string | null>(null);

  const sudahFollow = useMemo(() => {
    const set = new Set(follows.map((f) => pasangan(f.follower, f.target)));
    for (const [k, v] of Object.entries(ubahan)) {
      if (v) set.add(k);
      else set.delete(k);
    }
    return set;
  }, [follows, ubahan]);

  const orangLain = useMemo(() => anggota.filter((a) => a.instagram !== saya.instagram), [anggota, saya]);

  const daftarUniv = useMemo(
    () => Array.from(new Set(orangLain.map((a) => a.univ))).sort((a, b) => a.localeCompare(b, "id")),
    [orangLain]
  );

  const hasil = useMemo(() => {
    const q = kunci.trim().toLowerCase();
    return orangLain.filter((a) => {
      if (univ && a.univ !== univ) return false;
      const sudah = sudahFollow.has(pasangan(saya.instagram, a.instagram));
      if (filter === "sudah" && !sudah) return false;
      if (filter === "belum" && sudah) return false;
      if (!q) return true;
      return a.nama.toLowerCase().includes(q) || a.instagram.includes(q);
    });
  }, [orangLain, kunci, univ, filter, saya, sudahFollow]);

  const jumlahSudah = orangLain.filter((a) => sudahFollow.has(pasangan(saya.instagram, a.instagram))).length;
  const persen = orangLain.length ? Math.round((jumlahSudah / orangLain.length) * 100) : 0;

  const followKamu = useMemo(() => {
    const peta = new Map(anggota.map((a) => [a.instagram, a]));
    return [...sudahFollow]
      .map((k) => k.split(">"))
      .filter(([, target]) => target === saya.instagram)
      .map(([follower]) => peta.get(follower))
      .filter((a): a is Anggota => !!a);
  }, [sudahFollow, anggota, saya]);

  async function keluar() {
    await fetch("/api/keluar", { method: "POST" });
    router.refresh();
  }

  async function setStatus(target: Anggota, followed: boolean) {
    const kuncinya = pasangan(saya.instagram, target.instagram);
    setGagal(null);
    setUbahan((prev) => ({ ...prev, [kuncinya]: followed }));
    try {
      const res = await fetch("/api/follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: target.instagram, followed }),
      });
      const data = await res.json().catch(() => ({}));
      if (!data.ok) throw new Error(data.error || "gagal menyimpan");
      router.refresh();
    } catch (e) {
      setUbahan((prev) => ({ ...prev, [kuncinya]: !followed }));
      setGagal(`Gagal menyimpan follow ke ${target.nama}: ${(e as Error).message}`);
    }
  }

  function mutual(target: Anggota) {
    window.open(`https://www.instagram.com/${target.instagram}/`, "_blank", "noopener,noreferrer");
    setStatus(target, true);
  }

  return (
    <>
      <AkunSaya saya={saya} followKamu={followKamu} onKeluar={keluar} />

      <div className="progress" aria-label={`Sudah follow ${jumlahSudah} dari ${orangLain.length}`}>
        <div className="progress-teks">
          Kamu sudah follow <b>{jumlahSudah}</b> dari <b>{orangLain.length}</b> orang
          <span>{persen}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-isi" style={{ width: `${persen}%` }} />
        </div>
      </div>

      <div className="search">
        <span className="icon">🔍</span>
        <input
          type="search"
          value={kunci}
          onChange={(e) => setKunci(e.target.value)}
          placeholder="Cari nama atau username instagram…"
          aria-label="Cari anggota"
        />
      </div>

      <div className="filter-row">
        <select value={univ} onChange={(e) => setUniv(e.target.value)} aria-label="Filter universitas">
          <option value="">Semua universitas</option>
          {daftarUniv.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <div className="tabs" role="tablist" aria-label="Filter status">
          {(["semua", "belum", "sudah"] as const).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={filter === f ? "tab aktif" : "tab"}
              onClick={() => setFilter(f)}
            >
              {f === "semua" ? "Semua" : f === "belum" ? "Belum difollow" : "Sudah difollow"}
            </button>
          ))}
        </div>
      </div>

      {gagal && <div className="notice">⚠️ {gagal}</div>}

      <ul className="daftar">
        {hasil.length === 0 ? (
          <li className="empty">Tidak ada anggota yang cocok dengan filter.</li>
        ) : (
          hasil.map((a) => {
            const sudah = sudahFollow.has(pasangan(saya.instagram, a.instagram));
            const membalas = sudahFollow.has(pasangan(a.instagram, saya.instagram));
            return (
              <li key={a.instagram} className="item">
                <div className="item-info">
                  <p className="item-nama">
                    <Sorot teks={a.nama} kunci={kunci} />
                    {membalas && <span className="tag">follow kamu</span>}
                  </p>
                  <p className="item-univ" title={a.univ}>
                    {a.univ}
                  </p>
                </div>
                {sudah ? (
                  <a
                    className="btn-aksi lihat"
                    href={`https://www.instagram.com/${a.instagram}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lihat
                  </a>
                ) : (
                  <button className="btn-aksi mutual" onClick={() => mutual(a)}>
                    Mutual
                  </button>
                )}
              </li>
            );
          })
        )}
      </ul>

      <div className="stat-row">
        <span>
          Menampilkan {hasil.length} dari {orangLain.length} anggota
        </span>
      </div>
    </>
  );
}
