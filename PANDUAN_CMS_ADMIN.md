# 📚 Panduan Penggunaan CMS Admin CAAIP

## 🎯 Akses CMS

**URL CMS:** `https://caaip.co.id/admin`

**Login:**
- Email: (email yang sudah di-invite di Netlify Identity)
- Password: (password yang sudah Anda set)

**Catatan:** Saat ini CMS masih perlu diakses melalui Netlify URL (`https://[nama-site].netlify.app/admin`) sampai setup Netlify Identity selesai. Setelah konfigurasi selesai, CMS dapat diakses langsung via `caaip.co.id/admin`.

---

## 📋 Menu Utama CMS

Setelah login, Anda akan melihat menu utama:

1. **Berita** - Kelola artikel dan berita CAAIP
2. **Kabar Duka** - Pengumuman duka cita
3. **Alumni (Per Angkatan)** - Data alumni per tahun
4. **Pengurus CAAIP** - Struktur kepengurusan
5. **Profil CAAIP** - Sejarah, Visi, Misi, dan Struktur Organisasi

---

## 📰 1. MENGELOLA BERITA

### Membuat Berita Baru

1. **Klik menu "Berita"** di sidebar
2. **Klik tombol "New Berita"**
3. **Isi form:**

   **Judul** (Required)
   - Ketik judul berita yang menarik
   - Contoh: "Peluncuran Website Resmi CAAIP 2025"

   **Tanggal** (Required)
   - Klik kalender, pilih tanggal publikasi
   - Format otomatis: YYYY-MM-DD HH:mm

   **Penulis** (Optional)
   - Nama penulis artikel
   - Default: "Admin CAAIP"

   **Ringkasan** (Optional)
   - Ringkasan singkat maksimal 160 karakter
   - Untuk preview di homepage dan SEO
   - Contoh: "CAAIP meluncurkan website resmi dengan fitur modern dan user-friendly"

   **Cover Image** (Optional)
   - Klik "Choose an image"
   - Upload gambar utama berita
   - Rekomendasi: 1200x630 pixels (landscape)
   - Format: JPG atau PNG
   - Maksimal: 2MB

   **Tags** (Optional)
   - Klik "Add tags"
   - Ketik kata kunci, tekan Enter
   - Maksimal 5 tags
   - Contoh: "Peluncuran", "Website", "Digital"

   **Bahasa** (Required)
   - Pilih: "id" (Indonesia) atau "en" (English)
   - Default: id

   **Status** (Draft)
   - ☐ Unchecked = Publish (langsung tampil di website)
   - ☑ Checked = Draft (disimpan tapi tidak tampil)

   **Konten** (Required)
   - Editor Markdown
   - Tulis isi berita lengkap
   - Format teks dengan toolbar:
     - **Bold**: `**teks**`
     - *Italic*: `*teks*`
     - Heading: `# H1`, `## H2`, `### H3`
     - List: `- item` atau `1. item`
     - Link: `[teks](url)`
     - Image: `![alt](url)`

4. **Preview** (opsional)
   - Klik tab "Preview" untuk lihat hasil
   - Switch ke "Edit" untuk lanjut edit

5. **Publish/Save**
   - **Save**: Klik "Save" (simpan sebagai draft jika dicentang)
   - **Publish**: Klik "Publish" (langsung publish ke website)
   - Tunggu ~2-3 menit untuk auto-deploy

### Edit Berita yang Sudah Ada

1. Klik menu **"Berita"**
2. Klik berita yang ingin diedit
3. Edit field yang diperlukan
4. Klik **"Save"** atau **"Publish"**

### Hapus Berita

1. Buka berita yang ingin dihapus
2. Klik tombol **"Delete entry"** (biasanya di pojok kanan atas)
3. Konfirmasi penghapusan
4. Berita akan hilang dari website setelah auto-deploy

### Filter & Cari Berita

**Filter berdasarkan status:**
- Klik dropdown "Filter"
- Pilih "Draft" (lihat draft saja)
- Pilih "Published" (lihat yang sudah publish)

**Cari berita:**
- Ketik di search box
- CMS akan mencari di judul, konten, dan tags

**Sort/Urutkan:**
- Klik header kolom: "Date", "Title", atau "Author"
- Klik lagi untuk balik urutan

---

## 🕊️ 2. MENGELOLA KABAR DUKA

### Buat Pengumuman Duka Baru

