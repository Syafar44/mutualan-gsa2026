import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const TITLE = "Mutualan Instagram GSA Batch 2";
const DESCRIPTION = "Daftarkan akunmu, klik Mutual, dan lihat siapa saja yang sudah follow kamu!";
const GAMBAR = { url: "/metadata/image.png", width: 940, height: 303, alt: TITLE };

export const metadata: Metadata = {
  // Alamat absolut dibutuhkan agar gambar pratinjau bisa dibuka oleh WhatsApp, Instagram, dll.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000")
  ),
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: "/inti/inti-1.avif" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Mutualan GSA",
    title: TITLE,
    description: DESCRIPTION,
    images: [GAMBAR],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [GAMBAR.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>
        <nav className="nav">
          <Link href="/" className="brand">
            <Image src="/inti/inti-1.avif" alt="" width={30} height={30} unoptimized aria-hidden />
            Mutualan GSA
          </Link>
        </nav>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
