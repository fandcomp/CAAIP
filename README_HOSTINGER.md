# Website CAAIP - Siap Deploy ke Hostinger

Portal resmi CAAIP dibangun dengan Astro (static-first), Tailwind CSS, dan Decap CMS untuk pengelolaan konten melalui GitHub.

## 🌐 Deploy Information

- **Domain:** caaip.id
- **Hosting:** Hostinger (Website public)
- **CMS Admin:** admin.caaip.id (Netlify)
- **Repository:** https://github.com/fandcomp/CAAIP

## 🚀 Quick Start - Hosting di Hostinger

### 1. Build Website

```powershell
npm install
npm run build
```

### 2. Upload ke Hostinger

Upload semua file dari folder `dist/` ke `public_html/` via File Manager atau FTP.

### 3. Setup Domain & SSL

1. Point domain `caaip.id` ke Hostinger
2. Install SSL certificate (gratis)
3. Akses: https://caaip.id

### 4. Setup CMS Admin

1. Deploy ke Netlify untuk subdomain `admin.caaip.id`
2. Enable Netlify Identity + Git Gateway
3. Akses CMS: https://admin.caaip.id/admin

## 📚 Panduan Lengkap

- **[DEPLOY_HOSTINGER.md](./DEPLOY_HOSTINGER.md)** - Panduan deploy step-by-step
- **[HOSTING_CHECKLIST.md](./HOSTING_CHECKLIST.md)** - Checklist & troubleshooting

## 🛠️ Teknologi

- **Astro 4.15** - Static site generator
- **Tailwind CSS** - Styling
- **Decap CMS** - Content management (Netlify Identity + Git Gateway)
- **GitHub Actions** - Auto-deploy ke Hostinger via FTP

## 📂 Struktur Project

```
CAAIP/
├── src/
│   ├── pages/           # Halaman (Home, Berita, Alumni, Profil)
│   ├── components/      # Components (Navbar, Footer, dll)
│   ├── layouts/         # Layout templates
│   └── content/         # Content collections (JSON, Markdown)
├── public/
│   ├── admin/           # Decap CMS config
│   ├── uploads/         # Media dari CMS
│   └── images/          # Static images
├── .github/
│   └── workflows/       # GitHub Actions (auto-deploy)
└── dist/                # Build output (upload ini ke Hostinger)
```

## 📝 Content Management

### Login CMS:
https://admin.caaip.id/admin

### Collections:
- **Berita** - Artikel berita
- **Kabar Duka** - In memoriam
- **Alumni** - Data per angkatan (CSV import supported)
- **Pengurus** - Pengurus CAAIP
- **Profil** - Halaman profil (bilingual)

## 🔄 Workflow Update Content

1. Login ke CMS admin
2. Edit/tambah content
3. Publish → Commit ke GitHub
4. GitHub Actions auto-deploy ke Hostinger (2-3 menit)
5. Website updated! ✅

## ⚙️ Development

### Local Development:

```powershell
npm run dev
```

Buka http://localhost:4321

### Build & Preview:

```powershell
npm run build
npm run preview
```

## 🎨 Design System

- **Primary Color:** `#0B3C68` (CAAIP Blue)
- **Secondary Color:** `#165A9A` (CAAIP Blue Light)
- **Font:** Inter (via @fontsource/inter)
- **Style:** Modern, responsive, ITB-inspired

## 📦 File yang Sudah Disesuaikan untuk Hostinger

- ✅ `astro.config.mjs` - Site URL: `https://caaip.id`
- ✅ `.github/workflows/deploy-hostinger.yml` - Auto-deploy setup
- ✅ `public/admin/config.yml` - CMS config (git-gateway)
- ✅ Build output: Static files ready to upload

## 🔐 Security

- ✅ SSL/HTTPS enabled (Let's Encrypt)
- ✅ CMS login via Netlify Identity (secure OAuth)
- ✅ Git-based content (version controlled)
- ✅ No database = No SQL injection risk

## 📊 Performance

- ⚡ Static site = Super fast loading
- 🌍 CDN-ready (via Hostinger)
- 📱 Mobile-optimized
- ♿ SEO-friendly

## 💰 Hosting Cost

| Item | Cost/Year |
|------|-----------|
| Domain (caaip.id) | Rp 150.000 |
| Hostinger Premium | Rp 400.000 |
| Netlify (CMS) | **FREE** |
| GitHub | **FREE** |
| **TOTAL** | **Rp 550.000/year** |

## 🆘 Support & Documentation

- **Deploy Guide:** [DEPLOY_HOSTINGER.md](./DEPLOY_HOSTINGER.md)
- **Checklist:** [HOSTING_CHECKLIST.md](./HOSTING_CHECKLIST.md)
- **CMS Guide:** [CARA_PUBLISH.md](./CARA_PUBLISH.md)
- **Alumni Upload:** [CARA-UPLOAD-ALUMNI.md](./CARA-UPLOAD-ALUMNI.md)

## 📞 Troubleshooting

Lihat file [HOSTING_CHECKLIST.md](./HOSTING_CHECKLIST.md) bagian Troubleshooting

## 📄 License

© 2025 CAAIP. All rights reserved.

---

**Status:** ✅ Ready for deployment to Hostinger  
**Last Updated:** 8 November 2025  
**Domain:** caaip.id