1. **Klik menu "Kabar Duka"**
2. **Klik "New Kabar Duka"**
3. **Isi form:**

   **Nama Almarhum/Almarhumah** (Required)
   - Nama lengkap yang berpulang
   - Contoh: "Bapak Ahmad Suryanto"

   **Tanggal** (Required)
   - Tanggal wafat atau pengumuman
   - Pilih dari kalender

   **Foto/Gambar Ucapan** (Optional)
   - Upload foto almarhum/almarhumah atau
   - Gambar ucapan duka cita
   - Rekomendasi: 800x600 pixels
   - Format: JPG/PNG

   **Alt Text Gambar** (Optional)
   - Deskripsi gambar untuk accessibility
   - Contoh: "Foto almarhum Bpk. Ahmad Suryanto"

   **Hubungan/Keterangan** (Optional)
   - Hubungan dengan CAAIP
   - Contoh: "Alumni Angkatan 1991"
   - Contoh: "Pengurus CAAIP periode 2020-2025"

   **Pesan Duka** (Optional)
   - Ucapan belasungkawa singkat
   - Contoh: "Selamat jalan, semoga husnul khatimah"

   **Konten Tambahan** (Optional)
   - Riwayat hidup, pesan keluarga (Markdown)
   - Opsional untuk informasi lebih detail

   **Bahasa** (Required)
   - Pilih "id" atau "en"

   **Status** (Draft)
   - Centang untuk simpan sebagai draft

4. **Publish**
   - Klik "Publish" untuk tampilkan di website

### Edit/Hapus Kabar Duka

- Sama seperti mengelola berita
- Klik entry → Edit → Save/Publish
- Delete via tombol "Delete entry"

---

## 👥 3. MENGELOLA DATA ALUMNI

### Upload Data Alumni Per Angkatan

1. **Klik menu "Alumni (Per Angkatan)"**
2. **Klik "New Alumni (Per Angkatan)"**
3. **Isi form:**

   **Tahun Angkatan** (Required)
   - Ketik tahun angkatan
   - Contoh: "1991", "2005", "2025"
   - Angka saja, 4 digit

   **Data Alumni** (CSV)
   - Opsi 1: Upload file CSV
     - Format: `No;Nama;Jurusan`
     - Contoh:
       ```
       1;Ahmad Budiman;Nautika
       2;Siti Rahayu;Teknika
       3;Budi Santoso;KALK
       ```
     - Save sebagai .csv (Excel: Save As → CSV UTF-8)
     - Upload file

   - Opsi 2: Input manual
     - Klik "Tambah Alumni"
     - Isi No, Nama, Jurusan
     - Klik "Add" untuk tambah lagi
     - Ulangi untuk setiap alumni

4. **Publish**
   - Klik "Publish"
   - Data muncul di halaman Alumni

### Edit Data Alumni

1. Klik tahun angkatan yang ingin diedit
2. Edit data (upload CSV baru atau edit manual)
3. Save/Publish

**Tips:**
- Untuk update massal, lebih cepat pakai upload CSV
- Untuk tambah 1-2 alumni, pakai input manual

---

## 👔 4. MENGELOLA PENGURUS CAAIP

### Tambah Pengurus Baru

1. **Klik menu "Pengurus CAAIP"**
2. **Klik "New Pengurus"**
3. **Isi form:**

   **Nama Lengkap** (Required)
   - Nama lengkap pengurus
   - Contoh: "Dr. Ahmad Budiman, S.T., M.M."

   **Jabatan** (Required)
   - Jabatan dalam kepengurusan
   - Contoh: "Ketua Umum", "Wakil Ketua", "Sekretaris"

   **Foto Profil** (Required)
   - Upload foto formal
   - Rekomendasi: 400x400 pixels (persegi)
   - Background polos atau profesional
   - Format: JPG/PNG
   - Maksimal: 1MB

   **Urutan Tampilan** (Required)
   - Angka untuk urutan tampilan
   - 1 = paling atas (Ketua Umum)
   - 2 = kedua (Wakil Ketua)
   - dst.
   - Angka lebih kecil = lebih prioritas

4. **Publish**

### Edit Pengurus

- Klik nama pengurus yang ingin diedit
- Edit field
- Save/Publish

### Hapus Pengurus

- Buka entry pengurus
- Klik "Delete entry"

**Tips Urutan:**
```
1 = Ketua Umum
2 = Wakil Ketua I
3 = Wakil Ketua II
4 = Sekretaris
5 = Wakil Sekretaris
6 = Bendahara
7 = Wakil Bendahara
... dst
```

---

## 🏢 5. MENGELOLA PROFIL CAAIP

### Edit Profil (Indonesia)

1. **Klik menu "Profil CAAIP"**
2. **Klik "Halaman Profil (Indonesia)"**
3. **Edit sections:**

   **Sejarah**
   - Judul: "Sejarah" (bisa diubah)
   - Konten: Tulis sejarah CAAIP (Markdown)

   **Visi**
   - Judul: "Visi"
   - Konten: Tulis visi organisasi

   **Misi**
   - Judul: "Misi"
   - Konten: Tulis misi organisasi (gunakan list)
   - Contoh:
     ```markdown
     1. Misi pertama
     2. Misi kedua
     3. Misi ketiga
     ```

   **Struktur Organisasi**
   - Judul: "Struktur Organisasi"
   - Gambar: Upload bagan struktur (optional)
     - Rekomendasi: 1200x800 pixels (landscape)
   - Konten: Penjelasan tambahan (optional)

