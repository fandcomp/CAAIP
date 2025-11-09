# 📋 Setup Guide: Hostinger + Netlify CMS

## Quick Start Checklist

### ✅ Prerequisites
- [ ] Akun Hostinger (dengan hosting aktif)
- [ ] Domain caaip.id (sudah dibeli atau akan dibeli)
- [ ] Akun Netlify (gratis - daftar di netlify.com)
- [ ] Repository GitHub sudah ada (fandcomp/CAAIP)

---

## 🚀 STEP 1: Setup Netlify untuk CMS

### 1.1 Login & Deploy ke Netlify

1. **Login Netlify**: https://app.netlify.com
   - Login dengan GitHub account yang sama (fandcomp)

2. **Import Repository**:
   - Klik **"Add new site"** → **"Import an existing project"**
   - Pilih **GitHub**
   - Authorize Netlify
   - Pilih repository: **fandcomp/CAAIP**

3. **Configure Build Settings**:
   ```yaml
   Build command: npm run build
   Publish directory: dist
   Branch to deploy: main
   ```

4. **Deploy Site**:
   - Klik **"Deploy site"**
   - Tunggu build selesai (~2-3 menit)
   - Anda dapat URL: `https://[random-name].netlify.app`

5. **Rename Site (Optional)**:
   - Site settings → **"Change site name"**
   - Ubah ke: `caaip-cms` (atau nama lain yang Anda suka)
   - URL jadi: `https://caaip-cms.netlify.app`

### 1.2 Enable Netlify Identity (untuk CMS Login)

1. **Di Netlify Dashboard** → Pilih site Anda → **Identity**
2. Klik **"Enable Identity"**
3. **Settings & Usage** → **Registration**:
   - Set: **"Invite only"** ✅ (recommended untuk keamanan)
   - Save

4. **Services** → **Git Gateway**:
   - Klik **"Enable Git Gateway"**
   - Klik **"Generate access token in GitHub"**
   - Authorize GitHub
   - Status: ✅ **Enabled**

### 1.3 Invite Admin User (Diri Anda)

1. **Identity** tab → Klik **"Invite users"**
2. Masukkan **email Anda** (email yang akan digunakan untuk login CMS)
3. Klik **"Send"**
4. **Check email inbox** → Buka email dari Netlify
5. Klik **"Accept the invite"**
6. **Set password** untuk login CMS Anda
7. ✅ **Done!** Anda sudah punya akun CMS admin

### 1.4 Test CMS Access

1. Buka: `https://caaip-cms.netlify.app/admin`
2. Klik **"Login with Netlify Identity"**
3. Login dengan:
   - Email: (email yang Anda invite tadi)
   - Password: (password yang Anda set)
4. **Dashboard CMS terbuka** → ✅ Success!

**🎉 CMS sudah siap digunakan!**

---

## 🌐 STEP 2: Setup Hostinger

### 2.1 Login Hostinger

1. Login ke: https://hpanel.hostinger.com
2. Pilih hosting package Anda

### 2.2 Point Domain caaip.id

**Jika domain SUDAH dibeli di Hostinger:**
- Domain otomatis terpoint ke hosting Anda
- Skip ke step 2.3

**Jika domain di registrar lain (Niagahoster, Rumahweb, dll):**
1. Login ke dashboard registrar domain
2. Cari **DNS Management** atau **Name Servers**
3. Update nameservers ke:
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
   (Atau check nameserver yang diberikan Hostinger di hPanel)
4. Save changes
5. **Tunggu propagasi**: 1-24 jam (biasanya 1-2 jam)

### 2.3 Add Domain di Hostinger (jika belum)

1. **hPanel** → **Domains** → **"Add Domain"**
2. Masukkan: `caaip.id`
3. Pilih hosting yang akan digunakan
4. Klik **"Add"**

### 2.4 Install SSL Certificate (HTTPS)

1. **hPanel** → **SSL**
2. Pilih domain: `caaip.id`
3. Klik **"Install SSL"**
4. Pilih: **Let's Encrypt** (gratis, auto-renew)
5. **Tunggu instalasi**: ~5-15 menit
6. Status jadi: ✅ **Active**

---

## 📤 STEP 3: Upload Website ke Hostinger

### 3.1 Build Website di Local

```powershell
# Di folder project
cd "E:\POLTEKSSN\TINGKAT 4\PKL\CAAIP"

# Install dependencies (jika belum)
npm install

# Build production
npm run build
```

✅ **Output**: Folder `dist/` berisi website static

### 3.2 Upload via File Manager (Metode Mudah)

