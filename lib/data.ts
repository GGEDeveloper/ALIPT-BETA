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
];

// Import produtos do Geko
import { gekoProducts } from './data_geko';

// Usar diretamente os produtos do Geko
export const products = gekoProducts;

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