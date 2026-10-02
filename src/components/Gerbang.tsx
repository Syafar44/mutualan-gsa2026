"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { bersihkanUsername, REGEX_USERNAME } from "@/lib/sheet";

type Layar = "awal" | "login" | "daftar";

/** Modal terkunci: tidak ada tombol tutup, klik di luar tidak berpengaruh. */
export default function Gerbang({ tersambung }: { tersambung: boolean }) {
  const router = useRouter();
  const [layar, setLayar] = useState<Layar>("awal");
  const [nama, setNama] = useState("");
  const [univ, setUniv] = useState("");
  const [instagram, setInstagram] = useState("");
  const [kirim, setKirim] = useState(false);
  const [galat, setGalat] = useState<string | null>(null);

  function ke(l: Layar) {
    setGalat(null);
    setLayar(l);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ig = bersihkanUsername(instagram);
    if (!REGEX_USERNAME.test(ig)) {
      setGalat("Username instagram tidak valid (huruf, angka, titik, garis bawah).");
      return;
    }

    setKirim(true);
    setGalat(null);
    try {
      const res = await fetch(layar === "login" ? "/api/login" : "/api/daftar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(layar === "login" ? { instagram: ig } : { nama, univ, instagram: ig }),
      });
      const data = await res.json().catch(() => ({}));
      if (!data.ok) throw new Error(data.error || "Gagal, coba lagi.");
      router.refresh();
    } catch (err) {
      setGalat((err as Error).message);
      setKirim(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="judul-gerbang">
        <h2 id="judul-gerbang">
          {layar === "awal" ? "Selamat datang!" : layar === "login" ? "Login" : "Daftar"}
        </h2>

        {layar === "awal" && (
          <>
            <p className="modal-sub">Masuk dulu untuk melihat daftar mutualan GSA.</p>
            <div className="modal-aksi">
              <button className="btn-aksi lihat" onClick={() => ke("login")}>
                Login
              </button>
              <button className="btn-aksi mutual" onClick={() => ke("daftar")}>
                Daftar
              </button>
            </div>
          </>
        )}

        {layar !== "awal" && (
          <form className="form" onSubmit={submit}>
            {layar === "daftar" && (
              <>
                <input
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama"
                  maxLength={80}
                  required
                  autoFocus
                  aria-label="Nama"
                />
                <input
                  value={univ}
                  onChange={(e) => setUniv(e.target.value)}
                  placeholder="Asal universitas"
                  maxLength={100}
                  required
                  aria-label="Asal universitas"
                />
              </>
            )}
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Username instagram (@kamu)"
              required
              autoFocus={layar === "login"}
              autoCapitalize="none"
              autoCorrect="off"
              aria-label="Username instagram"
            />
            {layar === "daftar" && (
              <p className="modal-catatan">
                Sudah pernah daftar? Isi lagi dengan username yang sama untuk memperbarui nama dan univ.
              </p>
            )}
            <button className="btn-aksi lihat penuh" type="submit" disabled={kirim || !tersambung}>
              {kirim ? "Memproses…" : layar === "login" ? "Masuk" : "Daftar & masuk"}
            </button>
            {!tersambung && <p className="galat">Belum tersambung ke spreadsheet.</p>}
            {galat && <p className="galat">{galat}</p>}
            <button type="button" className="tautan" onClick={() => ke("awal")}>
              ← Kembali
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
