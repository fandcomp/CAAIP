# 🚀 Konsep Deployment Terpisah: Netlify (CMS) + Hostinger (Website)

## 📊 Arsitektur Deployment

```
┌──────────────────────────────────────────────────┐
│  NETLIFY - CMS Admin Only                        │
│  URL: https://caaip.netlify.app                 │
│  ├─ Hanya deploy folder /admin                  │
│  ├─ GitHub OAuth authentication                 │
│  ├─ Interface untuk edit konten                 │
│  └─ Redirect / → /admin                         │
└──────────────────────────────────────────────────┘
                    ↓
           Commit perubahan ke GitHub
                    ↓
┌──────────────────────────────────────────────────┐
│  GITHUB REPOSITORY                               │
│  Repo: fandcomp/CAAIP                           │
│  ├─ Simpan code & konten (Markdown/JSON)       │
│  ├─ Trigger GitHub Actions                      │
│  └─ Build & deploy otomatis                     │
└──────────────────────────────────────────────────┘
                    ↓
           GitHub Actions auto-deploy
                    ↓
┌──────────────────────────────────────────────────┐
│  HOSTINGER - Website Publik                      │
│  URL: https://caaip.id                          │
│  ├─ Full website untuk user                     │
│  ├─ Auto-update dari GitHub (FTP)              │
│  └─ Tidak ada CMS (redirect ke Netlify)        │
└──────────────────────────────────────────────────┘
```

---

## ✅ Keunggulan Konsep Ini

### 1. **Pemisahan Concern**
- ✅ CMS terpisah dari website publik
- ✅ Netlify handle autentikasi & OAuth
- ✅ Hostinger fokus serving static files (cepat)

### 2. **Keamanan**
- ✅ CMS tidak expose di domain publik
- ✅ GitHub OAuth lebih secure
- ✅ Akses CMS hanya via Netlify URL

### 3. **Performance**
- ✅ Website di Hostinger: super cepat (static files)
- ✅ Tidak ada overhead CMS di production
- ✅ CDN Netlify untuk admin panel

### 4. **Cost Efficiency**
- ✅ Netlify free tier (cukup untuk CMS)
- ✅ Hostinger shared hosting (murah)
- ✅ Tidak perlu VPS/dedicated server

---

## 🔧 Setup Lengkap

### FASE 1: Setup Netlify (CMS Admin)

#### 1.1 Deploy ke Netlify

**Login Netlify:**
```
https://app.netlify.com
```

**Import Repository:**
1. Klik **Add new site** → **Import an existing project**
2. Pilih **GitHub** → Pilih **CAAIP repository**
3. **Build settings:**
   - Branch: `main`
   - Build command: `npm run build`
   - Publish directory: `dist/admin`
   - (Sudah dikonfigurasi di netlify.toml)
4. Klik **Deploy site**

#### 1.2 Setup GitHub OAuth

**Di Netlify Dashboard:**
1. Buka site **Settings** → **Access control** → **OAuth**
2. Klik **Install provider**
3. Pilih **GitHub**
4. Authorize Netlify OAuth app
5. Done!

#### 1.3 Test CMS Admin

**Akses CMS:**
```
https://caaip.netlify.app
(otomatis redirect ke /admin)
```

**Login:**
1. Klik **Login with GitHub**
2. Authorize dengan akun GitHub Anda
3. Masuk ke CMS dashboard
4. Test buat artikel atau konten baru

---

### FASE 2: Setup GitHub Actions (Auto-Deploy)

GitHub Actions sudah dikonfigurasi di:
```
.github/workflows/deploy-hostinger.yml
```

**Yang perlu diatur:**

#### 2.1 Add FTP Secrets

**URL:** https://github.com/fandcomp/CAAIP/settings/secrets/actions

**Klik "New repository secret":**

| Name | Value |
|------|-------|
| `FTP_SERVER` | `145.79.14.179` |
| `FTP_USERNAME` | `u239743347.caaip.id` |
| `FTP_PASSWORD` | (password FTP Anda) |

#### 2.2 Verify Workflow File

File `.github/workflows/deploy-hostinger.yml` harus ada trigger:
```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:
```

---

### FASE 3: Setup Hostinger (Website Publik)

#### 3.1 Struktur File di Hostinger

**Login hPanel** → **File Manager**

**Pastikan struktur di `public_html`:**
```
public_html/
├── index.html          ← Homepage
├── 404.html
├── favicon.svg
├── _astro/            ← Assets (CSS, fonts)
├── berita/            ← Artikel
├── alumni/            ← Data alumni
├── kabar-duka/        ← Kabar duka
├── profil/            ← Profil organisasi
└── uploads/           ← Upload dari CMS

TIDAK ADA folder /admin di sini!
(Admin hanya di Netlify)
```

#### 3.2 Redirect /admin ke Netlify (Opsional)

Jika user akses `https://caaip.id/admin`, redirect ke Netlify.

**Buat file `.htaccess` di public_html:**
```apache
# Redirect /admin ke Netlify CMS
RedirectMatch 301 ^/admin(.*)$ https://caaip.netlify.app$1

# HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 🔄 Workflow Update Konten

### Cara Edit Konten:

```
STEP 1: Akses CMS
↓
https://caaip.netlify.app
(Login dengan GitHub)

STEP 2: Edit/Create Konten
↓
- Buat artikel baru
- Upload gambar
- Edit profil, dll

STEP 3: Publish
↓
Klik "Publish"
(CMS auto-commit ke GitHub)

