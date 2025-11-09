# 🚀 Quick Start: Hybrid Deployment

## Setup dalam 5 Langkah

### 1️⃣ Setup Netlify CMS (5 menit)
```
1. Login netlify.com dengan GitHub
2. Import repo fandcomp/CAAIP
3. Deploy → dapat URL: https://[site].netlify.app
4. Enable Identity → Invite email Anda
5. Test login: https://[site].netlify.app/admin ✅
```

### 2️⃣ Setup Domain Hostinger (10 menit)
```
1. Login hpanel.hostinger.com
2. Point domain caaip.id ke Hostinger
3. Install SSL (Let's Encrypt)
4. Tunggu SSL active ✅
```

### 3️⃣ Upload Website (15 menit)
```powershell
# Build project
npm run build

# Upload via File Manager:
# 1. hPanel → File Manager
# 2. Hapus isi public_html
# 3. Upload semua isi folder dist/
# 4. Upload file .htaccess
```

### 4️⃣ Setup Auto-Deploy (5 menit)
```
1. hPanel → FTP Accounts → Reset password
2. GitHub repo → Settings → Secrets
3. Add secrets:
   - FTP_SERVER: ftp.caaip.id
   - FTP_USERNAME: u123456789
   - FTP_PASSWORD: your_password
```

### 5️⃣ Test Everything (5 menit)
```
1. Buka: https://caaip.id ✅
2. Login CMS: https://[site].netlify.app/admin ✅
3. Publish berita test → tunggu 3 menit
4. Refresh caaip.id → berita muncul! 🎉
```

---

## 📖 Dokumentasi Lengkap

- **Setup Detail**: Baca `SETUP_HYBRID_DEPLOYMENT.md`
- **Deployment Guide**: Baca `DEPLOY_HOSTINGER.md`

---

## 🎯 Arsitektur

```
Website (caaip.id) → Hostinger
  ↕
CMS Admin → Netlify + Identity
  ↕
Repository → GitHub
  ↕
Auto-Deploy → GitHub Actions → FTP to Hostinger
```

**Total waktu setup: ~40 menit**
**Biaya bulanan: ~Rp 20.000-50.000** (hanya Hostinger, Netlify gratis!)

---

## 🆘 Butuh Bantuan?

Lihat troubleshooting di `SETUP_HYBRID_DEPLOYMENT.md`
