# 🎯 Cara Upload Data Alumni di CMS (Updated untuk Hostinger)

## 📋 Overview

Karena Decap CMS **tidak support custom widget untuk upload CSV langsung**, kita menggunakan **workflow 2-step** yang tetap mudah:

1. **Convert CSV → JSON** menggunakan tool converter
2. **Paste JSON** ke CMS

---

## 🚀 Workflow Lengkap

### **Step 1: Siapkan File CSV**

Format yang benar:
```csv
No;Nama;Jurusan
1;Taufiq;Rekayasa Bangunan
2;Fandi;RPL
3;Hasan;Kriptografi
```

**Aturan:**
- ✅ Baris pertama: header (`No;Nama;Jurusan`)
- ✅ Delimiter: **semicolon (;)** 
- ✅ Encoding: UTF-8
- ✅ Extension: `.csv`

---

### **Step 2: Convert CSV ke JSON**

#### Opsi A: Menggunakan Tool Online (RECOMMENDED ✅)

1. **Buka converter tool:**
   ```
   https://caaip.id/csv-converter.html
   ```
   (Atau jika belum deploy: `https://caaip.netlify.app/csv-converter.html`)

2. **Upload file CSV:**
   - Klik area "Upload file CSV atau drag & drop"
   - Pilih file CSV Anda
   - File akan auto-parsing

3. **Preview & Edit (Opsional):**
   - Lihat tabel preview
   - Double-click cell untuk edit
   - Klik "Hapus" untuk delete baris
   - Klik "Tambah Alumni" untuk add baris baru

4. **Generate JSON:**
   - Klik tombol **"Generate JSON"**
   - JSON muncul di bawah tabel

5. **Copy JSON:**
   - Klik tombol **"📋 Copy JSON"**
   - JSON sudah di clipboard! ✅

#### Opsi B: Manual Pakai Excel

1. Buat format JSON manual:
```json
[
  { "no": "1", "name": "Taufiq", "program": "RB" },
  { "no": "2", "name": "Fandi", "program": "RPL" },
  { "no": "3", "name": "Hasan", "program": "Kripto" }
]
```

---

### **Step 3: Login ke CMS**

1. Buka:
   ```
   https://admin.caaip.id/admin
   ```
   (Atau `https://caaip.netlify.app/admin` jika belum setup subdomain)

2. **Login dengan Netlify Identity:**
   - Klik "Login with Netlify Identity"
   - Email & password Anda

---

### **Step 4: Buat Entry Alumni Baru**

1. **Sidebar → "Alumni (Per Angkatan)"**

2. **Klik "New Alumni (Per Angkatan)"**

3. **Isi Tahun Angkatan:**
   - Field: "Tahun Angkatan"
   - Isi: `2026` (atau tahun lainnya)

---

### **Step 5: Paste JSON ke Field "Data Alumni"**

#### Metode 1: Paste Mode (RECOMMENDED ✅)

1. **Cari field "Data Alumni"**
   
2. **Klik ikon "Edit" (pensil)** di sebelah kanan field

3. **Pilih mode "Raw"** (ikon `</>` atau toggle Raw mode)

4. **Paste JSON** yang sudah di-copy dari converter:
   ```json
   [
     { "no": "1", "name": "Taufiq", "program": "RB" },
     { "no": "2", "name": "Fandi", "program": "RPL" }
   ]
   ```

5. **Save**

6. **Preview:** JSON akan auto-convert ke list widget view ✅

#### Metode 2: Manual Input (Untuk data sedikit)

1. Klik **"Add Data Alumni"**
2. Isi form:
   - No: `1`
   - Nama: `Taufiq`
   - Jurusan/Program: `Rekayasa Bangunan`
3. Klik **"Add Data Alumni"** lagi untuk alumni berikutnya
4. Ulangi untuk setiap alumni

---

### **Step 6: Publish**

1. **Scroll ke atas** (atau klik tombol "Publish" di toolbar)

2. **Klik "Publish"** → **"Publish now"**

3. **Tunggu commit ke GitHub** (1-5 detik)

4. **Auto-deploy:**
   - GitHub Actions trigger build (2-3 menit)
   - Atau manual deploy jika belum setup Actions

---

### **Step 7: Verify di Website**

1. **Tunggu 2-3 menit** (untuk GitHub Actions deploy)

2. **Buka website:**
   ```
   https://caaip.id/alumni/2026
   ```
   (Ganti `2026` dengan tahun yang Anda input)

3. **Cek data alumni sudah muncul** ✅

---

## 🎨 Screenshot Workflow

### 1. Converter Tool
```
┌─────────────────────────────────────────┐
│   📊 CSV to JSON Converter              │
├─────────────────────────────────────────┤
│  [Upload File CSV atau Drag & Drop]    │
│                                         │
│  ┌─────────────────────────────┐       │
│  │ No │ Nama   │ Jurusan       │       │
│  ├────┼────────┼───────────────┤       │
│  │ 1  │ Taufiq │ RB            │       │
│  │ 2  │ Fandi  │ RPL           │       │
│  └─────────────────────────────┘       │
│                                         │
│  [📋 Copy JSON]  [💾 Download JSON]    │
└─────────────────────────────────────────┘
```

