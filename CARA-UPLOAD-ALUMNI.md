# Cara Upload Data Alumni Via CMS

## 📋 Format CSV Yang Benar

File CSV harus menggunakan **semicolon (;)** sebagai pemisah, bukan koma.

### Contoh Format:
```csv
No;Nama;Jurusan
1;Taufiq;RB
2;Fandi;RPL
3;Hasan;Kripto
4;Budi Santoso;TKJ
5;Siti Aminah;Multimedia
```

**Penting:**
- Baris pertama adalah header: `No;Nama;Jurusan`
- Pemisah kolom: **semicolon (;)**
- Setiap baris adalah satu alumni
- Minimal harus ada kolom No dan Nama

---

## 🚀 Cara Upload Melalui CMS (BARU - Upload File Langsung!)

### Langkah 1: Login ke CMS
1. Buka: https://caaip.netlify.app/admin
2. Login dengan akun Netlify Identity Anda

### Langkah 2: Buka Collection Alumni
1. Klik menu **"Alumni (Per Angkatan)"** di sidebar
2. Klik tombol **"New Alumni (Per Angkatan)"**

### Langkah 3: Input Data

#### A. **Tahun Angkatan**
- Isi tahun angkatan, contoh: `2026`, `1991`, `2005`

#### B. **Upload File CSV** ⭐ FITUR BARU!
1. Klik area **"Upload File CSV Alumni"**
2. Pilih file CSV dari komputer Anda
3. **OTOMATIS** file akan diproses dan ditampilkan di bawahnya

#### C. **Preview & Edit Data Alumni**
Setelah upload, Anda akan melihat:
- ✅ **Total jumlah alumni** yang berhasil di-upload
- ✅ **Tabel interaktif** dengan semua data alumni
- ✅ Setiap baris bisa di-**EDIT** langsung (No, Nama, Jurusan)
- ✅ Tombol **HAPUS** untuk menghapus alumni tertentu
- ✅ Tombol **+ Tambah Alumni** untuk menambah manual

**Screenshot Preview:**
```
┌─────────────────────────────────────────────┐
│ Upload File CSV Alumni                      │
│ [Choose File] alumni-2026.csv               │
├─────────────────────────────────────────────┤
│ Total: 3 alumni          [+ Tambah Alumni]  │
├────┬──────────────┬──────────┬──────────────┤
│ No │ Nama         │ Jurusan  │ Aksi         │
├────┼──────────────┼──────────┼──────────────┤
│ 1  │ [Taufiq   ]  │ [RB   ]  │ [Hapus]      │
│ 2  │ [Fandi    ]  │ [RPL  ]  │ [Hapus]      │
│ 3  │ [Hasan    ]  │ [Kripto] │ [Hapus]      │
└────┴──────────────┴──────────┴──────────────┘
```

### Langkah 4: Edit Data (Opsional)
- **Edit**: Klik di field yang ingin diubah, ketik langsung
- **Hapus**: Klik tombol "Hapus" di kolom Aksi
- **Tambah**: Klik tombol "+ Tambah Alumni" di atas tabel

### Langkah 5: Simpan & Publish
1. Pastikan semua data sudah benar
2. Klik tombol **"Save"** (menyimpan draft)
3. Klik tombol **"Publish"** (publish ke website)
4. Tunggu beberapa detik untuk build & deploy
5. Website akan otomatis update dengan data alumni baru!

---

## 🔄 Cara Kerja Otomatis (Behind The Scenes)

```
1. User upload file CSV
         ↓
2. File dibaca oleh browser (JavaScript FileReader API)
         ↓
3. Parsing otomatis:
   - Baca baris per baris
   - Skip header (baris 1)
   - Split dengan delimiter ";"
   - Trim whitespace
         ↓
4. Generate array of objects:
   [
     { "no": "1", "name": "Taufiq", "program": "RB" },
     { "no": "2", "name": "Fandi", "program": "RPL" },
     ...
   ]
         ↓
5. Tampilkan di tabel editor (editable)
         ↓
6. User bisa edit/hapus/tambah
         ↓
7. Klik Publish → Save to GitHub → Build → Deploy
```

---

## ✨ Fitur-Fitur Widget Upload CSV

