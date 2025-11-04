# Panduan Lengkap Website Bilingual CAAIP

## Status Implementasi

✅ **SELESAI** - Website sekarang sepenuhnya bilingual (Indonesia & English)

### Halaman yang Tersedia

| Halaman | Indonesia | English |
|---------|-----------|---------|
| Beranda | `/` | `/en/` |
| Berita (List) | `/berita/` | `/en/berita/` |
| Berita (Detail) | `/berita/[slug]` | `/en/berita/[slug]` |
| Profil | `/profil/` | `/en/profil/` |
| Alumni (List) | `/alumni/` | `/en/alumni/` |
| Alumni (Angkatan) | `/alumni/[angkatan]` | `/en/alumni/[angkatan]` |
| Kabar Duka (List) | `/kabar-duka/` | `/en/kabar-duka/` |
| Kabar Duka (Detail) | `/kabar-duka/[slug]` | `/en/kabar-duka/[slug]` |

**Total:** 23 halaman (build output menunjukkan 23 pages berhasil dibuat)

---

## Cara Kerja Sistem Bilingual

### 1. Struktur URL

Website menggunakan routing berbasis URL:
- **Bahasa Indonesia (default):** URL tanpa prefix - `https://caaip.netlify.app/`
- **Bahasa Inggris:** URL dengan prefix `/en/` - `https://caaip.netlify.app/en/`

### 2. Konfigurasi i18n (astro.config.mjs)

```javascript
i18n: {
  defaultLocale: 'id',           // Indonesia sebagai bahasa default
  locales: ['id', 'en'],         // Bahasa yang didukung
  routing: {
    prefixDefaultLocale: false   // URL Indonesia tanpa /id/
  }
}
```

### 3. Language Switcher

Tombol ganti bahasa di pojok kanan atas navbar:
- Otomatis mendeteksi bahasa aktif dari URL
- Menjaga path halaman saat berpindah bahasa
- Contoh: `/berita/` → `/en/berita/` (tetap di halaman berita)

**File:** `src/components/LanguageSwitcher.astro`

### 4. Translation System

**File Translation Keys:** `src/i18n/ui.ts`
```typescript
export const ui = {
  id: {
    'nav.home': 'Beranda',
    'nav.news': 'Berita',
    // ... 30+ keys lainnya
  },
  en: {
    'nav.home': 'Home',
    'nav.news': 'News',
    // ... 30+ keys lainnya
  }
}
```

**Helper Functions:** `src/i18n/utils.ts`
- `getLangFromUrl(url)` - Deteksi bahasa dari URL
- `useTranslations(lang)` - Ambil fungsi translate untuk bahasa tertentu
- `translatePath(path, lang)` - Convert path antar bahasa

**Cara Menggunakan:**
```astro
---
import { useTranslations } from "~/i18n/utils";

const t = useTranslations('en'); // atau 'id'
---
<h1>{t('home.title')}</h1>
```

---

## Filter Konten Berdasarkan Bahasa

### CMS: Menambah Field `lang`

Setiap konten di CMS **HARUS** memiliki field `lang`:

**File:** `public/admin/config.yml`

```yaml
collections:
  - name: "berita"
    fields:
      - { label: "Language", name: "lang", widget: "select", options: ["id", "en"], default: "id" }
      - { label: "Title", name: "title", widget: "string" }
      # ... field lainnya
```

### Kode: Filter Collection

**Halaman Indonesia:**
```astro
---
const berita = await getCollection('berita', ({ data }) => {
  return !data.draft && data.lang === 'id';
});
---
```

**Halaman English:**
```astro
---
const berita = await getCollection('berita', ({ data }) => {
  return !data.draft && data.lang === 'en';
});
---
```

---

## Cara Menambahkan Konten Bilingual di CMS

### Langkah 1: Login CMS
1. Buka `https://caaip.netlify.app/admin/`
2. Login dengan Netlify Identity

