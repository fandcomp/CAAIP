# 📦 Checklist Persiapan Hosting di Hostinger

## ✅ File yang Sudah Disesuaikan

### 1. **astro.config.mjs**
- ✅ Site URL diubah dari `caaip.netlify.app` → `caaip.id`
- ✅ Output mode: `static` (sudah benar)
- ✅ i18n config (sudah benar)

### 2. **.github/workflows/deploy-hostinger.yml** (BARU)
- ✅ GitHub Actions untuk auto-deploy ke Hostinger
- ✅ Trigger: setiap push ke main branch
- ✅ Build & upload via FTP otomatis

### 3. **.deployignore** (BARU)
- ✅ Daftar file yang tidak perlu di-deploy

---

## 🗂️ File/Folder yang TIDAK Perlu untuk Production

### Hapus Sebelum Deploy (Opsional):

```
preview.bat           # Helper script Windows (tidak perlu di production)
check-deploy.bat      # Helper script Windows (tidak perlu di production)
```

### File Dokumentasi (Opsional - bisa dihapus jika mau):

```
PANDUAN_*.md          # Panduan bahasa Indonesia
CARA_*.md             # Cara pakai fitur
COMPARISON_*.md       # Perbandingan teknis
RINGKASAN_*.md        # Ringkasan
PERBAIKAN_*.md        # Log perbaikan
CHANGELOG.md          # Log perubahan
SETUP_ADMIN.md        # Setup admin (sudah jalan)
```

**Catatan:** File .md tidak ikut ke-build, jadi tidak masalah jika tidak dihapus

---

## 📋 Yang HARUS Ada di Folder `dist/` (Hasil Build)

Setelah run `npm run build`, folder `dist/` harus berisi:

```
dist/
├── index.html                    # Homepage
├── 404.html                      # Error page
├── admin/                        # CMS admin folder
│   ├── index.html
│   └── config.yml
├── uploads/                      # Media files dari CMS
├── images/                       # Static images
├── _astro/                       # Astro assets (CSS, JS)
├── alumni/                       # Alumni pages
│   ├── 2026/
│   │   └── index.html
│   └── index.html
├── berita/                       # Berita pages
│   ├── peluncuran-portal-caaip/
│   │   └── index.html
│   └── index.html
├── profil/                       # Profil page
│   └── index.html
├── kabar-duka/                   # Kabar duka pages
│   └── index.html
├── en/                           # English version
│   ├── index.html
│   ├── berita/
│   ├── alumni/
│   └── profil/
├── csv-converter.html            # CSV converter tool
├── caaip-logo.png
├── caaip.png
├── kemenhub.png
└── favicon.svg
```

---

## 🚀 Step-by-Step Deploy ke Hostinger

### **STEP 1: Persiapan Local**

```powershell
# 1. Clean build
cd "E:\POLTEKSSN\TINGKAT 4\PKL\CAAIP"
npm run build

# 2. Verify dist folder
dir dist

# 3. Test locally
npm run preview
```

### **STEP 2: Upload ke Hostinger**

**Pilihan A: Via File Manager (Mudah)**
1. Login hPanel.hostinger.com
2. File Manager → public_html
3. Hapus semua file default
4. Upload SEMUA ISI folder `dist/`
5. Pastikan `index.html` ada di root `public_html/`

**Pilihan B: Via FTP (Lebih Cepat)**
1. Download FileZilla
2. Connect dengan FTP credentials dari hPanel
3. Upload folder `dist/` → `public_html/`

### **STEP 3: Setup Domain & SSL**

1. hPanel → Domains → Add `caaip.id`
2. hPanel → SSL → Install SSL (gratis)
3. Tunggu 5-15 menit
4. Test: https://caaip.id

### **STEP 4: Setup CMS Admin di Netlify**

1. Deploy ke Netlify (untuk subdomain admin)
2. Setup custom domain: `admin.caaip.id`
3. Enable Netlify Identity
4. Enable Git Gateway
5. Invite user admin

### **STEP 5: Setup Auto-Deploy**

1. GitHub → Settings → Secrets → Add:
   - `FTP_SERVER`
   - `FTP_USERNAME`
   - `FTP_PASSWORD`
2. Push file `.github/workflows/deploy-hostinger.yml`
3. GitHub Actions akan auto-deploy setiap ada push

---

## ✅ Checklist Akhir

Sebelum go-live, pastikan:

- [ ] Domain `caaip.id` sudah pointing ke Hostinger
- [ ] SSL certificate sudah aktif (https://)
- [ ] Website bisa diakses di https://caaip.id
- [ ] Semua halaman load dengan baik (Berita, Alumni, Profil)
- [ ] Gambar/assets load semua
- [ ] Admin CMS bisa diakses di `admin.caaip.id/admin`
- [ ] Login CMS berhasil (Netlify Identity)
- [ ] Test publish content dari CMS
- [ ] GitHub Actions deploy sukses
- [ ] Content update dari CMS muncul di website public

---

## 🔧 Maintenance

### Update Content:
1. Login: https://admin.caaip.id/admin
2. Edit/tambah content
3. Publish → Commit ke GitHub
4. GitHub Actions auto-deploy (2-3 menit)
5. Refresh website → Content updated!

### Manual Deploy (Jika perlu):
```powershell
# Pull latest
git pull origin main

# Build
npm run build

# Upload dist/ ke Hostinger via FTP
```

---

## 📞 Troubleshooting

### Website tidak muncul setelah upload

**Solusi:**
- Cek folder structure: `index.html` harus di root `public_html/`
- Jangan upload folder `dist/`, upload ISI-nya
- Clear browser cache (Ctrl + F5)

### SSL Not Secure

**Solusi:**
- Tunggu SSL propagate (bisa sampai 24 jam)
- Force reinstall SSL di hPanel
- Check mixed content (semua resource harus HTTPS)

### CMS tidak bisa login

**Solusi:**
- Verify Netlify Identity enabled
- Re-invite user
- Clear cookies & try incognito
- Cek URL site di Netlify Identity settings

### Auto-deploy tidak jalan

**Solusi:**
- Cek GitHub Actions tab → Lihat error log
- Verify Secrets sudah benar (FTP_*)
- Test FTP credentials manual pakai FileZilla
- Cek FTP permissions di Hostinger

---

## 📊 Estimasi Biaya

| Item | Biaya/Tahun |
|------|-------------|
| Domain caaip.id | Rp 150.000 |
| Hostinger Premium | Rp 400.000 |
| Netlify (CMS) | **GRATIS** |
| GitHub | **GRATIS** |
| **TOTAL** | **Rp 550.000/tahun** |

Jauh lebih murah dari setup dengan database! 🎉

---

**Dibuat:** 8 November 2025  
**Untuk:** Deploy CAAIP ke Hostinger  
**Domain:** caaip.id  
**Status:** ✅ Ready to deploy
