# 🔐 Panduan Keamanan Login CMS - Invite Only Mode

## 📋 Overview

Setup ini akan membuat CMS Anda **super aman** dengan fitur:
- ✅ **Invite Only** - Hanya admin yang bisa undang user baru
- ✅ **Tidak ada tombol "Sign Up"** - User tidak bisa daftar sendiri
- ✅ **Toggle On/Off Registration** - Aktifkan/matikan kapan saja dari dashboard
- ✅ **Email Verification** - Setiap user baru harus verifikasi email
- ✅ **Role Management** - Bisa set role (admin/editor) untuk setiap user

---

## 🚀 SETUP KEAMANAN (Step-by-Step)

### **Step 1: Enable Netlify Identity**

1. **Login ke Netlify Dashboard:**
   ```
   https://app.netlify.com
   ```

2. **Pilih site "caaip":**
   - Klik site Anda dari dashboard

3. **Enable Identity:**
   - Klik tab **"Identity"** di menu atas
   - Klik tombol **"Enable Identity"**
   - Tunggu beberapa detik hingga aktif

---

### **Step 2: Set Registration ke "Invite Only"** ⭐ (PENTING!)

Ini adalah fitur yang Anda minta - **non-aktifkan pendaftaran publik**:

1. **Masih di halaman Identity**, klik **"Settings and usage"**

2. **Scroll ke section "Registration"**

3. **Pilih "Invite only":**
   ```
   ○ Open          ← JANGAN pilih ini (siapa saja bisa daftar)
   ● Invite only   ← PILIH INI (hanya admin yang bisa undang)
   ```

4. **Klik "Save"**

**Hasil:**
- ❌ Tombol "Sign Up" **HILANG** dari halaman login
- ✅ Hanya bisa login jika sudah di-invite
- ✅ Admin full control siapa yang bisa akses

---

### **Step 3: Enable Git Gateway**

Agar CMS bisa commit ke GitHub:

1. **Masih di halaman Identity**, scroll ke **"Services"**

2. **Klik "Enable Git Gateway"**

3. **Klik "Generate access token"** (jika diminta)

4. **Authorize Netlify** di GitHub

**Status setelah enable:**
```
✅ Git Gateway: Enabled
   Connected to: fandcomp/CAAIP
```

---

### **Step 4: Configure Email Templates (Opsional tapi Recommended)**

Customize email yang dikirim ke user baru:

1. **Di halaman Identity**, klik **"Emails"** tab

2. **Edit template:**
   - **Invitation template** - Email undangan untuk user baru
   - **Confirmation template** - Email verifikasi
   - **Password recovery** - Email reset password

3. **Gunakan template default** atau customize:
   ```html
   Halo {{ .Email }},
   
   Anda diundang untuk menjadi admin website CAAIP.
   Klik link di bawah untuk setup password:
   
   {{ .ConfirmationURL }}
   
   Salam,
   Tim CAAIP
   ```

4. **Klik "Save"**

---

### **Step 5: Invite Admin Pertama (User Anda)**

Sekarang undang diri Anda sebagai admin:

1. **Klik tab "Identity"** (kembali ke main page)

2. **Klik "Invite users"**

3. **Masukkan email Anda:**
   ```
   Email: admin@example.com
   ```

4. **Klik "Send invite"**

5. **Cek inbox email Anda**

6. **Klik link "Accept the invite"**

7. **Set password Anda** (min 6 karakter)

8. **Klik "Sign up"**

**Selamat! Anda sekarang admin pertama** ✅

---

### **Step 6: Test Login ke CMS**

1. **Buka CMS:**
   ```
   https://caaip.netlify.app/admin/
   atau
   https://caaip.id/admin (redirect ke Netlify)
   ```

2. **Klik "Login with Netlify Identity"**

3. **Masukkan:**
   - Email: [email yang tadi di-invite]
   - Password: [password yang tadi dibuat]

4. **Klik "Log in"**

5. **CMS Dashboard terbuka** ✅

**Expected Result:**
- ✅ Login berhasil
- ✅ Bisa edit semua konten
- ✅ **TIDAK ADA** tombol "Sign Up" (karena Invite Only)

---

## 🔐 MENGELOLA USER (Admin Panel)

