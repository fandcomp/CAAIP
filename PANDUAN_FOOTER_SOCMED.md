# Panduan Update Link Social Media

## Lokasi File

File yang perlu diedit: `src/components/Footer.astro`

## Cara Update Link Social Media

### 1. Buka File Footer

```bash
# Path file
src/components/Footer.astro
```

### 2. Cari Bagian Social Media

Cari kode berikut (sekitar baris 50-70):

```html
<!-- Instagram -->
<a href="https://instagram.com/caaip.official" target="_blank" rel="noopener noreferrer" 
   class="text-slate-600 hover:text-caaip-blue transition-colors" aria-label="Instagram">
  
<!-- Twitter/X -->
<a href="https://twitter.com/caaip_official" target="_blank" rel="noopener noreferrer" 
   class="text-slate-600 hover:text-caaip-blue transition-colors" aria-label="Twitter">

<!-- Facebook -->
<a href="https://facebook.com/caaip.official" target="_blank" rel="noopener noreferrer" 
   class="text-slate-600 hover:text-caaip-blue transition-colors" aria-label="Facebook">
```

### 3. Ganti dengan Link Akun Real

Ganti URL di atribut `href=""` dengan link akun social media yang benar:

```html
<!-- Contoh Instagram -->
<a href="https://instagram.com/nama_akun_anda" target="_blank" ...>

<!-- Contoh Twitter/X -->
<a href="https://twitter.com/nama_akun_anda" target="_blank" ...>

<!-- Contoh Facebook -->
<a href="https://facebook.com/nama_akun_anda" target="_blank" ...>
```

### 4. Update Kontak (Opsional)

Jika ingin update email dan alamat, cari bagian ini (sekitar baris 35-45):

```html
<li class="flex items-start gap-2">
  <svg>...</svg>
  <span>info@caaip.net</span>  <!-- Ganti email -->
</li>
<li class="flex items-start gap-2">
  <svg>...</svg>
  <span>Kampus CAAIP, Indonesia</span>  <!-- Ganti alamat -->
</li>
```

### 5. Save & Deploy

```bash
# Stage perubahan
git add src/components/Footer.astro

# Commit
git commit -m "update: change social media links to real accounts"

# Push ke GitHub
git push

# Netlify akan auto-deploy dalam 1-2 menit
```

## Link Social Media Saat Ini (Default)

```
Instagram: https://instagram.com/caaip.official
Twitter:   https://twitter.com/caaip_official
Facebook:  https://facebook.com/caaip.official
```

**Status**: Placeholder - **HARUS DIGANTI** dengan akun real!

## Tampilan Footer

### Desktop Layout
```
┌─────────────────────────────────────────────────────────┐
│ [LOGO CAAIP]           Navigasi          Kontak         │
│ Deskripsi...           • Profil          📧 Email       │
│                        • Berita          📍 Alamat      │
│                        • Kabar Duka                     │
│                        • Alumni          Ikuti Kami     │
│                                          [IG][TW][FB]   │
├─────────────────────────────────────────────────────────┤
│                  Bekerja sama dengan                    │
│                  [LOGO KEMENHUB]                        │
├─────────────────────────────────────────────────────────┤
│ © 2025 CAAIP              Dibangun dengan Astro        │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout
```
┌───────────────────────┐
│ [LOGO CAAIP]          │
│ Deskripsi...          │
├───────────────────────┤
│ Navigasi              │
│ • Profil              │
│ • Berita              │
├───────────────────────┤
│ Kontak                │
│ 📧 Email              │
│ 📍 Alamat             │
│                       │
│ Ikuti Kami            │
│ [IG] [TW] [FB]        │
├───────────────────────┤
│ Bekerja sama dengan   │
│ [LOGO KEMENHUB]       │
├───────────────────────┤
│ © 2025 CAAIP          │
└───────────────────────┘
```

## Icon & Logo yang Digunakan

```
✅ Favicon browser:     /caaip.png
✅ Logo navbar:         /caaip-logo.png
✅ Logo footer:         /caaip-logo.png
✅ Logo Kemenhub:       /kemenhub.png
✅ Social media icons:  SVG inline
```

## Fitur Footer

### 1. Logo CAAIP
- ✅ Ukuran: 64px height (h-16)
- ✅ Auto width
- ✅ Muncul di kolom pertama

### 2. Social Media
- ✅ Instagram icon
- ✅ Twitter/X icon
- ✅ Facebook icon
- ✅ Hover effect: abu → biru
- ✅ Opens in new tab
- ✅ SEO friendly (rel="noopener noreferrer")

### 3. Logo Kemenhub
- ✅ Section terpisah dengan border
- ✅ Center aligned
- ✅ Label: "Bekerja sama dengan"
- ✅ Opacity effect on hover
- ✅ Ukuran: 64px height

### 4. Kontak
- ✅ Icon untuk email
- ✅ Icon untuk alamat
- ✅ Dapat diupdate sesuai kebutuhan

## Tips Styling

### Menambah Social Media Baru (LinkedIn, YouTube, dll)

Tambahkan setelah Facebook:

```html
<!-- LinkedIn -->
<a href="https://linkedin.com/company/caaip" target="_blank" rel="noopener noreferrer" 
   class="text-slate-600 hover:text-caaip-blue transition-colors" aria-label="LinkedIn">
  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
</a>
```

### Mengubah Warna Hover

Edit class di tag `<a>`:

```html
<!-- Default: Abu ke Biru -->
class="text-slate-600 hover:text-caaip-blue"

<!-- Alternatif: Abu ke Hijau -->
class="text-slate-600 hover:text-green-600"

<!-- Alternatif: Abu ke Merah -->
class="text-slate-600 hover:text-red-600"
```

### Mengubah Ukuran Icon

```html
<!-- Default: 24px -->
<svg class="w-6 h-6" ...>

<!-- Lebih besar: 32px -->
<svg class="w-8 h-8" ...>

<!-- Lebih kecil: 20px -->
<svg class="w-5 h-5" ...>
```

## Troubleshooting

### Social media icon tidak muncul
- Cek browser console untuk error SVG
- Pastikan tag `<svg>` tertutup dengan benar
- Clear browser cache

### Link tidak bisa diklik
- Pastikan ada atribut `href="..."`
- Cek tidak ada typo di URL
- Test dengan `target="_blank"` untuk buka tab baru

### Logo kemenhub tidak muncul
- Cek file ada di `public/kemenhub.png`
- Cek path: `/kemenhub.png` (harus ada slash di depan)
- Clear cache dan reload

### Logo terlalu besar/kecil
Edit class di tag `<img>`:

```html
<!-- Logo CAAIP footer: default h-16 (64px) -->
<img src="/caaip-logo.png" class="h-16 w-auto" />

<!-- Lebih besar: h-20 (80px) -->
<img src="/caaip-logo.png" class="h-20 w-auto" />

<!-- Lebih kecil: h-12 (48px) -->
<img src="/caaip-logo.png" class="h-12 w-auto" />
```

---

**Next Step**: Ganti placeholder links dengan akun social media real Anda!
