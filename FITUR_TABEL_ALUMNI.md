# 📊 Fitur Tabel Alumni - Dokumentasi Lengkap

## ✨ Ringkasan Fitur

Halaman alumni sekarang menampilkan **tabel modern bergaya admin panel** dengan Bootstrap 5, dilengkapi:

- ✅ **Tabel responsif** dengan 3 kolom: No, Nama, Jurusan
- ✅ **Kolom pencarian** real-time berdasarkan nama alumni
- ✅ **Filter jumlah entri** (10, 25, 50, 100, atau semua)
- ✅ **Pagination** otomatis dengan navigasi halaman
- ✅ **Info entri** di bawah tabel: "Showing 1 to 10 of X entries"
- ✅ **Tampilan mobile-friendly** dengan card layout
- ✅ **Font modern**: Inter (Google Fonts)
- ✅ **Shadow & hover effects** untuk UX yang lebih baik

---

## 🎨 Design Specifications

### Warna & Styling
```css
- Header gradient: #1e3a8a → #3b82f6 (blue gradient)
- Background tabel header: #f8fafc (light gray)
- Border: 2px solid #e2e8f0
- Hover effect: background #f8fafc
- Shadow: shadow-sm (halus)
- Border radius: 0.5rem - 0.75rem
```

### Typography
```css
- Font family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- Font weights: 300, 400, 500, 600, 700
- Small text untuk metadata
- Semibold untuk judul dan angka penting
```

### Layout Responsif
- **Desktop (≥768px)**: Tabel dengan 3 kolom
- **Mobile (<768px)**: Card layout dengan badge nomor dan ikon jurusan

---

## 🛠️ Struktur File yang Diubah

### 1. `src/layouts/BaseLayout.astro`
**Penambahan Bootstrap 5 CDN:**
```html
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
      rel="stylesheet" 
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
      crossorigin="anonymous">

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" 
        crossorigin="anonymous"></script>
```

### 2. `src/pages/alumni/[angkatan].astro`
**Fitur-fitur utama:**
- Google Fonts Inter
- Card header dengan gradient
- Search input dengan border custom
- Dropdown filter entri
- Tabel responsif dengan thead styling
- Mobile cards dengan Bootstrap icons
- Pagination info dan kontrol
- JavaScript untuk filtering, pagination, dan rendering

### 3. `src/pages/en/alumni/[angkatan].astro`
**Sama seperti versi Indonesia**, dengan teks bahasa Inggris.

### 4. `src/content/alumni/1991.json` (Contoh)
**Format data:**
```json
{
  "year": "1991",
  "csvData": [
    {
      "no": "1",
      "name": "Ahmad Surya Pratama",
      "program": "Pilot"
    },
    ...
  ]
}
```

---

## 🔍 Komponen Tabel

### Header Card
```astro
<div class="card border-0 shadow-sm mb-4" 
     style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);">
  <div class="card-body text-white py-4">
    <h1 class="h3 fw-bold mb-2">Alumni Angkatan {tahun}</h1>
    <p class="mb-0 opacity-90">
      Total: <span class="fw-semibold" id="totalAlumni">{data.length}</span> alumni
    </p>
  </div>
</div>
```

### Search & Filter Card
```astro
<div class="card border-0 shadow-sm mb-4">
  <div class="card-body">
    <div class="row align-items-center">
      <!-- Search Input -->
      <div class="col-md-6 mb-3 mb-md-0">
        <label class="form-label small text-muted fw-semibold mb-2">
          Cari Alumni
        </label>
        <input type="text" id="searchInput" 
               class="form-control form-control-lg" 
               placeholder="Ketik nama alumni...">
      </div>
      
      <!-- Entries Per Page -->
      <div class="col-md-6">
        <label class="form-label small text-muted fw-semibold mb-2">
          Tampilkan
        </label>
        <select id="entriesPerPage" class="form-select form-select-lg">
          <option value="10">10 entri</option>
          <option value="25">25 entri</option>
          <option value="50">50 entri</option>
          <option value="100">100 entri</option>
          <option value="-1">Semua</option>
        </select>
      </div>
    </div>
  </div>
</div>
```

