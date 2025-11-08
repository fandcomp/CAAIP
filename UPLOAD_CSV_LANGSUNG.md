# ✅ Upload CSV Alumni - Direct Upload (No Conversion!)

## 🎉 Fitur Baru: Upload CSV Langsung di CMS!

Sekarang Anda bisa **upload file CSV langsung** di CMS dan data otomatis terbaca dan ditampilkan dalam **tabel interaktif**!

---

## 🚀 Cara Pakai (Super Mudah!)

### **Step 1: Login CMS**
```
https://admin.caaip.id/admin
```
(Atau `https://caaip.netlify.app/admin` jika belum setup subdomain)

### **Step 2: Buat Alumni Baru**
1. Sidebar → **"Alumni (Per Angkatan)"**
2. Klik **"New Alumni (Per Angkatan)"**

### **Step 3: Isi Tahun Angkatan**
- Field: "Tahun Angkatan"
- Isi: `2026` (atau tahun lainnya)

### **Step 4: Upload File CSV** 📁

1. **Lihat field "Data Alumni"** - Ada area upload dengan ikon 📁

2. **Klik area upload** (atau drag & drop file CSV)

3. **Pilih file CSV** dari komputer Anda

4. **OTOMATIS!** ✨
   - File CSV di-parse
   - Data muncul di tabel
   - Siap diedit!

### **Step 5: Edit Data (Opsional)**

**Tabel Interaktif:**
- ✏️ **Edit inline**: Klik field No/Nama/Jurusan → Edit langsung
- ➕ **Tambah baris**: Klik tombol "➕ Tambah Alumni"
- 🗑️ **Hapus baris**: Klik tombol "🗑️ Hapus" di setiap baris

### **Step 6: Publish**
1. Scroll ke atas
2. Klik **"Publish"** → **"Publish now"**
3. Tunggu 2-3 menit (auto-deploy)
4. **Done!** ✅

---

## 📋 Format CSV yang Benar

```csv
No;Nama;Jurusan
1;Taufiq;Rekayasa Bangunan
2;Fandi;RPL
3;Hasan;Kriptografi
4;Budi Santoso;TKJ
5;Siti Aminah;Multimedia
```

**Aturan:**
- ✅ Baris pertama: header (`No;Nama;Jurusan`)
- ✅ Delimiter: **semicolon (;)**
- ✅ Encoding: UTF-8
- ✅ Extension: `.csv`

---

## 🎨 Preview di CMS

### Sebelum Upload:
```
┌─────────────────────────────────────┐
│        📁                           │
│   Klik untuk upload file CSV        │
│   Format: No;Nama;Jurusan           │
│                                     │
│   [Area klik/drag & drop]           │
└─────────────────────────────────────┘
```

### Setelah Upload (Tabel Muncul Otomatis!):
```
┌─────────────────────────────────────────────────┐
│ ✅ alumni-2026.csv                              │
│                                                 │
│ Total: 3 alumni          [➕ Tambah Alumni]    │
│                                                 │
│ ┌────┬──────────────┬──────────┬─────────────┐ │
│ │ No │ Nama         │ Jurusan  │ Aksi        │ │
│ ├────┼──────────────┼──────────┼─────────────┤ │
│ │ [1]│ [Taufiq   ]  │ [RB   ]  │ [🗑️ Hapus] │ │
│ │ [2]│ [Fandi    ]  │ [RPL  ]  │ [🗑️ Hapus] │ │
│ │ [3]│ [Hasan    ]  │ [Kripto] │ [🗑️ Hapus] │ │
│ └────┴──────────────┴──────────┴─────────────┘ │
└─────────────────────────────────────────────────┘
```

**Semua field bisa diklik dan diedit langsung!** ✏️

---

## ⚡ Fitur Widget CSV Upload