### Langkah 2: Buat Konten Indonesia
1. Pilih koleksi (Berita/Kabar Duka)
2. Klik **"New Berita"** atau **"New Kabar Duka"**
3. **PENTING:** Pilih `lang: id`
4. Isi semua field dalam Bahasa Indonesia
5. **Save** dan **Publish**

### Langkah 3: Buat Konten English (Versi Terjemahan)
1. Ulangi proses di atas
2. **PENTING:** Pilih `lang: en`
3. Isi field dalam Bahasa Inggris (terjemahan dari konten ID)
4. **Tip:** Gunakan slug berbeda, misalnya:
   - ID: `peluncuran-portal-caaip`
   - EN: `caaip-portal-launch`

### Contoh Konten Bilingual

**Berita Indonesia (lang: id):**
```yaml
title: "Peluncuran Portal CAAIP"
lang: "id"
excerpt: "CAAIP dengan bangga meluncurkan website resmi..."
date: 2025-01-10
author: Admin CAAIP
```

**Berita English (lang: en):**
```yaml
title: "CAAIP Portal Launch"
lang: "en"
excerpt: "CAAIP proudly launches its official website..."
date: 2025-01-10
author: CAAIP Admin
```

---

## Struktur File Halaman

### Homepage
```
src/pages/index.astro          → / (Indonesia)
src/pages/en/index.astro       → /en/ (English)
```

### Berita (News)
```
src/pages/berita/
  ├── index.astro              → /berita/ (list)
  └── [slug].astro             → /berita/peluncuran-portal-caaip (detail)

src/pages/en/berita/
  ├── index.astro              → /en/berita/ (list)
  └── [slug].astro             → /en/berita/caaip-portal-launch (detail)
```

### Profil (About)
```
src/pages/profil/index.astro   → /profil/
src/pages/en/profil/index.astro → /en/profil/
```

### Alumni
```
src/pages/alumni/
  ├── index.astro              → /alumni/ (list tahun)
  └── [angkatan].astro         → /alumni/1991 (per angkatan)

src/pages/en/alumni/
  ├── index.astro              → /en/alumni/ (list years)
  └── [angkatan].astro         → /en/alumni/1991 (per class)
```

### Kabar Duka (Obituaries)
```
src/pages/kabar-duka/
  ├── index.astro              → /kabar-duka/ (list)
  └── [slug].astro             → /kabar-duka/in-memoriam-2025 (detail)

src/pages/en/kabar-duka/
  ├── index.astro              → /en/kabar-duka/ (list)
  └── [slug].astro             → /en/kabar-duka/in-memoriam-2025 (detail)
```

---

## Navbar Dinamis

Navbar otomatis menampilkan teks sesuai bahasa:

```astro
<nav>
  <a href={currentLang === 'id' ? '/berita' : '/en/berita'}>
    {t('nav.news')} <!-- "Berita" atau "News" -->
  </a>
</nav>
```

**Menu yang diterjemahkan:**
- Beranda / Home
- Berita / News
- Profil / About
- Alumni / Alumni
- Kabar Duka / In Memoriam

---

## Testing Checklist

### ✅ Fitur yang Harus Ditest

1. **Language Switcher**
   - [ ] Klik "ID" di halaman EN → pindah ke halaman ID
   - [ ] Klik "EN" di halaman ID → pindah ke halaman EN
   - [ ] URL berubah dengan benar (/en/ prefix)
   - [ ] Tombol aktif highlight biru

2. **Konten Filter**
   - [ ] Halaman ID hanya tampilkan konten lang='id'
   - [ ] Halaman EN hanya tampilkan konten lang='en'
   - [ ] Tidak ada konten tercampur

3. **Semua Halaman EN Aktif**
   - [ ] /en/ (homepage)
   - [ ] /en/berita/ (news list)
   - [ ] /en/berita/[slug] (news detail)
   - [ ] /en/profil/ (about)
   - [ ] /en/alumni/ (alumni years)
   - [ ] /en/alumni/[angkatan] (alumni class)
   - [ ] /en/kabar-duka/ (obituary list)
   - [ ] /en/kabar-duka/[slug] (obituary detail)