1. **hPanel** → **File Manager**
2. Navigate ke folder: `public_html`
3. **Hapus semua file default** (index.html, cgi-bin, dll)
4. Pastikan `public_html` **KOSONG**
5. **Upload files**:
   - Klik **"Upload"**
   - Pilih **SEMUA ISI** folder `dist/`
   - ⚠️ **PENTING**: Upload ISI folder dist, BUKAN folder dist-nya!
   
   **Struktur yang benar di `public_html`**:
   ```
   public_html/
   ├── index.html
   ├── 404.html
   ├── .htaccess         ← upload file ini juga!
   ├── admin/
   ├── uploads/
   ├── _astro/
   ├── alumni/
   ├── berita/
   ├── kabar-duka/
   ├── profil/
   ├── en/
   └── ... (dll)
   ```

6. **Upload file .htaccess**:
   - File `.htaccess` ada di root project
   - Upload ke `public_html/.htaccess`
   - File ini penting untuk clean URLs & HTTPS redirect

7. ✅ **Done!** Tunggu upload selesai

### 3.3 Test Website

1. Buka: **https://caaip.id**
2. Cek:
   - ✅ Homepage load
   - ✅ SSL aktif (🔒 di browser)
   - ✅ Menu navigasi bekerja
   - ✅ Halaman berita, alumni, profil bisa dibuka
   - ✅ Gambar/images load

---

## 🔄 STEP 4: Setup Auto-Deploy dengan GitHub Actions

### 4.1 Generate FTP Credentials di Hostinger

1. **hPanel** → **FTP Accounts**
2. Jika sudah ada FTP account:
   - Klik **"Reset Password"**
   - Set password baru
   - **Simpan password ini!** (akan digunakan di GitHub)
   
3. Catat informasi:
   ```
   FTP Server: ftp.caaip.id
   FTP Username: u123456789 (dari Hostinger)
   FTP Password: (password yang baru Anda set)
   FTP Port: 21
   ```

### 4.2 Add Secrets di GitHub Repository

1. Buka repository: https://github.com/fandcomp/CAAIP
2. Klik **Settings** (tab atas)
3. **Secrets and variables** → **Actions**
4. Klik **"New repository secret"**

5. **Tambahkan 3 secrets**:

   **Secret 1:**
   ```
   Name: FTP_SERVER
   Value: ftp.caaip.id
   ```
   
   **Secret 2:**
   ```
   Name: FTP_USERNAME
   Value: u123456789
   ```
   (ganti dengan username FTP Anda dari Hostinger)
   
   **Secret 3:**
   ```
   Name: FTP_PASSWORD
   Value: your_actual_password
   ```
   (password FTP yang Anda set tadi)

6. Klik **"Add secret"** untuk masing-masing

### 4.3 Verify GitHub Actions Workflow

File workflow sudah ada di repository:
- **File**: `.github/workflows/deploy-hostinger.yml`
- **Status**: ✅ Ready to use

Workflow ini akan:
- ✅ Trigger otomatis saat push ke branch `main`
- ✅ Build website dengan `npm run build`
- ✅ Upload hasil build ke Hostinger via FTP
- ✅ Update website otomatis (~2-3 menit)

### 4.4 Test Auto-Deploy

**Test 1: Via Git Push**
```powershell
# Edit file kecil (contoh: README.md)
git add .
git commit -m "test: auto-deploy to hostinger"
git push
```

**Test 2: Via CMS**
1. Login ke CMS: `https://caaip-cms.netlify.app/admin`
2. **Berita** → **New Berita**
3. Isi form:
   - Judul: "Test Auto-Deploy"
   - Tanggal: Hari ini
   - Konten: "Testing deployment workflow"
4. Klik **"Publish"**
5. CMS akan commit ke GitHub

**Monitor Deployment:**
1. Buka: https://github.com/fandcomp/CAAIP/actions
2. Lihat workflow **"Deploy to Hostinger"** running
3. Tunggu status: ✅ **Success** (~2-3 menit)
4. Refresh https://caaip.id
5. **Berita baru muncul!** 🎉

---

## 📊 Monitoring & Troubleshooting

### Check Deployment Status

**GitHub Actions:**
- URL: https://github.com/fandcomp/CAAIP/actions
- Lihat log detail untuk debugging

**Netlify Dashboard:**
- URL: https://app.netlify.com
- Monitor CMS uptime & Identity users

### Common Issues

**❌ Website tidak update setelah publish di CMS:**
- Check GitHub Actions: Apakah workflow berhasil?
- Check FTP credentials di GitHub Secrets
- Check error log di Actions tab

**❌ CMS tidak bisa login:**
- Pastikan Netlify Identity sudah enabled
- Pastikan Git Gateway sudah enabled
- Check email invite, pastikan sudah accepted

