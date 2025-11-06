# Panduan Lengkap Hosting Website CAAIP di Hostinger

## 📋 Daftar Isi

1. [Persiapan](#persiapan)
2. [Pembelian Paket Hostinger](#pembelian-paket-hostinger)
3. [Setup Hosting](#setup-hosting)
4. [Deploy Website](#deploy-website)
5. [Setup Domain](#setup-domain)
6. [SSL Certificate](#ssl-certificate)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Persiapan

### Yang Dibutuhkan:

- ✅ Akun email aktif
- ✅ Kartu kredit/debit atau metode pembayaran (transfer bank, GoPay, OVO)
- ✅ Budget: Rp 24.000 - 50.000/bulan
- ✅ Source code website (sudah ada di GitHub)
- ✅ Waktu: 2-3 jam

### Pilihan Deployment:

Ada 2 cara deploy di Hostinger:

**Opsi A: Static Hosting (RECOMMENDED ✅)**
- Upload build files (hasil `npm run build`)
- Paling mudah & cepat
- Cocok untuk website static Astro
- Performa sangat cepat

**Opsi B: Node.js Hosting (Advanced)**
- Deploy full aplikasi Node.js
- Lebih kompleks
- Lebih mahal
- Untuk aplikasi dynamic/SSR

**Untuk CAAIP: Gunakan Opsi A (Static Hosting)** ✅

---

## 💳 Pembelian Paket Hostinger

### Langkah 1: Daftar Akun Hostinger

1. **Buka website Hostinger:**
   ```
   https://www.hostinger.co.id
   ```

2. **Klik "Mulai Sekarang" atau "Get Started"**

3. **Pilih paket hosting** (lihat rekomendasi di bawah)

### Langkah 2: Pilih Paket Hosting

#### 📦 Rekomendasi Paket untuk CAAIP:

**OPSI 1: Premium Web Hosting (RECOMMENDED ✅)**

| Fitur | Detail |
|-------|--------|
| **Harga** | Rp 36.999/bulan (promo) - Rp 49.999/bulan (normal) |
| **Storage** | 100 GB SSD |
| **Bandwidth** | Unlimited |
| **Websites** | 100 websites |
| **Free Domain** | 1 domain gratis (caaip.net) |
| **Free SSL** | ✅ Yes |
| **Email** | Unlimited emails (@caaip.net) |
| **Backup** | Weekly automatic backup |
| **Support** | 24/7 live chat |

**Total biaya 1 tahun:** Rp 443.988 (dengan promo)

**OPSI 2: Single Web Hosting (Budget)**

| Fitur | Detail |
|-------|--------|
| **Harga** | Rp 23.999/bulan (promo) - Rp 36.999/bulan (normal) |
| **Storage** | 50 GB SSD |
| **Bandwidth** | ~100 GB/bulan |
| **Websites** | 1 website |
| **Free Domain** | ❌ No (beli terpisah) |
| **Free SSL** | ✅ Yes |
| **Email** | 1 email account |
| **Backup** | Weekly automatic backup |
| **Support** | 24/7 live chat |

**Total biaya 1 tahun:** Rp 287.988 (dengan promo)

**OPSI 3: Business Web Hosting (Overkill)**

| Fitur | Detail |
|-------|--------|
| **Harga** | Rp 54.999/bulan (promo) - Rp 89.999/bulan (normal) |
| **Storage** | 200 GB SSD |
| **Bandwidth** | Unlimited |
| **Websites** | 100 websites |
| **Free Domain** | 1 domain gratis |
| **Free SSL** | ✅ Yes |
| **Email** | Unlimited emails |
| **Backup** | Daily automatic backup |
| **CDN** | ✅ Included |
| **Support** | Priority 24/7 |

**Total biaya 1 tahun:** Rp 659.988 (dengan promo)

#### 🎯 Rekomendasi:

**Untuk CAAIP: Premium Web Hosting** ✅

**Alasan:**
- ✅ Include domain gratis (hemat ~Rp 200.000)
- ✅ Unlimited bandwidth (untuk traffic tinggi)
- ✅ Unlimited email (@caaip.net)
- ✅ Storage cukup besar (100 GB)
- ✅ Harga masih terjangkau

### Langkah 3: Proses Pembelian

1. **Pilih paket "Premium Web Hosting"**

2. **Pilih durasi:**
   - 12 bulan (recommended) - dapat harga promo
   - 24 bulan (lebih hemat)
   - 48 bulan (paling hemat, tapi komitmen lama)

3. **Claim domain gratis:**
   - Pilih "I will use my new domain"
   - Ketik: `caaip.net`
   - Cek availability
   - Jika tersedia, klik "Continue"

4. **Review order:**
   ```
   Premium Web Hosting (12 bulan)    Rp 443.988
   Domain caaip.net (GRATIS)         Rp       0
   SSL Certificate (GRATIS)          Rp       0
   ──────────────────────────────────────────
   TOTAL                             Rp 443.988
   ```

5. **Pilih metode pembayaran:**
   - Kartu Kredit/Debit
   - Transfer Bank (BCA, Mandiri, BNI, BRI)
   - GoPay
   - OVO
   - DANA
   - Indomaret/Alfamart

6. **Buat akun Hostinger:**
   - Email: your-email@gmail.com
   - Password: (buat password kuat)
   - ✅ Setuju terms & conditions
   - Klik "Checkout"

7. **Lakukan pembayaran** sesuai metode yang dipilih

8. **Tunggu konfirmasi:**
   - Email konfirmasi (1-5 menit)
   - Akses ke hPanel (Hostinger Panel)

---

## 🔧 Setup Hosting

### Langkah 1: Login hPanel

1. **Buka email konfirmasi dari Hostinger**
   - Subject: "Welcome to Hostinger!"
   - Klik link "Access hPanel"

2. **Login ke hPanel:**
   ```
   https://hpanel.hostinger.com
   ```
   - Email: (yang digunakan saat daftar)
   - Password: (password Anda)

3. **Dashboard akan terbampil:**
   - Your websites
   - Domain
   - Email accounts
   - File Manager

### Langkah 2: Setup Domain (Jika Beli Terpisah)

**Jika domain sudah include (Premium plan):**
- Domain `caaip.net` sudah otomatis terhubung ✅
- Skip ke Langkah 3

**Jika beli domain terpisah (Single plan):**

1. **hPanel** → **Domains**

2. **Add Existing Domain:**
   - Enter domain: `caaip.net`
   - Click "Add Domain"

3. **Update Nameservers** di registrar domain:
   ```
   Nameserver 1: ns1.dns-parking.com
   Nameserver 2: ns2.dns-parking.com
   ```
   
   Atau gunakan custom nameservers Hostinger:
   ```
   Nameserver 1: ns1.hostinger.com
   Nameserver 2: ns2.hostinger.com
   ```

4. **Tunggu propagasi DNS:** 1-24 jam

### Langkah 3: Setup Email (@caaip.net)

1. **hPanel** → **Emails**

2. **Create Email Account:**
   ```
   Email: admin@caaip.net
   Password: (create strong password)
   Storage: 10 GB
   ```

3. **Tambah email lainnya (opsional):**
   - `info@caaip.net`
   - `contact@caaip.net`
   - `no-reply@caaip.net`

4. **Access webmail:**
   ```
   https://webmail.hostinger.com
   ```
   - Atau setup di Outlook/Thunderbird
   - IMAP/SMTP settings ada di hPanel

---

## 📤 Deploy Website

### Metode A: Upload Build Files (RECOMMENDED ✅)

#### Step 1: Build Website di Local

1. **Buka PowerShell/Terminal:**

```powershell
cd "E:\POLTEKSSN\TINGKAT 4\PKL\CAAIP"
```

2. **Install dependencies (jika belum):**

```powershell
npm install
```

3. **Build website:**

```powershell
npm run build
```

**Output:**
```
✓ built in 2.49s
✓ 23 page(s) built
```

4. **Cek folder `dist`:**

```powershell
ls dist
```

**Isi folder dist:**
```
dist/
  ├── index.html
  ├── 404.html
  ├── berita/
  ├── alumni/
  ├── profil/
  ├── en/
  ├── kabar-duka/
  ├── admin/
  ├── _astro/
  └── uploads/
```

#### Step 2: Upload ke Hostinger via File Manager

**Cara 1: File Manager (Web-based) - PALING MUDAH**

1. **Login hPanel** → **File Manager**

2. **Navigate ke folder:**
   ```
   /public_html/
   ```

3. **Hapus file default** (jika ada):
   - `index.html`
   - `default.html`
   - `.htaccess` (backup dulu)

4. **Upload files:**
   - Klik **"Upload Files"**
   - Select ALL files dari folder `dist` Anda
   - Atau drag & drop folder `dist` ke File Manager

**PENTING:** Upload ISI folder dist, BUKAN folder dist-nya!

**Struktur yang benar di `/public_html/`:**
```
public_html/
  ├── index.html
  ├── 404.html
  ├── berita/
  ├── alumni/
  ├── profil/
  ├── en/
  ├── kabar-duka/
  ├── admin/
  ├── _astro/
  └── uploads/
```

**Struktur SALAH (jangan seperti ini):**
```
public_html/
  └── dist/
      ├── index.html
      └── ...
```

5. **Tunggu upload selesai:**
   - Progress bar akan tampil
   - Waktu tergantung ukuran & koneksi internet
   - Estimasi: 5-15 menit

**Cara 2: Upload via FTP (Advanced)**

1. **Download FTP Client:**
   - FileZilla: https://filezilla-project.org
   - WinSCP: https://winscp.net

2. **Get FTP credentials dari hPanel:**
   - **hPanel** → **File Manager** → **FTP Accounts**
   - Host: ftp.caaip.net (atau IP server)
   - Username: (ditampilkan di hPanel)
   - Password: (sama dengan hPanel atau buat baru)
   - Port: 21 (FTP) atau 22 (SFTP)

3. **Connect dengan FileZilla:**
   - File → Site Manager → New Site
   - Host: ftp.caaip.net
   - Port: 21
   - Protocol: FTP
   - Encryption: Use explicit FTP over TLS
   - Logon Type: Normal
   - User: (FTP username)
   - Password: (FTP password)
   - Connect

4. **Upload files:**
   - Local site: E:\POLTEKSSN\TINGKAT 4\PKL\CAAIP\dist
   - Remote site: /public_html/
   - Drag semua ISI folder dist ke public_html
   - Tunggu transfer selesai

#### Step 3: Setup .htaccess (untuk Clean URLs)

1. **Buat file `.htaccess`** di `/public_html/`

2. **Edit file `.htaccess`** dengan isi:

```apache
# Enable rewrite engine
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Force www or non-www (pilih salah satu)
# Non-www ke www:
# RewriteCond %{HTTP_HOST} !^www\.
# RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# www ke non-www (RECOMMENDED):
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Serve index.html for directory requests
DirectoryIndex index.html

# Custom 404 page
ErrorDocument 404 /404.html

# Prevent directory listing
Options -Indexes

# Protect .htaccess
<Files .htaccess>
Order Allow,Deny
Deny from all
</Files>

# Compress files for faster loading
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType application/x-shockwave-flash "access plus 1 month"
</IfModule>
```

3. **Save file**

#### Step 4: Setup Netlify Identity (untuk CMS)

**PENTING:** Decap CMS masih butuh Netlify Identity untuk login!

**2 Opsi:**

**Opsi 1: Tetap Pakai Netlify Identity (RECOMMENDED ✅)**

1. Website tetap di Hostinger untuk public
2. CMS login pakai Netlify Identity (git-gateway)
3. Tidak perlu ubah kode

**Setup:**
- Tetap pakai `public/admin/config.yml` yang ada
- Backend: git-gateway (sudah setup di Netlify)
- Admin akses: https://caaip.net/admin
- Login via Netlify Identity

**Opsi 2: Ganti ke GitHub Backend**

Jika tidak mau dependency ke Netlify:

1. **Edit `public/admin/config.yml`:**

```yaml
backend:
  name: github
  repo: fandcomp/CAAIP
  branch: main
  
  # OAuth App GitHub
  base_url: https://caaip.net
  auth_endpoint: api/auth
```

2. **Setup GitHub OAuth App:**
   - GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Application name: CAAIP CMS
   - Homepage URL: https://caaip.net
   - Authorization callback URL: https://caaip.net/api/callback
   - Register application
   - Copy Client ID & Client Secret

3. **Setup OAuth Endpoint** (butuh backend server di Hostinger)
   - Lebih kompleks, butuh Node.js
   - Atau pakai third-party: https://github.com/vencax/netlify-cms-github-oauth-provider

**Rekomendasi: Tetap pakai Opsi 1 (Netlify Identity)** ✅

#### Step 5: Test Website

1. **Buka browser, akses:**
   ```
   https://caaip.net
   ```

2. **Test semua halaman:**
   - ✅ Homepage: https://caaip.net
   - ✅ Berita: https://caaip.net/berita
   - ✅ Alumni: https://caaip.net/alumni
   - ✅ Profil: https://caaip.net/profil
   - ✅ Kabar Duka: https://caaip.net/kabar-duka
   - ✅ English: https://caaip.net/en
   - ✅ Admin: https://caaip.net/admin

3. **Test responsiveness:**
   - Desktop (Chrome/Firefox/Edge)
   - Mobile (Chrome/Safari)
   - Tablet

4. **Test SSL:**
   - Cek padlock 🔒 di address bar
   - Harus HTTPS, bukan HTTP

---

### Metode B: Git Deployment (Advanced)

Jika Hostinger support Git auto-deploy:

1. **hPanel** → **Git**

2. **Clone repository:**
   ```
   Repository URL: https://github.com/fandcomp/CAAIP.git
   Branch: main
   Deploy path: /public_html/
   ```

3. **Add build command:**
   ```bash
   npm install && npm run build && cp -r dist/* /public_html/
   ```

4. **Enable auto-deploy:**
   - On push to main branch

**Note:** Tidak semua paket Hostinger support Git deployment. Cek di hPanel.

---

## 🔒 SSL Certificate

### Langkah 1: Enable SSL di Hostinger

1. **hPanel** → **SSL**

2. **Pilih domain:** `caaip.net`

3. **Install SSL Certificate:**
   - Free SSL (Let's Encrypt) ✅
   - Click "Install SSL"

4. **Tunggu installasi:** 1-5 menit

5. **Verify SSL:**
   - Status: "Active" ✅
   - Valid until: (90 hari dari sekarang)

### Langkah 2: Force HTTPS

Sudah diatur di `.htaccess` (Step 3 tadi)

Jika belum:

1. **hPanel** → **Advanced** → **Force HTTPS**

2. **Toggle ON** untuk `caaip.net`

3. **Test:** Akses `http://caaip.net` → harus redirect ke `https://caaip.net`

### Langkah 3: Auto-Renew SSL

**Hostinger auto-renew Let's Encrypt SSL** ✅

Tidak perlu action manual.

**Cek reminder:**
- hPanel akan kirim email 30 hari sebelum expired
- Auto-renew biasanya 7 hari sebelum expired

---

## 🔄 Update Website (Workflow)

### Cara Update Konten via CMS:

1. **Akses CMS:**
   ```
   https://caaip.net/admin
   ```

2. **Login dengan Netlify Identity**

3. **Edit/tambah konten** (berita, alumni, dll)

4. **Publish** → commit ke GitHub

5. **Build & Upload ke Hostinger:**

**Manual Update:**

```powershell
# 1. Pull latest dari GitHub
cd "E:\POLTEKSSN\TINGKAT 4\PKL\CAAIP"
git pull origin main

# 2. Build
npm run build

# 3. Upload folder dist ke Hostinger
# Via File Manager atau FTP
```

**TIPS:** Setup auto-deployment (lihat section Advanced)

### Cara Update Kode:

1. **Edit kode di local**

2. **Test di local:**
   ```powershell
   npm run dev
   ```
   Akses: http://localhost:4321

3. **Build:**
   ```powershell
   npm run build
   ```

4. **Commit ke GitHub:**
   ```powershell
   git add .
   git commit -m "feat: update feature X"
   git push origin main
   ```

5. **Upload dist ke Hostinger:**
   - Via File Manager atau FTP

---

## 🚀 Advanced: Auto-Deployment

### Setup GitHub Actions → Hostinger FTP

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Hostinger via FTP
      uses: SamKirkland/FTP-Deploy-Action@4.3.3
      with:
        server: ftp.caaip.net
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/
        server-dir: /public_html/
        exclude: |
          **/.git*
          **/.git*/**
          **/node_modules/**
```

**Setup Secrets di GitHub:**

1. **GitHub repo** → **Settings** → **Secrets and variables** → **Actions**

2. **New repository secret:**
   - Name: `FTP_USERNAME`
   - Value: (FTP username dari hPanel)
   
3. **New repository secret:**
   - Name: `FTP_PASSWORD`
   - Value: (FTP password dari hPanel)

4. **Save**

**Hasil:**
- Setiap push ke main → auto build & deploy ke Hostinger ✅
- Tidak perlu manual upload lagi!

---

## 📊 Monitoring & Analytics

### 1. Google Analytics

**File:** `src/layouts/BaseLayout.astro`

Tambahkan sebelum `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Ganti `G-XXXXXXXXXX` dengan GA4 Measurement ID Anda.

### 2. Google Search Console

1. **Daftar:** https://search.google.com/search-console

2. **Add property:** `https://caaip.net`

3. **Verify ownership:**
   - HTML file upload (via File Manager)
   - Atau DNS TXT record (di Hostinger DNS)

4. **Submit sitemap:**
   ```
   https://caaip.net/sitemap-index.xml
   ```

### 3. Hostinger Analytics (Built-in)

**hPanel** → **Statistics** → **Awstats**

- Visitor count
- Page views
- Traffic sources
- Bandwidth usage

---

## ⚡ Performance Optimization

### 1. Enable Gzip Compression

Sudah diatur di `.htaccess` ✅

### 2. Browser Caching

Sudah diatur di `.htaccess` ✅

### 3. CDN (Optional)

**Hostinger CDN** (Business plan):
- Otomatis jika pakai Business plan
- Atau setup manual via Cloudflare

**Cloudflare Free CDN:**

1. **Daftar:** https://www.cloudflare.com

2. **Add site:** `caaip.net`

3. **Update nameservers** di Hostinger:
   - NS dari Cloudflare (contoh: `ns1.cloudflare.com`)

4. **Enable CDN** (orange cloud ikon)

5. **Configure settings:**
   - SSL: Full
   - Cache: Standard
   - Auto minify: CSS, JS, HTML

---

## 🔧 Troubleshooting

### Issue 1: Website Tidak Muncul (404)

**Gejala:** Akses domain menampilkan "404 Not Found" atau blank page

**Solusi:**
1. Cek file ada di `/public_html/`
2. Cek file `index.html` ada di root `/public_html/index.html`
3. Cek permissions file (644 untuk files, 755 untuk folders)
4. Clear browser cache (Ctrl+Shift+Delete)

### Issue 2: CSS/JS Tidak Load

**Gejala:** Website tampil tanpa styling, layout berantakan

**Solusi:**
1. Cek folder `_astro` sudah terupload
2. Cek `.htaccess` ada rules untuk static files
3. Check browser console (F12) untuk error 404
4. Verify base URL di `astro.config.mjs`:
   ```javascript
   export default defineConfig({
     site: 'https://caaip.net',
   });
   ```

### Issue 3: Admin CMS Tidak Bisa Login

**Gejala:** Login loop atau error "Unable to access"

**Solusi:**
1. Cek file `admin/config.yml` sudah terupload
2. Cek file `admin/index.html` ada
3. Verify Netlify Identity masih aktif
4. Cek site URL di Netlify Identity settings
5. Test di incognito mode (clear cookies)

### Issue 4: SSL Not Secure

**Gejala:** Browser menampilkan "Not Secure" atau SSL error

**Solusi:**
1. Tunggu SSL propagate (1-24 jam)
2. hPanel → SSL → Reinstall SSL
3. Clear browser SSL cache
4. Cek mixed content (HTTP resources di HTTPS page)

### Issue 5: Email Tidak Bisa Kirim/Terima

**Gejala:** Email bounce atau tidak masuk

**Solusi:**
1. Cek MX records di DNS (otomatis jika pakai Hostinger)
2. Verify email account di hPanel → Emails
3. Cek spam folder
4. Test dengan webmail: https://webmail.hostinger.com

### Issue 6: Website Lambat

**Gejala:** Load time > 3 detik

**Solusi:**
1. Enable Gzip compression (`.htaccess`)
2. Optimize images (compress, WebP format)
3. Enable browser caching (`.htaccess`)
4. Use CDN (Cloudflare)
5. Cek server response time di hPanel statistics

---

## 📊 Perbandingan: Hostinger vs Netlify

| Aspek | Hostinger | Netlify |
|-------|-----------|---------|
| **Harga** | Rp 444.000/tahun | GRATIS |
| **Setup** | Manual upload | Auto-deploy |
| **Domain** | Include (Premium) | Bayar terpisah |
| **Email** | ✅ Unlimited | ❌ Tidak ada |
| **FTP Access** | ✅ Yes | ❌ No |
| **CDN** | ⚠️ Optional (Business) | ✅ Otomatis |
| **SSL** | ✅ Let's Encrypt | ✅ Let's Encrypt |
| **Control** | ✅ Full (cPanel/hPanel) | ⚠️ Limited |
| **Backup** | ✅ Weekly (Premium) | ⚠️ Git only |
| **Support** | ✅ 24/7 Chat (Indonesia) | ⚠️ Komunitas |
| **Ease of Use** | ⚠️ Manual | ✅ Otomatis |
| **Performance** | ⚠️ Good (server-based) | ✅ Excellent (CDN) |

### Kesimpulan:

**Gunakan Netlify jika:**
- ✅ Ingin gratis
- ✅ Ingin auto-deploy (git push → live)
- ✅ Prioritas performa (CDN global)
- ✅ Tidak butuh email hosting
- ✅ Website static/JAMstack

**Gunakan Hostinger jika:**
- ✅ Butuh email hosting (@caaip.net)
- ✅ Ingin kontrol penuh (FTP, cPanel)
- ✅ Butuh backup teratur
- ✅ Prefer support Bahasa Indonesia
- ✅ Rencana hosting multi-website

---

## 💰 Estimasi Biaya Hostinger

### Tahun Pertama:

```
Premium Web Hosting (12 bulan)    Rp 443.988
Domain caaip.net (GRATIS)         Rp       0
SSL Certificate (GRATIS)          Rp       0
──────────────────────────────────────────
TOTAL TAHUN 1                     Rp 443.988
```

### Tahun Kedua (Renewal):

```
Premium Web Hosting (12 bulan)    Rp 599.988 (harga normal)
Domain renewal                    Rp 189.000
SSL Certificate (GRATIS)          Rp       0
──────────────────────────────────────────
TOTAL TAHUN 2                     Rp 788.988
```

### Perbandingan 5 Tahun:

| Hosting | Tahun 1 | Tahun 2 | Tahun 3 | Tahun 4 | Tahun 5 | Total 5 Tahun |
|---------|---------|---------|---------|---------|---------|---------------|
| **Hostinger** | Rp 444k | Rp 789k | Rp 789k | Rp 789k | Rp 789k | **Rp 3.600k** |
| **Netlify** | Rp 200k | Rp 200k | Rp 200k | Rp 200k | Rp 200k | **Rp 1.000k** |

**Selisih:** Rp 2.600.000 (Netlify lebih murah)

**Tapi:** Hostinger include email hosting (nilai ~Rp 300k/tahun)

---

## ✅ Checklist Deployment

### Pre-Deployment:
- [ ] Daftar akun Hostinger
- [ ] Pilih paket (Premium recommended)
- [ ] Claim domain gratis (caaip.net)
- [ ] Lakukan pembayaran
- [ ] Akses hPanel

### Setup Hosting:
- [ ] Login hPanel
- [ ] Verify domain aktif
- [ ] Setup email (@caaip.net)
- [ ] Get FTP credentials

### Build & Upload:
- [ ] `npm run build` di local
- [ ] Upload isi folder `dist` ke `/public_html/`
- [ ] Setup `.htaccess`
- [ ] Verify file structure

### Configuration:
- [ ] Enable SSL di hPanel
- [ ] Force HTTPS (.htaccess)
- [ ] Setup Netlify Identity (untuk CMS)
- [ ] Test admin login

### Testing:
- [ ] Test homepage (/)
- [ ] Test berita (/berita)
- [ ] Test alumni (/alumni)
- [ ] Test profil (/profil)
- [ ] Test kabar duka (/kabar-duka)
- [ ] Test English pages (/en)
- [ ] Test CMS admin (/admin)
- [ ] Test mobile responsive
- [ ] Test SSL (HTTPS)
- [ ] Test email (kirim/terima)

### Post-Deployment:
- [ ] Setup Google Analytics
- [ ] Submit sitemap ke Google Search Console
- [ ] Setup backup schedule
- [ ] Document FTP credentials
- [ ] Set calendar reminder (domain renewal)

---

## 🎓 Resources & Links

### Hostinger:
- Website: https://www.hostinger.co.id
- hPanel: https://hpanel.hostinger.com
- Webmail: https://webmail.hostinger.com
- Tutorials: https://support.hostinger.com
- 24/7 Support: Live chat di hPanel

### Tools:
- FileZilla (FTP): https://filezilla-project.org
- WinSCP (FTP): https://winscp.net
- DNS Checker: https://dnschecker.org
- SSL Test: https://www.ssllabs.com/ssltest/

### Dokumentasi:
- Astro Docs: https://docs.astro.build
- Decap CMS: https://decapcms.org/docs/
- GitHub Actions: https://docs.github.com/actions

---

## 🆘 Support

### Hostinger Support:
- **Live Chat:** 24/7 di hPanel (Bahasa Indonesia)
- **Email:** support@hostinger.com
- **Knowledge Base:** https://support.hostinger.com
- **Community:** https://www.hostinger.com/forum

### CAAIP Website:
- **GitHub Issues:** https://github.com/fandcomp/CAAIP/issues
- **Developer:** (contact info)

---

## 🎉 Kesimpulan

### Hostinger Cocok untuk CAAIP jika:

✅ **Butuh email hosting** (@caaip.net)
✅ **Ingin kontrol penuh** (FTP, cPanel access)
✅ **Prefer support Bahasa Indonesia**
✅ **Butuh backup reguler** (weekly/daily)
✅ **Budget tidak masalah** (~Rp 444k/tahun)

### Netlify Lebih Baik jika:

✅ **Budget terbatas** (gratis)
✅ **Ingin auto-deploy** (git push → live)
✅ **Prioritas performa** (CDN global)
✅ **Tidak butuh email** (atau pakai Gmail)
✅ **Suka simplicity** (minimal maintenance)

---

### 🎯 Rekomendasi Final:

**Untuk CAAIP: Tetap pakai NETLIFY** ✅

**Alasan:**
1. 💰 **Lebih murah** (Rp 200k vs Rp 444k/tahun)
2. ⚡ **Performa lebih cepat** (CDN global)
3. 🚀 **Auto-deploy** (tidak perlu manual upload)
4. 🔒 **SSL otomatis** (tidak perlu manual setup)
5. 📧 **Email bisa pakai alternatif** (Forwardemail.net gratis atau Google Workspace)

**Gunakan Hostinger hanya jika:**
- Benar-benar butuh email hosting @caaip.net
- Atau butuh hosting multiple websites (manfaatkan 100 websites limit)

---

**Dibuat:** 4 November 2025  
**Update Terakhir:** 4 November 2025  
**Versi:** 1.0
