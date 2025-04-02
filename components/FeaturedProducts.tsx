'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { products } from '@/lib/data';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Get featured products (first 8)
  const featuredProducts = products.slice(0, 8);
  
  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeCategory);
  
  // Get unique categories from featured products
  const categories = Array.from(
    new Set(['all', ...featuredProducts.map(product => product.category)])
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Produtos em Destaque</h2>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-secondary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all' ? 'Todos' : category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={parseInt(product.id)}
              name={product.name}
              slug={product.slug}
              price={product.price}
              originalPrice={product.oldPrice}
              image={product.image}
              isNew={product.isNew}
              category={product.category}
              rating={4.5}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/produtos"
            className="inline-flex items-center px-6 py-3 bg-secondary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Ver todos os produtos
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
} 