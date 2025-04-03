const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios');

// Importar dados da aplicação
function readProductFiles() {
  const libDir = path.join(__dirname, '../lib');
  const allProductData = [];
  
  // Arquivos de produtos conhecidos
  const productFiles = [
    'data.ts',
    'data_products.ts',
    'data_geko.ts',
    'data_generated_products.ts'
  ];
  
  // Ler cada arquivo de produtos
  for (const file of productFiles) {
    const filePath = path.join(libDir, file);
    try {
      const fileData = fs.readFileSync(filePath, 'utf8');
      allProductData.push(fileData);
      console.log(`Lido arquivo de produtos: ${file}`);
    } catch (error) {
      console.log(`Arquivo não encontrado: ${file}`);
    }
  }
  
  return allProductData;
}

// Analisar o conteúdo do arquivo para extrair produtos
function extractProductsFromTS(content) {
  const products = [];
  const matches = content.matchAll(/{\s*"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",.*?"image":\s*"([^"]+)",.*?"category":\s*"([^"]+)",/gs);
  
  for (const match of matches) {
    products.push({
      id: match[1],
      name: match[2],
      image: match[3],
      category: match[4],
      brand: content.match(new RegExp(`"id":\\s*"${match[1]}".*?"brand":\\s*"([^"]+)"`, 's')) ? 
             content.match(new RegExp(`"id":\\s*"${match[1]}".*?"brand":\\s*"([^"]+)"`, 's'))[1] : ''
    });
  }
  
  return products;
}

// Extrair produtos de todos os arquivos
const productDataFiles = readProductFiles();
let allProducts = [];

for (const data of productDataFiles) {
  const extractedProducts = extractProductsFromTS(data);
  console.log(`Extraídos ${extractedProducts.length} produtos do arquivo.`);
  allProducts = [...allProducts, ...extractedProducts];
}

// Remover duplicatas baseado no id
const uniqueIds = new Set();
const products = allProducts.filter(product => {
  if (uniqueIds.has(product.id)) {
    return false;
  }
  uniqueIds.add(product.id);
  return true;
});

console.log(`Total de ${products.length} produtos únicos para processar.`);

// Configurações
const IMAGES_DIR = path.join(__dirname, '../public/images/products-new');
const MIN_VALID_SIZE = 1000; // Tamanho mínimo válido em bytes
const PIXABAY_API_KEY = '42894081-50a1b66eba314b68b7b46ada8'; // Chave de API pública (gratuita)
const DEFAULT_PLACEHOLDER_IMAGE = path.join(__dirname, '../public/images/placeholder.jpg');

const IMAGE_CATEGORIES = {
  // Ferramentas Manuais
  'martelos': ['hammer', 'construction hammer', 'hardware tools'],
  'alicates': ['pliers', 'cutting pliers', 'grip tools'],
  'chaves': ['screwdriver', 'wrench', 'spanner tool'],
  
  // Ferramentas Elétricas
  'furadeiras': ['power drill', 'electric drill', 'cordless drill'],
  'serras': ['power saw', 'circular saw', 'jigsaw tool'],
  'lixadeiras': ['power sander', 'orbital sander', 'belt sander'],
  
  // Equipamentos
  'equipamentos-construcao': ['construction equipment', 'building tools', 'construction site'],
  'compressores': ['air compressor', 'pneumatic compressor', 'industrial compressor'],
  'elevadores-carros': ['car lift', 'automotive lift', 'garage lift'],
  
  // Segurança
  'capacetes': ['safety helmet', 'construction helmet', 'hard hat'],
  'luvas': ['work gloves', 'safety gloves', 'protective gloves'],
  'oculos': ['safety glasses', 'protective eyewear', 'work glasses'],
  'mascaras-protecao': ['safety mask', 'dust mask', 'respirator'],
  'roupas-trabalho': ['work clothes', 'workwear', 'safety vest'],
  'calcado-trabalho': ['work boots', 'safety boots', 'steel toe shoes'],
  
  // Acessórios e Jardinagem
  'acessorios': ['tool accessories', 'hardware accessories', 'tool kit'],
  'jardinagem': ['gardening tools', 'lawn equipment', 'garden'],
  'ferramentas-gesso': ['plastering tools', 'drywall tools', 'trowel'],
  
  // Sanitários
  'torneiras': ['faucet', 'tap', 'basin mixer'],
  'chuveiros': ['shower head', 'shower system', 'bathroom fixture'],
  'curvadoras-tubos': ['tube bender', 'pipe bender', 'plumbing tools'],
  'soldadores-tubos': ['pipe welder', 'tube welder', 'plumbing tools'],
  'corta-tubos': ['pipe cutter', 'tube cutter', 'plumbing tools'],
  
  // Pintura
  'tintas': ['paint bucket', 'wall paint', 'house paint'],
  'pinceis': ['paint brush', 'painting tools', 'paint brush set'],
  'rolos': ['paint roller', 'painting tools', 'roller brush'],
  'pistolas-pintura': ['paint spray gun', 'paint sprayer', 'airless sprayer'],
  
  // Categorias por padrão
  'default': ['tool', 'hardware', 'construction tool', 'power tool', 'professional tool']
};

// Função para verificar se uma imagem é válida
async function isValidImage(filePath) {
  try {
    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return false;
    }
    
    // Verificar o tamanho do arquivo
    const stats = fs.statSync(filePath);
    if (stats.size < MIN_VALID_SIZE) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Erro ao verificar imagem ${filePath}:`, error.message);
    return false;
  }
}

// Função para obter uma imagem do Pixabay
async function getPixabayImage(query) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=200`);
    
    if (response.data && response.data.hits && response.data.hits.length > 0) {
      // Escolher uma imagem aleatória entre os resultados
      const randomIndex = Math.floor(Math.random() * response.data.hits.length);
      return response.data.hits[randomIndex].largeImageURL;
    }
    return null;
  } catch (error) {
    console.error(`Erro ao buscar imagem do Pixabay para ${query}:`, error.message);
    return null;
  }
}

