# 🔐 Panduan Setup CMS Admin CAAIP

## 🎯 Arsitektur Deployment

```
┌─────────────────────────────────────────────────────┐
│  CMS Admin (Netlify)                                │
│  https://caaip-cms.netlify.app/admin               │
│  - Autentikasi (Netlify Identity)                  │
│  - Git Gateway                                       │
│  - Interface CMS untuk edit konten                  │
└─────────────────────────────────────────────────────┘
                      ↓
              Edit konten → Commit ke GitHub
                      ↓
┌─────────────────────────────────────────────────────┐
│  GitHub Repository                                   │
│  https://github.com/fandcomp/CAAIP                  │
│  - Simpan semua konten (Markdown + JSON)           │
│  - GitHub Actions auto-build                        │
└─────────────────────────────────────────────────────┘
                      ↓
              Trigger GitHub Actions
                      ↓
┌─────────────────────────────────────────────────────┐
│  Website Production (Hostinger)                     │
│  https://caaip.id                                   │
│  - Website utama yang diakses user                  │
│  - Auto-update setiap ada perubahan konten          │
└─────────────────────────────────────────────────────┘
```

---

## 📋 Tahap 1: Deploy CMS ke Netlify

### 1.1 Login Netlify

1. Buka https://www.netlify.com
2. Klik **Sign up** atau **Log in**
3. Pilih **Login with GitHub** (recommended)
4. Authorize Netlify untuk akses GitHub

### 1.2 Import Repository

1. Klik **Add new site** → **Import an existing project**
2. Pilih **Deploy with GitHub**
3. Cari dan pilih repository: **CAAIP**
4. **Configure:**
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Klik **Deploy site**

### 1.3 Setup Site Name

1. Setelah deploy selesai, masuk ke **Site settings**
2. Klik **Change site name**
3. Ubah nama jadi: `caaip` (atau nama lain yang mudah diingat)
4. URL Netlify jadi: `https://caaip.netlify.app`

**Penting:** Netlify hanya untuk backend CMS, user akan akses via `https://caaip.id/admin`

---

## 🔐 Tahap 2: Aktifkan Netlify Identity

### 2.1 Enable Identity

1. Di dashboard Netlify site, klik tab **Identity**
2. Klik **Enable Identity**
3. Tunggu beberapa detik sampai aktif

### 2.2 Enable Git Gateway

1. Masih di tab **Identity**
2. Scroll ke bawah, cari **Services**
3. Klik **Enable Git Gateway**
4. Confirm dengan klik **Enable Git Gateway** lagi

### 2.3 Set Registration Preferences

1. Di tab **Identity**, klik **Settings and usage**
2. Klik **Registration preferences** → **Edit settings**
3. Pilih **Invite only** (hanya bisa via undangan)
4. Klik **Save**

**Penting:** Set "Invite only" agar tidak sembarang orang bisa daftar!

### 2.4 Enable External Providers (Opsional)

Jika ingin login dengan Google/GitHub:

1. **Identity** → **Settings and usage**
2. **External providers** → **Add provider**
3. Pilih **Google** atau **GitHub**
4. Follow instruksi setup OAuth

---

## 👤 Tahap 3: Invite Admin User (Diri Sendiri)

### 3.1 Invite User

1. Di tab **Identity**, klik **Invite users**
2. Masukkan **email Anda**
3. Klik **Send**

### 3.2 Accept Invitation

1. **Cek email** Anda (termasuk folder spam)
2. Klik link **"Accept the invite"** di email
3. Anda akan dibawa ke halaman **complete signup**
4. **Set password** untuk akses CMS
5. Klik **Sign up** / **Complete signup**

### 3.3 Confirm Account

1. Setelah set password, Anda akan auto-login
2. Account siap digunakan!

---

## 🔗 Tahap 4: Akses CMS Admin

### 4.1 URL CMS Admin

**Akses CMS via domain utama:**
```
https://caaip.id/admin
```

**Catatan:** Netlify hanya digunakan untuk:
- Backend autentikasi (Netlify Identity)
- Git Gateway untuk commit ke GitHub
- Bukan untuk akses CMS (user tetap pakai caaip.id/admin)

### 4.2 Login CMS

1. Buka URL CMS admin
2. Klik **Login with Netlify Identity**
3. Masukkan **email** dan **password** yang sudah di-set
4. Klik **Log in**

**Jika berhasil:** Anda akan masuk ke dashboard CMS dengan menu:
- Berita
- Kabar Duka
- Alumni (Per Angkatan)
- Pengurus CAAIP
- Profil CAAIP

---

## ✅ Tahap 5: Test Workflow CMS → Website

### 5.1 Create Test Content

