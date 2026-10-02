"use client";

import { useId, useMemo, useState } from "react";

const MAKS_SARAN = 5;

/** Semua kata yang diketik harus ada di nama univ; yang diawali kata pertama diutamakan. */
function cari(daftar: string[], teks: string): string[] {
  const kata = teks.toLowerCase().split(/\s+/).filter(Boolean);
  if (kata.length === 0) return [];

  return daftar
    .filter((u) => {
      const kecil = u.toLowerCase();
      return kata.every((k) => kecil.includes(k));
    })
    .sort((a, b) => {
      const awalA = a.toLowerCase().startsWith(kata[0]) ? 0 : 1;
      const awalB = b.toLowerCase().startsWith(kata[0]) ? 0 : 1;
      return awalA - awalB || a.length - b.length;
    })
    .slice(0, MAKS_SARAN);
}

type Props = {
  value: string;
  onChange: (v: string) => void;
  /** Univ yang sudah ada; boleh mengetik univ baru yang belum ada di daftar. */
  daftar: string[];
};

export default function InputUniv({ value, onChange, daftar }: Props) {
  const idList = useId();
  const [fokus, setFokus] = useState(false);
  const [aktif, setAktif] = useState(-1);

  const saran = useMemo(() => cari(daftar, value), [daftar, value]);
  // Sembunyikan kalau yang diketik sudah sama persis dengan satu-satunya saran.
  const tampil =
    fokus && saran.length > 0 && !(saran.length === 1 && saran[0].toLowerCase() === value.trim().toLowerCase());

  function pilih(u: string) {
    onChange(u);
    setAktif(-1);
    setFokus(false);
  }

  function tombol(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!tampil) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAktif((i) => (i + 1) % saran.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAktif((i) => (i <= 0 ? saran.length - 1 : i - 1));
    } else if (e.key === "Enter" && aktif >= 0) {
      e.preventDefault();
      pilih(saran[aktif]);
    } else if (e.key === "Escape") {
      setFokus(false);
    }
  }

  return (
    <div className="combo">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setAktif(-1);
          setFokus(true);
        }}
        onFocus={() => setFokus(true)}
        onBlur={() => setFokus(false)}
        onKeyDown={tombol}
        placeholder="Asal universitas"
        maxLength={100}
        required
        autoComplete="off"
        role="combobox"
        aria-expanded={tampil}
        aria-controls={idList}
        aria-autocomplete="list"
        aria-label="Asal universitas"
      />
      {tampil && (
        <ul className="combo-list" id={idList} role="listbox">
          {saran.map((u, i) => (
            <li
              key={u}
              role="option"
              aria-selected={i === aktif}
              className={i === aktif ? "aktif" : undefined}
              // mousedown (bukan click) agar terjadi sebelum input kehilangan fokus
              onMouseDown={(e) => {
                e.preventDefault();
                pilih(u);
              }}
            >
              {u}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
