export const categories = [
  {
    id: '1',
    name: 'Ferramentas Manuais',
    slug: 'ferramentas-manuais',
    subcategories: [
      { id: '1-1', name: 'Martelos', slug: 'martelos' },
      { id: '1-2', name: 'Alicates', slug: 'alicates' },
      { id: '1-3', name: 'Chaves', slug: 'chaves' },
    ]
  },
  {
    id: '2',
    name: 'Ferramentas Elétricas',
    slug: 'ferramentas-eletricas',
    subcategories: [
      { id: '2-1', name: 'Furadeiras', slug: 'furadeiras' },
      { id: '2-2', name: 'Serras', slug: 'serras' },
      { id: '2-3', name: 'Lixadeiras', slug: 'lixadeiras' },
    ]
  },
  {
    id: '3',
    name: 'Equipamentos de Construção',
    slug: 'equipamentos-construcao',
    subcategories: []
  },
  {
    id: '4',
    name: 'Segurança',
    slug: 'seguranca',
    subcategories: [
      { id: '4-1', name: 'Capacetes', slug: 'capacetes' },
      { id: '4-2', name: 'Luvas', slug: 'luvas' },
      { id: '4-3', name: 'Óculos', slug: 'oculos' },
    ]
  },
  {
    id: '5',
    name: 'Acessórios',
    slug: 'acessorios',
    subcategories: []
  },
  {
    id: '6',
    name: 'Jardinagem',
    slug: 'jardinagem',
    subcategories: []
  },
  {
    id: '7',
    name: 'Sanitários',
    slug: 'sanitarios',
    subcategories: [
      { id: '7-1', name: 'Torneiras', slug: 'torneiras' },
      { id: '7-2', name: 'Chuveiros', slug: 'chuveiros' },
    ]
  },
  {
    id: '8',
    name: 'Pintura',
    slug: 'pintura',
    subcategories: [
      { id: '8-1', name: 'Tintas', slug: 'tintas' },
      { id: '8-2', name: 'Pincéis', slug: 'pinceis' },
      { id: '8-3', name: 'Rolos', slug: 'rolos' },
    ]
  },
  // Novas categorias da Geko
  {
    id: '9',
    name: 'Materiais Abrasivos',
    slug: 'materiais-abrasivos',
    subcategories: [
      { id: '9-1', name: 'Escovas', slug: 'escovas' },
      { id: '9-2', name: 'Discos para Esmeril', slug: 'discos-esmeril' },
      { id: '9-3', name: 'Discos para Lixadeiras', slug: 'discos-lixadeiras' },
      { id: '9-4', name: 'Cintas Abrasivas', slug: 'cintas-abrasivas' },
      { id: '9-5', name: 'Lixamento Manual', slug: 'lixamento-manual' },
    ]
  },
  {
    id: '10',
    name: 'Construção e Renovação',
    slug: 'construcao-renovacao',
    subcategories: [
      { id: '10-1', name: 'Agitadores', slug: 'agitadores' },
      { id: '10-2', name: 'Martelos de Carpinteiro', slug: 'martelos-carpinteiro' },
      { id: '10-3', name: 'Talhadeiras e Punções', slug: 'talhadeiras-puncoes' },
      { id: '10-4', name: 'Grampos e Sargentos', slug: 'grampos-sargentos' },
      { id: '10-5', name: 'Ferramentas para Gesso', slug: 'ferramentas-gesso' },
    ]
  },
  {
    id: '11',
    name: 'Ferramentas de Corte',
    slug: 'ferramentas-corte',
    subcategories: [
      { id: '11-1', name: 'Discos de Corte e Desbaste', slug: 'discos-corte-desbaste' },
      { id: '11-2', name: 'Discos para Corte de Metal', slug: 'discos-corte-metal' },
      { id: '11-3', name: 'Discos para Desbaste de Metal', slug: 'discos-desbaste-metal' },
    ]
  },
  {
    id: '12',
    name: 'Ferramentas Diamantadas',
    slug: 'ferramentas-diamantadas',
    subcategories: [
      { id: '12-1', name: 'Brocas Diamantadas', slug: 'brocas-diamantadas' },
      { id: '12-2', name: 'Discos Diamantados para Construção', slug: 'discos-diamantados-construcao' },
      { id: '12-3', name: 'Discos Diamantados para Concreto', slug: 'discos-diamantados-concreto' },
      { id: '12-4', name: 'Discos Diamantados para Cerâmica', slug: 'discos-diamantados-ceramica' },
    ]
  },
  {
    id: '13',
    name: 'Ferramentas Mecânicas Gerais',
    slug: 'ferramentas-mecanicas-gerais',
    subcategories: [
      { id: '13-1', name: 'Chaves Allen e Bits', slug: 'chaves-allen-bits' },
      { id: '13-2', name: 'Chaves em L', slug: 'chaves-l' },
      { id: '13-3', name: 'Alicates para Cabos', slug: 'alicates-cabos' },
      { id: '13-4', name: 'Chaves de Fenda', slug: 'chaves-fenda' },
      { id: '13-5', name: 'Chaves de Boca e Caixa', slug: 'chaves-boca-caixa' },
    ]
  },
  {
    id: '14',
    name: 'Artigos de Saúde e Segurança',
    slug: 'artigos-saude-seguranca',
    subcategories: [
      { id: '14-1', name: 'Proteção Ocular', slug: 'protecao-ocular' },
      { id: '14-2', name: 'Proteção Auditiva', slug: 'protecao-auditiva' },
      { id: '14-3', name: 'Capacetes', slug: 'capacetes-seguranca' },
      { id: '14-4', name: 'Máscaras de Proteção', slug: 'mascaras-protecao' },
      { id: '14-5', name: 'Roupas de Trabalho', slug: 'roupas-trabalho' },
      { id: '14-6', name: 'Luvas de Trabalho', slug: 'luvas-trabalho' },
      { id: '14-7', name: 'Calçado de Trabalho', slug: 'calcado-trabalho' },
    ]
  },
  {
    id: '15',
    name: 'Aquecedores e Radiadores',
    slug: 'aquecedores-radiadores',
    subcategories: [
      { id: '15-1', name: 'Aquecedores Elétricos', slug: 'aquecedores-eletricos' },
      { id: '15-2', name: 'Aquecedores a Gás', slug: 'aquecedores-gas' },
      { id: '15-3', name: 'Radiadores a Gás', slug: 'radiadores-gas' },
      { id: '15-4', name: 'Aquecedores a Óleo', slug: 'aquecedores-oleo' },
    ]
  },
  {
    id: '16',
    name: 'Artigos Domésticos',
    slug: 'artigos-domesticos',
    subcategories: [
      { id: '16-1', name: 'Ventiladores', slug: 'ventiladores' },
      { id: '16-2', name: 'Sacos de Lixo', slug: 'sacos-lixo' },
      { id: '16-3', name: 'Repelentes de Insetos', slug: 'repelentes-insetos' },
      { id: '16-4', name: 'Balanças de Cozinha e Banheiro', slug: 'balancas' },
    ]
  },
  {
    id: '17',
    name: 'Ferramentas de Junção',
    slug: 'ferramentas-juncao',
    subcategories: [
      { id: '17-1', name: 'Grampos de Carpintaria', slug: 'grampos-carpintaria' },
      { id: '17-2', name: 'Pistolas de Espuma', slug: 'pistolas-espuma' },
      { id: '17-3', name: 'Pistolas de Cola', slug: 'pistolas-cola' },
      { id: '17-4', name: 'Rebitadoras', slug: 'rebitadoras' },
      { id: '17-5', name: 'Ferros de Soldar', slug: 'ferros-soldar' },
      { id: '17-6', name: 'Grampeadores', slug: 'grampeadores' },
    ]
  },
  {
    id: '18',
    name: 'Ferramentas Laser',
    slug: 'ferramentas-laser',
    subcategories: [
      { id: '18-1', name: 'Lasers de Linha Cruzada', slug: 'lasers-linha-cruzada' },
      { id: '18-2', name: 'Níveis Laser', slug: 'niveis-laser' },
      { id: '18-3', name: 'Detectores de Perfil', slug: 'detectores-perfil' },
      { id: '18-4', name: 'Medidores de Distância', slug: 'medidores-distancia' },
    ]
  },
  {
    id: '19',
    name: 'Ferramentas de Medição',
    slug: 'ferramentas-medicao',
    subcategories: [
      { id: '19-1', name: 'Lápis de Carpinteiro', slug: 'lapis-carpinteiro' },
      { id: '19-2', name: 'Calibradores de Rosca', slug: 'calibradores-rosca' },
      { id: '19-3', name: 'Medidas Dobráveis', slug: 'medidas-dobraveis' },
      { id: '19-4', name: 'Trenas', slug: 'trenas' },
      { id: '19-5', name: 'Micrômetros', slug: 'micrometros' },
      { id: '19-6', name: 'Paquímetros', slug: 'paquimetros' },
    ]
  },
  {
    id: '20',
    name: 'Pneumática',
    slug: 'pneumatica',
    subcategories: [
      { id: '20-1', name: 'Martelos Pneumáticos', slug: 'martelos-pneumaticos' },
      { id: '20-2', name: 'Pistolas de Sopro', slug: 'pistolas-sopro' },
      { id: '20-3', name: 'Chaves de Impacto', slug: 'chaves-impacto' },
      { id: '20-4', name: 'Compressores', slug: 'compressores' },
      { id: '20-5', name: 'Pistolas de Pintura', slug: 'pistolas-pintura' },
      { id: '20-6', name: 'Mangueiras Pneumáticas', slug: 'mangueiras-pneumaticas' },
    ]
  },
  {
    id: '21',
    name: 'Aspiradores',
    slug: 'aspiradores',
    subcategories: [
      { id: '21-1', name: 'Aspiradores para Lareira', slug: 'aspiradores-lareira' },
      { id: '21-2', name: 'Aspiradores Industriais', slug: 'aspiradores-industriais' },
    ]
  },
  {
    id: '22',
    name: 'Equipamentos de Soldadura',
    slug: 'equipamentos-soldadura',
    subcategories: [
      { id: '22-1', name: 'Acessórios para Soldadura', slug: 'acessorios-soldadura' },
      { id: '22-2', name: 'Elétrodos Revestidos', slug: 'eletrodos-revestidos' },
      { id: '22-3', name: 'Aparelhos MIG MAG', slug: 'aparelhos-mig-mag' },
      { id: '22-4', name: 'Aparelhos MMA', slug: 'aparelhos-mma' },
      { id: '22-5', name: 'Aparelhos TIG', slug: 'aparelhos-tig' },
      { id: '22-6', name: 'Máscaras de Soldadura', slug: 'mascaras-soldadura' },
    ]
  },
  {
    id: '23',
    name: 'Ferramentas para Eletricistas',
    slug: 'ferramentas-eletricistas',
    subcategories: [
      { id: '23-1', name: 'Alicates de Cravar', slug: 'alicates-cravar' },
      { id: '23-2', name: 'Medidores Elétricos', slug: 'medidores-eletricos' },
      { id: '23-3', name: 'Conectores Elétricos', slug: 'conectores-eletricos' },
      { id: '23-4', name: 'Tubos Termoretrácteis', slug: 'tubos-termoretracteis' },
      { id: '23-5', name: 'Descarnadores de Isolamento', slug: 'descarnadores-isolamento' },
    ]
  },
  {
    id: '24',
    name: 'Ferramentas para Canalizadores',
    slug: 'ferramentas-canalizadores',
    subcategories: [
      { id: '24-1', name: 'Bombas Circuladoras', slug: 'bombas-circuladoras' },
      { id: '24-2', name: 'Curvadoras de Tubos', slug: 'curvadoras-tubos' },
      { id: '24-3', name: 'Soldadores de Tubos', slug: 'soldadores-tubos' },
      { id: '24-4', name: 'Corta-Tubos', slug: 'corta-tubos' },
      { id: '24-5', name: 'Roscadoras de Tubos', slug: 'roscadoras-tubos' },
      { id: '24-6', name: 'Chaves de Canos', slug: 'chaves-canos' },
    ]
  },
  {
    id: '25',
    name: 'Ferramentas para Oficina e Garagem',
    slug: 'ferramentas-oficina-garagem',
    subcategories: [
      { id: '25-1', name: 'Mochilas de Ferramentas', slug: 'mochilas-ferramentas' },
      { id: '25-2', name: 'Acessórios para Automóvel', slug: 'acessorios-automovel' },
      { id: '25-3', name: 'Elevadores para Carros', slug: 'elevadores-carros' },
      { id: '25-4', name: 'Guindastes Elétricos e Manuais', slug: 'guindastes' },
      { id: '25-5', name: 'Manipulação de Combustível', slug: 'manipulacao-combustivel' },
    ]
  },
  {
    id: '26',
    name: 'Equipamento Turístico',
    slug: 'equipamento-turistico',
    subcategories: [
      { id: '26-1', name: 'Acessórios para Bicicleta', slug: 'acessorios-bicicleta' },
      { id: '26-2', name: 'Geleiras para Automóvel', slug: 'geleiras-automovel' },
      { id: '26-3', name: 'Multi-ferramentas', slug: 'multi-ferramentas' },
      { id: '26-4', name: 'Fogões a Gás Portáteis', slug: 'fogoes-gas-portateis' },
    ]
  },
];

