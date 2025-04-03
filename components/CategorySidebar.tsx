'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp, FiFilter, FiX } from 'react-icons/fi';
import { getCategoryIconPath } from '@/lib/category-icons-map';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  // Inicializar com a categoria ativa expandida
  useEffect(() => {
    if (activeCategory) {
      // Procurar a categoria principal correspondente ao slug ativo
      const parentCategory = categories.find(cat => 
        cat.slug === activeCategory || 
        cat.subcategories?.some(subcat => subcat.slug === activeCategory)
      );
      
      if (parentCategory) {
        setExpandedCategories(prev => ({
          ...prev,
          [parentCategory.id]: true
        }));
      }
      
      // Marcar categoria ou subcategoria como selecionada
      const isCategoryMain = categories.some(cat => cat.slug === activeCategory);
      if (isCategoryMain) {
        setSelectedCategories([activeCategory]);
      } else {
        const subcategory = categories.flatMap(cat => cat.subcategories || [])
          .find(subcat => subcat.slug === activeCategory);
        
        if (subcategory) {
          setSelectedSubcategories([activeCategory]);
        }
      }
    }
  }, [activeCategory, categories]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };
  
  const toggleCategorySelect = (category: Category, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCategories(prev => [...prev, category.slug]);
      
      // Se a categoria principal for selecionada, não queremos também selecionar as subcategorias
      // para evitar duplicação de filtros
      if (category.subcategories && category.subcategories.length > 0) {
        // Expandir a categoria para mostrar as subcategorias
        setExpandedCategories(prev => ({
          ...prev,
          [category.id]: true,
        }));
      }
    } else {
      setSelectedCategories(prev => prev.filter(slug => slug !== category.slug));
      
      // Se uma categoria principal for desmarcada, também desmarque todas as suas subcategorias
      if (category.subcategories && category.subcategories.length > 0) {
        const subcategorySlugs = category.subcategories.map(subcat => subcat.slug);
        setSelectedSubcategories(prev => 
          prev.filter(slug => !subcategorySlugs.includes(slug))
        );
      }
    }
    
    // Aplicar filtros imediatamente após a mudança
    setTimeout(() => applyFilters(), 0);
  };
  
  const toggleSubcategorySelect = (subcategory: Category, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedSubcategories(prev => [...prev, subcategory.slug]);
    } else {
      setSelectedSubcategories(prev => prev.filter(slug => slug !== subcategory.slug));
    }
    
    // Aplicar filtros imediatamente após a mudança
    setTimeout(() => applyFilters(), 0);
  };
  
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    // Adicionar categorias principais selecionadas
    if (selectedCategories.length > 0) {
      selectedCategories.forEach(cat => {
        params.append('categoria', cat);
      });
    }
    
    // Adicionar subcategorias selecionadas
    if (selectedSubcategories.length > 0) {
      selectedSubcategories.forEach(subcat => {
        params.append('subcategoria', subcat);
      });
    }
    
    // Manter outros parâmetros existentes
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (key !== 'categoria' && key !== 'subcategoria') {
        params.append(key, value);
      }
    }
    
    router.push(`/produtos?${params.toString()}`);
  };
  
  const clearCategoryFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    
    // Remover apenas os parâmetros de categoria da URL
    const params = new URLSearchParams();
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (key !== 'categoria' && key !== 'subcategoria') {
        params.append(key, value);
      }
    }
    
    // Aplicar filtros imediatamente após a limpeza
    router.push(`/produtos?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold text-primary">Categorias</h2>
        {(selectedCategories.length > 0 || selectedSubcategories.length > 0) && (
          <button 
            onClick={clearCategoryFilters}
            className="text-sm text-gray-500 hover:text-red-500 flex items-center"
          >
            <FiX className="mr-1" size={14} />
            Limpar
          </button>
        )}
      </div>
      
      <div className="max-h-[600px] overflow-y-auto pr-2">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id} className="py-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center flex-1">
                  <input
                    type="checkbox"
                    id={`cat-${category.id}`}
                    checked={selectedCategories.includes(category.slug)}
                    onChange={(e) => toggleCategorySelect(category, e)}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label 
                    htmlFor={`cat-${category.id}`}
                    className={`flex items-center cursor-pointer ${
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
                      />
                    </div>
                    <span>{category.name}</span>
                  </label>
                </div>
                
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
                <ul className="ml-8 mt-1 space-y-1">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`subcat-${subcategory.id}`}
                          checked={selectedSubcategories.includes(subcategory.slug)}
                          onChange={(e) => toggleSubcategorySelect(subcategory, e)}
                          className="mr-2 h-3.5 w-3.5 rounded border-gray-300 text-secondary focus:ring-secondary"
                        />
                        <label 
                          htmlFor={`subcat-${subcategory.id}`}
                          className={`flex items-center text-sm cursor-pointer ${
                            activeCategory === subcategory.slug ? 'text-primary font-medium' : 'text-gray-600'
                          }`}
                        >
                          <div className="w-5 h-5 relative mr-2 flex-shrink-0">
                            <Image 
                              src={getCategoryIconPath(subcategory.slug)}
                              alt={subcategory.name}
                              width={18}
                              height={18}
                              className="object-contain"
                            />
                          </div>
                          <span>{subcategory.name}</span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      
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