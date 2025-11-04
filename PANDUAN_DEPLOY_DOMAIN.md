# Panduan Deploy CAAIP ke Domain caaip.net

## 🎯 Tujuan
Deploy website CAAIP dari `caaip.netlify.app` ke domain custom `caaip.net`

---

## 📋 Yang Dibutuhkan

1. **Domain caaip.net** (belum punya? lihat bagian Beli Domain)
2. **Akses Netlify** (sudah ada ✅)
3. **Akses DNS Management** dari provider domain
4. **Waktu:** 30-60 menit (termasuk tunggu DNS propagation)

---

## 🛒 Langkah 1: Beli Domain caaip.net

### Rekomendasi Provider Domain Indonesia

| Provider | Harga/tahun | Link |
|----------|-------------|------|
| Niagahoster | ~Rp 150.000 | https://www.niagahoster.co.id |
| Rumahweb | ~Rp 200.000 | https://www.rumahweb.com |
| DomaiNesia | ~Rp 175.000 | https://www.domainesia.com |
| Dewaweb | ~Rp 180.000 | https://www.dewaweb.com |

**Provider Internasional (pembayaran $USD):**
- Namecheap: ~$13/tahun
- GoDaddy: ~$15/tahun
- Cloudflare: ~$10/tahun

### Cara Beli:

1. **Pilih provider** (rekomendasi: Niagahoster untuk pemula)
2. **Search domain:** `caaip.net`
3. **Checkout & bayar** (biasanya pakai transfer bank/kartu kredit)
4. **Catat credentials** untuk akses DNS management

---

## 🌐 Langkah 2: Setup Domain di Netlify

### 2.1 Login Netlify

1. Buka: https://app.netlify.com
2. Login dengan akun GitHub Anda
3. Pilih site: **caaip**

### 2.2 Add Custom Domain

1. Klik tab **"Domain settings"** (atau "Domain management")
2. Klik **"Add custom domain"** atau **"Add domain alias"**
3. Masukkan: `caaip.net`
4. Klik **"Verify"**

**Netlify akan tanya:** "Do you own this domain?"
- Pilih: **"Yes, add domain"**

### 2.3 Add www Subdomain (Opsional tapi Recommended)

1. Klik **"Add domain alias"** lagi
2. Masukkan: `www.caaip.net`
3. Klik **"Verify"** → **"Yes, add domain"**

**Tujuan:** User bisa akses via `caaip.net` atau `www.caaip.net`

### 2.4 Set Primary Domain

1. Di list domain, klik **"Options"** di salah satu domain
2. Pilih **"Set as primary domain"**
3. Recommended: Set `caaip.net` (tanpa www) sebagai primary

**Hasil:** `www.caaip.net` akan auto-redirect ke `caaip.net`

### 2.5 Catat DNS Records

Netlify akan tampilkan DNS records yang perlu disetup:

**Biasanya:**
```
Type: A
Name: @ (atau kosong, atau caaip.net)
Value: 75.2.60.5

Type: CNAME  
Name: www
Value: <your-site-name>.netlify.app (contoh: caaip.netlify.app)
```

**⚠️ PENTING:** Screenshot atau catat nilai-nilai ini!

---

## 🔧 Langkah 3: Setup DNS di Provider Domain

### 3.1 Login DNS Management

Cara akses berbeda per provider:

**Niagahoster:**
1. Login: https://panel.niagahoster.co.id
2. Menu: **Domain** → Pilih `caaip.net`
3. Tab: **DNS Management** atau **Kelola DNS**

**Rumahweb:**
1. Login: https://clientzone.rumahweb.com
2. Menu: **Layanan** → **Domain Saya**
3. Klik `caaip.net` → **Manage DNS**

**Namecheap:**
1. Login: https://ap.www.namecheap.com
2. Domain List → Klik **Manage** di `caaip.net`
3. Tab: **Advanced DNS**

### 3.2 Hapus DNS Records Default (Jika Ada)

Biasanya provider kasih DNS default yang harus dihapus:

**Hapus records berikut (jika ada):**
- A Record dengan host `@` atau `caaip.net` (yang value-nya BUKAN 75.2.60.5)
- CNAME Record dengan host `www` (yang value-nya BUKAN netlify)

**⚠️ JANGAN HAPUS:**
- MX Records (untuk email)
- TXT Records (untuk verifikasi)
- NS Records (nameservers)

### 3.3 Tambah DNS Records Netlify

**A Record untuk Root Domain:**
```
Type: A
Host: @ (atau kosong, atau caaip.net - tergantung provider)
Value: 75.2.60.5
TTL: 3600 (atau 1 Hour atau Automatic)
```