### 2. CMS Paste JSON
```
┌─────────────────────────────────────────┐
│  Tahun Angkatan: [2026____________]     │
│                                         │
│  Data Alumni:                           │
│  ┌─────────────────────────────┐       │
│  │  [Edit ✏️] [Raw Mode </>]   │       │
│  │                              │       │
│  │  [Paste JSON di sini]        │       │
│  │  [                           │       │
│  │    { "no": "1",              │       │
│  │      "name": "Taufiq",       │       │
│  │      "program": "RB" }       │       │
│  │  ]                           │       │
│  └─────────────────────────────┘       │
│                                         │
│  [Publish] [Save Draft]                 │
└─────────────────────────────────────────┘
```

---

## ⚡ Tips & Tricks

### 1. **Batch Upload (Banyak Alumni)**
- Upload satu angkatan sekaligus (100+ alumni OK)
- Gunakan Excel untuk sort/filter dulu
- Convert ke CSV → Upload ke tool → Copy JSON

### 2. **Edit Alumni yang Sudah Ada**
1. CMS → Alumni → Pilih angkatan
2. Edit → Paste JSON baru (replace semua)
3. Atau edit manual di list widget (klik item)

### 3. **Backup Data**
- Simpan file CSV asli
- Download JSON dari tool converter
- GitHub = automatic backup (semua di commit history)

### 4. **Multiple Angkatan**
- Upload satu per satu
- File 2026.json, 2025.json, 2024.json, dst
- Atau batch create di CMS

---

## 🆘 Troubleshooting

### ❌ JSON tidak valid saat paste

**Error:** "Invalid JSON format"

**Solusi:**
1. Pastikan JSON format benar (cek di converter tool)
2. Gunakan JSON validator: https://jsonlint.com
3. Paste di "Raw mode" bukan "UI mode"
4. Jangan ada trailing comma

### ❌ Data tidak muncul setelah publish

**Solusi:**
1. Tunggu 2-3 menit untuk deploy
2. Hard refresh browser: `Ctrl + F5`
3. Cek GitHub Actions status
4. Clear browser cache

### ❌ CSV tidak ke-parse dengan benar di tool

**Solusi:**
1. Cek delimiter: harus semicolon (`;`)
2. Cek encoding: harus UTF-8
3. Buka CSV dengan Notepad → Cek format manual
4. Tidak ada semicolon di dalam nama/jurusan

### ❌ List widget tidak bisa paste JSON

**Solusi:**
1. Klik ikon "Edit" (pensil) di field
2. Toggle ke "Raw mode" (`</>` icon)
3. Paste JSON di text area
4. Save → JSON akan auto-convert ke list items

---

## 📊 Contoh File Lengkap

### File CSV (alumni-2026.csv):
```csv
No;Nama;Jurusan
1;Taufiq;Rekayasa Bangunan
2;Fandi;RPL
3;Hasan;Kriptografi
4;Budi Santoso;TKJ
5;Siti Aminah;Multimedia
6;Ahmad Rizki;Nautika
7;Dewi Lestari;KALK
8;Eko Prasetyo;TKP
9;Fatimah Zahra;Teknika
10;Gunawan Putra;Elektronika
```

### JSON Output (dari converter):
```json
[
  { "no": "1", "name": "Taufiq", "program": "Rekayasa Bangunan" },
  { "no": "2", "name": "Fandi", "program": "RPL" },
  { "no": "3", "name": "Hasan", "program": "Kriptografi" },
  { "no": "4", "name": "Budi Santoso", "program": "TKJ" },
  { "no": "5", "name": "Siti Aminah", "program": "Multimedia" },
  { "no": "6", "name": "Ahmad Rizki", "program": "Nautika" },
  { "no": "7", "name": "Dewi Lestari", "program": "KALK" },
  { "no": "8", "name": "Eko Prasetyo", "program": "TKP" },
  { "no": "9", "name": "Fatimah Zahra", "program": "Teknika" },
  { "no": "10", "name": "Gunawan Putra", "program": "Elektronika" }
]
```

### File JSON Final (src/content/alumni/2026.json):
```json
{
  "year": "2026",
  "csvData": [
    { "no": "1", "name": "Taufiq", "program": "Rekayasa Bangunan" },
    { "no": "2", "name": "Fandi", "program": "RPL" },
    { "no": "3", "name": "Hasan", "program": "Kriptografi" }
  ]
}
```

---

## 🎯 Keunggulan Workflow Ini

| Fitur | Keterangan |
|-------|------------|
| ✅ **No Custom Code** | Pakai standard Decap CMS widget |
| ✅ **User-Friendly** | Tool converter sangat mudah digunakan |
| ✅ **Preview & Edit** | Bisa edit data sebelum paste ke CMS |
| ✅ **Batch Upload** | Upload ratusan alumni sekaligus |
| ✅ **No Database** | Data tersimpan di Git (version controlled) |
| ✅ **Auto-Deploy** | GitHub Actions auto-deploy setelah publish |
| ✅ **Offline-Capable** | CSV converter bisa download untuk offline use |

---

## 🔗 Quick Links

- **Converter Tool:** https://caaip.id/csv-converter.html
- **CMS Admin:** https://admin.caaip.id/admin
- **Website:** https://caaip.id
- **GitHub Repo:** https://github.com/fandcomp/CAAIP

---

## 📞 Need Help?

Jika ada masalah:
1. Screenshot error message
2. Check GitHub Issues
3. Hubungi admin website

---

**Updated:** 8 November 2025  
**Version:** 2.0 (Hostinger-ready)  
**Status:** ✅ Production
