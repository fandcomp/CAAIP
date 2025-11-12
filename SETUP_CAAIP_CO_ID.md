# 🚀 Setup CAAIP.CO.ID - Panduan Lengkap

## 📋 Yang Sudah Disiapkan

✅ Domain: **caaip.co.id** (sudah dibeli)
✅ Hosting: **Hostinger Single Web Hosting**
✅ Source Code: **GitHub (fandcomp/CAAIP)**
✅ CMS: **Decap CMS** (siap digunakan)

---

## 🎯 Arsitektur Setup

```
┌─────────────────────────────────────────────────────────┐
│  🌐 Website: https://caaip.co.id                        │
│     └─ Hostinger (Static Files)                         │
│     └─ Auto-deploy dari GitHub Actions                  │
└─────────────────────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────────────────────┐
│  ⚙️ CMS Admin: netlify.app/admin                       │
│     └─ Netlify (Free!)                                  │
│     └─ Decap CMS + Netlify Identity                     │
│     └─ Login untuk edit content                         │
└─────────────────────────────────────────────────────────┘
              ↕
┌─────────────────────────────────────────────────────────┐
│  📦 GitHub Repository                                    │
│     └─ fandcomp/CAAIP                                   │
│     └─ GitHub Actions (Auto-deploy)                     │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 STEP 1: Setup Domain di Hostinger

### 1.1 Login Hostinger
1. Buka: https://hpanel.hostinger.com
2. Login dengan akun Anda

### 1.2 Verifikasi Domain
1. Klik menu **"Domains"**
2. Cari domain **caaip.co.id**
3. Pastikan status: **Active** ✅
4. Pastikan domain sudah pointing ke hosting Anda

### 1.3 Install SSL Certificate
1. Di hPanel, klik **"SSL"**
2. Pilih domain: **caaip.co.id**
3. Klik **"Install SSL"**
4. Pilih: **Let's Encrypt** (gratis)
5. Klik **"Install"**
6. Tunggu 5-15 menit sampai status: ✅ **Active**

**Catatan:** Jika SSL belum bisa diinstall, tunggu propagasi DNS (bisa 1-24 jam)

---

## 📤 STEP 2: Build & Upload Website

### 2.1 Build Website di Local

```powershell
# Buka PowerShell di folder project
cd "E:\POLTEKSSN\TINGKAT 4\PKL\CAAIP"

# Install dependencies (jika belum)
npm install

# Build production
npm run build
```

✅ **Output:** Folder `dist/` berisi semua file website

### 2.2 Upload ke Hostinger

**Opsi A: Via File Manager (Mudah)**

1. **Login hPanel** → Klik **"File Manager"**

2. **Navigate ke public_html:**
   - Klik folder `public_html`
   - **PENTING:** Hapus semua file default di dalamnya
   - Pastikan folder `public_html` **KOSONG**

3. **Upload semua file:**
   - Klik tombol **"Upload"** di File Manager
   - Pilih **SEMUA FILE** dari folder `dist/` (bukan folder dist-nya!)
   - Tunggu upload selesai

4. **Upload file .htaccess:**
   - File `.htaccess` ada di root project
   - Upload ke `public_html/.htaccess`
   - File ini untuk HTTPS redirect & clean URLs

**Struktur yang benar di `public_html`:**
```
public_html/
├── index.html
├── 404.html
├── .htaccess          ← PENTING!
├── admin/
├── uploads/
├── _astro/
├── alumni/
├── berita/
├── kabar-duka/
├── profil/
├── en/
├── caaip-logo.png
├── kemenhub.png
└── ... (semua file dari dist)
```

**Opsi B: Via FTP (Lebih Cepat untuk Banyak File)**

1. **Download FileZilla:**
   - https://filezilla-project.org/download.php?type=client

2. **Get FTP Credentials dari Hostinger:**
   - hPanel → **"FTP Accounts"**
   - Copy:
     ```
     Host: ftp.caaip.co.id (atau IP address)
     Username: u123456789 (dari panel)
     Password: (lihat atau reset di panel)
     Port: 21
     ```

3. **Connect dengan FileZilla:**
   - Buka FileZilla
   - File → Site Manager → New Site
   - Masukkan credentials
   - Protocol: FTP
   - Encryption: Use explicit FTP over TLS if available
   - Connect

4. **Upload Files:**
   - **Left panel (Local):** Navigate ke folder `dist/`
   - **Right panel (Remote):** Navigate ke `/public_html/`
   - Select ALL files di `dist/`
   - Right click → Upload
   - Tunggu transfer selesai (~2-5 menit tergantung koneksi)

---

## ✅ STEP 3: Test Website

### 3.1 Akses Website
1. Buka browser
2. Ketik: **https://caaip.co.id**
3. Tekan Enter

### 3.2 Cek yang Harus Berfungsi:
- ✅ Homepage load dengan baik
- ✅ SSL aktif (🔒 icon hijau di browser)
- ✅ Menu navigasi berfungsi
- ✅ Halaman Berita bisa dibuka
- ✅ Halaman Alumni bisa dibuka
- ✅ Halaman Profil bisa dibuka
- ✅ Halaman Kabar Duka bisa dibuka
- ✅ Logo & gambar load semua
- ✅ Footer muncul dengan benar

**Jika ada error 404 atau CSS tidak load:**
- Clear browser cache (Ctrl + Shift + Delete)
- Refresh dengan Ctrl + F5
- Tunggu 5-10 menit untuk propagasi

---

## 🎨 STEP 4: Setup Netlify untuk CMS

### 4.1 Deploy ke Netlify

1. **Login Netlify:**
   - Buka: https://app.netlify.com
   - Login dengan GitHub account

2. **Import Repository:**
   - Klik **"Add new site"** → **"Import an existing project"**
   - Pilih **GitHub**
   - Authorize Netlify
   - Pilih repository: **fandcomp/CAAIP**

3. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   Branch to deploy: main
   ```

