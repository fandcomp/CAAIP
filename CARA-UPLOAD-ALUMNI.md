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

## 🚀 Cara Upload Melalui CMS

### Langkah 1: Login ke CMS
1. Buka: https://caaip.netlify.app/admin
2. Login dengan akun Netlify Identity Anda

### Langkah 2: Buka Collection Alumni
1. Klik menu **"Alumni (Per Angkatan)"** di sidebar
2. Klik tombol **"New Alumni (Per Angkatan)"**

### Langkah 3: Input Data

#### A. **Tahun Angkatan**
- Isi tahun angkatan, contoh: `2026`, `1991`, `2005`

#### B. **Paste Data CSV Alumni**
Ada 2 cara:

**Cara 1: Copy-Paste dari File CSV**
1. Buka file CSV Anda (misalnya `2026.csv`)
2. Copy **SEMUA ISI** file (termasuk header)
3. Paste di field **"Paste Data CSV Alumni"**

Contoh isi yang di-paste:
```
No;Nama;Jurusan
1;Taufiq;RB
2;Fandi;RPL
3;Hasan;Kripto
```

**Cara 2: Ketik Manual** (jika data sedikit)
- Ketik langsung dengan format yang sama
- Jangan lupa header di baris pertama
- Gunakan semicolon (;) sebagai pemisah

#### C. **Data Alumni (List)**
- Field ini akan **OTOMATIS terisi** saat Anda publish
- CSV yang Anda paste akan di-parse menjadi list data
- Anda juga bisa menambah/edit manual jika perlu

### Langkah 4: Simpan & Publish
1. Klik tombol **"Save"** (draft)
2. Klik tombol **"Publish"** (publish ke website)
3. Tunggu beberapa detik untuk build & deploy
4. Website akan otomatis update dengan data alumni baru

---

## 🔄 Cara Kerja Otomatis

Ketika Anda klik **Publish**, sistem akan:

1. ✅ Membaca text CSV yang Anda paste
2. ✅ Memisahkan per baris (skip baris header)
3. ✅ Memisahkan per kolom dengan delimiter semicolon (;)
4. ✅ Membuat object untuk setiap alumni:
   ```json
   {
     "no": "1",
     "name": "Taufiq",
     "program": "RB"
   }
   ```
5. ✅ Menyimpan ke field `csvData` sebagai array
6. ✅ Commit ke GitHub repository
7. ✅ Trigger Netlify rebuild
8. ✅ Deploy ke website

---

## 📝 Tips & Troubleshooting

### ✅ DO (Lakukan):
- Gunakan semicolon (;) sebagai pemisah
- Pastikan baris pertama adalah header
- Gunakan text editor biasa untuk edit CSV (Notepad, VS Code)
- Hapus spasi berlebih sebelum/sesudah nama

### ❌ DON'T (Jangan):
- Jangan gunakan koma (,) sebagai pemisah
- Jangan gunakan Excel (bisa mengubah format)
- Jangan tambahkan kolom ekstra tanpa update header
- Jangan lupa header di baris pertama

### Jika Ada Masalah:

**1. Data tidak muncul setelah publish**
- Cek apakah format CSV sudah benar (semicolon)
- Cek di browser console untuk error
- Tunggu 1-2 menit untuk build selesai

**2. Data terpotong/salah**
- Cek apakah ada semicolon di dalam nama (harus dihapus)
- Cek jumlah kolom setiap baris sama
- Hapus baris kosong di tengah CSV

**3. Website tidak update**
- Buka https://app.netlify.com dan cek status deploy
- Refresh browser dengan Ctrl+F5 (hard refresh)
- Clear cache browser

---

## 📊 Contoh File CSV Lengkap

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
10;Gunawan;Elektronika
```

---

## 🎯 Hasil Akhir

Setelah publish, data alumni akan tampil di:
- **Halaman Daftar Alumni**: https://caaip.netlify.app/alumni
- **Halaman Per Angkatan**: https://caaip.netlify.app/alumni/2026

Dengan fitur:
- ✅ Search/pencarian nama
- ✅ Filter jurusan
- ✅ Pagination (10/25/50/100/All entries)
- ✅ Responsive (desktop & mobile)

---

## 🆘 Butuh Bantuan?

Jika masih ada masalah:
1. Screenshot error yang muncul
2. Copy-paste isi CSV yang bermasalah
3. Hubungi admin teknis

Selamat mencoba! 🎉
