'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiX, FiShoppingCart, FiTrash2, FiChevronRight } from 'react-icons/fi';
import { useCart, CartItem } from '@/context/CartContext';
import { formatCurrency } from '@/utils/format';

const MiniCart: React.FC = () => {
  const { items, totalPrice, itemCount, isCartOpen, closeCart, removeItem, updateQuantity } = useCart();
  const miniCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Overlay de fundo */}
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeCart}></div>
        
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
          <div className="w-screen max-w-md pointer-events-auto">
            <div ref={miniCartRef} className="flex flex-col h-full bg-white shadow-xl overflow-y-auto">
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                    Carrinho de Compras
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={closeCart}
                    >
                      <span className="sr-only">Fechar painel</span>
                      <FiX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  {items.length > 0 ? (
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {items.map((item) => (
                          <li key={item.id} className="py-6 flex">
                            <div className="relative flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain object-center"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link href={`/produto/${item.id}`} onClick={closeCart} className="hover:text-secondary">
                                      {item.name}
                                    </Link>
                                  </h3>
                                  <p className="ml-4">{formatCurrency(item.price)}</p>
                                </div>
                                {item.originalPrice && (
                                  <p className="mt-1 text-sm text-gray-500 line-through">
                                    {formatCurrency(item.originalPrice)}
                                  </p>
                                )}
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <span className="text-gray-500 mr-2">Qtd:</span>
                                  <div className="flex border border-gray-300 rounded">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (item.quantity > 1) {
                                          updateQuantity(item.id, item.quantity - 1);
                                        }
                                      }}
                                      className="px-2 text-gray-500 hover:bg-gray-100"
                                      disabled={item.quantity <= 1}
                                    >
                                      -
                                    </button>
                                    <span className="w-8 text-center py-1">{item.quantity}</span>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        updateQuantity(item.id, item.quantity + 1);
                                      }}
                                      className="px-2 text-gray-500 hover:bg-gray-100"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                    className="font-medium text-red-600 hover:text-red-500"
                                  >
                                    <FiTrash2 className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Seu carrinho está vazio</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Comece a adicionar produtos ao seu carrinho.
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/produtos"
                          onClick={closeCart}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-opacity-90"
                        >
                          Ver Produtos
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {items.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{formatCurrency(totalPrice)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/carrinho"
                      onClick={closeCart}
                      className="flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-secondary hover:bg-opacity-90"
                    >
                      Finalizar Compra
                      <FiChevronRight className="ml-2" />
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
                    <p>
                      ou{' '}
                      <button
                        type="button"
                        className="text-secondary font-medium hover:text-opacity-80"
                        onClick={closeCart}
                      >
                        Continuar Comprando
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart; 