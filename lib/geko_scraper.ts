// Geko Scraper - Fetch até 200 produtos de ferramentas
import axios from 'axios';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { gekoProducts } from './data_geko';

// Interface do produto Geko
interface GekoProduct {
  id: string;
  name: string;
  slug: string;
  code: string;
  price: number;
  oldPrice: number | null;
  image: string;
  inStock: boolean;
  category: string;
  brand: string;
  description: string;
  specifications: Record<string, any>;
}

// Cache para evitar duplicatas
const existingCodes = new Set(gekoProducts.map(p => p.code));
const existingIds = new Set(gekoProducts.map(p => p.id));

// URLs das páginas de produtos
const BASE_URL = 'https://www.gekotools.pl';
const CATEGORIES = [
  '/en/hand-tools',
  '/en/tool-accessories',
  '/en/power-tools',
  '/en/garden-tools',
  '/en/home-accessories',
  '/en/construction-tools'
];

// Mapeamento de categorias em inglês para as categorias do nosso site
const CATEGORY_MAP = {
  'hand-tools': 'ferramentas-manuais',
  'tool-accessories': 'acessorios',
  'power-tools': 'ferramentas-eletricas',
  'garden-tools': 'jardinagem',
  'home-accessories': 'acessorios',
  'construction-tools': 'equipamentos-construcao'
};

// Função para criar slug a partir do nome
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Função para mapear categorias
function mapCategory(category: string, name: string): string {
  // Mapeamento de nome de produtos para categorias
  if (name.toLowerCase().includes("drill") || name.toLowerCase().includes("broca")) {
    return "ferramentas-eletricas";
  } else if (name.toLowerCase().includes("pliers") || name.toLowerCase().includes("alicate")) {
    return "ferramentas-manuais";
  } else if (name.toLowerCase().includes("hss") || name.toLowerCase().includes("twist")) {
    return "ferramentas-manuais";
  } else if (name.toLowerCase().includes("flooring") || name.toLowerCase().includes("laminate")) {
    return "equipamentos-construcao";
  } else if (name.toLowerCase().includes("tank")) {
    return "equipamentos-construcao";
  } else if (name.toLowerCase().includes("tie down") || name.toLowerCase().includes("ratchet")) {
    return "acessorios";
  } else if (name.toLowerCase().includes("handlebar") || name.toLowerCase().includes("brush cutter")) {
    return "jardinagem";
  } else if (name.toLowerCase().includes("cable")) {
    return "ferramentas-eletricas";
  }
  
  return category;
}

// Função auxiliar para traduzir nomes
function translateProductName(name: string): string {
  const translations = {
    "Long HSS DIN1869": "Broca Helicoidal Longa HSS DIN1869",
    "gold metal twist drill bit": "para metal",
    "Quick release water pump pliers": "Alicate de Bomba D'água de Liberação Rápida",
    "Plastic reel for cable": "Carretel Plástico para Cabo",
    "flooring installation kit": "Kit de Instalação de Pisos",
    "installation of laminate floor": "para Laminados",
    "cambuckle tie down": "Cinta de Amarração com Catraca",
    "Ratchet Tie Down": "Cinta de Amarração com Catraca",
    "Left handlebar for brush cutter": "Guidão Esquerdo para Roçadeira",
    "Right handlebar with switch for brush cutter": "Guidão Direito com Interruptor para Roçadeira",
    "Oil and fuel mixture preparing tank": "Tanque para Preparação de Mistura de Óleo e Combustível",
    "Adjustable wrench": "Chave Ajustável",
    "PROFI": "Profissional",
    "hose mender": "Emenda para Mangueira",
    "spray gun": "Pistola de Pulverização",
    "adjustable nozzle": "Bico Ajustável",
    "adapter": "Adaptador",
    "set": "Conjunto",
    "garden": "Jardim",
    "hose": "Mangueira",
    "disc": "Disco",
    "cutting": "Corte",
    "grinding": "Desbaste",
    "safety": "Segurança",
    "gloves": "Luvas",
    "water": "Água",
    "concrete": "Concreto",
    "steel": "Aço",
    "wood": "Madeira"
  };
  
  let translatedName = name;
  
  // Aplica as traduções disponíveis
  Object.entries(translations).forEach(([eng, pt]) => {
    translatedName = translatedName.replace(eng, pt);
  });
  
  return translatedName;
}

// Função para baixar imagem
async function downloadImage(url: string, code: string): Promise<string> {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const extension = path.extname(url) || '.jpg';
    const fileName = `${code.toLowerCase()}${extension}`;
    const filePath = path.join(process.cwd(), 'public', 'images', 'products', fileName);
    
    await fs.promises.writeFile(filePath, response.data);
    return `/images/products/${fileName}`;
  } catch (error) {
    console.error(`Erro ao baixar imagem ${url}: ${error}`);
    return '/images/products/produto-sem-imagem.jpg';
  }
}

