# 📤 Panduan Upload Website ke Hostinger via FTP

## 🎯 Ringkasan

Panduan ini menjelaskan cara upload/update website CAAIP ke Hostinger menggunakan FTP.

---

## 🔧 Persiapan (Sekali Saja)

### 1. Info FTP dari Hostinger

Login **hPanel Hostinger** → Pilih domain **caaip.id** → **Files** → **FTP Accounts**

**Info yang diperlukan:**
- **FTP IP (hostname):** `145.79.14.179`
- **FTP username:** `u239743347.caaip.id`
- **FTP port:** `21`
- **Folder upload:** `public_html`
- **Password:** (password FTP Anda)

---

## 🚀 Cara Upload Manual via Script PowerShell

### Metode 1: Upload Otomatis (Recommended)

**Langkah:**

1. **Build project** (jika ada perubahan kode):
   ```powershell
   npm run build
   ```

2. **Jalankan script upload**:
   ```powershell
   .\upload-ftp.ps1
   ```

3. **Tunggu proses upload selesai** (~1-2 menit untuk 79 file)

4. **Verifikasi website**:
   - Buka https://caaip.id
   - Tekan **Ctrl + F5** (hard refresh)

**Output yang diharapkan:**
```
========================================
  Upload CAAIP ke Hostinger via FTP
========================================

[OK] Folder dist ditemukan
Menghitung file...
   Total file: 79

Mulai upload ke:
   Server: 145.79.14.179
   User: u239743347.caaip.id
   Remote: /public_html

>> Uploading: /index.html
>> Uploading: /404.html
...

========================================
  Upload Selesai!
========================================
[OK] Berhasil: 79 file

Cek website: https://caaip.id
```

---

### Metode 2: Test Koneksi FTP (Troubleshooting)

Jika upload gagal, test koneksi dulu:

```powershell
.\test-ftp.ps1
```

**Output sukses:**
```
Testing FTP Connection...
Server: 145.79.14.179
Username: u239743347.caaip.id

Connecting...
[SUCCESS] Koneksi berhasil!
```

**Jika gagal:**
- Cek username dan password di hPanel
- Pastikan koneksi internet stabil
- Coba reset password FTP di hPanel

---

## 📝 Edit Credentials FTP (Jika Berubah)

Jika username/password berubah, edit file **`upload-ftp.ps1`** baris 4-6:

```powershell
$FTP_SERVER = "145.79.14.179"
$FTP_USERNAME = "u239743347.caaip.id"
$FTP_PASSWORD = "password_anda_disini"  # Ganti dengan password baru
```

**Catatan:** 
- Jika password ada karakter `$`, escape dengan backtick: `Caaip1`$`$`
- Simpan file, lalu jalankan lagi `.\upload-ftp.ps1`

---

## 🔄 Workflow Update Website

### Untuk Perubahan Kode:

```powershell
# 1. Edit kode di VS Code
# 2. Build project
npm run build

# 3. Upload ke Hostinger
.\upload-ftp.ps1

# 4. Cek website
# Buka https://caaip.id (Ctrl+F5)
```

### Untuk Perubahan Konten via CMS:

```powershell
# 1. Edit konten di CMS Admin (https://caaip.id/admin)
# 2. Publish
# 3. Build ulang lokal
npm run build

# 4. Upload
.\upload-ftp.ps1
```

---

## ⚙️ Setup Auto-Deploy via GitHub Actions (Opsional)

Agar setiap `git push` otomatis deploy ke Hostinger:

### 1. Tambah FTP Secrets di GitHub

**URL:** https://github.com/fandcomp/CAAIP/settings/secrets/actions

**Klik "New repository secret"**, tambahkan 3 secrets:

| Name | Secret Value |
|------|--------------|
| `FTP_SERVER` | `145.79.14.179` |
| `FTP_USERNAME` | `u239743347.caaip.id` |
| `FTP_PASSWORD` | (password FTP Anda) |

### 2. Workflow Sudah Siap

File `.github/workflows/deploy-hostinger.yml` sudah dikonfigurasi.

### 3. Cara Pakai

```powershell
# Edit kode
git add .
git commit -m "Update website"
git push origin main
```

**GitHub Actions akan otomatis:**
1. Build project (`npm run build`)
2. Upload ke Hostinger via FTP
3. Website update dalam ~2-3 menit

**Cek status deploy:**
- https://github.com/fandcomp/CAAIP/actions
- Hijau ✅ = sukses
- Merah ❌ = error (klik untuk lihat log)

---

## 🆘 Troubleshooting

### ❌ Error: "530 Not logged in"

**Penyebab:** Username atau password salah

**Solusi:**
1. Login hPanel → FTP Accounts
2. Cek username (harus: `u239743347.caaip.id`)
3. Reset password FTP
4. Update file `upload-ftp.ps1` dengan password baru
5. Test: `.\test-ftp.ps1`

---

### ❌ Error: "550 File unavailable"

**Penyebab:** Folder tujuan tidak ada atau permission salah

**Solusi:**
1. Login hPanel → File Manager
2. Pastikan folder `public_html` ada
3. Cek permission folder: 755

---

### ❌ Upload lambat/timeout

**Penyebab:** Koneksi internet lambat atau banyak file

**Solusi:**
1. Pastikan koneksi internet stabil
2. Upload saat jaringan tidak sibuk
3. Jika tetap gagal, upload manual via File Manager hPanel

---

### ❌ Website tidak berubah setelah upload

**Penyebab:** Browser cache

**Solusi:**
1. Hard refresh: **Ctrl + Shift + R** (Chrome/Edge)
2. Atau: **Ctrl + F5**
3. Atau: Clear browser cache
4. Atau: Buka di browser lain / incognito mode

---

## 📊 Monitoring Upload

### Cek File di Hostinger

1. Login hPanel → File Manager
2. Masuk folder `public_html`
3. Pastikan file ada:
   - `index.html`
   - `404.html`
   - Folder `_astro/`, `berita/`, `alumni/`, dll

### Struktur yang Benar

```
public_html/
├── index.html           ← Homepage
├── 404.html
├── favicon.svg
├── _astro/              ← Assets (CSS, fonts)
├── admin/               ← CMS admin
│   ├── index.html
│   └── config.yml
├── berita/              ← Artikel
├── alumni/              ← Data alumni
├── kabar-duka/          ← Kabar duka
├── profil/              ← Profil organisasi
└── uploads/             ← Upload dari CMS
```

**Jika struktur salah** (misal ada folder `dist/` atau `public/`):
- Hapus semua file di `public_html`
- Upload ulang dengan `.\upload-ftp.ps1`

---

## 🔐 Keamanan

### Jangan Commit Password!

File `upload-ftp.ps1` dan `test-ftp.ps1` berisi password FTP.

**Pastikan tidak di-commit ke GitHub:**

1. Cek file `.gitignore` sudah include:
   ```
   upload-ftp.ps1
   test-ftp.ps1
   ```

2. Atau hapus password sebelum commit:
   ```powershell
   $FTP_PASSWORD = "GANTI_DENGAN_PASSWORD_ANDA"
   ```

---

## 📞 Bantuan

**Jika ada masalah:**
1. Jalankan `.\test-ftp.ps1` untuk diagnosa
2. Cek log error yang muncul
3. Ikuti solusi di bagian Troubleshooting

**Dokumentasi Hostinger:**
- https://support.hostinger.com/en/articles/1583235-how-to-upload-files-using-ftp

---

**Terakhir diupdate:** 17 November 2025  
**Versi:** 1.0  
**Status:** Production Ready ✅