**CNAME Record untuk www:**
```
Type: CNAME
Host: www
Value: caaip.netlify.app (atau sesuai yang Netlify kasih)
TTL: 3600 (atau 1 Hour atau Automatic)
```

**Contoh Screenshot (Niagahoster):**
```
| Type  | Host | Value               | TTL  |
|-------|------|---------------------|------|
| A     | @    | 75.2.60.5           | 3600 |
| CNAME | www  | caaip.netlify.app   | 3600 |
```

### 3.4 Save Changes

Klik **"Save"** atau **"Update DNS"**

---

## ⏳ Langkah 4: Tunggu DNS Propagation

### Apa itu DNS Propagation?

Proses update DNS ke seluruh internet. 

**Waktu:**
- Cepat: 5-30 menit
- Normal: 1-4 jam
- Maksimal: 24-48 jam (jarang terjadi)

### Cara Cek DNS Propagation

**Opsi 1: DNS Checker**
1. Buka: https://dnschecker.org
2. Masukkan: `caaip.net`
3. Type: **A**
4. Klik **Search**

**Berhasil jika:**
- Centang hijau banyak
- Value: `75.2.60.5`

**Opsi 2: Command Line (Windows PowerShell)**
```powershell
nslookup caaip.net
```

**Output yang benar:**
```
Server:  ...
Address:  ...

Name:    caaip.net
Address:  75.2.60.5
```

**Opsi 3: Ping Test**
```powershell
ping caaip.net
```

**Output yang benar:**
```
Pinging caaip.net [75.2.60.5] with 32 bytes of data:
Reply from 75.2.60.5: ...
```

---

## 🔒 Langkah 5: Enable SSL Certificate (HTTPS)

### 5.1 Provisioning SSL Otomatis

Setelah DNS verified, Netlify akan otomatis:
1. Detect domain sudah aktif
2. Request SSL certificate dari Let's Encrypt
3. Install certificate
4. Enable HTTPS

**Status di Netlify:**
- Tab **"Domain settings"** → **"HTTPS"**
- Status: **"Certificate provisioned"** atau **"SSL certificate active"**

### 5.2 Force HTTPS (Redirect HTTP ke HTTPS)

1. Di tab **"HTTPS"**
2. Cari: **"Force HTTPS"** atau **"Redirect HTTP to HTTPS"**
3. Toggle **ON**

**Hasil:** User yang akses `http://caaip.net` otomatis redirect ke `https://caaip.net`

### 5.3 Troubleshooting SSL

**Jika SSL belum aktif setelah 1 jam:**

1. **Verify DNS:** Pastikan DNS sudah propagate (cek di dnschecker.org)
2. **Renew Certificate:**
   - Di Netlify: **HTTPS** → **"Renew certificate"**
   - Atau **"Provision certificate"** jika ada tombol itu
3. **Check CAA Records:**
   - Pastikan tidak ada CAA record yang block Let's Encrypt
   - Jika ada CAA record, tambahkan: `letsencrypt.org`

---

## ✅ Langkah 6: Verifikasi Website

### Test Checklist

| No | Test | URL | Expected Result |
|----|------|-----|-----------------|
| 1 | Root domain | `https://caaip.net` | Homepage muncul ✅ |
| 2 | WWW subdomain | `https://www.caaip.net` | Redirect ke `https://caaip.net` ✅ |
| 3 | HTTP redirect | `http://caaip.net` | Redirect ke `https://caaip.net` ✅ |
| 4 | SSL certificate | Browser address bar | 🔒 Padlock hijau ✅ |
| 5 | Berita page | `https://caaip.net/berita` | News page muncul ✅ |
| 6 | Alumni page | `https://caaip.net/alumni` | Alumni page muncul ✅ |
| 7 | English page | `https://caaip.net/en/` | English homepage ✅ |
| 8 | CMS Admin | `https://caaip.net/admin` | Login page muncul ✅ |

### Test Browser Compatibility

Test di berbagai browser:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile (Chrome/Safari)

### Test Performance

**Opsi 1: Google PageSpeed Insights**
1. Buka: https://pagespeed.web.dev
2. Masukkan: `https://caaip.net`
3. Klik **Analyze**

**Target Score:**
- Performance: 90+ ✅
- Accessibility: 90+ ✅
- Best Practices: 90+ ✅
- SEO: 90+ ✅

**Opsi 2: GTmetrix**
1. Buka: https://gtmetrix.com
2. Masukkan: `https://caaip.net`
3. Klik **Test your site**

---

## 🎯 Langkah 7: Update Netlify Identity (Jika Perlu)

### 7.1 Update Identity Settings

Jika CMS login tidak jalan setelah pindah domain:

1. **Netlify Dashboard** → Site **caaip** → **Identity**
2. Tab **"Settings"** → **"External providers"**
3. Update **"Site URL":** dari `https://caaip.netlify.app` ke `https://caaip.net`
4. Save

