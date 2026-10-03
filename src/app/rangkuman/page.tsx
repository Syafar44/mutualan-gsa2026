import type { Metadata } from "next";
import Link from "next/link";
import Dekorasi from "@/components/Dekorasi";
import {
  ALUR_EVENT,
  ATURAN_GRUP,
  ATURAN_KUNCI,
  CATATAN_AKUN,
  CATATAN_KONTEN,
  FAQ,
  PERINGATAN_NOTULENSI,
  SUMBER,
  TAUTAN,
  TIMELINE,
  type Status,
} from "@/lib/rangkuman";

export const metadata: Metadata = {
  title: "Rangkuman & FAQ — Mutualan GSA",
  description: "Rangkuman dan FAQ Google Student Ambassador Indonesia 2026 Batch 2",
};

const LABEL_STATUS: Record<Status, string> = {
  alumni: "Dari alumni",
  "belum-pasti": "Belum pasti",
};

/** Teks dengan **tebal** diubah menjadi <b>. */
function Teks({ children }: { children: string }) {
  return (
    <>
      {children.split("**").map((bagian, i) => (i % 2 === 1 ? <b key={i}>{bagian}</b> : bagian))}
    </>
  );
}

const idFaq = (kode: string) => kode.toLowerCase();

export default function Rangkuman() {
  const jumlahFaq = FAQ.reduce((n, k) => n + k.isi.length, 0);

  return (
    <>
      <header className="page-head kecil">
        <Dekorasi jumlah={2} />
        <p className="eyebrow">Google Student Ambassador Indonesia 2026</p>
        <h1>Rangkuman & FAQ</h1>
        <p className="sub-judul">Batch 2 · {jumlahFaq} pertanyaan, tiap jawaban punya kode anchor</p>
      </header>

      <div className="rk">
        <section className="rk-bagian rk-cara">
          <p>
            Tiap pertanyaan punya kode, misalnya <b>T-01</b>. Kalau ada yang bertanya ulang di grup, cukup balas{" "}
            <b>“cek T-01”</b> atau bagikan tautannya, misalnya <code>/rangkuman#t-01</code>.
          </p>
          <p>
            <span className="rk-status alumni">Dari alumni</span> jawaban teman alumni atau guidebook.{" "}
            <span className="rk-status belum-pasti">Belum pasti</span> masih menunggu Orientation 6 Okt atau Briefing 7
            Okt.
          </p>
        </section>

        <nav className="rk-chips" aria-label="Loncat ke bagian">
          <a href="#link">Link</a>
          <a href="#timeline">Timeline</a>
          <a href="#alur-event">Alur Event</a>
          {FAQ.map((k) => (
            <a key={k.id} href={`#${k.id}`}>
              {k.judul}
            </a>
          ))}
          <a href="#aturan-grup">Aturan Grup</a>
        </nav>

        <section id="link" className="rk-bagian">
          <h2>1. Link & Akun Resmi</h2>
          <ul className="rk-kartu">
            {TAUTAN.map((t) => (
              <li key={t.keperluan}>
                <span className="rk-label">{t.keperluan}</span>
                {t.href ? (
                  t.href.startsWith("/") ? (
                    <Link href={t.href}>{t.teks}</Link>
                  ) : (
                    <a href={t.href} target="_blank" rel="noopener noreferrer">
                      {t.teks}
                    </a>
                  )
                ) : (
                  <span className="rk-nilai">{t.teks}</span>
                )}
              </li>
            ))}
          </ul>
          <ul className="rk-poin">
            {CATATAN_AKUN.map((c) => (
              <li key={c}>
                <Teks>{c}</Teks>
              </li>
            ))}
          </ul>
        </section>

        <section id="timeline" className="rk-bagian">
          <h2>2. Timeline & Tenggat Waktu</h2>
          <ol className="rk-timeline">
            {TIMELINE.map((t) => (
              <li key={t.tanggal + t.agenda}>
                <span className="rk-tanggal">{t.tanggal}</span>
                <span className="rk-agenda">
                  {t.agenda}
                  {t.wajib && <span className="rk-wajib">WAJIB</span>}
                </span>
              </li>
            ))}
          </ol>
          <p className="rk-info">
            <Teks>{CATATAN_KONTEN}</Teks>
          </p>
          <div className="notice">
            <Teks>{PERINGATAN_NOTULENSI}</Teks>
          </div>
        </section>

        <section id="alur-event" className="rk-bagian">
          <h2>3. Alur Resmi Membuat Event</h2>
          <p className="rk-intro">Ini alur yang paling banyak ditanyakan. Semua jawaban di FAQ mengacu ke sini.</p>
          <ol className="rk-langkah">
            {ALUR_EVENT.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ol>
          <h3>Aturan kunci yang tidak bisa dinegosiasi</h3>
          <ul className="rk-poin rk-kunci">
            {ATURAN_KUNCI.map((a) => (
              <li key={a}>
                <Teks>{a}</Teks>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="rk-bagian">
          <h2>4. FAQ</h2>

          <details className="rk-daftar">
            <summary>Daftar semua pertanyaan ({jumlahFaq})</summary>
            {FAQ.map((k) => (
              <div key={k.id}>
                <h3>{k.judul}</h3>
                <ul>
                  {k.isi.map((f) => (
                    <li key={f.kode}>
                      <a href={`#${idFaq(f.kode)}`}>
                        <span className="rk-kode">{f.kode}</span> {f.tanya}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </details>

          {FAQ.map((k) => (
            <div key={k.id} id={k.id} className="rk-kategori">
              <h3>{k.judul}</h3>
              {k.isi.map((f) => (
                <article key={f.kode} id={idFaq(f.kode)} className="rk-faq">
                  <h4>
                    <a href={`#${idFaq(f.kode)}`} className="rk-kode" aria-label={`Tautan ke ${f.kode}`}>
                      {f.kode}
                    </a>
                    {f.tanya}
                  </h4>
                  {f.jawab.map((p) => (
                    <p key={p}>
                      <Teks>{p}</Teks>
                    </p>
                  ))}
                  {(f.status || f.catatan) && (
                    <p className="rk-meta">
                      {f.status && <span className={`rk-status ${f.status}`}>{LABEL_STATUS[f.status]}</span>}
                      {f.catatan}
                    </p>
                  )}
                </article>
              ))}
            </div>
          ))}
        </section>

        <section id="aturan-grup" className="rk-bagian">
          <h2>5. Aturan Grup & Etika Bertanya</h2>
          <ul className="rk-poin">
            {ATURAN_GRUP.map((a) => (
              <li key={a}>
                <Teks>{a}</Teks>
              </li>
            ))}
          </ul>
        </section>

        <p className="rk-sumber">{SUMBER}</p>
      </div>
    </>
  );
}