4. **UI Translation**
   - [ ] Navbar menu terjemah
   - [ ] Button text terjemah
   - [ ] Page title terjemah
   - [ ] Empty state message terjemah

5. **Build Success**
   - [ ] `npm run build` berhasil
   - [ ] Output: 23 pages built
   - [ ] No build errors

---

## Troubleshooting

### Konten Tidak Muncul di Halaman EN

**Penyebab:** Konten tidak memiliki field `lang: en`

**Solusi:**
1. Buka CMS admin
2. Edit konten
3. Ubah `lang` ke `en`
4. Save & Publish

### Halaman EN Menampilkan "No content available"

**Normal!** Ini terjadi jika:
- Belum ada konten dengan `lang: en`
- Harus buat konten baru dengan `lang: en` di CMS

### Language Switcher Tidak Bekerja

**Periksa:**
1. URL struktur benar (`/` untuk ID, `/en/` untuk EN)
2. File `src/components/LanguageSwitcher.astro` ada
3. Component diimport di Navbar
4. Browser cache (hard refresh: Ctrl+Shift+R)

---

## Menambah Bahasa Baru (Opsional)

Jika ingin tambah bahasa lain (misal: Mandarin):

### 1. Update astro.config.mjs
```javascript
i18n: {
  defaultLocale: 'id',
  locales: ['id', 'en', 'zh'], // tambah 'zh'
}
```

### 2. Tambah Translation Keys (src/i18n/ui.ts)
```typescript
export const ui = {
  id: { ... },
  en: { ... },
  zh: {
    'nav.home': '首页',
    'nav.news': '新闻',
    // ... dst
  }
}
```

### 3. Update LanguageSwitcher
Tambah button untuk bahasa baru

### 4. Buat Folder Pages
```
src/pages/zh/
  ├── index.astro
  ├── berita/
  ├── profil/
  └── ... (copy struktur dari /en/)
```

### 5. Update CMS Config
```yaml
fields:
  - { label: "Language", name: "lang", widget: "select", options: ["id", "en", "zh"] }
```

---

## Command Reference

```bash
# Build website
npm run build

# Development mode
npm run dev

# Check build output
npm run build
# Output harus: "23 page(s) built" atau lebih

# Deploy (otomatis via Netlify)
git add .
git commit -m "update: ..."
git push
```

---

## Hasil Akhir

✅ **Website sekarang 100% bilingual!**

Ketika user klik tombol **EN**:
- Semua halaman tersedia dalam Bahasa Inggris
- URL berubah ke `/en/...`
- Navbar menu berubah ke English
- Konten yang ditampilkan filter by `lang='en'`

Ketika user klik tombol **ID**:
- Kembali ke Bahasa Indonesia
- URL tanpa `/en/`
- Semua UI kembali ke Indonesia
- Konten filter by `lang='id'`

---

## Catatan Penting

1. **Konten harus dibuat manual untuk setiap bahasa** di CMS
2. **Tidak ada auto-translate** - admin harus input terjemahan sendiri
3. **Empty state normal** jika belum ada konten bahasa tertentu
4. **Alumni data language-agnostic** (nama tidak perlu diterjemahkan)
5. **Build output: 23 pages** = 8 halaman × 2 bahasa + 404 + alumni variations

---

## Kontak Support

Jika ada masalah dengan sistem bilingual:
1. Periksa file `PANDUAN_I18N.md` (guide awal)
2. Periksa file ini untuk detail lengkap
3. Test dengan `npm run build` untuk validasi

**Status Build:** ✅ Success (23 pages)
**Status Deploy:** ✅ Live di https://caaip.netlify.app
**Update Terakhir:** 2025-01-11