4. **Save**
   - Klik "Save" atau "Publish now"

### Edit Profil (English)

- Sama seperti versi Indonesia
- Klik "Halaman Profil (English)"
- Isi dalam bahasa Inggris
- Save/Publish

---

## ⚙️ FITUR-FITUR CMS

### Preview

- Setiap entry punya tombol "Preview"
- Klik untuk lihat tampilan sebelum publish
- Switch ke tab "Edit" untuk lanjut edit

### Draft Mode

- Centang checkbox "Status" untuk simpan sebagai draft
- Draft tidak akan tampil di website
- Berguna untuk:
  - Menyiapkan konten untuk nanti
  - Review sebelum publish
  - Simpan progress edit

### Media Library

- Klik icon "Media" di toolbar editor
- Lihat semua gambar yang sudah diupload
- Upload gambar baru
- Pilih gambar existing untuk digunakan

### Markdown Editor

**Format teks:**
```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2

1. Numbered list
2. Second item

[Link text](https://url.com)

![Image alt](image-url.jpg)
```

**Toolbar shortcuts:**
- Bold: Ctrl + B
- Italic: Ctrl + I
- Link: Ctrl + K

---

## 🔄 WORKFLOW PUBLIKASI

### Workflow Normal (Simple Mode)

```
1. Create entry → Fill form → Publish
   ↓
2. CMS commits to GitHub
   ↓
3. GitHub Actions triggered
   ↓
4. Build & Deploy to Hostinger (~2-3 menit)
   ↓
5. Website updated! ✅
```

### Workflow dengan Draft

```
1. Create entry → Fill form → Check "Draft" → Save
   ↓
2. Entry tersimpan sebagai draft (tidak tampil di website)
   ↓
3. Review & edit berkali-kali jika perlu
   ↓
4. Siap publish? Uncheck "Draft" → Publish
   ↓
5. Auto-deploy → Website updated
```

---

## 📊 TIPS & BEST PRACTICES

### Gambar/Media

✅ **DO:**
- Compress gambar sebelum upload (TinyPNG, Squoosh)
- Gunakan format JPG untuk foto, PNG untuk grafis
- Ukuran maksimal 500KB per gambar
- Gunakan nama file deskriptif: `berita-peluncuran-website.jpg`
- Isi alt text untuk accessibility

❌ **DON'T:**
- Upload gambar 5MB+ (loading lambat)
- Gunakan nama file: `IMG_1234.jpg`
- Skip alt text

### Konten

✅ **DO:**
- Tulis ringkasan yang menarik (160 karakter)
- Gunakan heading (H2, H3) untuk struktur
- Tambahkan tags yang relevan
- Preview sebelum publish
- Check typo dan grammar

❌ **DON'T:**
- Publish tanpa review
- Lupakan tags dan ringkasan
- Copy-paste dari Word (bisa ada formatting aneh)

### SEO

✅ **DO:**
- Tulis judul yang jelas dan menarik (60-70 karakter)
- Isi excerpt/ringkasan (150-160 karakter)
- Gunakan heading terstruktur (H1 → H2 → H3)
- Tambahkan alt text di gambar
- Gunakan tags yang relevan

---

## 🆘 TROUBLESHOOTING

### ❌ Tidak bisa login

**Solusi:**
1. Check email & password benar
2. Pastikan sudah accept invitation dari Netlify
3. Reset password di Netlify Identity
4. Clear browser cache

### ❌ Konten tidak muncul di website setelah publish

**Solusi:**
1. Tunggu 2-3 menit untuk auto-deploy
2. Check status di GitHub Actions
3. Clear browser cache (Ctrl + F5)
4. Check apakah status masih "Draft"

### ❌ Upload gambar gagal

**Solusi:**
1. Check ukuran file (max 2-5 MB)
2. Check format file (JPG, PNG)
3. Compress gambar dulu
4. Refresh CMS dan coba lagi

### ❌ Preview tidak muncul

**Solusi:**
1. Check apakah site sudah deploy
2. Pastikan preview_path sudah diset di config
3. Tunggu beberapa detik, refresh

---

## 🔐 KEAMANAN

### Password

- Gunakan password kuat (min 12 karakter)
- Kombinasi huruf, angka, simbol
- Jangan share password

### Access Control

- Hanya invite user yang dipercaya
- Revoke access user yang sudah tidak aktif
- Monitor aktivitas di GitHub commits

### Backup

- Semua konten auto-backup di GitHub
- Download backup berkala (optional)
- Git history = full backup history

---

## 📞 SUPPORT

**Dokumentasi:**
- Decap CMS: https://decapcms.org/docs
- Netlify: https://docs.netlify.com
- Markdown Guide: https://www.markdownguide.org

**Need Help?**
- Check GitHub repository: https://github.com/fandcomp/CAAIP
- Email admin: info@caaip.net

---

**Panduan dibuat:** November 17, 2025
**Versi:** 1.0
**Status:** Production Ready ✅
