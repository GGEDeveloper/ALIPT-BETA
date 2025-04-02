const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Create directories if they don't exist
const contentDir = path.join(__dirname, 'public', 'images', 'content');
const productsDir = path.join(__dirname, 'public', 'images', 'products');

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Color constants
const gekoBlue = '#003E7E';
const grey = '#F5F5F5';

// Generate category images
const categoryImages = [
  'ALIMAMEDETOOLS_medium.png',
  'ALIMAMEDETOOLS_ferramentas-manuais.png',
  'ALIMAMEDETOOLS_ferramentas-eletricas.png',
  'ALIMAMEDETOOLS_equipamentos-construcao.png',
  'ALIMAMEDETOOLS_seguranca.png',
  'ALIMAMEDETOOLS_acessorios.png',
  'ALIMAMEDETOOLS_jardinagem.png',
  'ALIMAMEDETOOLS_sanitarios.png',
  'ALIMAMEDETOOLS_pintura.png'
];

// Generate product images
const productImages = [
  'berbequim-dewalt.jpg',
  'rebarbadora-bosch.jpg',
  'chaves-fenda-stanley.jpg',
  'serra-circular-makita.jpg'
];

// Function to create category image
function createCategoryImage(filename) {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = grey;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw circle with Geko blue
  ctx.fillStyle = gekoBlue;
  ctx.beginPath();
  ctx.arc(100, 100, 70, 0, Math.PI * 2);
  ctx.fill();
  
  // Add text
  const categoryName = filename
    .replace('ALIMAMEDETOOLS_', '')
    .replace('.png', '')
    .replace(/-/g, ' ');
    
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(categoryName, 100, 100);
  
  // Save image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(contentDir, filename), buffer);
  console.log(`Created ${filename}`);
}

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

// Special case for logo - more complex design
async function createLogoImage() {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = grey;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw hexagon with Geko blue
  ctx.fillStyle = gekoBlue;
  ctx.beginPath();
  
  // Hexagon
  const size = 80;
  const centerX = 100;
  const centerY = 100;
  
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = centerX + size * Math.cos(angle);
    const y = centerY + size * Math.sin(angle);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.closePath();
  ctx.fill();
  
  // Border
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('ALIMAMEDE', 100, 80);
  ctx.fillText('TOOLS.COM', 100, 105);
  
  // Draw line divider
  ctx.beginPath();
  ctx.moveTo(50, 115);
  ctx.lineTo(150, 115);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Draw tool icons (simplified)
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(70, 130);
  ctx.lineTo(90, 150);
  ctx.lineTo(110, 130);
  ctx.lineTo(130, 150);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Save image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(contentDir, 'ALIMAMEDETOOLS_medium.png'), buffer);
  console.log('Created ALIMAMEDETOOLS_medium.png (logo)');
}

// Generate all images
async function generateAllImages() {
  // Create the logo first
  await createLogoImage();
  
  // Create all category images
  for (const filename of categoryImages) {
    if (filename !== 'ALIMAMEDETOOLS_medium.png') { // Skip logo as it's already created
      createCategoryImage(filename);
    }
  }
  
  // Create all product images
  for (const filename of productImages) {
    createProductImage(filename);
  }
  
  console.log('All images generated successfully!');
}

// Run the image generator
generateAllImages(); 