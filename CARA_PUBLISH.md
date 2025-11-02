# Cara Kerja Publish Konten dari Admin CMS

## Perubahan Yang Sudah Dibuat

### 1. Publish Mode: Editorial Workflow → Simple
**Sebelum**: `publish_mode: editorial_workflow`
- Konten yang dibuat/diedit di CMS membuat **Pull Request** ke branch baru
- Perlu manual merge PR di GitHub untuk konten muncul di site
- Cocok untuk tim besar dengan review process

**Sekarang**: `publish_mode: simple`
- Konten langsung commit ke branch `main`
- Otomatis trigger Netlify rebuild
- Site update dalam 1-2 menit setelah publish
- Cocok untuk single admin atau tim kecil

### 2. Homepage Sekarang Dinamis
**Sebelum**: Data berita statis (mock data)

**Sekarang**: 
- Membaca dari content collections (`berita` dan `kabarDuka`)
- Tampilkan 3 berita terbaru
- Tampilkan 3 kabar duka terbaru
- Otomatis update setiap ada konten baru

## Alur Publish Konten (Sekarang)

### Dari Admin CMS

1. Login ke https://caaip.netlify.app/admin/
2. Pilih collection (Berita / Kabar Duka / Alumni)
3. Klik "New [Collection]"
4. Isi form:
   - **Draft**: Set ke `false` agar muncul di site
   - Isi field lainnya (Judul, Tanggal, Konten, dll)
5. Klik "Publish" (kanan atas)
6. Konfirmasi "Publish now"

### Yang Terjadi di Backend

1. Decap CMS commit file baru ke GitHub repo (branch `main`)
2. Netlify detect ada commit baru
3. Netlify otomatis run build:
   ```
   npm run build
   ```
4. Static site ter-generate dengan konten baru
5. Deploy ke https://caaip.netlify.app

**Waktu**: ~1-2 menit dari publish sampai live

### Verifikasi

- Cek GitHub repo: file baru muncul di `src/content/berita/` atau `src/content/kabarDuka/`
- Cek Netlify Deploys: ada deploy baru triggered by Git commit
- Cek site: konten muncul di homepage dan halaman collection

## Troubleshooting

### ❌ Konten tidak muncul setelah publish

**Kemungkinan 1**: Field `draft` masih `true`
- Edit konten di CMS
- Set `Draft` toggle ke OFF (false)
- Publish ulang

**Kemungkinan 2**: Netlify belum deploy
- Cek Netlify Dashboard → Site → Deploys
- Lihat status deploy terakhir (Building / Published / Failed)
- Jika Failed, klik untuk lihat error log
- Jika masih Building, tunggu selesai (~1-2 menit)

**Kemungkinan 3**: Browser cache
- Hard refresh: Ctrl+F5 (Windows) atau Cmd+Shift+R (Mac)
- Atau buka Incognito/Private mode

**Kemungkinan 4**: Format konten salah
- Cek Netlify deploy log untuk error
- Pastikan field wajib terisi (Judul, Tanggal, Nama, dll)
- Pastikan format tanggal valid

### ❌ Publish button disabled

**Penyebab**: Belum ada perubahan atau field wajib kosong
- Pastikan semua field required terisi
- Pastikan ada perubahan dari draft terakhir

### ❌ "Error persisting entry"

**Penyebab**: Git Gateway tidak punya akses write ke repo
- Netlify Dashboard → Identity → Services → Git Gateway
- Pastikan status "Connected"
- Jika perlu, disconnect → reconnect
- Authorize ulang akses GitHub

## Tips Penggunaan

### Draft vs Published
- Set `Draft: true` untuk konten yang masih ditulis (tidak muncul di site)
- Set `Draft: false` untuk publish ke site
- Bisa edit kapan saja, ubah draft status, lalu publish ulang

### Preview Sebelum Publish
- Astro tidak support live preview di CMS by default
- Rekomendasi: gunakan draft mode dulu, publish, cek di site, edit lagi jika perlu

### Menghapus Konten
- Buka konten di CMS
- Klik "Delete entry" (ikon trash)
- Confirm
- Konten akan dihapus dari repo dan site

### Media/Gambar
- Upload gambar di CMS akan tersimpan di `public/uploads/`
- Gambar otomatis commit ke repo
- URL gambar: `/uploads/nama-file.jpg`

## FAQ

**Q: Berapa lama konten muncul setelah publish?**
A: 1-2 menit (waktu Netlify build + deploy)

**Q: Bisa preview sebelum publish?**
A: Tidak built-in. Workaround: publish sebagai draft, cek, lalu ubah draft: false

**Q: Bisa rollback jika salah publish?**
A: Ya, via GitHub:
1. Cari commit di GitHub
2. Revert commit
3. Netlify auto-deploy ulang

**Q: Maksimal berapa konten?**
A: Tidak ada limit dari CMS. Tapi semakin banyak, build time makin lama.

**Q: Bisa edit dari GitHub langsung?**
A: Ya, tapi harus ikut format frontmatter yang benar. Lebih aman via CMS.

---
**Update**: 2 November 2025
