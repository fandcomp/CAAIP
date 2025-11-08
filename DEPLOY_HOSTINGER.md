# 🚀 Panduan Deploy CAAIP ke Hostinger (caaip.id)

## 📋 Overview Setup

**Arsitektur Hybrid:**
```
┌──────────────────────────────────────────┐
│   caaip.id (Website Public)              │
│   Hosted: Hostinger (Static Files)       │
│   - Homepage, Berita, Alumni, Profil     │
│   - Super cepat, full control            │
└──────────────────────────────────────────┘
                  ↕
┌──────────────────────────────────────────┐
│   admin.caaip.id (CMS Admin)             │
│   Hosted: Netlify (Identity + CMS)       │
│   - Login dengan Netlify Identity        │
│   - Edit konten via Decap CMS            │
│   - Auto commit ke GitHub                │
└──────────────────────────────────────────┘
                  ↕
┌──────────────────────────────────────────┐
│   GitHub Repository                       │
│   - Source code                           │
│   - Content (JSON, Markdown)             │
│   - Auto sync dari CMS                   │
└──────────────────────────────────────────┘
```

**Kenapa Hybrid?**
- ✅ Website di Hostinger (cepat, murah, kontrol penuh)
- ✅ CMS tetap berfungsi (Netlify Identity gratis & reliable)
- ✅ No complex setup (tidak perlu OAuth server sendiri)
- ✅ Best of both worlds

---

## 🎯 Persiapan

### Yang Anda Butuhkan:

1. **Domain caaip.id** (sudah beli atau akan beli)
2. **Hostinger Account** dengan hosting aktif
3. **Netlify Account** (gratis, untuk CMS admin)
4. **GitHub Account** (repo CAAIP)

### File yang Sudah Disesuaikan:

- ✅ `astro.config.mjs` - Site URL → `https://caaip.id`
- ✅ `public/admin/config.yml` - CMS config (git-gateway)
- ✅ `netlify.toml` - Build config untuk CMS subdomain

---

## 📤 STEP 1: Build Website untuk Hostinger

### 1.1 Build Project

```powershell
# Di folder project
cd "E:\POLTEKSSN\TINGKAT 4\PKL\CAAIP"

# Install dependencies (jika belum)
npm install

# Build production
npm run build
```

**Output:** Folder `dist/` berisi website static siap upload

### 1.2 Verify Build

```powershell
# Preview build
npm run preview
```

Buka http://localhost:4321 untuk test

---

## 🌐 STEP 2: Setup Domain di Hostinger

### 2.1 Login Hostinger

1. Login ke https://hpanel.hostinger.com
2. Pilih hosting Anda

### 2.2 Point Domain ke Hostinger

**Jika domain dibeli di Hostinger:**
- Domain sudah otomatis terpoint
- Skip ke step 2.3

**Jika domain di registrar lain (Niagahoster, GoDaddy, dll):**
1. Login ke registrar domain
2. DNS Management → Update nameservers:
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
   (Atau lihat nameserver di Hostinger panel)

3. Save & tunggu propagasi (1-24 jam)

### 2.3 Add Domain di Hostinger

1. hPanel → **Domains**
2. Klik **"Add Domain"** atau **"Park Domain"**
3. Masukkan: `caaip.id`
4. Pilih hosting yang akan digunakan
5. Klik **"Add Domain"**

### 2.4 Setup SSL (HTTPS)

