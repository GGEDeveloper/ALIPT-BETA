'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiFilter, FiChevronDown, FiChevronRight, FiGrid, FiList, FiInfo } from 'react-icons/fi';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';

// Define types for our product
interface Product {
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
  specifications: Record<string, unknown>;
}

export default function ProductsPage() {
  // Para debug - mostrar quantos produtos temos
  console.log(`Total de produtos: ${products.length}`);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  const [gekoProductsCount, setGekoProductsCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    categories: [] as string[],
    priceRange: { min: 0, max: 5000 },
    brands: [] as string[],
    ratings: 0,
    sort: 'featured', // 'featured', 'price-low', 'price-high', 'newest'
  });
  
  // Extract unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Extract unique brands from products
  const brands = Array.from(new Set(products.map(product => product.brand)));

  // Initialize counts and filtered products on client side only
  useEffect(() => {
    const gCount = products.filter(p => String(p.id).startsWith('g')).length;
    setGekoProductsCount(gCount);
    setFilteredProducts(products);
  }, []);
  
  // Filter products when activeFilters change
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (activeFilters.categories.length > 0) {
      result = result.filter(product => 
        activeFilters.categories.includes(product.category)
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= activeFilters.priceRange.min && 
      product.price <= activeFilters.priceRange.max
    );
    
    // Filter by brand
    if (activeFilters.brands.length > 0) {
      result = result.filter(product => 
        activeFilters.brands.includes(product.brand)
      );
    }
    
    // Sort products
    switch (activeFilters.sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming newer products have higher IDs
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // 'featured' - no sorting needed
        break;
    }
    
    setFilteredProducts(result);
  }, [activeFilters]);
  
  const toggleCategory = (category: string) => {
    setActiveFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories };
    });
  };
  
  const toggleBrand = (brand: string) => {
    setActiveFilters(prev => {
      const brands = prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand];
      
      return { ...prev, brands };
    });
  };
  
  const handlePriceChange = (min: number, max: number) => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: { min, max }
    }));
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveFilters(prev => ({
      ...prev,
      sort: e.target.value
    }));
  };
  
  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      priceRange: { min: 0, max: 5000 },
      brands: [],
      ratings: 0,
      sort: 'featured',
    });
  };

  const regularProductsCount = products.length - gekoProductsCount;

  return (
    <main className="bg-[#FFC03A]">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <div className="pt-6 mb-6">
          <nav className="flex text-sm text-[rgb(140,140,140)]">
            <Link href="/" className="hover:text-secondary">
              Home
            </Link>
            <FiChevronRight className="mx-2 h-5 w-5 text-[rgb(140,140,140)]" />
            <span className="text-[rgb(25,25,25)] font-medium">Produtos</span>
          </nav>
        </div>
        
        {/* Hero Section - Estilo similar à Home */}
        <section className="bg-[rgb(140,140,140)] text-white py-12 rounded-lg mb-8">
          <div className="container-custom px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
                  Produtos de Alta Qualidade
                </h1>
                <p className="text-[rgb(255,255,255)] max-w-2xl mb-4">
                  Descubra nossa seleção completa de ferramentas e equipamentos para todas as suas necessidades profissionais.
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-secondary px-3 py-1 rounded-full text-white flex items-center">
                    <FiInfo className="mr-1" /> Total: {products.length} produtos
                  </span>
                  <span className="bg-primary px-3 py-1 rounded-full text-white flex items-center">
                    <FiInfo className="mr-1" /> Geko: {gekoProductsCount} produtos
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative h-40 md:h-48 w-full">
                  <Image
                    src="/images/content/ALIMAMEDETOOLS_medium.png"
                    alt="ALITOOLS Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Filters and Products */}
        <div className="flex flex-col lg:flex-row gap-8 pb-12">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-gray-200 shadow-sm"
            >
              <FiFilter />
              <span>Filtros</span>
              <FiChevronDown className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 transition-all duration-300 ${isFilterOpen ? 'max-h-[2000px]' : 'max-h-0 lg:max-h-full overflow-hidden lg:overflow-visible'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-secondary rounded"
                        checked={activeFilters.categories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span className="ml-2 text-[rgb(25,25,25)]">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Preço</h3>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    max={activeFilters.priceRange.max}
                    value={activeFilters.priceRange.min}
                    onChange={(e) => handlePriceChange(Number(e.target.value), activeFilters.priceRange.max)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Min"
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="number"
                    min={activeFilters.priceRange.min}
                    value={activeFilters.priceRange.max}
                    onChange={(e) => handlePriceChange(activeFilters.priceRange.min, Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
              
              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Marcas</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-secondary rounded"
                        checked={activeFilters.brands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                      <span className="ml-2 text-[rgb(25,25,25)]">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Clear Filters Button */}
              <button
                onClick={clearAllFilters}
                className="w-full bg-gray-100 text-[rgb(25,25,25)] py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </aside>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            {/* Sorting & View Options */}
            <div className="bg-white rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center">
                <span className="text-[rgb(140,140,140)] mr-2">Ordenar por:</span>
                <select 
                  value={activeFilters.sort}
                  onChange={handleSortChange}
                  className="form-select text-sm"
                >
                  <option value="featured">Relevância</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                  <option value="newest">Mais Recente</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-[rgb(140,140,140)] text-sm">{filteredProducts.length} produtos</span>
                <div className="border-l border-gray-300 h-6 mx-2"></div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded-md ${viewType === 'grid' ? 'bg-gray-100 text-[rgb(25,25,25)]' : 'text-[rgb(140,140,140)]'}`}
                    title="Visualização em Grid"
                  >
                    <FiGrid />
                  </button>
                  <button 
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded-md ${viewType === 'list' ? 'bg-gray-100 text-[rgb(25,25,25)]' : 'text-[rgb(140,140,140)]'}`}
                    title="Visualização em Lista"
                  >
                    <FiList />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products Display */}
            {filteredProducts.length > 0 ? (
              <div className={viewType === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    originalPrice={product.oldPrice || undefined}
                    image={product.image}
                    category={product.category}
                    inStock={product.inStock}
                    isNew={String(product.id).startsWith('g')} // Marca os produtos do Geko como novos
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-[rgb(140,140,140)]">Nenhum produto encontrado com os filtros aplicados.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-opacity-90"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 