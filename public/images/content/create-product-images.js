const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Configurações
const productsDir = path.join(__dirname, '..', 'products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Cores
const gekoBlue = '#003E7E';
const gold = '#FFD700';
const grey = '#F5F5F5';

// Lista de produtos
const products = [
  'berbequim-dewalt',
  'rebarbadora-bosch',
  'chaves-fenda-stanley',
  'serra-circular-makita',
  'capacete-msa',
  'gerador-honda',
  'martelo-stanley',
  'cortador-husqvarna'
];

// Função para criar imagem de produto
function createProductImage(productName) {
  const width = 300;
  const height = 300;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fundo branco
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  
  // Adicionar uma borda cinza clara
  ctx.strokeStyle = '#E5E5E5';
  ctx.lineWidth = 1;
  ctx.strokeRect(1, 1, width-2, height-2);
  
  // Desenhar uma caixa dourada para o produto
  ctx.fillStyle = gold;
  ctx.fillRect(50, 50, 200, 150);
  
  // Adicionar texto com o nome do produto
  const displayName = productName.replace(/-/g, ' ');
  
  ctx.fillStyle = 'black';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Quebrar texto longo em linhas
  const words = displayName.split(' ');
  if (words.length > 1) {
    const brand = words[words.length-1];
    const productType = words.slice(0, words.length-1).join(' ');
    
    ctx.fillText(productType, width/2, height/2 + 50);
    
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = gekoBlue;
    ctx.fillText(brand.toUpperCase(), width/2, height/2 + 80);
  } else {
    ctx.fillText(displayName, width/2, height/2 + 50);
  }
  
  // Desenhar um ícone de ferramenta (simplificado)
  ctx.fillStyle = 'black';
  
  // Dependendo do nome, desenhar ícones diferentes
  if (productName.includes('berbequim')) {
    // Berbequim
    ctx.fillRect(130, 100, 40, 15);  // Corpo
    ctx.fillRect(170, 105, 15, 5);   // Broca
  } else if (productName.includes('serra')) {
    // Serra circular
    ctx.beginPath();
    ctx.arc(150, 100, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(150, 100, 15, 0, Math.PI * 2);
    ctx.fill();
  } else if (productName.includes('chaves')) {
    // Chave de fenda
    ctx.fillRect(130, 90, 40, 10);   // Cabo
    ctx.fillRect(170, 95, 10, 2);    // Ponta
  } else {
    // Ícone genérico para outros produtos
    ctx.fillRect(130, 100, 40, 20);
  }
  
  // Salvar arquivo
  const fileName = `${productName}.jpg`;
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(productsDir, fileName), buffer);
  
  console.log(`Criado: ${fileName}`);
}

// Criar imagens para todos os produtos
products.forEach(product => {
  createProductImage(product);
});

console.log('Todas as imagens de produtos foram criadas com sucesso!'); 