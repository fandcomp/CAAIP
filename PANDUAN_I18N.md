# Panduan Fitur Multi-Bahasa (i18n)

## Fitur yang Sudah Aktif

✅ **Language Switcher** di pojok kanan atas  
✅ **Bahasa Indonesia (ID)** - Default  
✅ **English (EN)** - Alternate language  
✅ **URL-based routing**: `/` untuk ID, `/en/` untuk EN  
✅ **Translation system** untuk teks UI  

## Cara Kerja

### URL Structure

```
Bahasa Indonesia (ID):
https://caaip.netlify.app/              → Homepage
https://caaip.netlify.app/berita/       → News
https://caaip.netlify.app/profil/       → Profile
https://caaip.netlify.app/alumni/       → Alumni

English (EN):
https://caaip.netlify.app/en/           → Homepage  
https://caaip.netlify.app/en/berita/    → News (English)
https://caaip.netlify.app/en/profil/    → Profile (English)
https://caaip.netlify.app/en/alumni/    → Alumni (English)
```

### Language Switcher

**Lokasi**: Navbar pojok kanan atas

```
┌──────────────┐
│  ID  │  EN  │  ← Klik untuk ganti bahasa
└──────────────┘
```

**Fungsi**:
- Klik **ID** → Halaman Bahasa Indonesia
- Klik **EN** → Halaman Bahasa Inggris
- Aktif bahasa akan highlight **biru**
- Tetap di halaman yang sama (hanya bahasa yang berubah)

## Menambahkan Terjemahan Baru

### 1. Edit File Translation

File: `src/i18n/ui.ts`

```typescript
export const ui = {
  id: {
    'nav.home': 'Beranda',
    'nav.profile': 'Profil',
    // Tambah key baru di sini
    'page.title': 'Judul Halaman',
    'button.submit': 'Kirim',
  },
  en: {
    'nav.home': 'Home',
    'nav.profile': 'Profile',
    // Tambah terjemahan English di sini
    'page.title': 'Page Title',
    'button.submit': 'Submit',
  },
}
```

### 2. Gunakan di Component/Page

```astro
---
import { useTranslations } from '~/i18n/utils';

const t = useTranslations('id'); // atau 'en'
---

<h1>{t('page.title')}</h1>
<button>{t('button.submit')}</button>
```

### 3. Auto-detect Language dari URL

```astro
---
import { getLangFromUrl, useTranslations } from '~/i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<h1>{t('page.title')}</h1>
<!-- Akan otomatis pakai bahasa sesuai URL -->
```

## Membuat Halaman Bahasa Inggris Baru

### Contoh: Membuat `/en/profil`

1. **Buat folder** (jika belum ada):
   ```bash
   mkdir src/pages/en
   ```

2. **Copy halaman Indonesia**:
   ```bash
   Copy-Item src/pages/profil/index.astro src/pages/en/profil.astro
   ```

3. **Edit file** `src/pages/en/profil.astro`:
   ```astro
   ---
   import BaseLayout from "~/layouts/BaseLayout.astro";
   import { useTranslations } from '~/i18n/utils';

   const t = useTranslations('en'); // Ganti ke 'en'
   ---
   <BaseLayout title="CAAIP — Profile" lang="en">
     <h1>{t('nav.profile')}</h1>
     <!-- Content dalam bahasa Inggris -->
   </BaseLayout>
   ```

4. **Build & test**:
   ```bash
   npm run build
   ```

## Translation Keys yang Tersedia

### Navigation
```
nav.home       → Beranda / Home
nav.profile    → Profil / Profile
nav.news       → Berita / News
nav.obituary   → Kabar Duka / Obituary
nav.alumni     → Alumni / Alumni
```

### Homepage
```
home.hero.title         → CAAIP
home.hero.subtitle      → Portal description
home.hero.cta           → Lihat Berita / View News
home.news.title         → Berita Terbaru / Latest News
home.news.viewAll       → Lihat semua / View all
home.news.empty         → Belum ada berita / No news
home.news.readMore      → Baca Selengkapnya / Read More
home.obituary.title     → Kabar Duka / Obituary
home.obituary.viewAll   → Lihat semua / View all
home.obituary.empty     → Belum ada / No obituary
```

### Footer
```
footer.description   → Website description
footer.navigation    → Navigasi / Navigation
footer.contact       → Kontak / Contact
footer.followUs      → Ikuti Kami / Follow Us
footer.partnership   → Bekerja sama dengan / In partnership with
footer.copyright     → All rights reserved
footer.builtWith     → Dibangun dengan / Built with
```

### Alumni
```
alumni.title     → Alumni Angkatan / Alumni Class of
alumni.total     → Total / Total
alumni.back      → Kembali ke / Back to
alumni.no        → No / No
alumni.name      → Nama / Name
alumni.program   → Jurusan / Program
```

