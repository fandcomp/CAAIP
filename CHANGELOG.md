# Changelog - CMS Profil & Homepage Loading Fix

## 🎉 Fitur Baru: CMS untuk Halaman Profil

### ✅ Yang Sudah Dikerjakan:

1. **Menambahkan Collection `profil` ke CMS** (`public/admin/config.yml`)
   - Menggunakan pendekatan `files` untuk konten bilingual
   - Dua file: `profil_id` (Indonesia) dan `profil_en` (English)
   - Field yang tersedia:
     - **Sejarah** (History): Judul & Konten (Markdown)
     - **Visi** (Vision): Judul & Konten (Markdown)
     - **Misi** (Mission): Judul & Konten (Markdown)
     - **Struktur Organisasi** (Organizational Structure): Judul, Gambar (opsional), Konten (Markdown)

2. **Membuat Schema Validasi** (`src/content/config.ts`)
   - Menambahkan schema Zod untuk collection profil
   - Validasi tipe data untuk semua field
   - Mendukung konten markdown dan upload gambar

3. **Membuat Default Content Files**
   - `src/content/profil/profil-id.json` - Konten default bahasa Indonesia
   - `src/content/profil/profil-en.json` - Konten default bahasa Inggris
   - Konten placeholder yang siap diedit melalui CMS

4. **Update Halaman Profil**
   - **Indonesian**: `src/pages/profil/index.astro` - Membaca dari `profil-id.json`
   - **English**: `src/pages/en/profil/index.astro` - Membaca dari `profil-en.json`
   - Menggunakan `marked` library untuk render markdown ke HTML
   - Support untuk gambar struktur organisasi

5. **Install Dependencies**
   - `marked@^14.1.4` - Library untuk parsing markdown

---

## 🐛 Fix: Masalah Loading di Beranda

### Masalah:
Browser menampilkan loading spinner yang terus berputar walaupun konten web sudah ditampilkan.

### Penyebab:
**Netlify Identity Widget** dimuat secara synchronous pada semua halaman, yang membuat browser menunggu script eksternal selesai dimuat sebelum menandai halaman sebagai "loaded".

### Solusi yang Diterapkan:
1. **Mengubah script loading dari `sync` ke `async`**
   ```html
   <!-- Sebelum -->
   <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   
   <!-- Sesudah -->
   <script async src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
   ```

2. **Memindahkan redirect logic ke `window.load` event**
   - Script redirect token sekarang hanya berjalan setelah halaman selesai dimuat
   - Tidak menghalangi rendering konten utama

### File yang Dimodifikasi:
- `src/layouts/BaseLayout.astro` - Optimasi loading Netlify Identity widget

---

## 📝 Cara Menggunakan CMS untuk Edit Profil

1. **Akses CMS Admin**: https://caaip.netlify.app/admin
2. Login dengan akun Netlify Identity
3. Pilih **"Profil"** dari menu Collections
4. Edit konten untuk:
   - **Profil (Indonesia)** - Konten bahasa Indonesia
   - **Profil (English)** - Konten bahasa Inggris
5. Klik **"Save"** untuk menyimpan perubahan
6. Klik **"Publish"** untuk commit ke repository
7. Netlify akan otomatis deploy perubahan

### Format Konten:
- Semua konten mendukung **Markdown**
- Contoh format:
  ```markdown
  **Bold text** untuk teks tebal
  
  ## Heading
  
  - List item 1
  - List item 2
  
  1. Numbered list
  2. Item kedua
  ```

### Upload Gambar Struktur:
- Gunakan field "Struktur Image" untuk upload diagram organisasi
- Gambar akan disimpan di `/public/images/uploads/`
- Format yang didukung: JPG, PNG, GIF, WebP

---

## 🚀 Testing & Deployment

### Build Status:
✅ Build berhasil dengan 14 halaman
✅ Tidak ada error
✅ Commit pushed ke GitHub
✅ Auto-deploy ke Netlify triggered

### Perlu Dites:
1. ✅ Halaman profil menampilkan konten dari CMS
2. ✅ Bilingual support (Indonesia & English)
3. ⏳ Loading spinner sudah tidak muncul di beranda (perlu verifikasi di browser)
4. ⏳ CMS admin bisa edit konten profil
5. ⏳ Upload gambar struktur organisasi

---

## 📋 Checklist Lengkap

### Fitur CMS Profil
- [x] Tambah collection profil ke CMS config
- [x] Buat schema validasi di content config
- [x] Buat default content files (ID & EN)
- [x] Update halaman profil Indonesia
- [x] Update halaman profil English
- [x] Install marked library
- [x] Test build berhasil
- [x] Commit & push ke GitHub

### Fix Loading Issue
- [x] Identifikasi penyebab (Netlify Identity widget)
- [x] Ubah script loading ke async
- [x] Pindahkan redirect logic ke window.load
- [x] Test build berhasil
- [x] Deploy ke production

---

## 🎯 Next Steps (Optional)

1. **Test di browser** untuk memastikan loading spinner sudah tidak muncul
2. **Login ke CMS** dan coba edit konten profil
3. **Upload gambar** struktur organisasi
4. **Tambahkan kabar duka** jika ada konten yang ingin ditambahkan
5. **Tambahkan data alumni** untuk tahun-tahun yang belum ada

---

## 💡 Notes

- **Empty Collection Warnings**: Warning tentang collection `alumni` dan `kabarDuka` yang kosong adalah normal karena belum ada data. Ini tidak memengaruhi build atau website.
- **Line Ending Warnings**: Warning tentang LF/CRLF adalah normal di Windows dan tidak memengaruhi fungsionalitas.
- **Credential Manager Warning**: Warning ini tidak berbahaya dan tidak perlu dikhawatirkan.

---

Semua fitur sudah diimplementasikan dan di-deploy! 🎉