1. hPanel → **SSL**
2. Pilih domain `caaip.id`
3. Klik **"Install SSL"** (gratis Let's Encrypt)
4. Tunggu 5-15 menit

---

## 📂 STEP 3: Upload Website ke Hostinger

### Metode A: File Manager (Mudah, untuk pemula)

1. **hPanel → File Manager**

2. **Navigate ke public_html**
   - Jika ada file default (index.html, cgi-bin), **delete semua**
   - Pastikan `public_html` kosong

3. **Upload folder dist**
   - Klik **"Upload Files"**
   - Pilih **SEMUA ISI** folder `dist/` (jangan upload folder dist-nya!)
   - File yang harus ada di root `public_html`:
     ```
     public_html/
     ├── index.html
     ├── 404.html
     ├── admin/
     ├── uploads/
     ├── images/
     ├── _astro/
     ├── alumni/
     ├── berita/
     ├── profil/
     ├── en/
     └── ... (semua file dari dist)
     ```

4. **Tunggu upload selesai**

### Metode B: FTP (Lebih cepat untuk banyak file)

1. **Download FTP Client:**
   - FileZilla: https://filezilla-project.org

2. **Get FTP Credentials:**
   - hPanel → **FTP Accounts**
   - Copy:
     - Host: `ftp.caaip.id` (atau IP dari panel)
     - Username: `u123456789` (dari panel)
     - Password: (buat atau lihat di panel)
     - Port: `21`

3. **Connect dengan FileZilla:**
   - File → Site Manager → New Site
   - Paste credentials
   - Connect

4. **Upload Files:**
   - **Local site:** Navigate ke folder `dist/`
   - **Remote site:** Navigate ke `/public_html/`
   - Select ALL files di `dist/` → Right click → Upload
   - Tunggu transfer selesai

---

## 🎨 STEP 4: Setup Subdomain untuk CMS Admin

### 4.1 Create Subdomain di Hostinger

1. **hPanel → Subdomains**
2. Klik **"Create Subdomain"**
3. **Subdomain:** `admin`
4. **Domain:** `caaip.id`
5. **Document root:** `/public_html/admin-cms` (folder baru)
6. Klik **"Create"**

**Result:** `admin.caaip.id` subdomain created

### 4.2 Deploy Admin ke Netlify

1. **Login Netlify:** https://app.netlify.com

2. **Import dari GitHub:**
   - Sites → **"Add new site"** → **"Import an existing project"**
   - Connect to GitHub
   - Pilih repo **"CAAIP"**

3. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Deploy!** Klik **"Deploy site"**

5. **Rename Site:**
   - Site settings → **"Change site name"**
   - Rename to: `caaip-admin` (atau nama lain)
   - URL jadi: `https://caaip-admin.netlify.app`

### 4.3 Setup Custom Domain di Netlify

1. **Netlify Dashboard** → Site **"caaip-admin"** → **Domain settings**

2. **Add custom domain:**
   - Klik **"Add domain alias"**
   - Masukkan: `admin.caaip.id`
   - Netlify akan kasih instruksi DNS

3. **Update DNS di Hostinger:**
   - hPanel → **DNS/Zone Editor**
   - Add CNAME record:
     ```
     Type: CNAME
     Name: admin
     Points to: caaip-admin.netlify.app
     TTL: 3600
     ```
   - Save

4. **Verify di Netlify:**
   - Tunggu 5-30 menit
   - Netlify akan auto-install SSL untuk `admin.caaip.id`
   - Status jadi: ✅ **"Netlify DNS is set up correctly"**

---

## 🔐 STEP 5: Setup Netlify Identity (CMS Login)

### 5.1 Enable Identity

1. **Netlify Dashboard** → Site **"caaip-admin"** → **Identity**
2. Klik **"Enable Identity"**

### 5.2 Configure Identity

1. **Settings → Registration**
   - Set: **"Invite only"** (recommended)
   - Save

2. **Settings → External providers** (Optional)
   - Bisa tambah Google/GitHub login jika mau

### 5.3 Enable Git Gateway

1. **Identity → Services → Git Gateway**
2. Klik **"Enable Git Gateway"**
3. **Authorize GitHub** → Pilih repo **"CAAIP"**
4. Status jadi: ✅ **Enabled**

### 5.4 Invite Admin User (Anda)

1. **Identity → Invite users**
2. Masukkan **email Anda**
3. Klik **"Send"**
4. **Check email** → Klik link **"Accept the invite"**
5. **Set password** untuk login CMS
6. **Done!** ✅

---

## ✅ STEP 6: Test & Verify

### 6.1 Test Website Public

1. Buka: **https://caaip.id**
2. Pastikan:
   - ✅ Homepage load dengan benar
   - ✅ SSL aktif (🔒 hijau di browser)
   - ✅ Navigasi bekerja (Berita, Alumni, Profil)
   - ✅ Gambar load semua

### 6.2 Test Admin CMS

1. Buka: **https://admin.caaip.id/admin**
2. Klik **"Login with Netlify Identity"**
3. Login dengan email & password Anda
4. **Dashboard CMS terbuka** ✅

### 6.3 Test Upload Content

1. Di CMS Dashboard → **"Berita"** → **"New Berita"**
2. Isi:
   - Judul: "Test Deploy Hostinger"
   - Tanggal: Hari ini
   - Konten: "Website CAAIP sekarang hosted di Hostinger!"
3. Klik **"Publish"**
4. **Tunggu 1 menit** → Refresh https://caaip.id
5. **Berita baru TIDAK muncul** ❌ (ini normal! perlu rebuild)

---

## 🔄 STEP 7: Setup Auto-Deploy (Update Otomatis)

### Cara Kerja:

```
User edit content di CMS → Commit ke GitHub → Webhook → 
Auto build → Auto upload ke Hostinger
```

### Opsi A: GitHub Actions (RECOMMENDED ✅)

**Setup:**

1. **Generate Hostinger FTP Password:**
   - hPanel → FTP Accounts → Reset password
   - Copy password (simpan!)

2. **Add Secrets ke GitHub:**
   - Repo → Settings → Secrets and variables → Actions
   - Klik **"New repository secret"**
   - Add 3 secrets:
     ```
     FTP_SERVER: ftp.caaip.id
     FTP_USERNAME: u123456789
     FTP_PASSWORD: your_ftp_password
     ```

3. **GitHub Actions Workflow sudah dibuat:**
   - File: `.github/workflows/deploy-hostinger.yml`
   - Commit & push file ini ke GitHub
   - GitHub Actions akan otomatis running setiap kali ada push ke main branch

4. **Test Auto-Deploy:**
   - Edit content di CMS → Publish
   - Tunggu 2-3 menit
   - Check GitHub → Actions tab → Lihat status deploy
   - Refresh https://caaip.id → Content updated! ✅

<function_calls>
<invoke name="create_directory">
<parameter name="dirPath">e:\POLTEKSSN\TINGKAT 4\PKL\CAAIP\.github\workflows