// Função para baixar uma imagem
async function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filePath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Status code: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

// Copia uma imagem local existente para o destino
function copyLocalImage(sourcePath, destPath) {
  try {
    fs.copyFileSync(sourcePath, destPath);
    return true;
  } catch (error) {
    console.error(`Erro ao copiar arquivo: ${error.message}`);
    return false;
  }
}

// Obter uma lista de todos os arquivos de imagem inválidos ou ausentes
async function getInvalidImages() {
  const invalidImages = [];
  
  // Verificar cada produto
  for (const product of products) {
    const imagePath = product.image;
    if (!imagePath || !imagePath.startsWith('/images/products-new/')) continue;
    
    const fileName = path.basename(imagePath);
    const fullPath = path.join(__dirname, '../public', imagePath);
    
    // Verificar se a imagem é válida
    const isValid = await isValidImage(fullPath);
    if (!isValid) {
      invalidImages.push({
        product,
        fileName,
        fullPath,
        category: product.category
      });
    }
  }
  
  return invalidImages;
}

// Encontrar imagens existentes que podemos usar como backup
function findExistingImages() {
  const existingImages = [];
  
  try {
    const files = fs.readdirSync(IMAGES_DIR);
    
    // Filtrar apenas imagens válidas
    for (const file of files) {
      const filePath = path.join(IMAGES_DIR, file);
      if (fs.statSync(filePath).size >= MIN_VALID_SIZE) {
        existingImages.push(file);
      }
    }
    
    console.log(`Encontradas ${existingImages.length} imagens existentes que podem ser usadas como backup.`);
  } catch (error) {
    console.error('Erro ao buscar imagens existentes:', error.message);
  }
  
  return existingImages;
}