STEP 4: Wait Auto-Deploy (~2-3 menit)
↓
GitHub Actions:
- Detect commit baru
- Build project (npm run build)
- Upload ke Hostinger via FTP

STEP 5: Website Updated!
↓
https://caaip.id
(Refresh untuk lihat perubahan)
```

**Timeline:**
- Publish di CMS: 0:00
- GitHub Actions triggered: 0:10
- Build complete: 1:30
- FTP upload: 2:30
- Website live: 3:00

**Total: ~3 menit** dari publish sampai live!

---

## 🎯 URL Reference

| Purpose | URL | Hosted |
|---------|-----|--------|
| **CMS Admin** | `https://caaip.netlify.app` | Netlify |
| **Website Publik** | `https://caaip.id` | Hostinger |
| **GitHub Repo** | `https://github.com/fandcomp/CAAIP` | GitHub |
| **GitHub Actions** | `https://github.com/fandcomp/CAAIP/actions` | GitHub |

---

## 🔐 Akses & Permission

### Who Can Access CMS?

**CMS Admin (Netlify):**
- Hanya yang punya akses GitHub ke repository
- Login via GitHub OAuth
- Bisa invite collaborator di GitHub

**Website Publik (Hostinger):**
- Semua orang (public)
- Tidak ada login
- Read-only

### Cara Invite Admin Baru:

1. **Di GitHub:**
   - Repo Settings → Collaborators
   - Invite via GitHub username atau email
   
2. **User baru:**
   - Accept invitation
   - Login CMS via `caaip.netlify.app`
   - Authenticate dengan GitHub
   - Langsung bisa edit konten

---

## 🛠️ Maintenance & Update

### Update Code (Developer):

```powershell
# 1. Edit code di lokal
# 2. Test
npm run dev

# 3. Build
npm run build

# 4. Commit & Push
git add .
git commit -m "Update fitur X"
git push origin main

# 5. Auto-deploy (GitHub Actions)
# Website update otomatis ke Hostinger
```

### Update Konten (Content Editor):

```
1. Login https://caaip.netlify.app
2. Edit konten via CMS
3. Publish
4. Wait ~3 menit
5. Done! Website updated
```

### Manual FTP Upload (Emergency):

```powershell
# Jika GitHub Actions gagal
npm run build
.\upload-ftp.ps1
```

---

## 📊 Monitoring

### Check Deploy Status:

**Netlify CMS:**
- https://app.netlify.com/sites/caaip/deploys
- Lihat deploy history
- Check build logs

**GitHub Actions:**
- https://github.com/fandcomp/CAAIP/actions
- Lihat workflow runs
- Check FTP upload logs

**Website Hostinger:**
- https://caaip.id
- Refresh (Ctrl+F5)
- Check content updated

---

## 🆘 Troubleshooting

### ❌ CMS tidak bisa login

**Solusi:**
1. Pastikan GitHub OAuth enabled di Netlify
2. Check apakah repo public atau collaborator
3. Clear browser cache, coba lagi
4. Check console error di browser (F12)

### ❌ Konten tidak update di website

**Solusi:**
1. Check GitHub Actions: https://github.com/fandcomp/CAAIP/actions
2. Lihat apakah workflow sukses (hijau ✅)
3. Jika merah ❌, klik untuk lihat error
4. Check FTP secrets di GitHub
5. Manual upload: `.\upload-ftp.ps1`

### ❌ Build failed di Netlify

**Solusi:**
1. Check build logs di Netlify dashboard
2. Pastikan `npm run build` works di lokal
3. Check dependencies di package.json
4. Trigger manual deploy di Netlify

### ❌ FTP upload failed

**Solusi:**
1. Check FTP secrets benar
2. Test koneksi: `.\test-ftp.ps1`
3. Check password tidak berubah
4. Upload manual via File Manager

---

## 📈 Optimizations

### Performance:

- ✅ Static site = super fast loading
- ✅ Hostinger CDN (if available)
- ✅ Compress images before upload
- ✅ Minify CSS/JS (Astro auto-minify)

### SEO:

- ✅ Generate sitemap.xml
- ✅ robots.txt configured
- ✅ Meta tags di setiap page
- ✅ Alt text untuk semua gambar

### Security:

- ✅ HTTPS everywhere
- ✅ Security headers (.htaccess)
- ✅ OAuth authentication
- ✅ No exposed credentials

---

## 📝 Checklist Deployment

Setelah setup selesai:

- [ ] Netlify deployed & accessible
- [ ] GitHub OAuth enabled
- [ ] CMS login works
- [ ] GitHub Actions configured
- [ ] FTP secrets added
- [ ] Test publish artikel
- [ ] Website auto-updated
- [ ] Redirect /admin works
- [ ] Performance checked
- [ ] SEO verified

**Jika semua ✅, deployment sukses!** 🎉

---

## 📞 Quick Reference

**Deploy Update:**
```bash
git push origin main
# Wait ~3 menit, website updated!
```

**Manual Upload:**
```powershell
npm run build
.\upload-ftp.ps1
```

**Access CMS:**
```
https://caaip.netlify.app
(Login with GitHub)
```

**Check Deploy:**
```
GitHub Actions: https://github.com/fandcomp/CAAIP/actions
Netlify: https://app.netlify.com/sites/caaip/deploys
```

---

**Dokumentasi dibuat:** 18 November 2025  
**Versi:** 2.0  
**Status:** Production Ready ✅  
**Arsitektur:** Hybrid (Netlify CMS + Hostinger Website)
