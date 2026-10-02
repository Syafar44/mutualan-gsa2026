import { cookies } from "next/headers";
import Image from "next/image";
import DaftarMutualan from "@/components/DaftarMutualan";
import Dekorasi from "@/components/Dekorasi";
import Gerbang from "@/components/Gerbang";
import { COOKIE_SAYA } from "@/lib/sesi";
import { daftarUnivUnik, getData } from "@/lib/sheet";

export const dynamic = "force-dynamic";

export default async function Beranda() {
  const { anggota, follows, sumber, error } = await getData();
  const tersambung = sumber === "sheet" && !!process.env.APPS_SCRIPT_URL?.trim();

  const username = (await cookies()).get(COOKIE_SAYA)?.value;
  const saya = anggota.find((a) => a.instagram === username) ?? null;

  return (
    <>
      <header className="page-head">
        <Dekorasi jumlah={4} />
        <p className="eyebrow">Google Student Ambassador</p>
        <h1>Mutualan Instagram GSA Batch 2</h1>
        <div className="hero-inti">
          <Image src="/inti/inti-1.avif" alt="" width={116} height={116} unoptimized className="inti" aria-hidden />
          <p className="sub">Daftarkan akunmu, klik Mutual, dan lihat siapa saja yang sudah follow kamu!</p>
          <Image src="/inti/inti-2.avif" alt="" width={116} height={116} unoptimized className="inti" aria-hidden />
        </div>
      </header>

      {sumber === "demo" && <div className="notice">⚠️ {error}</div>}

      {saya ? (
        <DaftarMutualan saya={saya} anggota={anggota} follows={follows} />
      ) : (
        // Daftar anggota sengaja tidak dikirim ke browser sebelum login.
        <Gerbang tersambung={tersambung} daftarUniv={daftarUnivUnik(anggota)} />
      )}
    </>
  );
}