4. **Deploy Site:**
   - Klik **"Deploy site"**
   - Tunggu build selesai (~2-3 menit)
   - Anda dapat URL: `https://[random-name].netlify.app`

5. **Rename Site (Optional):**
   - Site settings → **"Change site name"**
   - Ubah ke: `caaip-cms`
   - URL jadi: `https://caaip-cms.netlify.app`

### 4.2 Enable Netlify Identity (untuk Login CMS)

1. **Di Netlify Dashboard:**
   - Pilih site Anda
   - Klik tab **"Identity"**
   - Klik **"Enable Identity"**

2. **Configure Registration:**
   - Settings → **Registration**
   - Set: **"Invite only"** ✅
   - Save

3. **Enable Git Gateway:**
   - Identity → Services → **Git Gateway**
   - Klik **"Enable Git Gateway"**
   - Authorize GitHub
   - Status jadi: ✅ **Enabled**

### 4.3 Invite Admin User

1. **Identity** tab → Klik **"Invite users"**
2. Masukkan **email Anda**
3. Klik **"Send"**
4. **Check email inbox**
5. Klik link **"Accept the invite"**
6. **Set password** untuk login CMS
7. ✅ **Done!**

### 4.4 Test CMS

1. Buka: `https://caaip-cms.netlify.app/admin`
2. Klik **"Login with Netlify Identity"**
3. Login dengan email & password
4. **Dashboard CMS terbuka** ✅

---

## 🔄 STEP 5: Setup Auto-Deploy

### 5.1 Generate FTP Password di Hostinger

1. **hPanel** → **"FTP Accounts"**
2. Jika sudah ada account:
   - Klik **"Manage"** atau **"..."** (titik tiga)
   - Klik **"Reset Password"**
   - Set password baru
   - **SIMPAN PASSWORD INI!**

3. Catat informasi FTP:
   ```
   FTP Server: ftp.caaip.co.id
   FTP Username: u123456789 (dari panel)
   FTP Password: (password yang baru Anda set)
   FTP Port: 21
   ```

### 5.2 Add Secrets di GitHub

1. Buka: https://github.com/fandcomp/CAAIP
2. Klik tab **"Settings"**
3. **Secrets and variables** → **Actions**
4. Klik **"New repository secret"**

5. **Add 3 secrets:**

   **Secret 1:**
   ```
   Name: FTP_SERVER
   Value: ftp.caaip.co.id
   ```
   
   **Secret 2:**
   ```
   Name: FTP_USERNAME
   Value: u123456789
   ```
   *(ganti dengan username FTP Anda dari Hostinger)*
   
   **Secret 3:**
   ```
   Name: FTP_PASSWORD
   Value: password_anda_yang_baru_dibuat
   ```

6. Klik **"Add secret"** untuk masing-masing

### 5.3 Test Auto-Deploy

**Test 1: Manual Trigger**
1. Buka: https://github.com/fandcomp/CAAIP/actions
2. Klik workflow: **"Deploy to Hostinger"**
3. Klik **"Run workflow"**
4. Pilih branch: `main`
5. Klik **"Run workflow"**
6. Tunggu ~2-3 menit
7. Status: ✅ **Success**
8. Refresh https://caaip.co.id

**Test 2: Via CMS (Test Lengkap)**
1. Login ke CMS: `https://caaip-cms.netlify.app/admin`
2. Buka **"Berita"** → **"New Berita"**
3. Isi form:
   ```
   Judul: Test Deployment caaip.co.id
   Tanggal: Hari ini
   Bahasa: id
   Konten: Website CAAIP sudah live di caaip.co.id!
   ```
4. Klik **"Publish"**
5. Tunggu 2-3 menit
6. Buka: https://github.com/fandcomp/CAAIP/actions
7. Lihat workflow running: **"Deploy to Hostinger"**
8. Tunggu status: ✅ **Success**
9. Refresh https://caaip.co.id
10. **Berita baru muncul!** 🎉

