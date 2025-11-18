# 🚀 SETUP AUTO-DEPLOY: CMS → HOSTINGER

## ⚠️ MASALAH: Website caaip.id tidak update setelah publish di CMS

### 🔍 Penyebab:
- GitHub Actions membutuhkan **FTP Secrets** untuk deploy
- Secrets belum dikonfigurasi di GitHub Repository

---

## ✅ SOLUSI: Setup FTP Secrets di GitHub

### 📝 Langkah-langkah (WAJIB DILAKUKAN):

#### **1. Buka GitHub Repository Secrets**

```
https://github.com/fandcomp/CAAIP/settings/secrets/actions
```

Atau:
1. Buka https://github.com/fandcomp/CAAIP
2. Klik **Settings** (tab di atas)
3. Klik **Secrets and variables** → **Actions** (menu kiri)

#### **2. Tambahkan 3 Secrets**

Klik tombol **"New repository secret"** untuk masing-masing:

| Secret Name | Secret Value | Keterangan |
|-------------|--------------|------------|
| `FTP_SERVER` | `145.79.14.179` | Server FTP Hostinger |
| `FTP_USERNAME` | `u239743347.caaip.id` | Username FTP |
| `FTP_PASSWORD` | `[Password FTP Anda]` | Password FTP Hostinger |

**Cara menambahkan:**
1. Klik **"New repository secret"**
2. Name: `FTP_SERVER`
3. Secret: `145.79.14.179`
4. Klik **"Add secret"**
5. Ulangi untuk `FTP_USERNAME` dan `FTP_PASSWORD`

#### **3. Verifikasi Secrets Sudah Tersimpan**

Setelah selesai, Anda akan melihat 3 secrets:
- ✅ FTP_SERVER
- ✅ FTP_USERNAME
- ✅ FTP_PASSWORD

---

## 🧪 TESTING AUTO-DEPLOY

### **Test 1: Manual Trigger GitHub Actions**

1. Buka: https://github.com/fandcomp/CAAIP/actions
2. Klik workflow **"Deploy to Hostinger"**
3. Klik tombol **"Run workflow"** (dropdown)
4. Pilih branch: **main**
5. Klik **"Run workflow"** (hijau)
6. Tunggu proses selesai (~2-3 menit)
7. Check website: https://caaip.id

**Expected Result:** Website updated dengan konten terbaru ✅

### **Test 2: CMS Publish → Auto Deploy**

1. Login CMS: https://caaip.netlify.app/admin/
2. Edit berita atau buat berita baru
3. Klik **"Publish"**
4. Buka GitHub Actions: https://github.com/fandcomp/CAAIP/actions
5. Lihat workflow baru muncul dan berjalan otomatis
6. Tunggu selesai (~3-5 menit)
7. Refresh website: https://caaip.id
8. Konten baru muncul ✅

---

## 🛠️ ALTERNATIF: Deploy Manual (Jika GitHub Actions Bermasalah)

Jika GitHub Actions tidak berfungsi, gunakan script manual:

### **Opsi A: Deploy Full (Recommended)**

```powershell
.\deploy-manual.ps1
```

**Proses:**
1. Pull latest code dari GitHub
2. Install dependencies
3. Build website
4. Upload semua file ke Hostinger via FTP
5. Upload .htaccess

**Waktu:** ~5-10 menit (tergantung koneksi)

### **Opsi B: Upload FTP Saja (Jika sudah build lokal)**

```powershell
.\upload-ftp.ps1
```

**Proses:**
1. Upload folder `dist/` ke Hostinger

**Waktu:** ~2-3 menit

---

## 📊 Monitoring & Debugging

### **Check GitHub Actions Status**

```
https://github.com/fandcomp/CAAIP/actions
```

**Status yang baik:**
- ✅ Green checkmark = Success
- ⏳ Yellow dot = Running
- ❌ Red X = Failed (check logs)

### **Check Actions Logs (Jika Failed)**

1. Klik workflow yang failed
2. Klik job "deploy"
3. Baca error message
4. Common errors:
   - **FTP secrets missing** → Setup secrets (langkah di atas)
   - **FTP connection timeout** → Check Hostinger server status
   - **Build failed** → Check kode error, biasanya npm error

### **Force Trigger Workflow**

Jika CMS publish tidak trigger workflow:

```powershell
# Buat commit kosong untuk trigger workflow
git commit --allow-empty -m "Trigger deploy"
git push origin main
```