### **Cara Invite User Baru:**

1. **Login ke Netlify Dashboard:**
   ```
   https://app.netlify.com/sites/caaip/identity
   ```

2. **Klik "Invite users"**

3. **Masukkan email user baru:**
   ```
   editor@example.com
   ```

4. **Klik "Send invite"**

5. **User akan terima email** dengan link aktivasi

6. **User klik link** → Set password → Bisa login ke CMS

### **Cara Lihat Daftar User:**

1. **Di Netlify Dashboard** → **Identity**

2. **Lihat semua user yang terdaftar:**
   ```
   📧 admin@example.com    - Confirmed ✅
   📧 editor@example.com   - Pending invite ⏳
   ```

### **Cara Hapus User:**

1. **Klik user yang mau dihapus**

2. **Klik "Delete user"**

3. **Confirm**

4. **User tidak bisa login lagi** ❌

### **Cara Suspend User (Temporary):**

1. **Klik user**

2. **Toggle "Account enabled"** → OFF

3. **User tidak bisa login** (tapi data tetap ada)

4. **Untuk restore:** Toggle kembali ke ON

---

## ⚙️ TOGGLE ON/OFF REGISTRATION

Ini adalah fitur yang Anda minta - **aktifkan/matikan pendaftaran**:

### **Matikan Pendaftaran (Invite Only):** 🔒

1. **Netlify Dashboard** → **Identity** → **Settings**

2. **Registration preferences:**
   ```
   ● Invite only
   ```

3. **Save**

**Result:**
- ❌ Tombol "Sign Up" **TIDAK MUNCUL** di halaman login
- ✅ Hanya bisa login jika sudah di-invite oleh admin
- ✅ **Mode Aman** - Full control

### **Aktifkan Pendaftaran (Open):** 🔓

⚠️ **TIDAK DIREKOMENDASIKAN** untuk production!

1. **Netlify Dashboard** → **Identity** → **Settings**

2. **Registration preferences:**
   ```
   ● Open
   ```

3. **Save**

**Result:**
- ✅ Tombol "Sign Up" **MUNCUL** di halaman login
- ⚠️ Siapa saja bisa daftar sendiri
- ❌ **Tidak aman** - bisa diserang spammer

**Recommendation:** **TETAP di "Invite Only"** untuk keamanan maksimal!

---

## 🛡️ FITUR KEAMANAN LAINNYA

### **1. External Provider Authentication (Opsional)**

Login pakai Google/GitHub untuk kemudahan:

1. **Netlify Dashboard** → **Identity** → **Settings**

2. **External providers:**
   - ☑️ Google
   - ☑️ GitHub
   - ☑️ GitLab

3. **Configure OAuth** (ikuti panduan Netlify)

4. **User bisa login dengan:**
   - Email + Password
   - Google Account
   - GitHub Account

### **2. Email Confirmation Required**

Pastikan user verifikasi email sebelum bisa login:

1. **Settings** → **Emails**

2. **Enable "Confirm email"**

3. **User harus klik link di email** sebelum bisa login

### **3. Password Requirements**

Set kebijakan password:

1. **Settings** → **Security**

2. **Password requirements:**
   - Minimum length: 8 characters
   - Require uppercase
   - Require numbers
   - Require special characters

3. **Save**

### **4. Auto-logout Timeout**

Set waktu auto-logout untuk keamanan:

1. **Di `public/admin/index.html`** (sudah dikonfigurasi)

2. **User akan auto-logout** setelah tidak aktif beberapa waktu

---

## 📊 MONITORING USER ACTIVITY

### **Cara Lihat Login History:**

1. **Netlify Dashboard** → **Identity**

2. **Klik user tertentu**

3. **Lihat:**
   - Last login
   - Created at
   - Confirmed at
   - Login count

### **Cara Lihat Audit Log:**

1. **Netlify Dashboard** → **Team settings** → **Audit log**

2. **Filter by:**
   - Identity events
   - User additions
   - User deletions

---

## 🎯 WORKFLOW: MENAMBAH ADMIN BARU

Contoh: Anda ingin menambahkan "editor@caaip.id" sebagai admin:

### **Langkah-langkah:**

