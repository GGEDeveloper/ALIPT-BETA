'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiFilter, FiChevronDown, FiChevronRight, FiGrid, FiList, FiInfo } from 'react-icons/fi';
import ProductCard from '@/components/ProductCard';
import CategorySidebar from '@/components/CategorySidebar';
import { products, categories } from '@/lib/data';
import { useSearchParams } from 'next/navigation';
import { importGeneratedProducts } from '@/lib/import_generated_products';

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
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categoria');
  const subcategoryParam = searchParams.getAll('subcategoria');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  const [allProductsData, setAllProductsData] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  const [activeFilters, setActiveFilters] = useState({
    categories: [] as string[],
    subcategories: [] as string[],
    priceRange: { min: 0, max: 5000 },
    brands: [] as string[],
    ratings: 0,
    sort: 'featured', // 'featured', 'price-low', 'price-high', 'newest'
  });
  
  // Importar produtos gerados - mover para dentro de um useEffect
  useEffect(() => {
    console.log("Importando produtos...");
    const updatedProducts = importGeneratedProducts();
    console.log(`Total produtos após importação: ${updatedProducts.length}`);
    setAllProductsData(updatedProducts);
  }, []);
  
  // Extract unique categories from products
  const productCategories = Array.from(new Set(allProductsData.map(product => product.category)));
  
  // Extract unique brands from products
  const brands = Array.from(new Set(allProductsData.map(product => product.brand)));

  // Calcular contagens de forma estática para evitar diferenças de hidratação
  const gekoProductsCount = allProductsData.filter(p => String(p.id).startsWith('g')).length;
  const regularProductsCount = allProductsData.length - gekoProductsCount;
  const categoriesCount = categories.length;

  // Atualizar filtros baseado nos parâmetros da URL
  useEffect(() => {
    const categoriesFromUrl = searchParams.getAll('categoria');
    const subcategoriesFromUrl = searchParams.getAll('subcategoria');
    const pageFromUrl = searchParams.get('page');
    const itemsPerPageFromUrl = searchParams.get('porpagina');
    
    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl) || 1);
    }
    
    if (itemsPerPageFromUrl) {
      setItemsPerPage(parseInt(itemsPerPageFromUrl) || 50);
    }
    
    setActiveFilters(prev => ({
      ...prev,
      categories: categoriesFromUrl,
      subcategories: subcategoriesFromUrl,
    }));
  }, [searchParams]);

  // Filter products when activeFilters change
  useEffect(() => {
    try {
      let result = [...allProductsData];
      
      // Log para debug
      console.log(`Filtrando ${result.length} produtos com filtros:`, activeFilters);
      
      // Assegurar que todos produtos têm os campos necessários
      result = result.filter(product => {
        if (!product || !product.price || !product.category || !product.brand) {
          console.warn('Produto inválido encontrado:', product);
          return false;
        }
        
        // Converter price para number se for string
        if (typeof product.price === 'string') {
          product.price = parseFloat(product.price);
        }
        
        return true;
      });
      
      // Filtragem por categorias e subcategorias
      if (activeFilters.categories.length > 0 || activeFilters.subcategories.length > 0) {
        // Mapeamento de slugs de subcategorias para suas categorias principais
        const subcategoryToParentMap = new Map();
        categories.forEach(category => {
          if (category.subcategories) {
            category.subcategories.forEach(subcategory => {
              subcategoryToParentMap.set(subcategory.slug, category.slug);
            });
          }
        });
        
        // Categorias para filtrar baseadas nas seleções
        const categoriesToFilter = [...activeFilters.categories];
        
        // Adicionar categorias principais das subcategorias selecionadas
        activeFilters.subcategories.forEach(subcatSlug => {
          const parentCategorySlug = subcategoryToParentMap.get(subcatSlug);
          if (parentCategorySlug && !categoriesToFilter.includes(parentCategorySlug)) {
            categoriesToFilter.push(parentCategorySlug);
          }
        });
        
        // Filtrar produtos pelas categorias principais
        if (categoriesToFilter.length > 0) {
          result = result.filter(product => 
            categoriesToFilter.includes(product.category)
          );
        }
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
          result.sort((a, b) => {
            const idA = typeof a.id === 'string' ? parseInt(a.id.replace(/\D/g, '') || '0') : a.id;
            const idB = typeof b.id === 'string' ? parseInt(b.id.replace(/\D/g, '') || '0') : b.id;
            return idB - idA;
          });
          break;
        default:
          // 'featured' - no sorting needed
          break;
      }
      
      console.log(`Resultados após filtros: ${result.length} produtos`);
      setFilteredProducts(result);
      
      // Resetar para a primeira página quando os filtros mudam
      setCurrentPage(1);
      
      // Calcular o número total de páginas
      setTotalPages(Math.ceil(result.length / itemsPerPage));
    } catch (error) {
      console.error('Erro ao filtrar produtos:', error);
      // Em caso de erro, mostrar todos os produtos
      setFilteredProducts(allProductsData);
      setTotalPages(Math.ceil(allProductsData.length / itemsPerPage));
    }
  }, [activeFilters, categories, allProductsData, itemsPerPage]);
  
  // Atualizar produtos paginados quando a página ou os produtos filtrados mudam
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredProducts.slice(startIndex, endIndex);
    setPaginatedProducts(paginatedItems);
  }, [filteredProducts, currentPage, itemsPerPage]);
  
  // Função para mudar de página
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  // Função para mudar itens por página
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Voltar para primeira página ao mudar quantidade por página
  };
  
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
      subcategories: [],
      priceRange: { min: 0, max: 5000 },
      brands: [],
      ratings: 0,
      sort: 'featured',
    });
    
    // Resetar para a primeira página
    setCurrentPage(1);
  };

  // Renderizar os controles de paginação
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    // Determinar quais páginas mostrar (limitar a 5 botões de página + primeira/última)
    const pageButtons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    // Ajustar startPage se endPage está no limite
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    // Adicionar botão para primeira página
    if (startPage > 1) {
      pageButtons.push(
        <button
          key="first"
          onClick={() => goToPage(1)}
          className={`px-2 sm:px-3 py-1 rounded ${currentPage === 1 ? 'bg-secondary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pageButtons.push(<span key="ellipsis1" className="px-1 sm:px-2">...</span>);
      }
    }
    
    // Adicionar botões para páginas no meio
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`px-2 sm:px-3 py-1 rounded ${currentPage === i ? 'bg-secondary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {i}
        </button>
      );
    }
    
    // Adicionar botão para última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<span key="ellipsis2" className="px-1 sm:px-2">...</span>);
      }
      
      pageButtons.push(
        <button
          key="last"
          onClick={() => goToPage(totalPages)}
          className={`px-2 sm:px-3 py-1 rounded ${currentPage === totalPages ? 'bg-secondary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {totalPages}
        </button>
      );
    }
    
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 bg-white p-4 rounded-lg shadow-sm gap-4">
        <div className="flex items-center">
          <span className="text-sm sm:text-base mr-2 sm:mr-3 text-[rgb(25,25,25)]">Itens por página:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md px-2 py-1 sm:px-3 sm:py-1.5 text-sm text-[rgb(25,25,25)] focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>
        
        <div className="flex items-center justify-center">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 sm:px-3 py-1 rounded mr-1 sm:mr-2 text-sm ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Anterior
          </button>
          
          <div className="flex space-x-1">
            {pageButtons}
          </div>
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-2 sm:px-3 py-1 rounded ml-1 sm:ml-2 text-sm ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Próxima
          </button>
        </div>
        
        <div className="text-sm sm:text-base text-center sm:text-right text-[rgb(25,25,25)]">
          <span className="hidden xs:inline">Mostrando </span>
          <span>{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)} </span>
          <span className="hidden xs:inline">de </span>
          <span className="xs:hidden">/</span>
          <span> {filteredProducts.length} produtos</span>
        </div>
      </div>
    );
  };

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
                  Catálogo Completo de Ferramentas
                </h1>
                <p className="text-[rgb(255,255,255)] max-w-2xl mb-4">
                  Explore nossa seleção expandida com o novo catálogo Geko! Ferramentas profissionais para construção, renovação, jardim e muito mais.
                </p>
                <div className="flex flex-wrap gap-2 text-sm mb-4">
                  <span className="bg-secondary px-3 py-1 rounded-full text-white flex items-center">
                    <FiInfo className="mr-1" /> Total: {regularProductsCount + gekoProductsCount} produtos
                  </span>
                  <span className="bg-primary px-3 py-1 rounded-full text-white flex items-center">
                    <FiInfo className="mr-1" /> Geko: {gekoProductsCount} produtos
                  </span>
                </div>
                <div className="bg-[rgba(255,255,255,0.2)] p-2 rounded-md">
                  <p className="text-sm">
                    Nova coleção com mais de {categoriesCount} categorias incluindo Materiais Abrasivos, Ferramentas Diamantadas, Pneumática e muito mais!
                  </p>
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
            {/* Usando CategorySidebar para navegação em categorias */}
            <CategorySidebar 
              categories={categories} 
              activeCategory={categoryParam || undefined}
            />
            
            <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
              <h3 className="font-semibold mb-4 border-b pb-2">Filtrar Resultados</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Preço</h4>
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
                <h4 className="font-semibold mb-3">Marcas</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
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
              
              {/* Filter by categories for mobile */}
              <div className="mb-6 lg:hidden">
                <h4 className="font-semibold mb-3">Categorias Rápidas</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {productCategories.map((category) => (
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
              
              {/* Clear Filters */}
              <button
                onClick={clearAllFilters}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md text-sm transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </aside>
          
          {/* Product List */}
          <div className="lg:w-3/4">
            {/* Sort and View Options */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col xs:flex-row justify-between items-center gap-3">
              <div className="flex items-center w-full xs:w-auto">
                <span className="text-sm sm:text-base text-[rgb(25,25,25)] mr-2 sm:mr-3">Ordenar por:</span>
                <select
                  value={activeFilters.sort}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-md px-2 py-1 sm:px-3 sm:py-1.5 text-sm text-[rgb(25,25,25)] focus:outline-none focus:ring-2 focus:ring-secondary w-full xs:w-auto"
                >
                  <option value="featured">Destaques</option>
                  <option value="price-low">Preço (Menor - Maior)</option>
                  <option value="price-high">Preço (Maior - Menor)</option>
                  <option value="newest">Novidades</option>
                </select>
              </div>
              
              <div className="flex items-center gap-3 w-full xs:w-auto justify-between xs:justify-start">
                <span className="text-sm sm:text-base text-[rgb(25,25,25)]">{filteredProducts.length} produtos</span>
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 ${viewType === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
                    aria-label="View as grid"
                  >
                    <FiGrid className="text-[rgb(25,25,25)]" />
                  </button>
                  <button
                    onClick={() => setViewType('list')}
                    className={`p-2 ${viewType === 'list' ? 'bg-gray-200' : 'bg-white'}`}
                    aria-label="View as list"
                  >
                    <FiList className="text-[rgb(25,25,25)]" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Pagination - Top */}
            {renderPagination()}
            
            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
                <p className="text-[rgb(140,140,140)] mb-4">
                  Nenhum produto corresponde aos filtros selecionados.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-secondary hover:bg-secondary-dark text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className={viewType === 'grid' 
                ? `grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4` 
                : `space-y-4`}>
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.oldPrice}
                    image={product.image}
                    slug={product.slug}
                    category={product.category}
                    inStock={product.inStock}
                    rating={4.5}
                    isListView={viewType === 'list'}
                    isNew={String(product.id).startsWith('g')}
                  />
                ))}
              </div>
            )}
            
            {/* Pagination - Bottom */}
            {renderPagination()}
          </div>
        </div>
      </div>
    </main>
  );
} 