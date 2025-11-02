# Panduan Upload Gambar di CMS

## Fitur Gambar yang Sudah Ditambahkan

### ✅ Hero Carousel (Slideshow)
- **Lokasi**: Halaman utama, di bagian paling atas
- **Fitur**:
  - Menampilkan 3 berita terbaru dengan gambar cover
  - Auto-play setiap 5 detik
  - Tombol navigasi (prev/next)
  - Dots indicator
  - Pause on hover
  - Swipe support untuk mobile
  - Keyboard navigation (arrow keys)
  - Animasi smooth fade transition

### ✅ Article Cards dengan Gambar
- **Lokasi**: Grid berita di halaman utama dan halaman /berita
- **Fitur**:
  - Cover image dengan aspect ratio 16:9
  - Hover effect: zoom in pada gambar
  - Lazy loading untuk performa
  - Shadow dan border styling modern
  - Icon untuk tanggal dan author

### ✅ Detail Berita
- **Lokasi**: Halaman detail berita `/berita/[slug]`
- **Fitur**:
  - Hero image full-width di atas artikel
  - Height 400px (mobile) - 500px (desktop)
  - Metadata lengkap: tanggal, author, tags
  - Typography modern dengan prose styling

## Cara Upload Gambar di CMS

### 1. Login ke Admin
```
https://caaip.netlify.app/admin/
```

### 2. Buat Berita Baru dengan Gambar

#### Langkah-langkah:
1. **Buka CMS Admin**
   - Klik "Berita" di menu
   - Klik tombol **"New Berita"**

2. **Isi Form Berita**
   - **Judul**: Tulis judul berita
   - **Tanggal**: Pilih tanggal publikasi
   - **Penulis**: Nama penulis (opsional)
   - **Ringkasan**: Deskripsi singkat (akan muncul di card dan carousel)
   - **Tags**: Tag untuk kategorisasi (opsional)
   - **Bahasa**: Pilih bahasa (id/en)
   - **Draft**: Set ke **OFF** agar langsung tampil
   
3. **Upload Cover Image** ⭐
   - Scroll ke field **"Cover"**
   - Klik tombol **"Choose an image"**
   - **Opsi 1 - Upload Baru**:
     - Klik tab "Upload"
     - Drag & drop gambar atau klik "Choose files"
     - Gambar akan tersimpan di `/public/uploads/`
   - **Opsi 2 - Pilih dari Library**:
     - Klik tab "Library"
     - Pilih gambar yang sudah pernah diupload

4. **Tulis Konten**
   - Scroll ke bagian **"Konten"**
   - Tulis isi berita dengan markdown editor

5. **Publish**
   - Klik tombol **"Publish"** (hijau) di atas
   - Klik **"Publish now"**
   - CMS akan commit ke GitHub
   - Netlify otomatis deploy (~1-2 menit)

### 3. Verifikasi Gambar Tampil

Setelah deploy selesai (~1-2 menit):

#### ✅ Homepage - Hero Carousel
- Buka: https://caaip.netlify.app
- Gambar berita terbaru muncul di carousel atas
- Bisa klik next/prev atau tunggu auto-slide
- Gambar full-width dengan overlay text

#### ✅ Homepage - Grid Berita
- Scroll ke bawah ke section "Berita Terbaru"
- Gambar cover tampil di card dengan ratio 16:9
- Hover untuk lihat zoom effect

#### ✅ Detail Berita
- Klik berita untuk buka detail
- Gambar hero tampil full-width di atas
- Layout profesional dengan metadata

## Format Gambar yang Direkomendasikan

### Ukuran Ideal
- **Hero Carousel**: 1920x1080px (landscape)
- **Article Card**: 1200x675px (16:9 ratio)
- **Minimum**: 800x450px

### Format
- ✅ JPG (untuk foto)
- ✅ PNG (untuk grafis dengan transparansi)
- ✅ WebP (modern, ukuran kecil)
- ⚠️ Ukuran file max: 5MB (untuk performa)

### Tips Optimasi
1. Compress gambar sebelum upload (gunakan tools seperti TinyPNG)
2. Gunakan landscape orientation (horizontal)
3. Pastikan subjek utama di tengah (tidak terpotong di mobile)
4. Hindari text di gambar (karena ada overlay di carousel)

## Troubleshooting

### Gambar tidak tampil?
**Kemungkinan penyebab:**
1. ✅ **Cek field "Draft"**: Pastikan set ke **OFF/false**
2. ✅ **Cek path gambar**: Harus mulai dengan `/uploads/` (CMS handle otomatis)
3. ✅ **Tunggu deploy**: Netlify butuh 1-2 menit untuk build
4. ✅ **Clear cache**: Hard refresh browser (Ctrl+Shift+R)

**Cara cek:**
```bash
# Lihat file yang ter-commit
git log --oneline -5

# Cek isi file berita
cat src/content/berita/nama-file.md
```

### Gambar pecah/blur?
- Upload gambar dengan resolusi lebih tinggi
- Minimum 1200px width untuk hasil optimal

### Carousel tidak slide?
- Cek console browser untuk error JavaScript
- Pastikan ada minimal 2 berita dengan gambar
- Clear browser cache dan reload

### Gambar tidak muncul di carousel tapi muncul di card?
- Carousel hanya menampilkan **3 berita terbaru**
- Pastikan berita Anda termasuk dalam 3 terbaru (sort by date desc)
- Field `cover` harus terisi

## File yang Terlibat

```
Komponen:
├── src/components/HeroCarousel.astro     # Carousel slideshow
├── src/components/ArticleCard.astro      # Card dengan image
├── src/pages/index.astro                 # Homepage
├── src/pages/berita/[slug].astro         # Detail berita
└── public/uploads/                        # Folder gambar upload

Config:
└── public/admin/config.yml               # CMS config
    media_folder: "public/uploads"
    public_folder: "/uploads"
```

## Contoh Frontmatter dengan Cover

```markdown
---
title: Peluncuran Portal Baru CAAIP
date: 2025-11-02T10:00:00.000+07:00
author: Tim CAAIP
excerpt: Portal baru CAAIP hadir dengan tampilan modern dan fitur lengkap
tags:
  - announcement
  - website
lang: id
draft: false
cover: /uploads/portal-launch.jpg  # ⭐ Path gambar
---

Konten berita di sini...
```

## Hasil yang Diharapkan

### 🎯 Homepage Modern
- ✅ Hero carousel besar dengan gambar berita terbaru
- ✅ Auto-slide dengan animasi smooth
- ✅ Grid cards dengan thumbnail gambar
- ✅ Responsive: desktop, tablet, mobile

### 🎯 User Experience
- ✅ Visual menarik (gambar besar)
- ✅ Interactive (navigasi carousel)
- ✅ Fast loading (lazy load, optimized)
- ✅ Accessible (keyboard navigation, ARIA labels)

### 🎯 Admin Experience
- ✅ Mudah upload gambar via CMS
- ✅ Preview gambar sebelum publish
- ✅ Library untuk reuse gambar
- ✅ Langsung tampil setelah publish

## Tips untuk Content Creator

1. **Selalu sertakan gambar cover** untuk berita penting
2. **Tulis excerpt yang menarik** (tampil di carousel overlay)
3. **Gunakan gambar berkualitas** untuk first impression
4. **Test di mobile** setelah publish
5. **Update berita lama** dengan menambahkan cover image

---

**Fitur sudah live!** 🚀
Silakan login ke admin dan mulai upload gambar pertama Anda.
