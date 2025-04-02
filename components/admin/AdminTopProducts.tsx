'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Dados de exemplo para produtos mais vendidos
const topProducts = [
  {
    id: '1',
    name: 'Martelo Profissional Stanley',
    image: '/images/products/martelo-stanley.jpg',
    price: '€29.99',
    sold: 158,
    stock: 42,
  },
  {
    id: '2',
    name: 'Furadeira de Impacto Bosch',
    image: '/images/products/berbequim-dewalt.jpg',
    price: '€119.99',
    sold: 132,
    stock: 35,
  },
  {
    id: '3',
    name: 'Serra Circular Makita',
    image: '/images/products/serra-circular-makita.jpg',
    price: '€189.50',
    sold: 97,
    stock: 18,
  },
  {
    id: '4',
    name: 'Jogo de Chaves de Fenda Stanley',
    image: '/images/products/chaves-fenda-stanley.jpg',
    price: '€45.00',
    sold: 89,
    stock: 24,
  },
  {
    id: '5',
    name: 'Capacete de Segurança MSA',
    image: '/images/products/capacete-msa.jpg',
    price: '€22.95',
    sold: 76,
    stock: 63,
  },
];

export default function AdminTopProducts() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Produtos Mais Vendidos</h2>
          <p className="text-sm text-gray-600">Os 5 produtos com melhor desempenho</p>
        </div>
        <Link href="/admin/relatorios/produtos" className="text-sm text-primary hover:underline">
          Ver Relatório Completo
        </Link>
      </div>
      
      <div className="divide-y divide-gray-200">
        {topProducts.map((product) => (
          <div key={product.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center">
              {/* Product Image */}
              <div className="flex-shrink-0 h-14 w-14 relative rounded overflow-hidden bg-gray-100 border border-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Product Info */}
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                      <Link href={`/admin/produtos/${product.id}`} className="hover:text-primary">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.price} • <span className="text-green-600">{product.sold} vendidos</span>
                    </p>
                  </div>
                  
                  {/* Stock indicator */}
                  <div className="ml-4">
                    <div className="flex items-center">
                      <div className="text-xs text-gray-500 mr-2 whitespace-nowrap">Stock: {product.stock}</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${product.stock > 30 ? 'bg-green-500' : product.stock > 15 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View all products link */}
      <div className="bg-gray-50 px-6 py-3 text-center">
        <Link href="/admin/produtos" className="text-sm font-medium text-primary hover:underline">
          Gerenciar Produtos
        </Link>
      </div>
    </div>
  );
} 