### Tabel (Desktop)
```astro
<div class="table-responsive d-none d-md-block">
  <table class="table table-hover align-middle mb-0" id="alumniTable">
    <thead style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
      <tr>
        <th class="px-4 py-3 text-muted fw-semibold" style="width: 80px;">No</th>
        <th class="px-4 py-3 text-muted fw-semibold">Nama</th>
        <th class="px-4 py-3 text-muted fw-semibold" style="width: 200px;">Jurusan</th>
      </tr>
    </thead>
    <tbody id="alumniTableBody">
      <!-- Rendered by JavaScript -->
    </tbody>
  </table>
</div>
```

### Cards (Mobile)
```astro
<div class="d-md-none p-3" id="alumniCards">
  <!-- Card dengan badge nomor dan info lengkap -->
  <div class="card alumni-row mb-3 border shadow-sm">
    <div class="card-body">
      <div class="d-flex align-items-start gap-3">
        <div class="badge bg-primary rounded-circle">1</div>
        <div class="flex-fill">
          <h6 class="mb-1 fw-semibold">Ahmad Surya Pratama</h6>
          <p class="mb-0 text-muted small">
            <svg><!-- Icon buku --></svg>
            Pilot
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Pagination Info
```astro
<div class="px-4 py-3 border-top d-flex justify-content-between align-items-center" 
     style="background-color: #f8fafc;">
  <p class="mb-0 small text-muted" id="paginationInfo">
    Menampilkan <span class="fw-semibold" id="showingFrom">1</span> 
    sampai <span class="fw-semibold" id="showingTo">10</span> 
    dari <span class="fw-semibold" id="totalEntries">15</span> entri
  </p>
  <div id="paginationControls"><!-- Pagination buttons --></div>
</div>
```

---

## 💻 JavaScript Functions

### 1. `filterData()`
**Fungsi:** Memfilter data berdasarkan pencarian nama
```javascript
function filterData() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm)
  );
  currentPage = 1;
  renderTable();
}
```

### 2. `renderTable()`
**Fungsi:** Render tabel/cards dengan pagination
```javascript
function renderTable() {
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = entriesPerPage === -1 
    ? filteredData.length 
    : startIndex + entriesPerPage;
  const pageData = filteredData.slice(startIndex, endIndex);
  
  // Render desktop table
  tableBody.innerHTML = pageData.map(...).join('');
  
  // Render mobile cards
  cardsContainer.innerHTML = pageData.map(...).join('');
  
  updatePaginationInfo();
  renderPagination();
}
```

### 3. `updatePaginationInfo()`
**Fungsi:** Update teks "Showing X to Y of Z entries"
```javascript
function updatePaginationInfo() {
  const showingFrom = filteredData.length === 0 
    ? 0 
    : ((currentPage - 1) * entriesPerPage) + 1;
  const showingTo = entriesPerPage === -1 
    ? filteredData.length 
    : Math.min(currentPage * entriesPerPage, filteredData.length);
  
  document.getElementById('showingFrom').textContent = showingFrom;
  document.getElementById('showingTo').textContent = showingTo;
  document.getElementById('totalEntries').textContent = filteredData.length;
}
```

### 4. `renderPagination()`
**Fungsi:** Render tombol pagination
```javascript
function renderPagination() {
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  let html = '<nav><ul class="pagination pagination-sm">';
  
  // Previous button
  html += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
    <a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a>
  </li>`;
  
  // Page numbers (dengan ellipsis untuk banyak halaman)
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)) {
      html += `<li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
  }
  
  // Next button
  html += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
    <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
  </li>`;
  
  paginationControls.innerHTML = html;
}
```

---

## 📱 Responsive Behavior

### Desktop View (≥768px)
- Tabel 3 kolom dengan header
- Hover effect pada row
- Pagination di bawah tabel

### Mobile View (<768px)
- Tabel tersembunyi (`d-none d-md-block`)
- Cards ditampilkan (`d-md-none`)
- Badge nomor circular
- Icon untuk jurusan
- Stack layout vertikal

