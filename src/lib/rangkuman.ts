/**
 * Isi halaman /rangkuman, disalin dari "Rangkuman & FAQ GSA 2026 Batch 2" (3 Oktober 2026).
 * Teks diapit ** menjadi tebal.
 */

export type Tautan = {
  keperluan: string;
  teks: string;
  href?: string;
};

export const TAUTAN: Tautan[] = [
  { keperluan: "Instagram angkatan (Batch 1 & 2)", teks: "@gsa2026_", href: "https://instagram.com/gsa2026_" },
  { keperluan: "List GSA Indonesia 2026 Batch 2", teks: "googlestudentambassador.id/listgsa", href: "https://googlestudentambassador.id/listgsa" },
  { keperluan: "Mutualan GSA Batch 2", teks: "Halaman ini", href: "/" },
  { keperluan: "Link Grup Region", teks: "Google Spreadsheet (dipin di grup)" },
  { keperluan: "Rekaman Orientation & Training", teks: "youtube.com/watch?v=bajJXSRphw4", href: "https://youtube.com/watch?v=bajJXSRphw4" },
  { keperluan: "Rekaman Briefing", teks: "youtube.com/watch?v=GjhntU3bUxA", href: "https://youtube.com/watch?v=GjhntU3bUxA" },
  { keperluan: "Email resmi", teks: "gsa@dicoding.com", href: "mailto:gsa@dicoding.com" },
];

export const CATATAN_AKUN: string[] = [
  "Akun IG hanya **SATU** untuk Batch 1 dan Batch 2 — tidak perlu bikin akun baru. Twibbon dan konten boleh tag akun tersebut.",
  "ACC collab IG dilakukan bertahap sesuai laporan yang masuk, sama seperti batch sebelumnya.",
  "Discord: akses invite sempat di-limit sistem karena terdeteksi ada bot masuk server. Sedang proses pemulihan — ditunggu saja.",
];

export const TIMELINE: { tanggal: string; agenda: string; wajib?: boolean }[] = [
  { tanggal: "1 Okt 2026 – 31 Jan 2027", agenda: "Misi Konten Epik Gemini & Google AI (mengikuti brief mingguan)" },
  { tanggal: "Maks. 5 Okt 2026", agenda: "Unggah Twibbon + lapor tautan + isi form pengiriman merchandise" },
  { tanggal: "Selasa, 6 Okt 2026 · 15.00–16.30 WIB", agenda: "Sesi Orientation & Training", wajib: true },
  { tanggal: "Selasa, 6 Okt 2026", agenda: "Akses Dashboard GSA dibuka" },
  { tanggal: "Rabu, 7 Okt 2026 · 15.00–17.00 WIB", agenda: "Sesi Technical Briefing", wajib: true },
  { tanggal: "Rabu, 7 Okt 2026 · 18.00 WIB", agenda: "Pengajuan proposal event dibuka (Goes To Rising Star) — template + link form aktif" },
  { tanggal: "Kamis, 8 Okt 2026", agenda: "Chatbot GSA tersedia di Discord" },
  { tanggal: "Mulai 12 Okt 2026", agenda: "Pengiriman Welcome Kit (bertahap via ekspedisi)" },
  { tanggal: "Minggu depan (menyusul)", agenda: "Sesi mentoring — bedah persiapan event pertama" },
];

export const CATATAN_KONTEN =
  "**Catatan konten:** tunggu brief dari tim GSA dulu sebelum bikin konten. Tiap minggu tim membagikan 3 brief (tema). Boleh pilih satu tema, boleh kerjakan semuanya — tapi konten mingguan wajib mengikuti brief.";

export const PERINGATAN_NOTULENSI =
  "**Penting:** notulensi/kesimpulan Orientation & Training Batch 2 BELUM ada karena sesinya belum berjalan. Jangan menyebarkan “hasil rangkuman orientation” yang beredar.";