| Fitur | Deskripsi |
|-------|-----------|
| **Upload Drag & Drop** | Klik area upload atau drag file CSV |
| **Auto-Parse** | Otomatis parsing CSV dengan delimiter `;` |
| **Live Preview** | Lihat data langsung setelah upload |
| **Inline Edit** | Edit No, Nama, Jurusan langsung di tabel |
| **Delete Row** | Hapus baris yang tidak diperlukan |
| **Add Row** | Tambah alumni manual setelah upload |
| **Validation** | Hanya accept file `.csv` |
| **Error Handling** | Tampilkan error jika ada masalah parsing |
| **Responsive Table** | Scroll horizontal untuk data banyak |

---

## 📝 Tips & Best Practices

### ✅ DO (Lakukan):
- Gunakan semicolon (;) sebagai pemisah
- Pastikan baris pertama adalah header: `No;Nama;Jurusan`
- Simpan file dengan encoding UTF-8
- Hapus baris kosong sebelum upload
- Cek preview sebelum publish

### ❌ DON'T (Jangan):
- Jangan gunakan koma (,) sebagai pemisah
- Jangan ada semicolon di dalam nama (contoh: "Budi; S.Kom")
- Jangan lupa header di baris pertama
- Jangan upload file Excel (.xlsx) - harus .csv

---

## 🆘 Troubleshooting

### 1. **"File harus berformat .csv"**
**Solusi:** Pastikan file Anda berekstensi `.csv`, bukan `.xlsx` atau `.txt`

### 2. **Data tidak muncul setelah upload**
**Solusi:** 
- Cek format CSV (semicolon sebagai pemisah)
- Buka file CSV dengan Notepad untuk memastikan formatnya benar
- Pastikan ada minimal 2 baris (header + 1 data)

### 3. **Data terpotong atau salah**
**Solusi:**
- Cek tidak ada semicolon di dalam nama/jurusan
- Pastikan setiap baris punya 3 kolom (No;Nama;Jurusan)
- Edit manual di tabel preview jika ada yang salah

### 4. **Website tidak update setelah publish**
**Solusi:**
- Tunggu 1-2 menit untuk build selesai
- Buka https://app.netlify.com untuk cek status deploy
- Refresh browser dengan Ctrl+F5 (hard refresh)

---

## 📊 Contoh File CSV Lengkap

**File: alumni-2026.csv**
```csv
No;Nama;Jurusan
1;Taufiq;RB
2;Fandi;RPL
3;Hasan;Kripto
4;Budi Santoso;TKJ
5;Siti Aminah;Multimedia
6;Ahmad Rizki;Nautika
7;Dewi Lestari;KALK
8;Eko Prasetyo;TKP
9;Fatimah Zahra;Teknika
10;Gunawan Putra;Elektronika
```

---

## 🎯 Keunggulan Sistem Baru

| Aspek | Sistem Lama | Sistem Baru ✨ |
|-------|-------------|----------------|
| **Input Method** | Copy-paste text | Upload file langsung |
| **Preview** | Tidak ada | Ada (tabel interaktif) |
| **Edit Data** | Harus edit text | Edit per field di tabel |
| **Delete Row** | Manual di text | Tombol hapus per row |
| **Add Row** | Manual ketik | Tombol tambah alumni |
| **Validation** | Tidak ada | File type validation |
| **User Experience** | ⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🎬 Demo Step-by-Step

1. **Siapkan file CSV** dengan format benar
2. **Login** ke https://caaip.netlify.app/admin
3. **Buat alumni baru**: Klik "New Alumni (Per Angkatan)"
4. **Isi tahun**: Ketik `2026`
5. **Upload CSV**: Klik "Choose File" → pilih file → Open
6. **Lihat preview**: Data otomatis muncul di tabel
7. **Edit jika perlu**: Klik field yang ingin diubah
8. **Publish**: Klik Save → Publish
9. **Cek website**: Buka https://caaip.netlify.app/alumni/2026

**Done!** Data alumni sudah live di website! 🎉

---

## 📞 Butuh Bantuan?

Jika masih ada masalah:
1. Screenshot error yang muncul
2. Share file CSV yang bermasalah
3. Hubungi admin teknis

Selamat mencoba sistem upload yang lebih mudah! 🚀