---

## 🎯 User Experience Features

### 1. **Real-time Search**
- Ketik di search box → langsung filter
- Case-insensitive
- Reset ke halaman 1 setelah filter

### 2. **Flexible Pagination**
- 10, 25, 50, 100 entri per halaman
- Atau tampilkan semua
- Smooth scroll ke atas saat ganti halaman

### 3. **Visual Feedback**
- Hover effect pada table rows
- Active state pada pagination
- Focus state dengan blue border

### 4. **Accessibility**
- Semantic HTML (table, nav, etc.)
- ARIA labels pada pagination
- Keyboard navigation support

---

## 🧪 Testing Checklist

- [x] Build berhasil tanpa error
- [x] Data alumni 1991 ditampilkan dengan benar
- [x] Search berfungsi (filter by name)
- [x] Pagination berfungsi (prev/next/numbers)
- [x] Filter entri per halaman berfungsi
- [x] Responsif di mobile (cards)
- [x] Responsif di desktop (table)
- [x] Info "Showing X to Y of Z" update dengan benar
- [x] Bootstrap 5 dimuat dengan benar
- [x] Font Inter dimuat dengan benar

---

## 📦 Dependencies

### CDN Resources
```html
<!-- Bootstrap 5.3.2 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

<!-- Google Fonts - Inter -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Astro Dependencies
```json
{
  "astro": "4.16.19",
  "@astrojs/tailwind": "^5.1.0",
  "tailwindcss": "^3.4.0"
}
```

---

## 🚀 Deployment Checklist

1. ✅ Bootstrap 5 sudah ditambahkan ke BaseLayout
2. ✅ Font Inter sudah dimuat
3. ✅ Halaman alumni ID & EN sudah diupdate
4. ✅ Sample data alumni sudah dibuat (1991.json)
5. ✅ Build test passed
6. ✅ Responsive design tested
7. ✅ Git commit & push completed

---

## 📝 Cara Menambah Data Alumni Baru

### Via CMS (Decap CMS)
1. Login ke `/admin`
2. Pilih **Collections** → **Alumni**
3. Klik **New Alumni**
4. Upload file CSV dengan format:
   ```csv
   No;Nama;Jurusan
   1;Ahmad Surya Pratama;Pilot
   2;Budi Santoso;Air Traffic Control
   ```
5. Atau input manual dengan klik **Tambah Alumni**
6. Klik **Publish**

### Manual (JSON File)
1. Buat file baru di `src/content/alumni/[tahun].json`
2. Format:
   ```json
   {
     "year": "2025",
     "csvData": [
       {
         "no": "1",
         "name": "Nama Alumni",
         "program": "Program Studi"
       }
     ]
   }
   ```
3. Build & deploy

---

## 🎨 Customization Guide

### Mengubah Warna Gradient
```css
background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
/* Ganti dengan warna pilihan Anda */
```

### Mengubah Jumlah Entri Default
```javascript
let entriesPerPage = 10; // Ubah ke 25, 50, dll
```

### Mengubah Font
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```
```css
font-family: 'Roboto', sans-serif;
```

---

## 🐛 Troubleshooting

### Tabel Tidak Muncul
✅ **Solusi:** Pastikan Bootstrap 5 CSS sudah dimuat di BaseLayout

### Data Kosong
✅ **Solusi:** Periksa format JSON di `src/content/alumni/*.json`

### Search Tidak Berfungsi
✅ **Solusi:** Periksa JavaScript error di console browser

### Pagination Tidak Muncul
✅ **Solusi:** Pastikan data lebih dari `entriesPerPage` (default: 10)

### Mobile Layout Rusak
✅ **Solusi:** Pastikan Bootstrap 5 JS Bundle dimuat

---

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Cek console browser untuk error
2. Periksa format data alumni (JSON valid)
3. Pastikan Bootstrap 5 CDN accessible
4. Test di browser lain (Chrome, Firefox, Safari)

---

**Terakhir diupdate:** 8 November 2025  
**Versi:** 1.0.0  
**Status:** ✅ Production Ready
