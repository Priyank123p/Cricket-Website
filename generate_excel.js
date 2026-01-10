const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Create Worksheet
const ws = XLSX.utils.json_to_sheet(products);

// Create Workbook
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Products");

// Ensure src directory exists (it should)
const filePath = path.join(__dirname, 'src', 'products.xlsx');

// Write File
XLSX.writeFile(wb, filePath);

console.log(`Excel file created at ${filePath}`);
