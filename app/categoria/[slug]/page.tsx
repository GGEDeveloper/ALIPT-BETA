import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiFilter, FiChevronRight } from 'react-icons/fi';

import Footer from '@/components/Footer';
import CategorySidebar from '@/components/CategorySidebar';
import ProductGrid from '@/components/ProductGrid';
import { categories, getProductsByCategory } from '@/lib/data';

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
  }[];
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Find the category with the matching slug
  const category = categories.find((c) => c.slug === params.slug);
  
  // If no category found, return 404
  if (!category) {
    notFound();
  }
  
  // Get products in this category
  const categoryProducts = getProductsByCategory(params.slug);

  return (
    <>
      <main className="py-8">
        <div className="container-custom">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 font-heading">{category.name}</h1>
            <nav className="text-sm text-gray-500">
              <ol className="flex items-center flex-wrap">
                <li className="flex items-center">
                  <Link href="/" className="hover:text-primary">Início</Link>
                  <FiChevronRight className="mx-2" />
                </li>
                <li className="flex items-center">
                  <Link href="/produtos" className="hover:text-primary">Produtos</Link>
                  <FiChevronRight className="mx-2" />
                </li>
                <li className="text-gray-800 font-medium">{category.name}</li>
              </ol>
            </nav>
          </div>
          
          {/* Category Description if available */}
          {category.description && (
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700">{category.description}</p>
            </div>
          )}
          
          {/* Mobile Filter Button - only visible on mobile */}
          <div className="lg:hidden mb-6">
            <button className="w-full flex items-center justify-center gap-2 btn btn-outline">
              <FiFilter />
              <span>Filtros</span>
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - hidden on mobile */}
            <div className="lg:w-1/4 hidden lg:block">
              <CategorySidebar 
                categories={categories} 
                activeCategory={category.slug}
              />
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Sort Controls */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    Mostrando <span className="font-semibold">{categoryProducts.length}</span> produtos
                  </div>
                  
                  <div className="flex items-center">
                    <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Ordenar por:</label>
                    <select 
                      id="sort" 
                      className="form-select text-sm py-1 pr-8"
                      defaultValue="featured"
                    >
                      <option value="featured">Relevância</option>
                      <option value="price-asc">Preço (Menor para Maior)</option>
                      <option value="price-desc">Preço (Maior para Menor)</option>
                      <option value="name-asc">Nome (A-Z)</option>
                      <option value="name-desc">Nome (Z-A)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Subcategories if available */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Subcategorias de {category.name}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {category.subcategories.map((subcat) => (
                      <Link 
                        key={subcat.id} 
                        href={`/categoria/${subcat.slug}`}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all"
                      >
                        <div className="font-medium text-gray-800 mb-1">{subcat.name}</div>
                        <div className="text-sm text-gray-500">
                          {/* This would be dynamically calculated in a real app */}
                          {Math.floor(Math.random() * 20) + 1} produtos
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Product Grid */}
              {categoryProducts.length > 0 ? (
                <ProductGrid 
                  products={categoryProducts} 
                  title={`Produtos em ${category.name}`}
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold mb-4">Não encontramos produtos nesta categoria</h3>
                  <p className="text-gray-600 mb-6">
                    Por favor, tente uma categoria diferente ou contacte-nos para informações sobre 
                    disponibilidade de produtos.
                  </p>
                  <Link href="/produtos" className="btn btn-primary">
                    Ver Todos os Produtos
                  </Link>
                </div>
              )}
              
              {/* Pagination - only show if there are products */}
              {categoryProducts.length > 12 && (
                <div className="mt-10 flex justify-center">
                  <nav className="inline-flex rounded-md shadow">
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Anterior
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center border-y border-gray-300 bg-primary px-4 py-2 text-sm font-medium text-white"
                      aria-current="page"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Seguinte
                    </a>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
} 