1. **Login CMS** (https://caaip-cms.netlify.app/admin)
2. Klik **Berita** → **New Berita**
3. Isi form:
   - Judul: "Test CMS"
   - Tanggal: Pilih hari ini
   - Konten: "Ini test artikel dari CMS"
4. **Uncheck "Status (Draft)"** (agar langsung publish)
5. Klik **Publish**

### 5.2 Cek GitHub

1. Buka https://github.com/fandcomp/CAAIP
2. Klik tab **Actions**
3. Akan ada workflow **"Deploy to Hostinger"** sedang jalan
4. Tunggu sampai selesai (hijau ✅)

### 5.3 Verifikasi Website

1. Buka https://caaip.id/berita
2. Hard refresh: **Ctrl + F5**
3. Artikel "Test CMS" harusnya sudah muncul!

**Jika muncul:** CMS setup berhasil! 🎉

---

## ⚙️ Tahap 6: Konfigurasi Lanjutan

### 6.1 Update Site URL di CMS Config

Edit file `public/admin/config.yml`:

```yaml
backend:
  name: git-gateway
  branch: main

# Ganti dengan URL Netlify Anda
site_url: https://caaip.id
display_url: https://caaip.id

# Atau jika pakai Netlify URL untuk CMS
# site_url: https://caaip-cms.netlify.app
```

**Commit dan push:**
```powershell
git add public/admin/config.yml
git commit -m "Update CMS site URL"
git push origin main
```

### 6.2 Setup GitHub Secrets untuk Auto-Deploy

Pastikan secrets sudah diisi di:
https://github.com/fandcomp/CAAIP/settings/secrets/actions

**Required secrets:**
- `FTP_SERVER`: `145.79.14.179`
- `FTP_USERNAME`: `u239743347.caaip.id`
- `FTP_PASSWORD`: (password FTP Anda)

---

## 📊 Workflow Lengkap Setelah Setup

### Update Konten via CMS:

```
1. Login CMS (https://caaip.id/admin)
   ↓
2. Edit/Create konten → Publish
   ↓
3. CMS commit ke GitHub (otomatis via Netlify Identity)
   ↓
4. GitHub Actions triggered (otomatis)
   ↓
5. Build & deploy ke Hostinger (otomatis ~2-3 menit)
   ↓
6. Website updated! (https://caaip.id)
```

**Waktu total:** ~3-5 menit dari publish sampai live di website

### Update Kode:

```
1. Edit kode di VS Code
   ↓
2. npm run build
   ↓
3. git commit + push
   ↓
4. GitHub Actions auto-deploy
   ↓
5. Website updated!
```

Atau upload manual:
```
npm run build
.\upload-ftp.ps1
```

---

## 👥 Tahap 7: Invite Admin Lain (Opsional)

Jika ada orang lain yang perlu akses CMS:

### 7.1 Invite User

1. Netlify dashboard → **Identity** tab
2. Klik **Invite users**
3. Masukkan email mereka
4. Klik **Send**

### 7.2 User Accept Invitation

Mereka akan:
1. Terima email invitation
2. Klik link di email
3. Set password mereka
4. Login ke CMS dengan email + password

### 7.3 Manage Users

Di tab **Identity**, Anda bisa:
- Lihat semua user yang punya akses
- Revoke akses (Delete user)
- Resend invitation
- Change user role (jika pakai external provider)

---

## 🔐 Keamanan & Best Practices

### ✅ DO:

- **Invite only:** Jangan buka registrasi publik
- **Strong password:** Min 12 karakter, kombinasi huruf+angka+simbol
- **Regular audit:** Review user list setiap bulan
- **Backup:** Semua konten otomatis backup di GitHub (git history)
- **2FA:** Enable 2FA di akun GitHub Anda

### ❌ DON'T:

- Jangan share password CMS
- Jangan buat akun untuk "testing" lalu lupa delete
- Jangan publish langsung tanpa preview (gunakan Draft mode)
- Jangan invite user dengan email tidak jelas

---

## 🆘 Troubleshooting

### ❌ Email invitation tidak masuk

**Solusi:**
1. Cek folder **Spam/Junk**
2. Tunggu 5-10 menit
3. Resend invitation dari Netlify dashboard
4. Pastikan email valid dan aktif

---

### ❌ Tidak bisa login CMS

**Solusi:**
1. Pastikan sudah accept invitation
2. Pastikan password benar
3. Reset password:
   - Netlify dashboard → Identity
   - Klik user → Send password recovery
4. Clear browser cache, coba lagi

---

### ❌ Konten tidak muncul di website setelah publish

**Solusi:**
1. **Cek GitHub Actions:**
   - https://github.com/fandcomp/CAAIP/actions
   - Pastikan workflow sukses (hijau ✅)
   - Jika merah ❌, klik untuk lihat error

2. **Cek FTP Secrets:**
   - https://github.com/fandcomp/CAAIP/settings/secrets/actions
   - Pastikan FTP_SERVER, FTP_USERNAME, FTP_PASSWORD benar

3. **Manual trigger:**
   - GitHub → Actions → Deploy to Hostinger
   - Klik **Run workflow**

4. **Upload manual:**
   ```powershell
   npm run build
   .\upload-ftp.ps1
   ```

---

### ❌ Git Gateway error

**Solusi:**
1. Netlify → Identity → Services
2. Pastikan **Git Gateway** enabled
3. Disable → Enable lagi
4. Logout CMS → Login lagi

---

### ❌ "Error loading the CMS configuration"

**Solusi:**
1. Cek file `public/admin/config.yml` valid (YAML syntax benar)
2. Pastikan `backend: git-gateway` tertulis benar
3. Rebuild Netlify site:
   - Netlify dashboard → Deploys
   - Trigger deploy → Deploy site

---

## 📞 Support

**Dokumentasi:**
- Netlify Identity: https://docs.netlify.com/visitor-access/identity/
- Decap CMS: https://decapcms.org/docs/
- Git Gateway: https://docs.netlify.com/visitor-access/git-gateway/

**Need Help?**
- GitHub Issues: https://github.com/fandcomp/CAAIP/issues
- Netlify Support: https://answers.netlify.com

---

## 📝 Checklist Setup

Setelah selesai semua tahap, checklist ini harus ✅:

- [ ] Netlify site deployed
- [ ] Netlify Identity enabled
- [ ] Git Gateway enabled
- [ ] Admin user invited & confirmed
- [ ] CMS login sukses
- [ ] Test publish konten berhasil
- [ ] GitHub Actions running
- [ ] FTP secrets configured
- [ ] Website auto-update setelah CMS publish
- [ ] Panduan dibaca dan dipahami

**Jika semua ✅, setup CMS selesai!** 🎉

---

**Dibuat:** 17 November 2025  
**Versi:** 1.0  
**Status:** Production Ready ✅
