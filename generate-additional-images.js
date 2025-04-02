const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directories if they don't exist
const productsDir = path.join(__dirname, 'public', 'images', 'products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Color constants
const gekoBlue = '#003E7E';
const grey = '#F5F5F5';

// Additional product images found in logs
const additionalProducts = [
  'capacete-msa.jpg',
  'gerador-honda.jpg'
];

// Function to create product image
function createProductImage(filename) {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = grey;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw product rectangle with Geko blue
  ctx.fillStyle = gekoBlue;
  ctx.fillRect(40, 40, 120, 120);
  
  // Add text
  const productName = filename
    .replace('.jpg', '')
    .replace(/-/g, ' ');
    
  ctx.fillStyle = 'white';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Product Image', 100, 90);
  ctx.fillText(productName, 100, 110);
  
  // Save image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(productsDir, filename), buffer);
  console.log(`Created ${filename}`);
}

// Generate additional images
function generateAdditionalImages() {
  for (const filename of additionalProducts) {
    createProductImage(filename);
  }
  
  console.log('Additional images generated successfully!');
}

// Run the image generator
generateAdditionalImages(); 