/**
 * CSV to JSON Converter for Alumni Data
 * 
 * Format CSV yang diharapkan:
 * No | Nama | Jurusan
 * 1 | John Doe | Teknik Informatika
 * 2 | Jane Smith | Teknik Mesin
 * 
 * Cara penggunaan:
 * 1. Upload file CSV di CMS pada field "File CSV Alumni"
 * 2. Atau copy paste data CSV ke file ini dan run: node scripts/csv-to-json.js
 * 3. Hasil akan di-generate di src/content/alumni/[angkatan].json
 */

const fs = require('fs');
const path = require('path');

function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split('|').map(h => h.trim().toLowerCase());
  
  const members = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('|').map(v => v.trim());
    
    if (values.length >= 2) {
      const member = {
        no: values[0] || (i).toString(),
        name: values[1] || '',
        program: values[2] || ''
      };
      
      if (member.name) {
        members.push(member);
      }
    }
  }
  
  return members;
}

function createAlumniJSON(angkatan, csvContent) {
  const members = parseCSV(csvContent);
  
  const alumniData = {
    angkatan: angkatan,
    members: members,
    lang: 'id'
  };
  
  return JSON.stringify(alumniData, null, 2);
}

// Contoh penggunaan
if (require.main === module) {
  const csvExample = `No | Nama | Jurusan
1 | Agus Setiawan | Teknik Mesin
2 | Bambang Wijaya | Teknik Elektro
3 | Citra Dewi | Teknik Informatika
4 | Dian Pratama | Teknik Sipil
5 | Eka Putri | Teknik Kimia`;

  const angkatan = process.argv[2] || '2020';
  const jsonOutput = createAlumniJSON(angkatan, csvExample);
  
  const outputPath = path.join(__dirname, '..', 'src', 'content', 'alumni', `${angkatan}.json`);
  
  fs.writeFileSync(outputPath, jsonOutput, 'utf-8');
  console.log(`✅ Alumni data untuk angkatan ${angkatan} berhasil dibuat di: ${outputPath}`);
  console.log(`Total alumni: ${JSON.parse(jsonOutput).members.length}`);
}

module.exports = { parseCSV, createAlumniJSON };
