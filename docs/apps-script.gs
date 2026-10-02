/**
 * Google Apps Script: menulis pendaftaran & catatan follow ke spreadsheet.
 *
 * Cara pasang:
 * 1. Buka spreadsheet → Extensions → Apps Script, hapus isi lama, tempel kode ini.
 * 2. Ganti TOKEN dengan kata sandi acak (samakan dengan APPS_SCRIPT_TOKEN di .env.local).
 * 3. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 * 4. Salin URL /exec ke APPS_SCRIPT_URL di .env.local.
 * Setiap mengubah kode ini, deploy ulang lewat "Manage deployments" → New version.
 *
 * Tab "Sheet1" : Nama | Univ | Instagram
 * Tab "Follow" : Follower | Target | Waktu   (dibuat otomatis)
 */
var TOKEN = "GANTI_DENGAN_TOKEN_RAHASIA";
var TAB_ANGGOTA = "Sheet1";
var TAB_FOLLOW = "Follow";
var REGEX_USERNAME = /^[a-z0-9._]{1,30}$/;

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.token !== TOKEN) return json_({ ok: false, error: "token salah" });

    lock.waitLock(10000);
    if (data.aksi === "daftar") return daftar_(data);
    if (data.aksi === "follow") return follow_(data);
    return json_({ ok: false, error: "aksi tidak dikenal" });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Daftar baru, atau perbarui nama & univ kalau username sudah ada.
 * Nama univ dicocokkan (tanpa beda huruf besar/kecil & spasi ganda) dengan univ
 * yang sudah tercatat, supaya ejaan seragam dan filter univ tidak terpecah.
 */
function daftar_(d) {
  var ig = String(d.instagram || "").toLowerCase();
  var nama = rapi_(d.nama);
  var univ = rapi_(d.univ);
  if (!REGEX_USERNAME.test(ig)) return json_({ ok: false, error: "username tidak valid" });
  if (!nama || !univ) return json_({ ok: false, error: "nama, univ, dan instagram wajib diisi" });

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB_ANGGOTA);
  var baris = sheet.getDataRange().getValues();
  var posisi = -1;
  var univAda = null;

  for (var i = 1; i < baris.length; i++) {
    var u = rapi_(baris[i][1]);
    if (!univAda && u && u.toLowerCase() === univ.toLowerCase()) univAda = u;
    var akun = String(baris[i][2]).toLowerCase().replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/^@/, "").split(/[\/?#]/)[0];
    if (posisi === -1 && akun === ig) posisi = i + 1;
  }
  if (univAda) univ = univAda;

  if (posisi === -1) {
    sheet.appendRow([aman_(nama), aman_(univ), ig]);
    return json_({ ok: true, nama: nama, univ: univ, diperbarui: false });
  }
  sheet.getRange(posisi, 1, 1, 2).setValues([[aman_(nama), aman_(univ)]]);
  return json_({ ok: true, nama: nama, univ: univ, diperbarui: true });
}

function rapi_(teks) {
  return String(teks || "").replace(/\s+/g, " ").trim();
}

function follow_(d) {
  var follower = String(d.follower || "").toLowerCase();
  var target = String(d.target || "").toLowerCase();
  if (!REGEX_USERNAME.test(follower) || !REGEX_USERNAME.test(target) || follower === target) {
    return json_({ ok: false, error: "data tidak valid" });
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(TAB_FOLLOW);
  if (!sheet) {
    sheet = ss.insertSheet(TAB_FOLLOW);
    sheet.appendRow(["Follower", "Target", "Waktu"]);
  }

  var baris = sheet.getDataRange().getValues();
  var posisi = -1;
  for (var i = 1; i < baris.length; i++) {
    if (String(baris[i][0]).toLowerCase() === follower && String(baris[i][1]).toLowerCase() === target) {
      posisi = i + 1;
      break;
    }
  }

  if (d.followed && posisi === -1) sheet.appendRow([follower, target, new Date()]);
  if (!d.followed && posisi !== -1) sheet.deleteRow(posisi);
  return json_({ ok: true });
}

/** Cegah formula injection: teks yang diawali = + - @ dijadikan teks biasa. */
function aman_(teks) {
  teks = String(teks || "").trim();
  return /^[=+\-@]/.test(teks) ? "'" + teks : teks;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