// Função para extrair especificações
function extractSpecifications(description: string): Record<string, any> {
  const specs: Record<string, any> = {};
  
  // Extrai dimensões
  const dimensionsMatch = description.match(/(\d+(?:\.\d+)?)\s*(?:x|×)\s*(\d+(?:\.\d+)?)\s*(?:x|×)?\s*(\d+(?:\.\d+)?)?mm/i);
  if (dimensionsMatch) {
    specs["dimensoes"] = `${dimensionsMatch[1]}×${dimensionsMatch[2]}${dimensionsMatch[3] ? '×' + dimensionsMatch[3] : ''}mm`;
  }
  
  // Extrai material
  const materialMatch = description.match(/(?:material|made of):?\s*([A-Za-z0-9\s]+)(?:,|\.|$)/i);
  if (materialMatch) {
    specs["material"] = materialMatch[1].trim();
  }
  
  // Extrai capacidade
  const capacityMatch = description.match(/(\d+(?:\.\d+)?)\s*(?:L|l|litros|liters)/i);
  if (capacityMatch) {
    specs["capacidade"] = `${capacityMatch[1]}L`;
  }
  
  // Extrai peso máximo/carga
  const weightMatch = description.match(/(\d+(?:\.\d+)?)\s*(?:kg|kilos|kilogram)/i);
  if (weightMatch) {
    specs["peso"] = `${weightMatch[1]}kg`;
  }

  return specs;
}

// Função para extrair produtos de uma página
async function scrapeProductPage(url: string): Promise<GekoProduct | null> {
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Extrair código do produto
    const codeElement = document.querySelector('.product-reference');
    if (!codeElement) return null;
    
    const code = codeElement.textContent?.trim().split(':')[1]?.trim() || '';
    if (!code || existingCodes.has(code)) return null; // Pula produtos já existentes
    
    // Extrair nome
    const nameElement = document.querySelector('.page-heading');
    if (!nameElement) return null;
    const name = nameElement.textContent?.trim() || '';
    
    // Extrair preço
    const priceElement = document.querySelector('.current-price [content]');
    const price = priceElement ? parseFloat(priceElement.getAttribute('content') || '0') : 0;
    
    // Extrair preço antigo (se existir)
    const oldPriceElement = document.querySelector('.regular-price');
    const oldPrice = oldPriceElement 
      ? parseFloat(oldPriceElement.textContent?.trim().replace(/[^\d,.]/g, '').replace(',', '.') || '0') 
      : null;
    
    // Extrair disponibilidade
    const availabilityElement = document.querySelector('.product-availability');
    const inStock = availabilityElement ? 
      !availabilityElement.textContent?.trim().toLowerCase().includes('out of stock') : 
      true;
    
    // Extrair imagem
    const imageElement = document.querySelector('.product-cover img');
    const imageUrl = imageElement ? imageElement.getAttribute('src') || '' : '';
    const imagePath = await downloadImage(imageUrl, code);
    
    // Extrair descrição
    const descriptionElement = document.querySelector('.product-description');
    const description = descriptionElement ? 
      descriptionElement.textContent?.trim() || 
      `Produto de alta qualidade ${name}. Ideal para uso profissional.` : 
      `Produto de alta qualidade ${name}. Ideal para uso profissional.`;
    
    // Determinar categoria
    let category = '';
    for (const [catUrl, catValue] of Object.entries(CATEGORY_MAP)) {
      if (url.includes(catUrl)) {
        category = catValue;
        break;
      }
    }
    
    // Gerar ID único
    const productId = `g${createHash('md5').update(code).digest('hex').substring(0, 8)}`;
    
    // Criar slug
    const slug = createSlug(name);

    const product: GekoProduct = {
      id: existingIds.has(productId) ? `g${existingIds.size + 1}` : productId,
      name,
      slug,
      code,
      price,
      oldPrice,
      image: imagePath,
      inStock,
      category: mapCategory(category, name),
      brand: 'Geko',
      description,
      specifications: extractSpecifications(description)
    };

    // Traduzir nome do produto
    product.name = translateProductName(product.name);

    return product;
  } catch (error) {
    console.error(`Erro ao processar ${url}: ${error}`);
    return null;
  }
}

// Função para obter URLs de produtos de uma categoria
async function getProductURLs(categoryURL: string): Promise<string[]> {
  try {
    const response = await axios.get(`${BASE_URL}${categoryURL}`);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    
    const productLinks = Array.from(document.querySelectorAll('.product-title a'))
      .map(link => link.getAttribute('href') || '');
    
    return productLinks;
  } catch (error) {
    console.error(`Erro ao obter URLs da categoria ${categoryURL}: ${error}`);
    return [];
  }
}