// Dados de exemplo para o site
import { gekoProducts } from './data_geko';
import { additionalProducts } from './data_products';

// Array mutável para todos os produtos
// Concatenar os arrays, garantindo que não haja IDs duplicados
const uniqueProducts = [...gekoProducts];
const existingIds = new Set(uniqueProducts.map(p => p.id));

// Adicionar apenas produtos que não existem ainda
additionalProducts.forEach(product => {
  if (!existingIds.has(product.id)) {
    uniqueProducts.push(product);
    existingIds.add(product.id);
  }
});

export let allProducts = uniqueProducts;

// Exportando os produtos como referência ao array mutável
export let products = allProducts;

export const brands = [
  { id: 'b1', name: 'DeWalt', logo: '/images/brands/dewalt.png' },
  { id: 'b2', name: 'Bosch', logo: '/images/brands/bosch.png' },
  { id: 'b3', name: 'Makita', logo: '/images/brands/makita.png' },
  { id: 'b4', name: 'Stanley', logo: '/images/brands/stanley.png' },
  { id: 'b5', name: 'Milwaukee', logo: '/images/brands/milwaukee.png' },
  { id: 'b6', name: 'Husqvarna', logo: '/images/brands/husqvarna.png' },
  { id: 'b7', name: 'Honda', logo: '/images/brands/honda.png' },
  { id: 'b8', name: 'Geko', logo: '/images/brands/msa.png' },
];