### 7.2 Re-invite Users (Jika Perlu)

Jika admin tidak bisa login:

1. **Identity** → **"Invite users"**
2. Masukkan email admin
3. Admin akan dapat email baru dengan link dari `caaip.net`

---

## 📧 Langkah 8: Setup Email (Opsional)

### Mengapa Perlu Email dengan Domain Sendiri?

Lebih profesional:
- ❌ `info@gmail.com`
- ✅ `info@caaip.net`

### Cara Setup Email

**Opsi 1: Email dari Provider Domain**

Jika beli domain di Niagahoster/Rumahweb, biasanya sudah include email hosting:

1. **Niagahoster:**
   - Panel → **Email** → **Buat Akun Email**
   - Buat: `admin@caaip.net`, `info@caaip.net`
   - Akses via: **Webmail** atau **Outlook/Thunderbird**

2. **Rumahweb:**
   - ClientZone → **Email Hosting**
   - Create email account
   - Akses via Webmail atau email client

**Opsi 2: Google Workspace (Email di Gmail dengan Domain Sendiri)**

1. Daftar: https://workspace.google.com
2. Pilih plan: **Business Starter** (~Rp 100.000/user/bulan)
3. Verify domain dengan TXT record
4. Setup MX records
5. Gunakan Gmail dengan email: `admin@caaip.net`

**Opsi 3: Email Forwarding (Gratis)**

Forward email `info@caaip.net` ke Gmail pribadi:

1. **DNS Management** di provider domain
2. Tambah **MX Record:**
   ```
   Type: MX
   Host: @
   Value: mx.forwardemail.net
   Priority: 10
   ```
3. Tambah **TXT Record:**
   ```
   Type: TXT
   Host: @
   Value: forward-email=info@caaip.net:your-gmail@gmail.com
   ```

4. Daftar gratis di: https://forwardemail.net

---

## 🔍 Troubleshooting Common Issues

### 1. Domain Tidak Bisa Diakses

**Gejala:** Browser menampilkan "Site can't be reached" atau "DNS_PROBE_FINISHED_NXDOMAIN"

**Solusi:**
- ✅ Cek DNS propagation (dnschecker.org)
- ✅ Tunggu 1-4 jam lagi
- ✅ Clear browser cache (Ctrl+Shift+Delete)
- ✅ Flush DNS cache Windows:
  ```powershell
  ipconfig /flushdns
  ```

### 2. SSL Certificate Error

**Gejala:** Browser menampilkan "Your connection is not private" atau "NET::ERR_CERT_COMMON_NAME_INVALID"

**Solusi:**
- ✅ Tunggu DNS propagate penuh (24 jam)
- ✅ Di Netlify: HTTPS → **Renew certificate**
- ✅ Clear browser SSL cache

### 3. www Tidak Redirect ke Non-www

**Gejala:** `www.caaip.net` tidak redirect ke `caaip.net`

**Solusi:**
- ✅ Cek CNAME record untuk `www` sudah benar
- ✅ Di Netlify: Set `caaip.net` sebagai primary domain
- ✅ Enable redirect di **Domain settings**

### 4. CMS Admin Tidak Bisa Login

**Gejala:** Login loop atau error "Unable to access identity settings"

**Solusi:**
- ✅ Update Site URL di Netlify Identity settings
- ✅ Re-invite user dengan email baru
- ✅ Clear browser cache & cookies
- ✅ Cek `public/admin/config.yml` tidak hardcode URL lama

### 5. Konten Tidak Update

**Gejala:** Perubahan di CMS tidak muncul di website

**Solusi:**
- ✅ Cek deploy logs di Netlify (tab **Deploys**)
- ✅ Manual trigger deploy: **Deploys** → **Trigger deploy** → **Deploy site**
- ✅ Clear browser cache (Ctrl+Shift+R)
- ✅ Cek GitHub commit (perubahan harus ada commit baru)

---

## 📊 Monitoring & Maintenance

### 1. Monitor Uptime

**Gratis tools:**
- UptimeRobot: https://uptimerobot.com (50 monitors gratis)
- Pingdom: https://www.pingdom.com (free tier)

**Setup:**
1. Daftar UptimeRobot
2. Add Monitor: `https://caaip.net`
3. Type: HTTPS
4. Interval: 5 minutes
5. Alert via email jika website down

### 2. Monitor Performance

**Google Analytics (Traffic):**
1. Daftar: https://analytics.google.com
2. Add property: `caaip.net`
3. Install tracking code di `BaseLayout.astro`
4. Monitor visitor count, page views, bounce rate

