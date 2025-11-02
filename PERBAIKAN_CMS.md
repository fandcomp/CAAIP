# Perbaikan Integrasi CMS dengan Website

## Masalah yang Ditemukan

Ketika menambahkan content dari CMS admin, content tidak muncul di website utama. Berikut adalah masalah yang ditemukan:

### 1. Struktur Folder i18n yang Salah
**Masalah:**
- CMS membuat file di subfolder `id/` dan `en/` karena konfigurasi i18n
- Astro content collections tidak mendukung struktur `multiple_folders` untuk i18n
- File berada di: `src/content/berita/id/selamat-dan-sukses.md` (❌ Salah)
- Seharusnya: `src/content/berita/selamat-dan-sukses.md` (✅ Benar)

**Solusi:**
- Hapus konfigurasi i18n dari `config.yml`
- Pindahkan semua file dari subfolder ke folder utama
- Hapus folder `id/` dan `en/`

### 2. Slug Generator Bermasalah
**Masalah:**
- File kabar duka memiliki nama yang sangat panjang dan aneh:
  ```
  map-lang-id-draft-false-name-in-memoriam-justice-date-2025-11-02t14-23-00-000-07-00-message-selamat-jalan-dan-semoga-ditempatkan-yang-terbaik.md
  ```
- Ini terjadi karena CMS tidak bisa generate slug dengan benar dari field `name`

**Solusi:**
- Update slug pattern untuk kabar duka: `{{year}}-{{month}}-{{day}}-{{slug}}`
- Hasilnya lebih clean: `2025-11-02-in-memoriam-justice.md`

### 3. Schema Validation Terlalu Ketat
**Masalah:**
- Schema menggunakan `z.string().transform((s) => new Date(s))`
- CMS datetime widget menghasilkan ISO string yang valid tapi gagal validasi
- Error: `date: Expected type "string", received "date"`

**Solusi:**
- Ganti dengan `z.coerce.date()` yang lebih flexible
- Bisa menerima string ISO atau date object
- Otomatis convert ke Date object

## Perubahan yang Dilakukan

### 1. File: `public/admin/config.yml`
```yaml
# DIHAPUS - konfigurasi i18n
i18n:
  structure: multiple_folders
  locales: [id, en]
  default_locale: id

# DITAMBAH - slug pattern untuk kabar duka
collections:
  - name: "kabarDuka"
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"  # ✅ Baru
```

### 2. File: `src/content/config.ts`
```typescript
// SEBELUM
date: z.string().transform((s) => new Date(s))

// SESUDAH
date: z.coerce.date()  // ✅ Lebih flexible
```

### 3. Struktur Folder
```
SEBELUM:
src/content/berita/
  ├── id/
  │   └── selamat-dan-sukses.md
  ├── en/
  │   └── selamat-dan-sukses.md (empty)
  └── peluncuran-portal-caaip.md

SESUDAH:
src/content/berita/
  ├── peluncuran-portal-caaip.md
  └── selamat-dan-sukses.md  ✅
```

## Hasil

✅ **Build berhasil**: 11 halaman ter-generate
- Homepage menampilkan 2 berita (termasuk yang baru dari CMS)
- Homepage menampilkan 2 kabar duka (termasuk yang baru dari CMS)
- Semua halaman detail dapat diakses

## Cara Publish Content Baru (Setelah Perbaikan)

1. **Login ke Admin**: https://caaip.netlify.app/admin/
2. **Buat Content Baru**:
   - Pilih "Berita" atau "Kabar Duka"
   - Klik "New Berita" / "New Kabar Duka"
   - Isi semua field
   - **PENTING**: Set "Draft" ke OFF/false agar muncul di website
3. **Publish**:
   - Klik "Publish" (hijau di atas)
   - Klik "Publish now"
4. **Tunggu Deploy**:
   - Netlify akan otomatis build (~1-2 menit)
   - Cek status di https://app.netlify.com
5. **Verifikasi**:
   - Buka https://caaip.netlify.app
   - Content baru sudah muncul di homepage

## Catatan Penting

- ⚠️ **Jangan aktifkan i18n lagi** di `config.yml` kecuali sudah setup Astro i18n dengan benar
- ⚠️ **Cache CMS**: Jika masih ada masalah, logout dari admin dan clear browser cache
- ✅ **Publish Mode**: Sudah di set ke `simple` (langsung commit tanpa PR)
- ✅ **Content muncul instant** setelah Netlify selesai deploy

## Troubleshooting

### Content tidak muncul setelah publish
1. Cek apakah Draft = false
2. Cek Netlify deploy logs untuk error
3. Cek git history apakah file sudah ter-commit

### File dengan nama aneh muncul lagi
1. Clear browser cache admin
2. Logout dan login ulang ke /admin/
3. Config baru sekarang sudah fix slug pattern

### Build error setelah publish
1. Cek format frontmatter di file yang baru dibuat
2. Pastikan semua required field terisi
3. Cek Netlify deploy logs untuk detail error
