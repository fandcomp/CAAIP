# CAAIP Website

Portal resmi CAAIP dibangun dengan Astro (static-first), Tailwind CSS, dan Decap CMS untuk pengelolaan konten melalui GitHub.

## Teknologi
- Astro
- Tailwind CSS (+ Typography plugin)
- Decap CMS (GitHub OAuth)
- Vercel (Hosting & Cron)

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

## Decap CMS (GitHub OAuth)
Decap CMS sudah dikonfigurasi untuk menggunakan backend GitHub dengan proxy OAuth via fungsi Vercel pada `/api/oauth/*` yang ada di folder `api/oauth`.

1) Buat GitHub OAuth App (di GitHub > Settings > Developer settings > OAuth Apps):
   - Application name: bebas (mis. CAAIP CMS)
   - Homepage URL: `https://<domain-vercel-anda>`
   - Authorization callback URL: `https://<domain-vercel-anda>/api/oauth/callback`
   - Setelah dibuat, catat `Client ID` dan `Client Secret`.

2) Set variabel lingkungan di Vercel (Project Settings > Environment Variables):
   - `GITHUB_CLIENT_ID` = Client ID dari OAuth App
   - `GITHUB_CLIENT_SECRET` = Client Secret dari OAuth App
   - `OAUTH_REDIRECT_URI` = `https://<domain-vercel-anda>/api/oauth/callback` (opsional; jika kosong akan otomatis membentuk dari `VERCEL_URL`)

3) Lengkapi `public/admin/config.yml`:
   - Ganti `repo: YOUR_GITHUB_ORG/YOUR_REPO` menjadi `org/repo` Anda (contoh: `caaip-org/caaip-website`).
   - `branch: main` (sesuaikan bila Anda memakai nama branch lain)
   - Biarkan `base_url: "/api/oauth"` dan `auth_endpoint: "auth"` apa adanya.

4) Hak akses GitHub:
   - Pengguna yang login ke CMS harus punya akses tulis ke repo (collaborator/member org).
   - Jika repo berada di organisasi dengan SSO, pastikan token OAuth “Authorized” ke organisasi tersebut.

5) Alur login & publish:
   - Buka `/admin` di domain produksi Vercel.
   - Klik login GitHub (popup OAuth akan terbuka).
   - Dengan `publish_mode: editorial_workflow`, perubahan akan dibuat sebagai branch PR untuk proses review sebelum publish.

Catatan lokal: endpoint OAuth `/api/oauth/*` hanya tersedia di lingkungan Vercel. Login CMS sebaiknya diuji di URL produksi/pratinjau Vercel, bukan di `astro dev` lokal.

## Deploy ke Vercel
1. Import repo ke Vercel.
2. Set variabel env:
   - `VERCEL_DEPLOY_HOOK_URL` (untuk cron revalidate)
   - (opsional) `GITHUB_*` untuk OAuth proxy bila diaktifkan
3. Deploy.

### Cron & Revalidate
- `vercel.json` menjadwalkan panggilan harian ke `/api/revalidate`.
- Tambahkan `VERCEL_DEPLOY_HOOK_URL` pada Environment Variables Vercel.

## Desain
- Warna brand: `caaip.blue` `#0B3C68`, `caaip.blueLight` `#165A9A`, abu-abu netral, dan background terang.
- Font: Inter (via `@fontsource/inter`).
- Responsif dan modern, inspirasi gaya ITB dengan sentuhan futuristik.

## Kontribusi Konten via Decap CMS
- Setelah OAuth siap, buka `/admin` untuk login.
- Workflow: Draft → Review → Publish, media tersimpan di repo (`public/uploads`).

## Lisensi
- Hak cipta CAAIP. Konten dan aset mengikuti kebijakan internal.