export function getProductsByCategory(categorySlug: string) {
  return getAllProducts().filter(product => product.category === categorySlug);
}

export function getProduct(slug: string) {
  return getAllProducts().find(product => product.slug === slug);
}

export function searchProducts(query: string) {
  return getAllProducts().filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description?.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
}

export function getRelatedProducts(productId: string, categorySlug: string, limit = 4) {
  const allProducts = getAllProducts();
  const sameCategoryProducts = allProducts
    .filter(p => p.category === categorySlug && p.id !== productId)
    .slice(0, limit);
  
  if (sameCategoryProducts.length >= limit) {
    return sameCategoryProducts;
  }
  
  // If not enough products in the same category, add other products
  const otherProducts = allProducts
    .filter(p => p.category !== categorySlug && p.id !== productId)
    .slice(0, limit - sameCategoryProducts.length);
  
  return [...sameCategoryProducts, ...otherProducts];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  oldPrice?: number;
  image: string;
  brand: string;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  specifications: Record<string, any>;
  relatedProducts?: string[];
  reviews?: Review[];
}

interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export const categoriesLabels = [
  'Serras',
  'Furadeiras',
  'Parafusadeiras',
  'Lixadeiras',
  'Compressores',
  'Esmerilhadeiras',
  'Marteletes',
  'Plainas',
  'Multiferramentas',
  'Kits de Ferramentas',
  'Sopradores',
  'Lavadoras',
  'Medição'
];

// Função para obter todos os produtos
export function getAllProducts() {
  return products;
}

// Funções de depuração para verificar categorias
export function logProductCategories() {
  console.log("Product categories:");
  const categoriesBySlug = new Map();
  
  products.forEach(product => {
    if (!categoriesBySlug.has(product.category)) {
      categoriesBySlug.set(product.category, []);
    }
    categoriesBySlug.get(product.category).push(product.name);
  });
  
  console.log(Array.from(categoriesBySlug.entries()));
}

// Função para atualizar os produtos
export function setProducts(newProducts: Product[]) {
  console.log(`Atualizando produtos: de ${allProducts.length} para ${newProducts.length}`);
  
  // Atualiza os arrays mutáveis
  allProducts = newProducts;
  products = allProducts;
  
  // Retorna a referência atualizada
  return products;
}

export function addCategories(newCategories: Category[]) {
  // Add new categories to the categories array
  newCategories.forEach(category => categories.push(category));
} 