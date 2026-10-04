"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = [
  { href: "/", label: "Mutualan" },
  { href: "/leaderboard", label: "Leaderboard" },
  // Disembunyikan dulu; halaman /rangkuman tetap bisa dibuka lewat alamatnya.
  // Hapus `tersembunyi` untuk menampilkannya lagi.
  { href: "/rangkuman", label: "Rangkuman", tersembunyi: true },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <Link href="/" className="brand">
        <Image src="/inti/inti-1.avif" alt="" width={30} height={30} unoptimized aria-hidden />
        <span className="brand-teks">Mutualan GSA</span>
      </Link>
      <div className="nav-links">
        {MENU.filter((m) => !m.tersembunyi).map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className={pathname === m.href ? "aktif" : undefined}
            aria-current={pathname === m.href ? "page" : undefined}
          >
            {m.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