// Função principal para iniciar o scraper
export async function runGekoScraper(maxProducts: number = 200): Promise<void> {
  try {
    console.log(`Iniciando scraper Geko para buscar até ${maxProducts} produtos...`);
    const newProducts: GekoProduct[] = [];
    
    // Buscar produtos de todas as categorias
    for (const category of CATEGORIES) {
      if (newProducts.length >= maxProducts) break;
      
      console.log(`\nBuscando produtos na categoria: ${category}`);
      const productURLs = await getProductURLs(category);
      
      for (const url of productURLs) {
        if (newProducts.length >= maxProducts) break;
        
        console.log(`Processando produto: ${url}`);
        const product = await scrapeProductPage(url);
        
        if (product) {
          newProducts.push(product);
          existingCodes.add(product.code);
          existingIds.add(product.id);
          console.log(`Produto adicionado: ${product.name} (${product.code})`);
        } else {
          console.log(`Produto ignorado ou já existente: ${url}`);
        }
        
        // Pequeno delay para não sobrecarregar o servidor
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    console.log(`\nTotal de novos produtos encontrados: ${newProducts.length}`);
    
    // Combinar produtos existentes com os novos
    const updatedProducts = [...gekoProducts, ...newProducts];
    
    // Atualizar o arquivo de dados
    const dataPath = path.join(process.cwd(), 'lib', 'data_geko.ts');
    const newContent = `// Produtos gerados a partir do banco de dados Geko
// Função auxiliar para mapear categorias
function mapCategory(category, name) {
  // Mapeamento de nome de produtos para categorias
  if (name.toLowerCase().includes("drill") || name.toLowerCase().includes("broca")) {
    return "ferramentas-eletricas";
  } else if (name.toLowerCase().includes("pliers") || name.toLowerCase().includes("alicate")) {
    return "ferramentas-manuais";
  } else if (name.toLowerCase().includes("hss") || name.toLowerCase().includes("twist")) {
    return "ferramentas-manuais";
  } else if (name.toLowerCase().includes("flooring") || name.toLowerCase().includes("laminate")) {
    return "equipamentos-construcao";
  } else if (name.toLowerCase().includes("tank")) {
    return "equipamentos-construcao";
  } else if (name.toLowerCase().includes("tie down") || name.toLowerCase().includes("ratchet")) {
    return "acessorios";
  } else if (name.toLowerCase().includes("handlebar") || name.toLowerCase().includes("brush cutter")) {
    return "jardinagem";
  } else if (name.toLowerCase().includes("cable")) {
    return "ferramentas-eletricas";
  }
  
  return category;
}

// Função auxiliar para traduzir nomes
function translateProductName(name) {
  const translations = {
    "Long HSS DIN1869": "Broca Helicoidal Longa HSS DIN1869",
    "gold metal twist drill bit": "para metal",
    "Quick release water pump pliers": "Alicate de Bomba D'água de Liberação Rápida",
    "Plastic reel for cable": "Carretel Plástico para Cabo",
    "flooring installation kit": "Kit de Instalação de Pisos",
    "installation of laminate floor": "para Laminados",
    "cambuckle tie down": "Cinta de Amarração com Catraca",
    "Ratchet Tie Down": "Cinta de Amarração com Catraca",
    "Left handlebar for brush cutter": "Guidão Esquerdo para Roçadeira",
    "Right handlebar with switch for brush cutter": "Guidão Direito com Interruptor para Roçadeira",
    "Oil and fuel mixture preparing tank": "Tanque para Preparação de Mistura de Óleo e Combustível",
    "Adjustable wrench": "Chave Ajustável",
    "PROFI": "Profissional",
    "hose mender": "Emenda para Mangueira",
    "spray gun": "Pistola de Pulverização",
    "adjustable nozzle": "Bico Ajustável",
    "adapter": "Adaptador",
    "set": "Conjunto",
    "garden": "Jardim",
    "hose": "Mangueira"
  };
  
  let translatedName = name;
  
  // Aplica as traduções disponíveis
  Object.entries(translations).forEach(([eng, pt]) => {
    translatedName = translatedName.replace(eng, pt);
  });
  
  return translatedName;
}

export const gekoProducts = ${JSON.stringify(updatedProducts, null, 2)}

// Atualiza as categorias e nomes de produtos
gekoProducts.forEach(product => {
  product.category = mapCategory(product.category, product.name);
  product.name = translateProductName(product.name);
});

export function getGekoProducts() {
  return gekoProducts;
}
`;

    fs.writeFileSync(dataPath, newContent);
    console.log(`Arquivo de dados atualizado com ${updatedProducts.length} produtos (${newProducts.length} novos).`);
    
  } catch (error) {
    console.error(`Erro no scraper: ${error}`);
  }
}

// Função para iniciar o scraper via linha de comando
if (require.main === module) {
  const maxProducts = process.argv[2] ? parseInt(process.argv[2]) : 200;
  runGekoScraper(maxProducts);
} 