import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script untuk convert CSV (semicolon delimiter) ke JSON alumni
 * Format CSV: No;Nama;Jurusan
 * 
 * Usage: node scripts/csv-to-json-semicolon.js <path-to-csv> <tahun-angkatan>
 * Example: node scripts/csv-to-json-semicolon.js alumni-2026.csv 2026
 */

function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const alumni = [];

  // Skip header (baris pertama)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines

    // Split by semicolon
    const parts = line.split(';').map(part => part.trim());
    
    if (parts.length >= 2) {
      const alumniData = {
        no: parts[0] || String(i),
        name: parts[1] || '',
        program: parts[2] || ''
      };

      // Only add if name is not empty
      if (alumniData.name) {
        alumni.push(alumniData);
      }
    }
  }

  return alumni;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: node scripts/csv-to-json-semicolon.js <csv-file> <year>');
    console.error('Example: node scripts/csv-to-json-semicolon.js 2026.csv 2026');
    process.exit(1);
  }

  const csvFile = args[0];
  const year = args[1];

  // Validate year
  if (!/^\d{4}$/.test(year)) {
    console.error('Error: Year must be 4 digits (e.g., 2026)');
    process.exit(1);
  }

  // Read CSV file
  let csvContent;
  try {
    csvContent = fs.readFileSync(csvFile, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${csvFile}:`, error.message);
    process.exit(1);
  }

  // Parse CSV
  console.log('Parsing CSV...');
  const alumni = parseCSV(csvContent);

  if (alumni.length === 0) {
    console.error('Error: No valid alumni data found in CSV');
    console.error('Make sure CSV format is: No;Nama;Jurusan');
    process.exit(1);
  }

  console.log(`Found ${alumni.length} alumni records`);

  // Create JSON structure
  const jsonData = {
    year: year,
    csvData: alumni
  };

  // Output file path
  const outputDir = path.join(__dirname, '..', 'src', 'content', 'alumni');
  const outputFile = path.join(outputDir, `${year}.json`);

  // Create directory if not exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write JSON file
  try {
    fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2), 'utf-8');
    console.log(`✓ Successfully created: ${outputFile}`);
    console.log('\nPreview:');
    console.log(JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.error('Error writing JSON file:', error.message);
    process.exit(1);
  }
}

main();
