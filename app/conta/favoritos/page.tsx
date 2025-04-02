'use client';

import React from 'react';
import UserAccountLayout from '@/components/UserAccountLayout';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const mockFavorites = [
  {
    id: 1,
    name: 'Martelo Stanley STHT0-51909',
    price: '€24.99',
    oldPrice: '€29.99',
    image: '/images/products/martelo-stanley.jpg',
    inStock: true,
  },
  {
    id: 2,
    name: 'Serra Circular Bosch GKS 190',
    price: '€129.90',
    oldPrice: '€149.99',
    image: '/images/products/serra-circular-bosch.jpg',
    inStock: true,
  },
  {
    id: 3,
    name: 'Berbequim DeWalt DCD777S2T',
    price: '€189.90',
    oldPrice: '€219.90',
    image: '/images/products/berbequim-dewalt.jpg',
    inStock: false,
  },
  {
    id: 4,
    name: 'Conjunto de Chaves Makita P-90532',
    price: '€45.90',
    oldPrice: '',
    image: '/images/products/chaves-makita.jpg',
    inStock: true,
  },
];

export default function FavoritesPage() {
  return (
    <UserAccountLayout title="Meus Favoritos" activeTab="favoritos">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Lista de Favoritos</h2>
            <p className="text-gray-500 text-sm mt-1">
              {mockFavorites.length} {mockFavorites.length === 1 ? 'produto' : 'produtos'} na sua lista
            </p>
          </div>
          {mockFavorites.length > 0 && (
            <button className="text-sm text-gray-500 hover:text-secondary">
              Limpar todos
            </button>
          )}
        </div>

        {mockFavorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFavorites.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden group relative">
                <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:text-secondary">
                  <FiX size={16} />
                </button>
                
                <Link href={`/produto/${product.id}`}>
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 transition-transform group-hover:scale-105"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link href={`/produto/${product.id}`} className="hover:text-secondary">
                    <h3 className="font-medium mb-2 line-clamp-2">{product.name}</h3>
                  </Link>
                  
                  <div className="flex items-center mb-3">
                    <span className="font-bold text-lg text-secondary">{product.price}</span>
                    {product.oldPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">{product.oldPrice}</span>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    {product.inStock ? (
                      <button className="w-full py-2 bg-secondary text-white rounded flex items-center justify-center hover:bg-opacity-90 transition-colors">
                        <FiShoppingCart className="mr-2" />
                        Adicionar ao Carrinho
                      </button>
                    ) : (
                      <button className="w-full py-2 bg-gray-300 text-gray-700 rounded flex items-center justify-center cursor-not-allowed">
                        Indisponível
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <FiHeart size={96} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sua lista de favoritos está vazia</h3>
            <p className="text-gray-500 mb-6">Adicione produtos à sua lista de favoritos para acompanhar preços e disponibilidade.</p>
            <Link href="/produtos" className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-opacity-90">
              Explorar produtos
            </Link>
          </div>
        )}
      </div>
    </UserAccountLayout>
  );
} 