# CAAIP Website

Portal resmi CAAIP dibangun dengan Astro (static-first), Tailwind CSS, dan Decap CMS untuk pengelolaan konten melalui GitHub.

## Teknologi
- Astro
- Tailwind CSS (+ Typography plugin)
- Decap CMS (Netlify Identity + Git Gateway)
- Netlify (Hosting)

## Menjalankan secara lokal (Windows PowerShell)
```powershell
npm install
npm run dev
```
- Buka URL yang ditampilkan (default: http://localhost:4321).

Build & preview:
```powershell
npm run build
npm run preview
```

## Struktur Utama
- `src/pages`: Halaman Astro (Beranda, Profil, Berita, Kabar Duka, Alumni)
- `src/components`: Navbar, Footer, Hero, dsb
- `src/layouts`: `BaseLayout`
- `src/content`: Content Collections (Markdown/Data)
- `public/admin`: Decap CMS (index + config)

## Konten & Collections
- `berita` (Markdown + frontmatter): judul, tanggal, excerpt, tags, cover, draft, lang
- `kabarDuka` (Markdown + frontmatter): name, date, relation, message, draft, lang
- `alumni` (JSON data): angkatan, members[] { name, program, year }

Contoh:
- `src/content/berita/peluncuran-portal-caaip.md`
- `src/content/kabarDuka/in-memoriam-2025-10-31.md`
- `src/content/alumni/1991.json`

## Decap CMS di Netlify (Identity + Git Gateway)
Konfigurasi CMS memakai backend `git-gateway` agar login lewat Netlify Identity tanpa perlu OAuth proxy.

1) Deploy ke Netlify
   - Hubungkan repo GitHub ini ke Netlify.
   - Build command: `npm run build`
   - Publish directory: `dist`

2) Aktifkan Identity
   - Netlify Dashboard → Site → Identity → Enable Identity
   - Settings → Registration → Invite only (disarankan)
   - Set role default `editor` (opsional)

3) Aktifkan Git Gateway
   - Identity → Settings → Services → Enable Git Gateway
   - Hubungkan ke GitHub repo ini (Netlify akan minta token/izin)

4) Konfigurasi Decap
   - File: `public/admin/config.yml`
   - Backend sudah diset ke:
     ```yaml
     backend:
       name: git-gateway
       branch: main
     ```
   - Koleksi (berita, kabarDuka, alumni) sudah siap.

5) Login
   - Buka `/admin` di domain Netlify Anda.
   - Klik “Login with Netlify Identity” (popup Identity akan muncul)
   - Setelah login, Anda bisa membuat/mengubah konten. Workflow editorial akan membuat PR jika diaktifkan (`publish_mode: editorial_workflow`).

## Deploy ke Netlify
1. Import repo ke Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Enable Identity & Git Gateway seperti di atas.

## Desain
- Warna brand: `caaip.blue` `#0B3C68`, `caaip.blueLight` `#165A9A`, abu-abu netral, dan background terang.
- Font: Inter (via `@fontsource/inter`).
- Responsif dan modern, inspirasi gaya ITB dengan sentuhan futuristik.

## Kontribusi Konten via Decap CMS
- Setelah OAuth siap, buka `/admin` untuk login.
- Workflow: Draft → Review → Publish, media tersimpan di repo (`public/uploads`).

## Lisensi
- Hak cipta CAAIP. Konten dan aset mengikuti kebijakan internal.