---

## ⚙️ Konfigurasi Workflow

### **File: `.github/workflows/deploy-hostinger.yml`**

Workflow akan **otomatis jalan** saat:
1. ✅ Ada push ke branch `main`
2. ✅ Manual trigger via GitHub UI
3. ✅ CMS publish (karena CMS commit ke GitHub)

### **File: `.github/workflows/deploy-on-cms-update.yml`**

Workflow khusus yang **hanya jalan** saat:
1. ✅ Ada perubahan di folder `src/content/**` (konten CMS)
2. ✅ Ada perubahan di folder `public/**` (file public)

Lebih efisien karena tidak deploy jika hanya update dokumentasi.

---

## 🔄 Workflow Lengkap (Auto-Deploy)

```
┌──────────────────────────────────────────────────────┐
│  WORKFLOW: CMS → GITHUB → HOSTINGER                  │
└──────────────────────────────────────────────────────┘

1. Admin edit di CMS (caaip.netlify.app/admin)
   ↓
2. Klik "Publish"
   ↓
3. CMS commit to GitHub (via Git Gateway)
   ↓
4. GitHub Actions triggered otomatis
   ↓
5. Actions run:
   - Checkout code
   - Install npm dependencies
   - Build website (npm run build)
   - Upload dist/ to Hostinger FTP
   - Upload .htaccess
   ↓
6. Website caaip.id UPDATED! ✅

⏱️ Total Time: 3-5 menit
```

---

## ✅ CHECKLIST SETUP

Pastikan semua langkah ini sudah dilakukan:

- [ ] **FTP Secrets** sudah ditambahkan di GitHub
  - [ ] FTP_SERVER = 145.79.14.179
  - [ ] FTP_USERNAME = u239743347.caaip.id
  - [ ] FTP_PASSWORD = [your password]

- [ ] **Netlify Identity** sudah di-setup
  - [ ] Identity enabled
  - [ ] Git Gateway enabled
  - [ ] Admin user invited & activated

- [ ] **Test Manual Trigger** berhasil
  - [ ] Workflow run manual dari GitHub Actions
  - [ ] Website caaip.id updated

- [ ] **Test CMS Publish** berhasil
  - [ ] Publish dari CMS
  - [ ] Workflow triggered otomatis
  - [ ] Website updated dalam 3-5 menit

---

## 🆘 TROUBLESHOOTING

### **Problem: Workflow tidak triggered setelah CMS publish**

**Solusi:**
1. Check apakah Git Gateway sudah enabled di Netlify
2. Check apakah commit muncul di GitHub (refresh repo page)
3. Jika commit ada tapi workflow tidak jalan:
   - Coba manual trigger workflow
   - Check apakah workflow file ada di `.github/workflows/`

### **Problem: Workflow failed dengan error "FTP connection refused"**

**Solusi:**
1. Check apakah FTP secrets benar
2. Test FTP connection manual via FileZilla:
   - Host: 145.79.14.179
   - Username: u239743347.caaip.id
   - Password: [your password]
   - Port: 21
3. Check Hostinger status (server down?)

### **Problem: Workflow success tapi website tidak update**

**Solusi:**
1. Clear browser cache (Ctrl + F5)
2. Wait 5-10 menit (Hostinger caching)
3. Check di Hostinger File Manager apakah file updated
4. Check timestamp file terakhir di FTP

### **Problem: Build failed di GitHub Actions**

**Solusi:**
1. Check error logs di Actions
2. Test build lokal: `npm run build`
3. Jika build lokal berhasil tapi di Actions gagal:
   - Mungkin issue dependencies
   - Coba commit `package-lock.json`

---

## 🔗 Quick Links

| Fungsi | URL |
|--------|-----|
| **GitHub Secrets Setup** | https://github.com/fandcomp/CAAIP/settings/secrets/actions |
| **GitHub Actions Monitor** | https://github.com/fandcomp/CAAIP/actions |
| **CMS Admin** | https://caaip.netlify.app/admin/ |
| **Website Production** | https://caaip.id |
| **Netlify Identity** | https://app.netlify.com/sites/caaip/identity |

---

**Status:** ⏳ Waiting for FTP Secrets Setup  
**Next Step:** Add FTP Secrets di GitHub → Test Manual Trigger → Test CMS Publish  
**Last Updated:** November 18, 2025