export const ALUR_EVENT: string[] = [
  "Ambil template proposal yang disediakan, susun proposal event, lalu submit ke link form yang disediakan tim GSA.",
  "Sambil menunggu ACC, persiapan event tetap jalan.",
  "Kalau ada revisi: perbaiki dan submit ulang. Kalau sudah ACC: baru laksanakan event.",
  "Setelah event selesai, laporkan hasilnya di form pelaporan khusus (terpisah dari proposal).",
  "Tunggu hasil validasi tim GSA. Kalau valid, tunggu pengumuman kenaikan tier (biasanya per batch).",
  "Kalau belum valid: perbaiki laporan dan submit ulang. Kemungkinan terburuk, event harus dilaksanakan ulang.",
];

export const ATURAN_KUNCI: string[] = [
  "**1 event = 1 proposal = 1 GSA** yang mengklaim. Tidak ada 2 orang klaim 1 event.",
  "Proposal harus **ACC dulu**, baru event boleh jalan. Event jalan dulu lalu ajukan proposal: kemungkinan besar ditolak / tidak valid.",
  "Proposal diajukan ke pihak Google Indonesia (tim GSA), **bukan ke kampus**. Yang memvalidasi juga tim GSA.",
  "Event **WAJIB offline** / tatap muka.",
  "Pemateri utama = **kamu sendiri** sebagai GSA. Google mencari community leader, bukan influencer.",
  "Target audiens = mahasiswa aktif, diutamakan dari kampusmu sendiri.",
  "Urusan surat-menyurat & perizinan internal kampus adalah tanggung jawab pribadi kamu, bukan tim GSA.",
];

export type Status = "alumni" | "belum-pasti";

export type Faq = {
  /** Kode anchor, mis. "T-01". Tautan: /rangkuman#t-01 */
  kode: string;
  tanya: string;
  jawab: string[];
  status?: Status;
  catatan?: string;
};

export type KategoriFaq = {
  id: string;
  judul: string;
  isi: Faq[];
};