// Função principal para verificar e atualizar imagens
async function updateProductImages() {
  // Criar o diretório de imagens se não existir
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  // Encontrar imagens válidas existentes
  const existingImages = findExistingImages();
  
  const processedFiles = {};
  const categoryImageCount = {};
  let totalUpdated = 0;
  
  console.log('Verificando produtos com imagens inválidas ou ausentes...');
  
  // Obter lista de imagens inválidas
  const invalidImages = await getInvalidImages();
  console.log(`Encontrados ${invalidImages.length} produtos com imagens inválidas ou ausentes.`);
  
  // Criar um mapa de categorias para contagem
  Object.keys(IMAGE_CATEGORIES).forEach(cat => {
    categoryImageCount[cat] = 0;
  });
  
  // Processar cada imagem inválida
  for (const item of invalidImages) {
    const { product, fileName, fullPath, category } = item;
    
    // Evitar processar o mesmo arquivo mais de uma vez
    if (processedFiles[fileName]) continue;
    processedFiles[fileName] = true;
    
    console.log(`Atualizando imagem: ${fileName} (categoria: ${category})`);
    
    // Definir consulta de pesquisa com base na categoria e no nome do produto
    let searchQueries = (IMAGE_CATEGORIES[category] || IMAGE_CATEGORIES.default);
    if (Array.isArray(searchQueries)) {
      // Usar a primeira consulta por padrão, mas alternar com base na contagem
      const queryIndex = (categoryImageCount[category] || 0) % searchQueries.length;
      searchQueries = searchQueries[queryIndex];
      categoryImageCount[category] = (categoryImageCount[category] || 0) + 1;
    }
    
    // Adicionar o nome do produto à consulta para melhor correspondência
    const productKeywords = product.name.toLowerCase().split(' ')
      .filter(word => word.length > 3 && !['para', 'com', 'tipo'].includes(word))
      .slice(0, 2);
      
    if (productKeywords.length > 0) {
      searchQueries = `${searchQueries},${productKeywords.join(',')}`;
    }
    
    console.log(`  Buscando com termos: ${searchQueries}`);
    
    // Tentar obter imagem do Pixabay
    let imageUrl = await getPixabayImage(searchQueries);
    
    // Se falhar, tente com um termo mais genérico
    if (!imageUrl) {
      const genericTerm = searchQueries.split(',')[0];
      console.log(`  Tentando com termo mais genérico: ${genericTerm}`);
      imageUrl = await getPixabayImage(genericTerm);
    }
    
    if (imageUrl) {
      try {
        await downloadImage(imageUrl, fullPath);
        console.log(`  ✓ Imagem salva: ${fileName}`);
        totalUpdated++;
      } catch (error) {
        console.error(`  ✗ Erro ao salvar imagem ${fileName}:`, error.message);
        
        // Usar uma imagem existente como backup
        if (existingImages.length > 0) {
          // Escolher uma imagem aleatória existente
          const randomIndex = Math.floor(Math.random() * existingImages.length);
          const backupImage = existingImages[randomIndex];
          const backupPath = path.join(IMAGES_DIR, backupImage);
          
          if (copyLocalImage(backupPath, fullPath)) {
            console.log(`  ✓ Usada imagem backup: ${backupImage} para ${fileName}`);
            totalUpdated++;
          }
        }
      }
    } else {
      console.error(`  ✗ Não foi possível obter uma imagem para ${fileName}`);
      
      // Usar uma imagem existente como backup
      if (existingImages.length > 0) {
        // Escolher uma imagem aleatória existente
        const randomIndex = Math.floor(Math.random() * existingImages.length);
        const backupImage = existingImages[randomIndex];
        const backupPath = path.join(IMAGES_DIR, backupImage);
        
        if (copyLocalImage(backupPath, fullPath)) {
          console.log(`  ✓ Usada imagem backup: ${backupImage} para ${fileName}`);
          totalUpdated++;
        }
      }
    }
  }

  // Verificar se há arquivos específicos que queremos atualizar
  const targetFiles = [
    'alicate-amperimetro.jpg',
    'alicate-isolado.jpg',
    'betoneira.jpg',
    'broca-concreto.jpg',
    'chaves-multiuso.jpg',
    'compressor-ar.jpg',
    'cortador-grama.jpg',
    'furadeira-impacto.jpg',
    'martelo-construcao.jpg',
    'pistola-pintura.jpg',
    'rolo-pintura.jpg'
  ];
  
  console.log('\nProcessando arquivos específicos que precisam ser atualizados...');
  
  for (const fileName of targetFiles) {
    const filePath = path.join(IMAGES_DIR, fileName);
    console.log(`Verificando arquivo específico: ${fileName}`);
    
    // Definir termos de busca específicos para cada arquivo
    let searchTerms;
    switch (fileName) {
      case 'alicate-amperimetro.jpg':
        searchTerms = 'multimeter';
        break;
      case 'alicate-isolado.jpg':
        searchTerms = 'pliers';
        break;
      case 'betoneira.jpg':
        searchTerms = 'cement mixer';
        break;
      case 'broca-concreto.jpg':
        searchTerms = 'drill bit';
        break;
      case 'chaves-multiuso.jpg':
        searchTerms = 'wrench';
        break;
      case 'compressor-ar.jpg':
        searchTerms = 'air compressor';
        break;
      case 'cortador-grama.jpg':
        searchTerms = 'lawn mower';
        break;
      case 'furadeira-impacto.jpg':
        searchTerms = 'power drill';
        break;
      case 'martelo-construcao.jpg':
        searchTerms = 'hammer tool';
        break;
      case 'pistola-pintura.jpg':
        searchTerms = 'paint gun';
        break;
      case 'rolo-pintura.jpg':
        searchTerms = 'paint roller';
        break;
      default:
        searchTerms = 'tool';
    }
    
    console.log(`  Buscando com termos específicos: ${searchTerms}`);
    
    // Obter URL da imagem
    let imageUrl = await getPixabayImage(searchTerms);
    
    if (imageUrl) {
      try {
        await downloadImage(imageUrl, filePath);
        console.log(`  ✓ Imagem específica salva: ${fileName}`);
        totalUpdated++;
      } catch (error) {
        console.error(`  ✗ Erro ao salvar imagem específica ${fileName}:`, error.message);
        
        // Usar uma imagem existente como backup
        if (existingImages.length > 0) {
          // Escolher uma imagem aleatória existente
          const randomIndex = Math.floor(Math.random() * existingImages.length);
          const backupImage = existingImages[randomIndex];
          const backupPath = path.join(IMAGES_DIR, backupImage);
          
          if (copyLocalImage(backupPath, filePath)) {
            console.log(`  ✓ Usada imagem backup: ${backupImage} para ${fileName}`);
            totalUpdated++;
          }
        }
      }
    } else {
      console.error(`  ✗ Não foi possível obter uma imagem para ${fileName}`);
      
      // Usar uma imagem existente como backup
      if (existingImages.length > 0) {
        // Escolher uma imagem aleatória existente
        const randomIndex = Math.floor(Math.random() * existingImages.length);
        const backupImage = existingImages[randomIndex];
        const backupPath = path.join(IMAGES_DIR, backupImage);
        
        if (copyLocalImage(backupPath, filePath)) {
          console.log(`  ✓ Usada imagem backup: ${backupImage} para ${fileName}`);
          totalUpdated++;
        }
      }
    }
  }

  // Adicionar imagens aleatórias para diversificar o catálogo
  console.log('\nAdicionando imagens aleatórias para diversificar o catálogo...');
  
  // Número de imagens aleatórias a adicionar por categoria
  const RANDOM_IMAGES_PER_CATEGORY = 5;
  
  // Categorias prioritárias que precisam de mais imagens
  const priorityCategories = Object.keys(IMAGE_CATEGORIES)
    .filter(cat => cat !== 'default')
    .sort(() => Math.random() - 0.5)  // Embaralhar as categorias
    .slice(0, 15);  // Selecionar 15 categorias aleatórias
  
  console.log(`Selecionadas ${priorityCategories.length} categorias para adicionar imagens aleatórias:`);
  console.log(priorityCategories.join(', '));
  
  for (const category of priorityCategories) {
    console.log(`\nAdicionando imagens para categoria: ${category}`);
    
    // Criar um diretório para a categoria se necessário
    const categoryDir = path.join(IMAGES_DIR, category);
    if (!fs.existsSync(categoryDir)) {
      try {
        fs.mkdirSync(categoryDir, { recursive: true });
        console.log(`  Criado diretório para categoria: ${category}`);
      } catch (error) {
        console.error(`  Erro ao criar diretório para categoria ${category}:`, error.message);
      }
    }
    
    for (let i = 1; i <= RANDOM_IMAGES_PER_CATEGORY; i++) {
      const searchQueries = IMAGE_CATEGORIES[category] || IMAGE_CATEGORIES.default;
      // Escolher um termo de busca aleatório
      const searchTerm = searchQueries[Math.floor(Math.random() * searchQueries.length)];
      
      // Gerar um nome de arquivo único para esta categoria
      const fileName = `${category}-${i}.jpg`;
      const filePath = path.join(IMAGES_DIR, fileName);
      
      console.log(`  Gerando imagem: ${fileName} com termo: ${searchTerm}`);
      
      // Obter URL da imagem
      let imageUrl = await getPixabayImage(searchTerm);
      
      if (imageUrl) {
        try {
          await downloadImage(imageUrl, filePath);
          console.log(`  ✓ Imagem aleatória salva: ${fileName}`);
          // Adicionar à lista de imagens existentes para poder usar como backup
          existingImages.push(fileName);
          totalUpdated++;
        } catch (error) {
          console.error(`  ✗ Erro ao salvar imagem aleatória ${fileName}:`, error.message);
          
          // Usar uma imagem existente como backup
          if (existingImages.length > 0) {
            // Escolher uma imagem aleatória existente
            const randomIndex = Math.floor(Math.random() * existingImages.length);
            const backupImage = existingImages[randomIndex];
            const backupPath = path.join(IMAGES_DIR, backupImage);
            
            if (copyLocalImage(backupPath, filePath)) {
              console.log(`  ✓ Usada imagem backup: ${backupImage} para ${fileName}`);
              totalUpdated++;
            }
          }
        }
      } else {
        console.error(`  ✗ Não foi possível obter uma imagem para ${fileName}`);
        
        // Usar uma imagem existente como backup
        if (existingImages.length > 0) {
          // Escolher uma imagem aleatória existente
          const randomIndex = Math.floor(Math.random() * existingImages.length);
          const backupImage = existingImages[randomIndex];
          const backupPath = path.join(IMAGES_DIR, backupImage);
          
          if (copyLocalImage(backupPath, filePath)) {
            console.log(`  ✓ Usada imagem backup: ${backupImage} para ${fileName}`);
            totalUpdated++;
          }
        }
      }
      
      // Esperar um pouco entre cada solicitação para não sobrecarregar as APIs
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log(`\nProcesso concluído! ${totalUpdated} imagens foram atualizadas.`);
}

// Executar o script
updateProductImages().catch(console.error); 