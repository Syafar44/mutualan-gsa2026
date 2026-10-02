import Image from "next/image";
import type { CSSProperties } from "react";

type Posisi = {
  src: string;
  gaya: CSSProperties;
  opsional?: boolean; // disembunyikan di layar kecil
};

const d = (delay: string) => ({ ["--delay" as string]: delay });

/** Ikon pelengkap yang mengisi ruang kosong di sekitar konten. */
const SEBARAN: Posisi[] = [
  { src: "/pelengkap/pelengkap-1.avif", gaya: { top: "2%", left: "1%", width: 84, ...d("0s") } },
  { src: "/pelengkap/pelengkap-2.avif", gaya: { top: "8%", right: "2%", width: 76, ...d("0.6s") } },
  { src: "/pelengkap/pelengkap-3.avif", gaya: { top: "38%", left: "-1%", width: 68, ...d("1.2s") }, opsional: true },
  { src: "/pelengkap/pelengkap-4.avif", gaya: { top: "46%", right: "0%", width: 72, ...d("0.3s") }, opsional: true },
  { src: "/pelengkap/pelengkap-5.avif", gaya: { bottom: "6%", left: "4%", width: 66, ...d("0.9s") }, opsional: true },
  { src: "/pelengkap/pelengkap-6.avif", gaya: { bottom: "2%", right: "5%", width: 80, ...d("1.5s") }, opsional: true },
  { src: "/pelengkap/pelengkap-7.avif", gaya: { top: "20%", left: "8%", width: 56, ...d("1.8s") }, opsional: true },
  { src: "/pelengkap/pelengkap-8.avif", gaya: { top: "26%", right: "9%", width: 58, ...d("2.1s") }, opsional: true },
];

export default function Dekorasi({ jumlah = 8 }: { jumlah?: number }) {
  return (
    <div className="dekorasi" aria-hidden="true">
      {SEBARAN.slice(0, jumlah).map((s) => (
        <Image
          key={s.src}
          src={s.src}
          alt=""
          width={120}
          height={120}
          unoptimized
          className={`dekor${s.opsional ? " opsional" : ""}`}
          style={s.gaya}
        />
      ))}
    </div>
  );
}
