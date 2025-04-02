const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const sharp = require('sharp');

// Diretório para os ícones
const iconsDir = path.join(__dirname, 'categories');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Lista de categorias e seus símbolos
const categories = [
  { name: 'ferramentas-manuais', symbol: '🔧', color: '#FFD700' },  // Chave inglesa
  { name: 'ferramentas-eletricas', symbol: '⚡', color: '#FFD700' }, // Raio
  { name: 'equipamentos-construcao', symbol: '🏗️', color: '#FFD700' }, // Construção
  { name: 'seguranca', symbol: '🛡️', color: '#FFD700' },  // Escudo
  { name: 'acessorios', symbol: '🧰', color: '#FFD700' },  // Caixa de ferramentas
  { name: 'jardinagem', symbol: '🌱', color: '#FFD700' },  // Planta
  { name: 'sanitarios', symbol: '🚿', color: '#FFD700' },  // Chuveiro
  { name: 'pintura', symbol: '🎨', color: '#FFD700' }   // Paleta
];

// Subcategorias
const subcategories = [
  { name: 'martelos', parent: 'ferramentas-manuais', symbol: '🔨', color: '#FFD700' },
  { name: 'alicates', parent: 'ferramentas-manuais', symbol: '🗜️', color: '#FFD700' },
  { name: 'chaves', parent: 'ferramentas-manuais', symbol: '🔧', color: '#FFD700' },
  { name: 'furadeiras', parent: 'ferramentas-eletricas', symbol: '🔌', color: '#FFD700' },
  { name: 'serras', parent: 'ferramentas-eletricas', symbol: '⚙️', color: '#FFD700' },
  { name: 'lixadeiras', parent: 'ferramentas-eletricas', symbol: '📏', color: '#FFD700' },
  { name: 'capacetes', parent: 'seguranca', symbol: '⛑️', color: '#FFD700' },
  { name: 'luvas', parent: 'seguranca', symbol: '🧤', color: '#FFD700' },
  { name: 'oculos', parent: 'seguranca', symbol: '👓', color: '#FFD700' },
  { name: 'torneiras', parent: 'sanitarios', symbol: '🚰', color: '#FFD700' },
  { name: 'chuveiros', parent: 'sanitarios', symbol: '🚿', color: '#FFD700' },
  { name: 'tintas', parent: 'pintura', symbol: '🖌️', color: '#FFD700' },
  { name: 'pinceis', parent: 'pintura', symbol: '🖌️', color: '#FFD700' },
  { name: 'rolos', parent: 'pintura', symbol: '🧻', color: '#FFD700' }
];

// Função para criar um ícone para categoria
async function createCategoryIcon(category) {
  // Configurações do canvas
  const size = 64;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fundo transparente
  ctx.clearRect(0, 0, size, size);
  
  // Desenhar círculo com cor da categoria
  ctx.fillStyle = category.color;
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/2 - 4, 0, Math.PI * 2);
  ctx.fill();
  
  // Adicionar símbolo
  ctx.fillStyle = 'black';
  ctx.font = '32px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(category.symbol, size/2, size/2);
  
  // Converter para buffer PNG
  const buffer = canvas.toBuffer('image/png');
  
  // Converter PNG para AVIF usando sharp
  try {
    await sharp(buffer)
      .toFormat('avif', { quality: 80 })
      .toFile(path.join(iconsDir, `${category.name}.avif`));
    
    console.log(`Ícone criado: ${category.name}.avif`);
  } catch (error) {
    console.error(`Erro ao criar ícone para ${category.name}:`, error);
  }
}

// Função para criar todos os ícones
async function createAllIcons() {
  try {
    // Instalar sharp se ainda não estiver instalado
    if (!fs.existsSync(path.join(process.cwd(), 'node_modules', 'sharp'))) {
      console.log('Instalando o pacote sharp...');
      require('child_process').execSync('npm install sharp', { stdio: 'inherit' });
    }
    
    // Categorias principais
    console.log('Criando ícones para categorias principais...');
    for (const category of categories) {
      await createCategoryIcon(category);
    }
    
    // Subcategorias
    console.log('Criando ícones para subcategorias...');
    for (const subcategory of subcategories) {
      await createCategoryIcon(subcategory);
    }
    
    console.log('Todos os ícones foram criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ícones:', error);
  }
}

// Executar a função principal
createAllIcons(); 