1. **Login Netlify** → https://app.netlify.com/sites/caaip/identity

2. **Klik "Invite users"**

3. **Masukkan email:**
   ```
   editor@caaip.id
   ```

4. **Send invite**

5. **Beritahu editor untuk:**
   - Cek email inbox (atau spam folder)
   - Klik link "Accept invite"
   - Set password (min 6 karakter)
   - Login ke https://caaip.id/admin

6. **Editor sekarang bisa:**
   - Login ke CMS
   - Edit berita
   - Upload gambar
   - Manage konten

7. **Editor TIDAK BISA:**
   - Invite user lain (hanya Anda yang bisa)
   - Hapus site di Netlify
   - Access Netlify dashboard

---

## ⚠️ TROUBLESHOOTING

### **Problem: User tidak terima email invite**

**Solusi:**
1. Check spam folder
2. Check email address benar
3. Re-send invite dari Netlify dashboard
4. Pastikan email server tidak block Netlify

### **Problem: "Identity is not enabled"**

**Solusi:**
1. Netlify Dashboard → Identity
2. Klik "Enable Identity"
3. Refresh CMS page

### **Problem: "Git Gateway is not enabled"**

**Solusi:**
1. Netlify Dashboard → Identity → Services
2. Enable Git Gateway
3. Authorize GitHub
4. Refresh CMS

### **Problem: Tombol "Sign Up" masih muncul**

**Solusi:**
1. Check registration setting: **harus "Invite only"**
2. Clear browser cache (Ctrl + Shift + Delete)
3. Hard refresh (Ctrl + F5)
4. Try incognito/private window

### **Problem: User bisa login tapi tidak bisa edit**

**Solusi:**
1. Check Git Gateway enabled
2. Check user confirmed email
3. Check repo permissions di GitHub
4. Re-invite user

---

## 📋 CHECKLIST KEAMANAN

Pastikan semua ini sudah di-setup:

**Netlify Identity:**
- [x] Identity enabled
- [x] Registration: **Invite only** (PENTING!)
- [x] Git Gateway enabled
- [x] Email confirmation enabled
- [x] Admin pertama sudah di-invite
- [x] Admin bisa login ke CMS

**Password Policy:**
- [x] Minimum 6 karakter (atau lebih)
- [ ] Password complexity (opsional)
- [ ] Password expiry (opsional)

**Email Configuration:**
- [x] Invitation template configured
- [x] Email confirmation working
- [x] Password recovery working

**Testing:**
- [x] Login berhasil
- [x] **Tidak ada** tombol Sign Up (karena Invite Only)
- [x] CMS bisa edit & publish
- [x] Auto-deploy ke Hostinger working

---

## 🔗 Quick Access Links

| Fungsi | URL |
|--------|-----|
| **Netlify Identity Dashboard** | https://app.netlify.com/sites/caaip/identity |
| **Invite Users** | https://app.netlify.com/sites/caaip/identity#invite |
| **Identity Settings** | https://app.netlify.com/sites/caaip/settings/identity |
| **CMS Login** | https://caaip.netlify.app/admin/ |
| **CMS via Domain** | https://caaip.id/admin |

---

## 📝 SUMMARY

### **Mode "Invite Only" (RECOMMENDED):**

✅ **Keamanan Maksimal:**
- Hanya admin yang bisa undang user
- Tidak ada public registration
- Email verification required
- Full audit trail

✅ **Control Penuh:**
- Toggle on/off dari dashboard
- Suspend user kapan saja
- Delete user kapan saja
- Monitor login activity

✅ **User Experience:**
- Login mudah & aman
- Password recovery tersedia
- Email notifications
- No spam or abuse

### **Cara Toggle Registration:**

```
Netlify Dashboard → Identity → Settings → Registration preferences

🔒 Invite Only  ← MODE AMAN (Recommended)
   - No sign up button
   - Admin invite only
   - Full control

🔓 Open         ← MODE TERBUKA (Not recommended)
   - Sign up button visible
   - Anyone can register
   - Risk of abuse
```

---

**Status:** ✅ Setup Complete  
**Mode:** 🔒 Invite Only (Secure)  
**Next Step:** Invite admin users via Netlify Dashboard  
**Last Updated:** November 18, 2025
