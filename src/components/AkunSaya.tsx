"use client";

import { useState } from "react";
import type { Anggota } from "@/lib/sheet";

type Props = {
  saya: Anggota;
  /** Orang-orang yang sudah memfollow akun ini. */
  followKamu: Anggota[];
  onKeluar: () => void;
};

export default function AkunSaya({ saya, followKamu, onKeluar }: Props) {
  const [buka, setBuka] = useState(false);

  return (
    <section className="akun">
      <div className="akun-baris">
        <div>
          <p className="akun-label">Akunmu</p>
          <p className="akun-nama">
            {saya.nama} <span>@{saya.instagram}</span>
          </p>
        </div>
        <button className="ghost" onClick={onKeluar}>
          Keluar
        </button>
      </div>

      <button className="pengikut-toggle" onClick={() => setBuka((b) => !b)} aria-expanded={buka}>
        <b>{followKamu.length}</b> orang sudah follow kamu {buka ? "▲" : "▼"}
      </button>

      {buka &&
        (followKamu.length === 0 ? (
          <p className="akun-kosong">Belum ada. Bagikan link halaman ini supaya mereka mulai follow kamu.</p>
        ) : (
          <ul className="pengikut">
            {followKamu.map((a) => (
              <li key={a.instagram}>
                <a href={`https://www.instagram.com/${a.instagram}/`} target="_blank" rel="noopener noreferrer">
                  <b>{a.nama}</b> <span>@{a.instagram}</span>
                </a>
                <small>{a.univ}</small>
              </li>
            ))}
          </ul>
        ))}
    </section>
  );
}