**❌ SSL error di caaip.id:**
- Tunggu 24 jam untuk DNS propagation
- Re-install SSL di Hostinger panel
- Check nameservers sudah benar

**❌ GitHub Actions gagal upload FTP:**
- Verify FTP credentials di Secrets
- Test FTP connection dengan FileZilla
- Check server-dir path: `/public_html/`

### Manual Re-Deploy

Jika perlu re-deploy manual:

1. **Via GitHub Actions:**
   - Buka: https://github.com/fandcomp/CAAIP/actions
   - Pilih workflow: **"Deploy to Hostinger"**
   - Klik **"Run workflow"**
   - Pilih branch: `main`
   - Klik **"Run workflow"**

2. **Via Local Build:**
   ```powershell
   npm run build
   ```
   Upload folder `dist/` ke Hostinger via File Manager

---

## 🎯 Workflow Lengkap

```
┌─────────────────────────────────────────────────────────┐
│  CONTENT MANAGEMENT WORKFLOW                             │
└─────────────────────────────────────────────────────────┘

1. EDITOR LOGIN
   └─ https://caaip-cms.netlify.app/admin
   └─ Login with Netlify Identity
      │
      ▼
2. EDIT CONTENT
   └─ Add/Edit: Berita, Kabar Duka, Alumni
   └─ Upload images via CMS
   └─ Click "Publish"
      │
      ▼
3. CMS COMMITS TO GITHUB
   └─ Git Gateway pushes to main branch
   └─ Commit message: "Create berita..."
      │
      ▼
4. GITHUB ACTIONS TRIGGERED
   └─ Detect push to main
   └─ npm install
   └─ npm run build
   └─ Upload dist/ to Hostinger (FTP)
      │
      ▼
5. WEBSITE UPDATED
   └─ https://caaip.id
   └─ New content LIVE!
   └─ Total time: ~2-3 minutes
```

---

## 💰 Cost Summary

| Service | Cost | Purpose |
|---------|------|---------|
| **Hostinger** | ~Rp 20.000-50.000/bulan | Web hosting + domain |
| **Netlify** | **FREE** | CMS admin + Identity |
| **GitHub** | **FREE** | Repository + Actions |
| **Total** | **~Rp 20.000-50.000/bulan** | 🎉 Sangat affordable! |

---

## 🎓 Tips & Best Practices

### Content Management
- ✅ **Draft first**: Test content di CMS sebelum publish
- ✅ **Optimize images**: Resize gambar sebelum upload (~500KB max)
- ✅ **Backup**: GitHub auto-backup semua content

### Security
- ✅ **Invite only**: Set Netlify Identity ke "Invite only"
- ✅ **Strong password**: Gunakan password kuat untuk CMS
- ✅ **FTP password**: Simpan FTP password dengan aman
- ✅ **2FA**: Enable 2FA di GitHub & Netlify

### Performance
- ✅ **Cloudflare**: Aktifkan Cloudflare di Hostinger (gratis)
- ✅ **Image optimization**: Use WebP format untuk gambar
- ✅ **Cache**: .htaccess sudah set cache headers

### SEO
- ✅ **Google Search Console**: Submit sitemap.xml
- ✅ **Analytics**: Add Google Analytics di layout
- ✅ **Meta tags**: Lengkapi meta description di halaman

---

## 🆘 Support Resources

- **Hostinger Support**: https://www.hostinger.com/contact
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Actions**: https://docs.github.com/actions
- **Decap CMS**: https://decapcms.org/docs

---

## ✅ Final Checklist

Sebelum go-live, pastikan semua ini sudah ✅:

### Website (Hostinger)
- [ ] Domain caaip.id accessible
- [ ] SSL certificate installed (HTTPS)
- [ ] All pages load correctly
- [ ] Images load correctly
- [ ] Navigation works
- [ ] 404 page works

### CMS (Netlify)
- [ ] Netlify site deployed
- [ ] Netlify Identity enabled
- [ ] Git Gateway enabled
- [ ] Admin user invited & accepted
- [ ] Can login to /admin
- [ ] Can create/edit content
- [ ] Can upload images

### Auto-Deploy (GitHub Actions)
- [ ] FTP secrets added to GitHub
- [ ] Workflow file exists
- [ ] Manual trigger test: ✅ Success
- [ ] CMS publish test: ✅ Success
- [ ] Website auto-updates after publish

### Optional Enhancements
- [ ] Custom Netlify domain (admin.caaip.id)
- [ ] Cloudflare CDN setup
- [ ] Google Analytics installed
- [ ] Search Console verified
- [ ] Backup strategy documented

---

**🎉 Selamat! Setup hybrid deployment selesai!**

**Dokumentasi dibuat:** November 9, 2025
**Versi:** 1.0
