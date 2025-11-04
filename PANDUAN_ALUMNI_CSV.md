# Panduan Upload Alumni via CSV

## Format CSV yang Benar

### Template CSV
```
No | Nama | Jurusan
1 | Agus Setiawan | Teknik Mesin
2 | Bambang Wijaya | Teknik Elektro
3 | Citra Dewi | Teknik Informatika
4 | Dian Pratama | Teknik Sipil
5 | Eka Putri | Teknik Kimia
```

### Aturan Format
- ✅ Gunakan **pipe** `|` sebagai pemisah kolom
- ✅ Header: `No | Nama | Jurusan`
- ✅ Baris pertama adalah header
- ✅ Kolom No: nomor urut (1, 2, 3, ...)
- ✅ Kolom Nama: nama lengkap alumni
- ✅ Kolom Jurusan: program studi/jurusan

## Cara Upload di CMS

### Metode 1: Upload File CSV (Recommended)

1. **Login ke Admin**
   ```
   https://caaip.netlify.app/admin/
   ```

2. **Buat Data Alumni Baru**
   - Klik "Alumni (Per Angkatan)"
   - Klik "New Alumni (Per Angkatan)"

3. **Isi Form**
   - **Angkatan**: Masukkan tahun angkatan (contoh: 1991, 2020)
   - **File CSV Alumni**: Klik "Choose a file" dan upload file CSV Anda
   - **Daftar Alumni**: Kosongkan (akan auto-populate dari CSV)
   - **Bahasa**: Pilih "id"

4. **Publish**
   - Klik "Publish"
   - Klik "Publish now"
   - Tunggu deploy (~1-2 menit)

### Metode 2: Input Manual

Jika tidak punya file CSV, bisa input manual satu per satu:

1. **Angkatan**: Masukkan tahun
2. **Daftar Alumni**: Klik "Add Alumni"
   - No: 1, 2, 3, ...
   - Nama: Nama lengkap
   - Jurusan: Program studi
3. Ulangi untuk setiap alumni
4. Publish

## Cara Membuat File CSV

### Menggunakan Excel/Google Sheets

1. **Buat Spreadsheet Baru**
   ```
   | A | B               | C                      |
   |---|-----------------|------------------------|
   | 1 | No              | Nama             | Jurusan            |
   | 2 | 1               | Agus Setiawan    | Teknik Mesin       |
   | 3 | 2               | Bambang Wijaya   | Teknik Elektro     |
   | 4 | 3               | Citra Dewi       | Teknik Informatika |
   ```

2. **Save As CSV**
   - File → Save As → CSV (Comma delimited)
   - Atau Export → CSV

3. **Edit Manual (Opsional)**
   - Buka file CSV dengan Notepad
   - Ganti koma `,` dengan pipe `|`
   - Save

### Menggunakan Text Editor

1. **Buka Notepad/VS Code**
2. **Copy Template**
   ```
   No | Nama | Jurusan
   1 | Agus Setiawan | Teknik Mesin
   2 | Bambang Wijaya | Teknik Elektro
   ```
3. **Isi Data Alumni**
4. **Save As** `alumni-2020.csv`

## Menggunakan Script Converter

Jika sudah punya file CSV:

```bash
# Install dependencies (first time only)
npm install

# Convert CSV to JSON
node scripts/csv-to-json.js 2020

# File akan dibuat di: src/content/alumni/2020.json
```

### Edit Script untuk Custom CSV

Edit file `scripts/csv-to-json.js`:

```javascript
const csvExample = `No | Nama | Jurusan
1 | Your Name | Your Program
2 | Another Name | Another Program`;

const angkatan = '2020'; // Ganti dengan tahun angkatan
```

Lalu run: `node scripts/csv-to-json.js`

## Tampilan di Website

Setelah publish, data alumni akan ditampilkan:

### Desktop (Table View)
```
┌────────────────────────────────────────────┐
│ No │ Nama           │ Jurusan            │
├────┼────────────────┼────────────────────┤
│ 1  │ Agus Setiawan  │ Teknik Mesin       │
│ 2  │ Bambang Wijaya │ Teknik Elektro     │
│ 3  │ Citra Dewi     │ Teknik Informatika │
└────┴────────────────┴────────────────────┘
```

### Mobile (Card View)
```
┌─────────────────────────┐
│ ① Agus Setiawan         │
│ 📚 Teknik Mesin         │
└─────────────────────────┘
┌─────────────────────────┐
│ ② Bambang Wijaya        │
│ 📚 Teknik Elektro       │
└─────────────────────────┘
```

## Troubleshooting

### CSV tidak ter-parse dengan benar

**Penyebab:**
- Format pemisah salah (pakai koma `,` bukan pipe `|`)
- Ada karakter special di nama (quotes, double pipe)
- Header tidak sesuai

**Solusi:**
1. Cek ulang format: `No | Nama | Jurusan`
2. Pastikan setiap baris punya 3 kolom
3. Hapus karakter special
4. Test dengan data sample dulu

### Data tidak muncul di website

**Cek:**
1. ✅ Publish sudah selesai? (tunggu 1-2 menit)
2. ✅ File JSON valid? Cek di `src/content/alumni/[angkatan].json`
3. ✅ Ada error di build? Cek Netlify deploy logs
4. ✅ Clear browser cache

### Nama terpotong atau tidak lengkap

**Penyebab:**
- Nama mengandung pipe `|` di dalamnya
- Nama terlalu panjang

**Solusi:**
- Ganti pipe dalam nama dengan dash `-`
- Atau gunakan input manual di CMS

### Format JSON Manual

Jika ingin edit langsung file JSON:

```json
{
  "angkatan": "2020",
  "members": [
    {
      "no": "1",
      "name": "Agus Setiawan",
      "program": "Teknik Mesin"
    },
    {
      "no": "2",
      "name": "Bambang Wijaya",
      "program": "Teknik Elektro"
    }
  ],
  "lang": "id"
}
```

Save di: `src/content/alumni/2020.json`

## Tips

1. **Batch Upload**: Upload satu angkatan sekaligus (100+ alumni OK)
2. **Naming**: Gunakan format angkatan konsisten (4 digit: 1991, 2020)
3. **Backup**: Simpan file CSV asli untuk reference
4. **Preview**: Test dengan sample kecil dulu (5-10 alumni)
5. **Sort**: Urutkan berdasarkan nama atau jurusan di CSV sebelum upload

## Contoh CSV Lengkap

```
No | Nama | Jurusan
1 | Achmad Fauzi | Teknik Perkapalan
2 | Ahmad Ridwan | Teknik Mesin
3 | Andi Wijaya | Teknik Elektro
4 | Bambang Sutrisno | Teknik Informatika
5 | Budi Hartono | Teknik Sipil
6 | Candra Kusuma | Teknik Kimia
7 | Dedi Setiawan | Teknik Industri
8 | Eka Putra | Teknik Mesin
9 | Fajar Rahman | Teknik Elektro
10 | Gani Pratama | Teknik Informatika
```

---

**Need Help?**
- Check build logs: https://app.netlify.com
- Check file structure: `src/content/alumni/`
- Test locally: `npm run dev`
