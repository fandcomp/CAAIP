# Panduan Setup Admin CMS CAAIP

## Ringkasan Perubahan Terakhir
Proyek ini sudah **sepenuhnya dimigrasikan ke Netlify** dengan Netlify Identity + Git Gateway untuk admin CMS.

**File yang sudah dibersihkan:**
- ✅ Hapus folder `api/` (Vercel functions)
- ✅ Hapus `vercel.json`
- ✅ Hapus `public/config.yml` (duplikat)
- ✅ Hapus `public/admin/login.html` (Plan B Vercel)
- ✅ Hanya 1 config CMS: `public/admin/config.yml` (git-gateway)

## Setup Netlify Identity (Langkah Demi Langkah)

### 1. Deploy ke Netlify
- Import repo GitHub ini ke Netlify
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- Klik "Deploy site"

### 2. Enable Identity
- Dashboard Netlify → pilih Site → **Identity** → "Enable Identity"
- Settings → Registration preferences → **"Invite only"** (disarankan)

### 3. Enable Git Gateway
- Identity → Settings & usage → Services → **"Enable Git Gateway"**
- Klik "Enable" → authorize GitHub → izinkan akses ke repo `fandcomp/CAAIP`

### 4. Undang Admin Pertama (Anda)
- Identity → **"Invite users"**
- Masukkan email Anda → klik "Send"
- Buka email dari **identity@notifications.netlify.com**
- Klik link "Accept the invite" atau "Join"

### 5. Konfirmasi dan Buat Password
**PENTING**: Setelah klik link konfirmasi di email:
- Browser akan membuka halaman utama CAAIP dengan URL seperti:
  `https://caaip.netlify.app/#confirmation_token=xxxxx` atau `#invite_token=xxxxx`
- **Halaman akan otomatis redirect** ke `/admin/` (sudah diperbaiki)
- Popup Netlify Identity muncul
- Buat password baru Anda
- Klik "Sign up" atau "Set password"

### 6. Login ke Admin
- Buka: https://caaip.netlify.app/admin/
- Klik "Login with Netlify Identity"
- Email: (yang Anda undang di langkah 4)
- Password: (yang Anda buat di langkah 5)
- Dashboard Decap CMS terbuka → Anda bisa kelola Berita, Kabar Duka, Alumni

## Troubleshooting

### ❌ "Email not confirmed"
**Penyebab**: User belum dikonfirmasi di Netlify Identity

**Solusi**:
1. Netlify Dashboard → Site → Identity → Users
2. Cari email Anda
3. Jika status "Unconfirmed":
   - Klik user → "Resend confirmation"
   - ATAU: Remove user → Invite ulang (langkah 4-5 dari awal)
4. Pastikan setelah klik link email, Anda diarahkan ke `/admin/` dan popup Identity muncul
5. Isi password dan konfirmasi
6. Di Identity → Users, status harus jadi "Confirmed"

### ❌ Link konfirmasi membawa ke beranda, popup tidak muncul
**Penyebab**: Script redirect belum aktif atau cache browser lama

**Solusi**:
1. Pastikan sudah **redeploy** terbaru ke Netlify (commit terakhir sudah include perbaikan redirect)
2. Hard refresh: `Ctrl + F5` (Windows) atau `Cmd + Shift + R` (Mac)
3. Coba di **Incognito/Private mode**
4. Atau copy link konfirmasi dari email, ganti:
   - Dari: `https://caaip.netlify.app/#confirmation_token=xxxxx`
   - Ke: `https://caaip.netlify.app/admin/#confirmation_token=xxxxx`
   - Paste di browser, Enter

### ❌ Muncul "Login with GitHub" di CMS (bukan Identity)
**Penyebab**: Decap masih membaca config lama atau cache

**Solusi**:
1. Clear browser cache dan cookies untuk `caaip.netlify.app`
2. Hard refresh `/admin` dengan `Ctrl + F5`
3. Pastikan file `public/admin/config.yml` berisi:
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```
4. Redeploy Netlify jika perlu

### ❌ Redirect loop di /admin
**Penyebab**: Sudah diperbaiki (custom redirect dihapus dari netlify.toml)

**Solusi**:
1. Clear cookies untuk `caaip.netlify.app`
2. Coba Incognito
3. Redeploy

### ❌ 404 di /admin
**Penyebab**: File admin belum terdeploy atau path salah

**Solusi**:
1. Cek Deploy logs Netlify, pastikan `dist/admin/index.html` ter-generate
2. Coba akses langsung: https://caaip.netlify.app/admin/index.html
3. Jika berhasil, berarti routing OK. Coba `/admin/` (dengan slash)

## Verifikasi Setup Berhasil

Cek di browser console (F12 → Console) di halaman admin:
```javascript
netlifyIdentity.currentUser()
```
- Jika **null**: belum login
- Jika **objek dengan email Anda**: login berhasil ✅

## Status User di Netlify Identity

Di Netlify Dashboard → Site → Identity → Users, pastikan:
- ✅ Email Anda ada di list
- ✅ Status: **"Confirmed"** (bukan Unconfirmed)
- ✅ Created date dan Last seen terisi

## Kontak & Dukungan

Jika masalah tetap terjadi setelah mengikuti semua langkah:
1. Screenshot halaman error
2. Screenshot Netlify → Identity → Users (status user Anda)
3. Kirimkan log browser console (F12 → Console tab)
4. Hubungi tim development

---
**Update terakhir**: 2 November 2025
**Status**: ✅ Migrasi Vercel → Netlify selesai, semua file dibersihkan
