'use client';

import ProductCard from './ProductCard';
import { FiGrid, FiList } from 'react-icons/fi';
import { useState } from 'react';

type ProductGridProps = {
  products: any[];
  title?: string;
};

export default function ProductGrid({ products, title }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div>
      {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}
      
      {products.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{products.length} produtos encontrados</p>
            <div className="flex space-x-2 items-center">
              <span className="text-sm text-gray-600 mr-2">Ver como:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}
                aria-label="Ver em grelha"
              >
                <FiGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}
                aria-label="Ver em lista"
              >
                <FiList size={18} />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  code={product.code}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  image={product.image}
                  inStock={product.inStock}
                  category={product.category}
                  brand={product.brand}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="card flex flex-col md:flex-row overflow-hidden">
                  <div className="md:w-1/4 relative">
                    <div className="aspect-square relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain p-4 h-full w-full"
                      />
                    </div>
                    {product.oldPrice && (
                      <div className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
                        -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 md:w-3/4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                      <div className="flex justify-between items-center my-2">
                        <span className="text-gray-500">{product.brand}</span>
                        <span className="text-gray-500">Cód: {product.code}</span>
                      </div>
                      <p className="text-gray-600 my-3 line-clamp-2">{product.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-between items-end mt-auto">
                      <div>
                        {product.oldPrice && (
                          <span className="text-gray-500 text-sm line-through mr-2">
                            €{product.oldPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-xl font-bold text-primary">
                          €{product.price.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="mt-2 md:mt-0 flex items-center">
                        {product.inStock ? (
                          <span className="text-green-600 text-sm mr-4">Em Stock</span>
                        ) : (
                          <span className="text-amber-600 text-sm mr-4">Por Encomenda</span>
                        )}
                        <a 
                          href={`/produto/${product.slug}`}
                          className="btn btn-primary"
                        >
                          Ver Detalhes
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {products.length > 12 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="py-2 px-4 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100"
                >
                  Anterior
                </a>
                <a
                  href="#"
                  className="py-2 px-4 bg-primary text-white border border-primary"
                >
                  1
                </a>
                <a
                  href="#"
                  className="py-2 px-4 bg-white border border-gray-300 hover:bg-gray-100"
                >
                  2
                </a>
                <a
                  href="#"
                  className="py-2 px-4 bg-white border border-gray-300 hover:bg-gray-100"
                >
                  3
                </a>
                <a
                  href="#"
                  className="py-2 px-4 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100"
                >
                  Seguinte
                </a>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-500 mb-6">
            Tente ajustar os seus filtros ou faça uma nova pesquisa.
          </p>
          <button 
            onClick={() => window.location.href = '/produtos'}
            className="btn btn-primary"
          >
            Ver Todos os Produtos
          </button>
        </div>
      )}
    </div>
  );
} 