---

## 🔍 STEP 6: Verifikasi Final

### ✅ Checklist Sebelum Go-Live:

**Website (caaip.co.id):**
- [ ] Domain accessible tanpa error
- [ ] SSL aktif (HTTPS, bukan HTTP)
- [ ] Homepage load sempurna
- [ ] Semua menu navigasi berfungsi
- [ ] Halaman berita tampil
- [ ] Halaman alumni tampil
- [ ] Halaman profil tampil
- [ ] Halaman kabar duka tampil
- [ ] Footer tampil dengan benar
- [ ] Logo & gambar load semua
- [ ] Responsive di mobile
- [ ] No console errors (F12)

**CMS (Netlify):**
- [ ] Netlify site deployed
- [ ] Netlify Identity enabled
- [ ] Git Gateway enabled
- [ ] Admin user invited & activated
- [ ] Bisa login ke /admin
- [ ] Bisa create/edit berita
- [ ] Bisa upload gambar
- [ ] Publish berhasil commit ke GitHub

**Auto-Deploy:**
- [ ] FTP secrets added ke GitHub
- [ ] Workflow file exists
- [ ] Manual trigger test: ✅
- [ ] CMS publish test: ✅
- [ ] Website auto-update setelah publish

---

## 🎯 Workflow Setelah Setup

### Untuk Edit Konten:
1. Buka: `https://caaip-cms.netlify.app/admin`
2. Login dengan email & password
3. Edit content (Berita, Alumni, dll)
4. Klik **"Publish"**
5. Tunggu ~2-3 menit
6. Website auto-update di https://caaip.co.id

### Untuk Update Code:
```powershell
# Edit code di local
# Commit & push
git add .
git commit -m "feat: update something"
git push

# GitHub Actions otomatis deploy ke Hostinger
# Tunggu ~2-3 menit
# Website auto-update
```

---

## 🆘 Troubleshooting

### ❌ Domain tidak bisa diakses
**Solusi:**
- Tunggu propagasi DNS (1-24 jam)
- Check nameservers di registrar domain
- Pastikan pointing ke Hostinger

### ❌ SSL error / Not Secure
**Solusi:**
- Tunggu SSL installation selesai (15 menit)
- Re-install SSL di Hostinger panel
- Force HTTPS di .htaccess (sudah ada)

### ❌ CSS/JS tidak load
**Solusi:**
- Clear browser cache
- Check file .htaccess sudah diupload
- Check semua file di dist/ sudah diupload

### ❌ CMS tidak bisa login
**Solusi:**
- Pastikan Netlify Identity enabled
- Pastikan Git Gateway enabled
- Check email invitation sudah accepted
- Reset password di Netlify Identity

### ❌ Auto-deploy gagal
**Solusi:**
- Check FTP credentials di GitHub Secrets
- Test FTP connection dengan FileZilla
- Check GitHub Actions logs untuk error detail

### ❌ Berita baru tidak muncul setelah publish
**Solusi:**
- Check GitHub Actions status
- Tunggu deployment selesai (~2-3 menit)
- Clear browser cache
- Check apakah commit masuk ke GitHub

---

## 📊 Monitoring

### Check Deployment Status
- **GitHub Actions:** https://github.com/fandcomp/CAAIP/actions
- **Netlify Dashboard:** https://app.netlify.com

### Website Analytics (Opsional)
Tambahkan Google Analytics:
1. Buat property di Google Analytics
2. Copy tracking code
3. Tambahkan ke `src/layouts/BaseLayout.astro`

---

## 💡 Tips & Best Practices

### Content Management
- ✅ Draft content dulu sebelum publish
- ✅ Optimize gambar sebelum upload (max 500KB)
- ✅ Gunakan alt text untuk semua gambar
- ✅ Preview content di CMS sebelum publish

### Security
- ✅ Gunakan password kuat untuk CMS
- ✅ Set Netlify Identity ke "Invite only"
- ✅ Simpan FTP password dengan aman
- ✅ Enable 2FA di GitHub & Netlify

### Performance
- ✅ Aktifkan Cloudflare di Hostinger (gratis)
- ✅ Compress gambar sebelum upload
- ✅ Monitor loading speed dengan PageSpeed Insights

### SEO
- ✅ Submit sitemap.xml ke Google Search Console
- ✅ Lengkapi meta description di setiap halaman
- ✅ Gunakan heading tags dengan benar (H1, H2, H3)

---

## 🎉 Selamat!

Website CAAIP sudah **LIVE** di **https://caaip.co.id**!

### Next Steps:
1. ✅ Tambahkan konten berita
2. ✅ Upload data alumni lengkap
3. ✅ Update profil organisasi
4. ✅ Share link ke social media
5. ✅ Monitor analytics

---

**Dokumentasi dibuat:** November 12, 2025
**Domain:** caaip.co.id
**Status:** Production Ready ✅