export const FAQ: KategoriFaq[] = [
  {
    id: "tier",
    judul: "Tier, Jumlah Event & Peserta",
    isi: [
      {
        kode: "T-01",
        tanya: "Berapa event dan berapa peserta minimal per tier?",
        jawab: [
          "**Rising Star:** 2 event, min. 10 peserta/event. **Achiever:** 4 event, min. 20 peserta/event. **Trailblazer:** 100–150 peserta. Jumlahnya adalah MINIMAL, boleh lebih.",
        ],
        status: "alumni",
        catatan: "Angka ini dari jawaban teman alumni & guidebook; dikonfirmasi ulang di sesi Briefing 7 Okt.",
      },
      {
        kode: "T-02",
        tanya: "Berapa proposal yang perlu diajukan? Sekali satu atau langsung banyak?",
        jawab: [
          "Ajukan langsung sejumlah minimal event tier tersebut. Rising Star → ajukan 2 proposal sekaligus. Achiever → boleh langsung 4 proposal, atau 2 dulu lalu 2 lagi. Tujuannya supaya tidak lama menunggu ACC.",
        ],
      },
      {
        kode: "T-03",
        tanya: "Kalau cuma sampai Rising Star dan tidak lanjut Achiever, boleh?",
        jawab: [
          "Boleh, tidak masalah. Berarti kamu berhenti di tier itu: sertifikat kamu akan berlogo Rising Star, dan merchandise Rising tetap didapat (kalau masuk Top 500). Peluang ikut event offline Jakarta tetap ada, walau kecil.",
        ],
      },
      {
        kode: "T-04",
        tanya: "Kalau syarat Achiever 4 event tapi cuma terlaksana 2–3, apa tetap naik tier?",
        jawab: ["**Tidak.** Syaratnya 4 event, harus terpenuhi sesuai target minimal tiap tier."],
        status: "alumni",
      },
      {
        kode: "T-05",
        tanya: "Apa indikator terpilihnya Top 500 / Top 50 — dampak event atau kecepatan submit?",
        jawab: [
          "Belum dijelaskan. Program ini berbasis kompetisi nasional dengan ribuan mahasiswa, jadi tidak semua yang menyelesaikan event otomatis masuk top.",
        ],
        status: "belum-pasti",
      },
    ],
  },
  {
    id: "kolaborasi",
    judul: "Kolaborasi dengan GSA Lain",
    isi: [
      {
        kode: "K-01",
        tanya: "Boleh bikin event bareng sesama GSA satu kampus, lalu dua-duanya klaim?",
        jawab: [
          "**Tidak boleh.** 1 event hanya bisa diklaim 1 GSA. Kerja sama BOLEH, dengan sistem barter: dia bantu event kamu (jadi moderator, tim sukses), lalu kamu bantu event dia — tapi bukan di acara yang sama. Saingan terdekatmu memang sesama GSA di kampusmu sendiri.",
        ],
      },
      {
        kode: "K-02",
        tanya: "Kalau cuma jadi MC atau moderator, bukan pemateri, apakah dihitung sebagai event-ku?",
        jawab: [
          "**Tidak terhitung.** Kamu harus berani jadi narasumber dan pemateri utama di event yang kamu buat sendiri.",
        ],
      },
      {
        kode: "K-03",
        tanya: "Kalau collab, proposalnya semua ikut kirim atau cuma satu?",
        jawab: [
          "Satu proposal saja, atas nama GSA yang mengklaim event itu. Di dalam proposal kamu boleh jelaskan akan collab dengan siapa saja.",
        ],
      },
      {
        kode: "K-04",
        tanya: "Di kampusku hanya aku satu-satunya GSA, bagaimana bikin event?",
        jawab: [
          "Justru lebih tenang — tidak ada persaingan internal kampus, persainganmu langsung di level nasional. Harus nekat dan berani memulai, kamu jadi pionir di kampusmu. Minta bantuan teman dekat, dosen, akademik/kemahasiswaan, atau UKM untuk ikut mendukung.",
        ],
      },
    ],
  },
  {
    id: "audiens",
    judul: "Audiens & Lokasi Event",
    isi: [
      {
        kode: "A-01",
        tanya: "Audiensnya wajib mahasiswa aktif? Boleh umum atau siswa SMA?",
        jawab: [
          "Wajib mahasiswa aktif, dan diutamakan mahasiswa di kampusmu sendiri — kamu Ambassador yang mewakili kampusmu. Event dengan peserta siswa SMA atau umum: tidak boleh. Untuk Trailblazer, target minimal tetap harus diisi mahasiswa aktif; sisanya baru boleh umum.",
        ],
      },
      {
        kode: "A-02",
        tanya: "Boleh bikin event di kampus lain atau mewakili organisasi lain?",
        jawab: [
          "Tidak untuk diklaim sebagai eventmu. Target seharusnya ada di kampusmu — kamu mewakili kampusmu, bukan kampus atau organisasi lain.",
        ],
      },
      {
        kode: "A-03",
        tanya: "Boleh collab dengan UKM / ormawa / organisasi luar?",
        jawab: [
          "Boleh, selama event diadakan di kampusmu, organisasi itu posisinya sebagai pendukung, dan audiensnya mahasiswa kampusmu. Kalau kamu punya koneksi di organisasi internal/eksternal, bagus — kamu bergabung di situ sebagai pemateri utama dan event tercatat dibantu organisasi tersebut.",
        ],
      },
      {
        kode: "A-04",
        tanya: "Audiens 2 event boleh orang yang sama? Tempatnya juga sama?",
        jawab: [
          "Boleh beberapa orang sama, syaratnya materi harus berbeda. Kalau materi sama, audiensnya harus berbeda. Tempat sama + audiens sama + materi beda masih boleh, tapi hindari di waktu yang bersamaan — gampang terbaca sebagai satu acara dan berisiko tidak valid. Judul, konsep, dan isi materi tiap event harus jelas terlihat berbeda saat didokumentasikan.",
        ],
      },
      {
        kode: "A-05",
        tanya: "Event online / webinar / live YouTube boleh?",
        jawab: ["**Tidak.** Event wajib offline tatap muka."],
        status: "belum-pasti",
        catatan: "Pengecualian untuk yang kampusnya memang online/virtual: masih ditanyakan alumni ke tim GSA.",
      },
    ],
  },
  {
    id: "proposal",
    judul: "Proposal, Materi & Dokumentasi",
    isi: [
      {
        kode: "P-01",
        tanya: "Proposalnya pakai template sendiri atau dari Google?",
        jawab: [
          "Ada template resmi yang disediakan, aktif mulai 7 Okt 2026 pukul 18.00 WIB bersama link form pengumpulannya. Konsep event bebas (formal, semi formal, informal) dan boleh sekreatif mungkin, tapi harus tergambar jelas di proposal.",
        ],
      },
      {
        kode: "P-02",
        tanya: "Boleh jalankan event dulu, proposal menyusul? Atau sisipkan materi di acara organisasi yang sedang berjalan?",
        jawab: [
          "**Hindari.** Kemungkinan besar tidak di-ACC dan tidak valid. Kalau proposal ditolak/direvisi setelah event jalan, kamu tidak bisa mengklaim event itu dan harus bikin ulang — kerja dua kali.",
        ],
      },
      {
        kode: "P-03",
        tanya: "Materinya tentang apa? Dikoreksi pihak Google dulu?",
        jawab: [
          "Tidak dikoreksi. Garis besarnya tidak jauh dari Gemini, Google AI (AI Mode), dan Ekosistem Google. Gambaran materi dijelaskan di sesi onboarding; secara spesifik apa yang mau kamu highlight dijelaskan di bagian khusus di proposal.",
        ],
      },
      {
        kode: "P-04",
        tanya: "Dokumentasi event bentuknya apa? Foto saja atau ada video?",
        jawab: [
          "Foto yang jelas (tidak blur) + video minimal beberapa menit saat penyampaian materi, supaya tim bisa memvalidasi materimu. Ketentuan lengkap durasi dan formatnya akan ada di brief.",
        ],
        status: "belum-pasti",
        catatan: "Durasi persis video belum pasti.",
      },
      {
        kode: "P-05",
        tanya: "Pelaporan keuangan digabung dengan proposal / laporan event?",
        jawab: [
          "Terpisah. Ada beberapa form pelaporan yang berbeda — pelaporan keuangan event berbeda dari pelaporan proposal dan pelaporan hasil event.",
        ],
      },
      {
        kode: "P-06",
        tanya: "Cara mengundang audiens: bikin pamflet sendiri?",
        jawab: [
          "Ya, buat flyer/pamflet sendiri lalu sebar di grup kampus, ormawa, dan media sosial. Ini bagian dari tanggung jawabmu sebagai penyelenggara.",
        ],
        status: "alumni",
      },
      {
        kode: "P-07",
        tanya: "Ada durasi minimal per sesi event?",
        jawab: ["Belum ada ketentuan yang dibagikan. Tunggu sesi Orientation (6 Okt) dan Briefing (7 Okt)."],
        status: "belum-pasti",
      },
    ],
  },
  {
    id: "biaya",
    judul: "Biaya & Reimbursement",
    isi: [
      {
        kode: "B-01",
        tanya: "Biaya event ditalangi dulu atau dibiayai Google?",
        jawab: [
          "Ditalangi dulu. Sistem di 2 tier pertama adalah reimbursement, dan ada batas maksimal pengeluaran per event di setiap tier.",
        ],
      },
      {
        kode: "B-02",
        tanya: "Kalau proposal sudah ACC dan event valid, pasti direimburse?",
        jawab: [
          "**Tidak.** Reimbursement hanya untuk yang dinyatakan Top 500 Rising Star atau Top 50 Achiever. Kalau sudah banyak pengeluaran tapi tidak masuk top, itu risiko pribadi — tidak ada reimbursement.",
        ],
      },
      {
        kode: "B-03",
        tanya: "Boleh tambah souvenir/hadiah pakai dana pribadi untuk menarik peserta?",
        jawab: [
          "Boleh, itu salah satu strategi. Tapi kalau kamu berharap direimburse nanti, jangan boros. Minimalkan pengeluaran dan selalu hitung kemungkinan terburuk tidak direimburse.",
        ],
      },
      {
        kode: "B-04",
        tanya: "Proses reimbursement lama?",
        jawab: ["Cukup lama. Atur strategi matang supaya tidak merugikan diri sendiri."],
      },
    ],
  },
  {
    id: "lain",
    judul: "Lain-lain",
    isi: [
      {
        kode: "L-01",
        tanya: "Wajib lapor ke kampus kalau kita jadi GSA?",
        jawab: [
          "Dari tim GSA tidak diwajibkan — yang wajib hanya proposal ke tim GSA. Tapi disarankan lapor ke akademik/kemahasiswaan/kaprodi supaya lebih mudah minta dukungan tempat, peserta, dan perizinan event.",
        ],
        status: "alumni",
      },
      {
        kode: "L-02",
        tanya: "Kalau proposal sudah ACC dari GSA tapi izin kampus lama?",
        jawab: [
          "Itu tanggung jawab pribadi kamu sebagai mahasiswa di kampusmu. Tim GSA hanya mewajibkan proposal ke mereka; surat-menyurat internal diurus sendiri.",
        ],
      },
      {
        kode: "L-03",
        tanya: "Kapan inaugurasi / kunjungan kantor Google di Jakarta, dan akomodasi luar Jabodetabek?",
        jawab: [
          "Belum ada info. Jangan fokus ke situ dulu — masih jauh, fokus ke hal yang di depan mata (twibbon, orientation, briefing, proposal pertama).",
        ],
        status: "belum-pasti",
      },
      {
        kode: "L-04",
        tanya: "Bagaimana kalau teman kampus belum paham apa itu GSA / tidak tertarik?",
        jawab: [
          "Itu justru misi kamu sebagai GSA: menjelaskan ke teman-teman kampusmu dan menyelesaikan masalah di sekitarmu dengan ekosistem Google. Rajin posting tentang GSA, tag kampus/fakultas, dan dekati akademik serta humas kampus.",
        ],
      },
    ],
  },
];

export const ATURAN_GRUP: string[] = [
  "**Urutan JJ** (joint join/collab IG): JJ dibuat & diedit DULU → baru list 5 akun yang mau collab. Jangan dibalik — kalau list dulu, grup jadi rebutan dan spam.",
  "Maksimal **5 akun per JJ**, 1 orang hanya boleh masuk 1 JJ (jangan double).",
  "Baca dulu chat/pin di atas sebelum bertanya — banyak pertanyaan sudah dijawab berulang kali.",
  "Jangan menyebarkan rangkuman/notulensi yang belum resmi.",
  "Sesi mentoring resmi minggu depan; pertanyaan detail lebih baik dikumpulkan untuk sesi itu.",
];

export const SUMBER =
  "Disusun dari transkrip grup WhatsApp OFFICIAL GSA 2026 BATCH 2 (3 Oktober 2026), sesi tanya jawab bersama Julius (alumni GSA 26) dan teman-teman alumni. Jawaban bertanda “alumni” atau “belum pasti” perlu dikonfirmasi ulang pada sesi Orientation 6 Oktober dan Technical Briefing 7 Oktober 2026.";