| Fitur | Deskripsi |
|-------|-----------|
| **📁 Upload Drag & Drop** | Klik area upload atau drag file CSV |
| **✨ Auto-Parse** | Otomatis parsing CSV dengan delimiter `;` |
| **👁️ Live Preview** | Tabel muncul langsung setelah upload |
| **✏️ Inline Edit** | Edit No, Nama, Jurusan langsung di tabel |
| **🗑️ Delete Row** | Hapus baris dengan 1 klik |
| **➕ Add Row** | Tambah alumni manual setelah upload |
| **✅ Validation** | Hanya accept file `.csv` |
| **⚠️ Error Handling** | Tampilkan error jika ada masalah parsing |
| **📊 Count Badge** | Total jumlah alumni di-display |
| **💾 Auto-Save** | Data otomatis masuk ke CMS field |

---

## 🎯 Workflow Lengkap

```
1. User upload file CSV di CMS
         ↓
2. Widget baca file via FileReader API
         ↓
3. Auto-parsing:
   - Split lines by \n
   - Skip header (line 1)
   - Split columns by ;
   - Trim whitespace
         ↓
4. Generate array of objects:
   [
     { no: "1", name: "Taufiq", program: "RB" },
     { no: "2", name: "Fandi", program: "RPL" },
     ...
   ]
         ↓
5. Render tabel interaktif
         ↓
6. User bisa edit/hapus/tambah
         ↓
7. Klik Publish → Save ke GitHub → Deploy
         ↓
8. Website updated! ✅
```

---

## 🆘 Troubleshooting

### ❌ File tidak bisa diupload

**Error:** "File harus berformat .csv"

**Solusi:**
- Pastikan file extension `.csv` (bukan `.xlsx` atau `.txt`)
- Save as CSV dari Excel/Google Sheets

### ❌ Data tidak muncul setelah upload

**Solusi:**
1. Cek format CSV: `No;Nama;Jurusan`
2. Delimiter harus semicolon (`;`)
3. Baris pertama harus header
4. Refresh page CMS (F5)

### ❌ Data terpotong atau salah

**Solusi:**
1. Buka CSV dengan Notepad → Cek format manual
2. Tidak ada semicolon di dalam nama/jurusan
3. Edit langsung di tabel setelah upload

### ❌ Widget tidak muncul

**Solusi:**
1. Clear browser cache (Ctrl + F5)
2. Try incognito mode
3. Verify file `public/admin/index.html` sudah ter-deploy
4. Check console untuk error (F12 → Console tab)

---

## 📊 Contoh File CSV

### File: `alumni-2026.csv`
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

**Download:** Buat file dengan format di atas, save as `.csv`

---

## ✅ Keunggulan vs Workflow Sebelumnya

| Aspek | Sebelumnya (Manual) | Sekarang (Direct Upload) |
|-------|---------------------|--------------------------|
| **Upload** | ❌ Convert dulu → Paste JSON | ✅ Upload langsung |
| **Steps** | 3 step (Upload → Convert → Paste) | 1 step (Upload) |
| **Tool Eksternal** | ⚠️ Perlu converter tool | ✅ Built-in di CMS |
| **Edit** | ⚠️ Edit di JSON (susah) | ✅ Edit di tabel (mudah) |
| **Preview** | ❌ Tidak ada preview | ✅ Live preview tabel |
| **Add/Delete** | ⚠️ Edit JSON manual | ✅ Tombol Add/Delete |
| **User-Friendly** | ⚠️ Moderate | ✅ Very easy |

---

## 🎉 Summary

✅ **Upload CSV langsung** - No conversion needed!  
✅ **Auto-parse & display** - Tabel muncul otomatis  
✅ **Inline edit** - Edit langsung di tabel  
✅ **Add/Delete rows** - Tombol intuitif  
✅ **Error handling** - Validasi otomatis  
✅ **User-friendly** - Super mudah dipakai!

---

## 🔗 Quick Links

- **CMS Admin:** https://admin.caaip.id/admin
- **Website:** https://caaip.id
- **Converter Tool (Backup):** https://caaip.id/csv-converter.html

---

**Dibuat:** 8 November 2025  
**Update:** Direct CSV upload (no conversion!)  
**Status:** ✅ Production Ready