## Content dengan Bahasa

### CMS: Pilih Bahasa saat Publish

Saat membuat content di CMS:

1. **Field "Bahasa"**: Pilih `id` atau `en`
2. **Content akan filter by language**:
   - Homepage ID: hanya tampil content `lang: id`
   - Homepage EN: hanya tampil content `lang: en`

### Filter Content by Language

```astro
---
import { getCollection } from 'astro:content';

// Filter hanya bahasa Indonesia
const beritaID = await getCollection('berita', 
  ({ data }) => !data.draft && data.lang === 'id'
);

// Filter hanya bahasa Inggris
const beritaEN = await getCollection('berita', 
  ({ data }) => !data.draft && data.lang === 'en'
);
---
```

## Konfigurasi i18n

### File: `astro.config.mjs`

```javascript
export default defineConfig({
  i18n: {
    defaultLocale: 'id',        // Bahasa default
    locales: ['id', 'en'],      // Bahasa yang tersedia
    routing: {
      prefixDefaultLocale: false // ID tanpa prefix, EN pakai /en/
    }
  }
});
```

### Menambah Bahasa Baru (e.g., Jepang)

1. **Edit `astro.config.mjs`**:
   ```javascript
   locales: ['id', 'en', 'ja'],
   ```

2. **Edit `src/i18n/ui.ts`**:
   ```typescript
   ja: {
     'nav.home': 'ホーム',
     'nav.profile': 'プロフィール',
     // ... dst
   }
   ```

3. **Buat folder**: `src/pages/ja/`

4. **Update LanguageSwitcher**

## Struktur File

```
src/
├── i18n/
│   ├── ui.ts          # Translation strings
│   └── utils.ts       # i18n helper functions
├── pages/
│   ├── index.astro    # Homepage ID (/)
│   ├── berita/        # News ID
│   ├── profil/        # Profile ID
│   ├── alumni/        # Alumni ID
│   └── en/            # English pages
│       ├── index.astro    # Homepage EN (/en/)
│       └── ... (todo: create more)
└── components/
    ├── Navbar.astro         # Uses translations
    ├── Footer.astro         # Uses translations
    └── LanguageSwitcher.astro # Language toggle
```

## TODO: Halaman EN yang Perlu Dibuat

### Priority 1
- [ ] `/en/profil/` - Profile page
- [ ] `/en/berita/` - News listing
- [ ] `/en/berita/[slug]` - News detail
- [ ] `/en/alumni/` - Alumni listing
- [ ] `/en/alumni/[angkatan]` - Alumni by year

### Priority 2
- [ ] `/en/kabar-duka/` - Obituary listing
- [ ] `/en/kabar-duka/[slug]` - Obituary detail

### Cara Cepat Copy Structure

```bash
# Copy semua halaman ke EN
xcopy src\pages\berita src\pages\en\berita /E /I
xcopy src\pages\alumni src\pages\en\alumni /E /I
xcopy src\pages\kabar-duka src\pages\en\kabar-duka /E /I
xcopy src\pages\profil src\pages\en\profil /E /I

# Edit setiap file ganti:
# 1. useTranslations('id') → useTranslations('en')
# 2. lang="id" → lang="en"
# 3. Teks hard-coded ke translation keys
```

## Testing

### Test Language Switch

1. Buka: https://caaip.netlify.app
2. Klik tombol **EN** di pojok kanan atas
3. URL berubah ke: https://caaip.netlify.app/en/
4. Teks navbar berubah:
   - Beranda → Home
   - Profil → Profile
   - Berita → News
   - dst.
5. Klik **ID** untuk kembali ke Bahasa Indonesia

### Test Content Filter

1. Buat berita dengan `lang: en` di CMS
2. Publish
3. Buka `/en/` → berita muncul
4. Buka `/` (ID) → berita TIDAK muncul (karena filter by lang)

## Troubleshooting

### Language switcher tidak bekerja
- Cek console browser untuk error JavaScript
- Pastikan file `src/i18n/ui.ts` dan `utils.ts` ada
- Clear browser cache

### Halaman EN 404
- Pastikan folder `src/pages/en/` ada
- File harus ada: `src/pages/en/index.astro`
- Build ulang: `npm run build`

### Translation key tidak ditemukan
- Cek key ada di `src/i18n/ui.ts`
- Pastikan spelling sama persis (case-sensitive)
- Fallback akan pakai bahasa default (ID)

### Content tidak ter-filter by language
- Cek field `lang` di frontmatter content
- Pastikan query pakai filter: `data.lang === 'en'`
- Rebuild untuk update

---

**Fitur i18n sudah aktif!** 🌍  
Sekarang website support 2 bahasa dengan language switcher yang berfungsi.
