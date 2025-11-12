# 🚀 Quick Setup caaip.co.id

## ⚡ 3 Langkah Utama

### 1️⃣ Upload Website ke Hostinger (15 menit)
```powershell
# Build website
cd "E:\POLTEKSSN\TINGKAT 4\PKL\CAAIP"
npm run build

# Upload semua isi folder dist/ ke public_html via File Manager
# Jangan lupa upload file .htaccess juga!
```

### 2️⃣ Setup CMS di Netlify (10 menit)
```
1. Login netlify.com → Import repo CAAIP
2. Deploy site → dapat URL netlify
3. Enable Identity → Invite email Anda
4. Enable Git Gateway
5. Accept email invitation → Set password
6. Login: https://[site].netlify.app/admin ✅
```

### 3️⃣ Setup Auto-Deploy (5 menit)
```
1. Hostinger → FTP Accounts → Reset password
2. GitHub → Settings → Secrets → Add:
   - FTP_SERVER: ftp.caaip.co.id
   - FTP_USERNAME: (dari Hostinger)
   - FTP_PASSWORD: (yang baru dibuat)
3. Test: Edit di CMS → tunggu 3 menit → website update!
```

---

## 📋 Checklist Setup

**Sebelum Mulai:**
- [ ] Domain caaip.co.id sudah active di Hostinger
- [ ] SSL certificate sudah installed
- [ ] Folder public_html sudah kosong

**Upload Website:**
- [ ] Build berhasil (npm run build)
- [ ] Upload semua file dari dist/ ke public_html
- [ ] Upload .htaccess ke public_html
- [ ] Test: https://caaip.co.id bisa diakses ✅

**Setup CMS:**
- [ ] Netlify site deployed
- [ ] Netlify Identity enabled
- [ ] Git Gateway enabled
- [ ] Admin email invited & accepted
- [ ] Test login CMS berhasil ✅

**Auto-Deploy:**
- [ ] FTP secrets added di GitHub
- [ ] Manual trigger test berhasil
- [ ] CMS publish test berhasil
- [ ] Website auto-update ✅

---

## 🎯 Credential yang Perlu Disiapkan

### 1. FTP Hostinger
```
Host: ftp.caaip.co.id
Username: (dari hPanel → FTP Accounts)
Password: (reset di FTP Accounts)
```

### 2. Netlify CMS
```
URL: https://[site-name].netlify.app/admin
Email: (email yang Anda invite)
Password: (yang Anda set saat accept invitation)
```

### 3. GitHub Secrets
```
FTP_SERVER: ftp.caaip.co.id
FTP_USERNAME: (dari Hostinger)
FTP_PASSWORD: (dari Hostinger)
```

---

## 📖 Dokumentasi Lengkap

Baca file: **SETUP_CAAIP_CO_ID.md** untuk panduan detail step-by-step

---

## 🆘 Troubleshooting Cepat

**❌ Domain tidak bisa diakses**
→ Tunggu propagasi DNS (1-24 jam)

**❌ SSL error**
→ Install SSL di Hostinger → tunggu 15 menit

**❌ CSS tidak load**
→ Upload file .htaccess + clear browser cache

**❌ CMS tidak bisa login**
→ Check email invitation + Enable Git Gateway

**❌ Auto-deploy gagal**
→ Check FTP credentials di GitHub Secrets

---

## 🎉 Done!

Website: **https://caaip.co.id**
CMS: **https://[site].netlify.app/admin**
Status: **Ready to Launch!** 🚀
