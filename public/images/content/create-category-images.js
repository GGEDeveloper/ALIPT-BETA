const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Cores
const gekoBlue = '#003E7E';
const gold = '#FFD700';
const grey = '#F5F5F5';

// Lista de categorias
const categories = [
  'ferramentas-manuais',
  'ferramentas-eletricas',
  'equipamentos-construcao',
  'seguranca',
  'acessorios',
  'jardinagem',
  'sanitarios',
  'pintura'
];

// Função para criar imagem de categoria
function createCategoryImage(categoryName) {
  const width = 200;
  const height = 200;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fundo cinza
  ctx.fillStyle = grey;
  ctx.fillRect(0, 0, width, height);
  
  // Círculo com cor dourada
  ctx.fillStyle = gold;
  ctx.beginPath();
  ctx.arc(width/2, height/2, 70, 0, Math.PI * 2);
  ctx.fill();
  
  // Texto da categoria
  const displayName = categoryName.replace(/-/g, ' ');
  
  ctx.fillStyle = 'black';
  ctx.font = 'bold 20px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Quebrar texto longo em linhas
  if (displayName.length > 12) {
    const words = displayName.split(' ');
    const line1 = words.slice(0, Math.ceil(words.length/2)).join(' ');
    const line2 = words.slice(Math.ceil(words.length/2)).join(' ');
    
    ctx.fillText(line1, width/2, height/2 - 15);
    ctx.fillText(line2, width/2, height/2 + 15);
  } else {
    ctx.fillText(displayName, width/2, height/2);
  }
  
  // Salvar arquivo
  const fileName = `ALIMAMEDETOOLS_${categoryName}.png`;
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, fileName), buffer);
  
  console.log(`Criado: ${fileName}`);
}

// Criar imagens para todas as categorias
categories.forEach(category => {
  createCategoryImage(category);
});

console.log('Todas as imagens de categorias foram criadas com sucesso!'); 