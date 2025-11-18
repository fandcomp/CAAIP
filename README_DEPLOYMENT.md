# 🚀 Panduan Deployment CAAIP Website

## 📋 Arsitektur Deployment

```
┌─────────────────────┐
│   Netlify Deploy    │ ← CMS Admin + Full Website Preview
│  caaip.netlify.app  │
└──────────┬──────────┘
           │
           │ (GitHub Webhook)
           ▼
     ┌──────────┐
     │  GitHub  │ ← Repository: fandcomp/CAAIP
     │   Repo   │
     └─────┬────┘
           │
           │ (GitHub Actions - Auto FTP)
           ▼
┌─────────────────────┐
│  Hostinger Hosting  │ ← Production Website
│     caaip.id        │
└─────────────────────┘
```

## 🎯 Deployment Workflow

### **Opsi 1: Otomatis via CMS (Recommended)**

1. **Login CMS**: https://caaip.netlify.app/admin/
2. **Edit/Tambah Konten** di CMS
3. **Klik "Publish"**
4. **Tunggu 3-5 menit** → Auto-deploy ke Hostinger via GitHub Actions

### **Opsi 2: Manual via FTP**

```powershell
# Jalankan script upload
.\upload-ftp.ps1
```

## 🔧 Setup Awal (Satu Kali Saja)

### 1️⃣ **Setup Netlify Identity**

```
1. Buka: https://app.netlify.com/sites/caaip/identity
2. Enable "Netlify Identity"
3. Settings → Registration → Invite only
4. Invite users → Masukkan email admin
5. Cek email → Klik link aktivasi
```

### 2️⃣ **Setup Git Gateway**

```
1. Buka: https://app.netlify.com/sites/caaip/settings/identity
2. Services → Git Gateway → Enable
3. Klik "Enable Git Gateway"
4. Done ✅
```

### 3️⃣ **Setup GitHub Actions FTP (Opsional)**

Tambahkan secrets di GitHub:
- `FTP_SERVER`: 145.79.14.179
- `FTP_USERNAME`: u239743347.caaip.id  
- `FTP_PASSWORD`: [password FTP Anda]

**Cara tambah secrets:**
```
1. Buka: https://github.com/fandcomp/CAAIP/settings/secrets/actions
2. Klik "New repository secret"
3. Tambahkan 3 secrets di atas
```

## 🧪 Testing

### **Test Build Lokal**

```powershell
npm run build
npm run preview
```

### **Test CMS Access**

1. Buka: https://caaip.netlify.app/admin/
2. Login dengan email yang sudah di-invite
3. Coba buat berita test
4. Publish
5. Cek di GitHub apakah ada commit baru

### **Test Auto-Deploy**

1. Publish konten dari CMS
2. Cek GitHub Actions: https://github.com/fandcomp/CAAIP/actions
3. Tunggu workflow selesai (~3 menit)
4. Cek website: https://caaip.id

## 📁 Struktur File Penting

```
CAAIP/
├── netlify.toml           # Konfigurasi Netlify deploy
├── public/admin/
│   ├── config.yml         # Konfigurasi CMS
│   └── index.html         # CMS admin interface
├── src/content/           # Content untuk CMS
│   ├── berita/           # Artikel berita
│   ├── kabarDuka/        # Pengumuman duka
│   ├── alumni/           # Data alumni per angkatan
│   ├── pengurus/         # Data pengurus
│   └── profil/           # Profil organisasi
├── .github/workflows/
│   └── deploy-hostinger.yml  # GitHub Actions auto-deploy
└── upload-ftp.ps1        # Script manual FTP upload
```

## ⚠️ Troubleshooting

### **CMS Error: "Unable to access identity settings"**

**Solusi:**
1. Pastikan Netlify Identity sudah enabled
2. Pastikan Git Gateway sudah enabled
3. Clear browser cache
4. Logout dan login ulang

### **404 Not Found di Netlify**

**Solusi:**
```powershell
# Build ulang dan commit
npm run build
git add dist
git commit -m "Rebuild site"
git push origin main
```

### **FTP Upload Gagal**

**Solusi:**
1. Cek koneksi internet
2. Verifikasi credentials FTP di Hostinger
3. Pastikan server FTP tidak down
4. Coba upload manual via FileZilla

### **GitHub Actions Gagal**

**Solusi:**
1. Cek GitHub Actions logs
2. Verifikasi FTP secrets sudah benar
3. Re-run workflow

## 🔗 URL Penting

| Fungsi | URL |
|--------|-----|
| **CMS Admin** | https://caaip.netlify.app/admin/ |
| **Website Production** | https://caaip.id |
| **Netlify Dashboard** | https://app.netlify.com/sites/caaip |
| **GitHub Repo** | https://github.com/fandcomp/CAAIP |
| **GitHub Actions** | https://github.com/fandcomp/CAAIP/actions |

## 📞 Support

Jika ada masalah yang tidak bisa diselesaikan:
1. Cek dokumentasi lengkap di folder root (file `PANDUAN_*.md`)
2. Cek GitHub Issues
3. Hubungi developer

---

**Last Updated:** November 18, 2025  
**Version:** 2.0 (Simplified Architecture)
