# 🔄 Sinkronisasi CMS dengan Hostinger - Setup Selesai!

## ✅ Yang Sudah Dikonfigurasi:

### 1. **Redirect `/admin` ke Netlify CMS**
- **URL**: `https://caaip.id/admin` → Auto redirect ke `https://caaip.netlify.app/admin/`
- **File**: `.htaccess` sudah diupload ke Hostinger
- **Status**: ✅ Active

### 2. **Auto-Deploy ke Hostinger via GitHub Actions**
- **Trigger**: Setiap push ke branch `main`
- **Workflow**: Build → Upload via FTP → Update website
- **File**: `.github/workflows/deploy-hostinger.yml`
- **Status**: ⏳ Perlu setup FTP secrets (jika belum)

### 3. **Workflow Sinkronisasi Lengkap**

```
┌─────────────────────────────────────────────────────────┐
│  CONTENT MANAGEMENT FLOW                                │
└─────────────────────────────────────────────────────────┘

1. Admin buka: https://caaip.id/admin
   ↓
   (Auto redirect ke Netlify CMS)
   ↓
2. Login & Edit konten di CMS
   ↓
3. Klik "Publish"
   ↓
4. CMS commit ke GitHub (via Git Gateway)
   ↓
5. GitHub Actions triggered otomatis
   ↓
6. Actions: npm install → npm run build
   ↓
7. Upload dist/ ke Hostinger via FTP
   ↓
8. Website caaip.id updated! ✅

Total waktu: ~3-5 menit
```

## 🔧 Langkah Setup FTP Secrets (PENTING!)

Jika GitHub Actions belum punya FTP secrets, tambahkan sekarang:

### **1. Buka GitHub Repository Settings**
```
https://github.com/fandcomp/CAAIP/settings/secrets/actions
```

### **2. Tambahkan 3 Secrets**

Klik **"New repository secret"** untuk masing-masing:

| Name | Value |
|------|-------|
| `FTP_SERVER` | `145.79.14.179` |
| `FTP_USERNAME` | `u239743347.caaip.id` |
| `FTP_PASSWORD` | `[Password FTP Hostinger Anda]` |

### **3. Verifikasi Secrets**

Setelah ditambahkan, Anda akan melihat 3 secrets:
- ✅ FTP_SERVER
- ✅ FTP_USERNAME  
- ✅ FTP_PASSWORD

## 🧪 Testing

### **Test 1: Redirect /admin**

```bash
# Buka browser dan akses:
https://caaip.id/admin

# Expected: Auto redirect ke
https://caaip.netlify.app/admin/
```

### **Test 2: CMS Publish → Auto Deploy**

1. Login ke CMS: https://caaip.netlify.app/admin/
2. Edit atau buat berita baru
3. Klik **"Publish"**
4. Check GitHub Actions: https://github.com/fandcomp/CAAIP/actions
5. Tunggu workflow selesai (~3-5 menit)
6. Refresh website: https://caaip.id
7. Konten baru muncul ✅

### **Test 3: Manual Trigger GitHub Actions**

```bash
# Buka GitHub Actions
https://github.com/fandcomp/CAAIP/actions/workflows/deploy-hostinger.yml

# Klik "Run workflow" → "Run workflow"
# Tunggu selesai → Check caaip.id
```

## 📁 File Penting

| File | Fungsi |
|------|--------|
| `.htaccess` | Redirect /admin ke Netlify + force HTTPS |
| `.github/workflows/deploy-hostinger.yml` | Auto-deploy workflow |
| `public/admin/config.yml` | CMS configuration |
| `upload-htaccess.ps1` | Manual upload .htaccess (jika perlu) |

## ⚠️ Troubleshooting

### **Problem: caaip.id/admin tidak redirect**

**Solusi:**
```powershell
# Re-upload .htaccess
.\upload-htaccess.ps1

# Atau check di Hostinger File Manager apakah .htaccess ada
```

### **Problem: GitHub Actions gagal (FTP error)**

**Solusi:**
1. Verifikasi FTP secrets di GitHub sudah benar
2. Test FTP login manual via FileZilla
3. Check Actions logs untuk detail error
4. Re-run workflow

### **Problem: Konten tidak update di caaip.id setelah publish**

**Solusi:**
1. Check GitHub Actions status: https://github.com/fandcomp/CAAIP/actions
2. Jika workflow gagal, check logs
3. Jika workflow sukses tapi website tidak update:
   - Clear browser cache (Ctrl + F5)
   - Wait 5-10 menit (Hostinger caching)
   - Check file di Hostinger File Manager

### **Problem: CMS login error "Unable to access identity settings"**

**Solusi:**
1. Setup Netlify Identity di: https://app.netlify.com/sites/caaip/identity
2. Enable "Git Gateway" di Identity settings
3. Invite user email
4. Cek email dan aktivasi akun

## 🎯 Next Steps

1. ✅ **Setup Netlify Identity** (jika belum):
   - Enable Identity
   - Enable Git Gateway
   - Invite admin users

2. ✅ **Verify FTP Secrets** di GitHub:
   - Check https://github.com/fandcomp/CAAIP/settings/secrets/actions
   - Tambahkan jika belum ada

3. ✅ **Test End-to-End**:
   - Login CMS
   - Publish konten
   - Verify auto-deploy
   - Check website updated

4. ✅ **Monitor GitHub Actions**:
   - Bookmark: https://github.com/fandcomp/CAAIP/actions
   - Check setiap kali publish konten

## 🔗 Quick Links

| Fungsi | URL |
|--------|-----|
| **CMS Admin** | https://caaip.id/admin (redirect) |
| **CMS Direct** | https://caaip.netlify.app/admin/ |
| **Website** | https://caaip.id |
| **GitHub Actions** | https://github.com/fandcomp/CAAIP/actions |
| **Netlify Dashboard** | https://app.netlify.com/sites/caaip |
| **GitHub Secrets** | https://github.com/fandcomp/CAAIP/settings/secrets/actions |

---

**Status:** ✅ Setup Complete  
**Last Updated:** November 18, 2025
