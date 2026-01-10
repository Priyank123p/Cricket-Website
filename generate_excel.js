const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Current Product Data
const products = [
    { id: 1, name: "New Pro Players Edition", price: "₹2,000", oldPrice: "₹2,200", image: "New Pro Players Edition-IMG.png", brand: "77", category: "", weight: "1180g", rating: 4.8, badge: "New" },
    { id: 2, name: "New Premium Players", price: "₹1,899", oldPrice: "₹2,100", image: "New Premium Players-IMG.png", brand: "77", category: "", weight: "1190g", rating: 4.7, badge: "New" },
    { id: 3, name: "77 CBS Edition 7 Star", price: "₹1,500", oldPrice: "₹1,700", image: "77 CBS Edition 7 Star-IMG.png", brand: "77", category: "", weight: "1170g", rating: 4.9, badge: "" },
    { id: 4, name: "Ciel Fighter AK 47 hard tennis cricket bat", price: "₹3,000", oldPrice: "₹3,200", image: "Ciel Fighter AK 47 hard tennis cricket bat-IMG.jpeg", brand: "77", category: "", weight: "1200g", rating: 4.6, badge: "Sale" },
    { id: 5, name: "Ciel Gold edition hard tennis cricket bat", price: "₹3,500", oldPrice: "₹3,700", image: "Ciel Gold edition hard tennis cricket bat-IMG.jpeg", brand: "77", category: "", weight: "1160g", rating: 5.0, badge: "New" },
];

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
