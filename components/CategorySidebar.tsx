'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

type Category = {
  id: string;
  name: string;
  slug: string;
  subcategories?: Category[];
};

type CategorySidebarProps = {
  categories: Category[];
  activeCategory?: string;
};

export default function CategorySidebar({ categories, activeCategory }: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Função para obter o caminho do ícone com base no slug da categoria
  const getCategoryIconPath = (slug: string) => {
    return `/images/icons/categories/${slug}.avif`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-primary border-b pb-2">Categorias</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="py-1">
            <div className="flex items-center justify-between">
              <Link 
                href={`/categoria/${category.slug}`}
                className={`hover:text-primary flex items-center ${
                  activeCategory === category.slug ? 'text-primary font-medium' : 'text-gray-700'
                }`}
              >
                <div className="w-6 h-6 relative mr-2 flex-shrink-0">
                  <Image 
                    src={getCategoryIconPath(category.slug)}
                    alt={category.name}
                    width={24}
                    height={24}
                    className="object-contain"
                    onError={(e) => {
                      // Fallback para evitar erros de imagem
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <span>{category.name}</span>
              </Link>
              {category.subcategories && category.subcategories.length > 0 && (
                <button 
                  onClick={() => toggleCategory(category.id)}
                  className="text-gray-500 hover:text-primary"
                >
                  {expandedCategories[category.id] ? 
                    <FiChevronUp size={18} /> : 
                    <FiChevronDown size={18} />
                  }
                </button>
              )}
            </div>
            {category.subcategories && category.subcategories.length > 0 && expandedCategories[category.id] && (
              <ul className="ml-4 mt-2 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <Link 
                      href={`/categoria/${subcategory.slug}`}
                      className={`text-sm hover:text-primary flex items-center ${
                        activeCategory === subcategory.slug ? 'text-primary font-medium' : 'text-gray-600'
                      }`}
                    >
                      <div className="w-5 h-5 relative mr-2 flex-shrink-0">
                        <Image 
                          src={getCategoryIconPath(subcategory.slug)}
                          alt={subcategory.name}
                          width={20}
                          height={20}
                          className="object-contain"
                          onError={(e) => {
                            // Fallback para evitar erros de imagem
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <span>{subcategory.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      
      <h2 className="text-lg font-semibold mt-8 mb-4 text-primary border-b pb-2">Filtros</h2>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Preço</h3>
        <div className="flex items-center space-x-2">
          <input 
            type="number" 
            placeholder="Min" 
            className="w-20 p-2 border border-gray-300 rounded"
          />
          <span>-</span>
          <input 
            type="number" 
            placeholder="Max" 
            className="w-20 p-2 border border-gray-300 rounded"
          />
          <button className="bg-primary text-white p-2 rounded">
            Ir
          </button>
        </div>
      </div>
      
      {/* Brands */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Marcas</h3>
        <div className="space-y-1">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-700">Stanley</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-700">DeWalt</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-700">Bosch</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-700">Makita</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-700">Milwaukee</span>
          </label>
        </div>
      </div>
      
      {/* Availability */}
      <div>
        <h3 className="font-medium mb-2">Disponibilidade</h3>
        <div className="space-y-1">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-700">Em Stock</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-700">Por Encomenda</span>
          </label>
        </div>
      </div>
    </div>
  );
} 