**Google Search Console (SEO):**
1. Daftar: https://search.google.com/search-console
2. Add property: `https://caaip.net`
3. Verify ownership (via DNS TXT record atau HTML file)
4. Submit sitemap: `https://caaip.net/sitemap-index.xml`

### 3. Backup Strategy

**Otomatis via Git:**
- ✅ Setiap perubahan CMS = commit ke GitHub
- ✅ GitHub = backup cloud
- ✅ Bisa rollback ke commit sebelumnya

**Manual backup (opsional):**
```powershell
# Clone repo ke local
git clone https://github.com/fandcomp/CAAIP.git CAAIP-backup-2025-01-11

# Atau pull latest
cd CAAIP
git pull origin main
```

### 4. Domain Renewal

**PENTING:** Domain expired = website mati!

**Setup:**
- ✅ Enable auto-renewal di provider domain
- ✅ Set reminder 1 bulan sebelum expired
- ✅ Simpan credential provider domain dengan aman

---

## 💰 Estimasi Biaya Tahunan

| Item | Provider | Biaya/Tahun |
|------|----------|-------------|
| Domain .net | Niagahoster | Rp 150.000 - 200.000 |
| Hosting Website | Netlify (Gratis) | Rp 0 |
| SSL Certificate | Let's Encrypt (Gratis) | Rp 0 |
| CDN | Netlify (100GB/bulan) | Rp 0 |
| Email (Opsional) | Forwardemail (Gratis) | Rp 0 |
| **TOTAL** | | **Rp 150.000 - 200.000** |

**Bandingkan dengan VPS + Database:**
- Domain: Rp 200.000/tahun
- VPS: Rp 1.200.000/tahun
- **Total: Rp 1.400.000/tahun** (7x lebih mahal!)

---

## 🎓 Resources & Links

### Official Docs
- Netlify Custom Domains: https://docs.netlify.com/domains-https/custom-domains/
- Netlify DNS: https://docs.netlify.com/domains-https/netlify-dns/
- Let's Encrypt: https://letsencrypt.org

### Tools
- DNS Checker: https://dnschecker.org
- PageSpeed Insights: https://pagespeed.web.dev
- SSL Test: https://www.ssllabs.com/ssltest/

### Support
- Netlify Community: https://answers.netlify.com
- GitHub Issues: https://github.com/fandcomp/CAAIP/issues

---

## ✅ Checklist Lengkap

Gunakan checklist ini untuk memastikan semua langkah sudah selesai:

### Pre-Deployment
- [ ] Domain caaip.net sudah dibeli
- [ ] Akses DNS management sudah didapat
- [ ] Login Netlify berhasil
- [ ] Backup GitHub repo

### Domain Setup
- [ ] Add `caaip.net` di Netlify
- [ ] Add `www.caaip.net` di Netlify
- [ ] Set primary domain
- [ ] Catat DNS records dari Netlify

### DNS Configuration
- [ ] Login DNS management provider
- [ ] Hapus DNS records default (jika perlu)
- [ ] Tambah A record: `@` → `75.2.60.5`
- [ ] Tambah CNAME record: `www` → `caaip.netlify.app`
- [ ] Save changes

### Verification
- [ ] DNS propagation selesai (dnschecker.org)
- [ ] `https://caaip.net` bisa diakses
- [ ] `https://www.caaip.net` redirect ke `https://caaip.net`
- [ ] SSL certificate aktif (🔒 padlock hijau)
- [ ] Force HTTPS enabled

### Testing
- [ ] Test homepage (/)
- [ ] Test berita page (/berita)
- [ ] Test alumni page (/alumni)
- [ ] Test English pages (/en/)
- [ ] Test CMS admin (/admin)
- [ ] Test mobile responsive
- [ ] Test di Chrome/Firefox/Safari

### Post-Deployment
- [ ] Update Netlify Identity site URL
- [ ] Test CMS login
- [ ] Setup email (opsional)
- [ ] Install Google Analytics (opsional)
- [ ] Submit sitemap ke Google Search Console
- [ ] Setup uptime monitoring

### Documentation
- [ ] Save DNS credentials
- [ ] Save domain renewal date
- [ ] Dokumentasi perubahan

---

## 🎉 Selamat!

Jika semua checklist di atas sudah ✅, maka:

**Website CAAIP sudah LIVE di https://caaip.net** 🚀

**Next Steps:**
1. Share URL ke tim dan alumni
2. Update social media dengan domain baru
3. Monitor traffic di Google Analytics
4. Rutin update konten via CMS

**Support:**
Jika ada masalah, hubungi:
- GitHub Issues: https://github.com/fandcomp/CAAIP/issues
- Netlify Support: https://www.netlify.com/support/

---

**Dibuat:** 4 November 2025
**Update Terakhir:** 4 November 2025
**Versi:** 1.0
