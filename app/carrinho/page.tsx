'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiTrash2, FiPlus, FiMinus, FiRefreshCw, FiArrowLeft, FiShoppingBag, FiCreditCard, FiUser } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/utils/format';

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [shippingOption, setShippingOption] = useState('standard');
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirecionar para a página inicial se não estiver logado
  useEffect(() => {
    if (!isLoggedIn && !isRedirecting) {
      const timer = setTimeout(() => {
        setIsRedirecting(true);
        // Não vamos redirecionar automaticamente, apenas mostrar uma mensagem
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isRedirecting]);
  
  const shippingCost = items.length > 0 
    ? (shippingOption === 'express' ? 15 : (shippingOption === 'standard' ? 8 : 0)) 
    : 0;
    
  const totalWithShipping = totalPrice + shippingCost;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleCouponApply = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica de aplicação de cupom
    alert(`Cupom "${couponCode}" aplicado com sucesso!`);
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-gray-50 py-20">
        <div className="container-custom max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="w-8 h-8 text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Restrito</h1>
            <p className="text-gray-600 mb-6">
              Para visualizar seu carrinho de compras e realizar pedidos, por favor faça login na sua conta ou crie uma nova.
            </p>
            <div className="space-y-3">
              <Link href="/login">
                <button className="w-full bg-secondary hover:bg-secondary-dark text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors">
                  <FiUser className="w-5 h-5" />
                  <span>Fazer Login</span>
                </button>
              </Link>
              <Link href="/produtos" className="block text-secondary hover:text-secondary-dark font-medium">
                Voltar para Produtos
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Carrinho de Compras</h1>
          <Link 
            href="/produtos" 
            className="flex items-center text-secondary hover:text-secondary-dark font-medium"
          >
            <FiArrowLeft className="mr-2" />
            Continuar Comprando
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Produtos no carrinho */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Itens no Carrinho ({items.length})</h2>
                    <button 
                      onClick={clearCart}
                      className="text-sm text-gray-500 hover:text-red-500 flex items-center"
                    >
                      <FiRefreshCw className="mr-1" size={14} />
                      Limpar Carrinho
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                      <div className="sm:w-24 sm:h-24 h-32 w-full relative mb-4 sm:mb-0">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          fill
                          className="object-contain rounded-md border border-gray-200"
                        />
                      </div>
                      
                      <div className="flex-1 sm:ml-6 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900">
                              <Link href={`/produto/${item.id}`} className="hover:text-secondary">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Preço unitário: {formatCurrency(item.price)}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-medium text-secondary">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                            {item.originalPrice && (
                              <p className="text-xs text-gray-500 line-through">
                                {formatCurrency(item.originalPrice * item.quantity)}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="px-2 py-1 text-gray-600 hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FiMinus size={16} />
                            </button>
                            <span className="px-4 py-1 text-center w-12">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:text-secondary"
                            >
                              <FiPlus size={16} />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
                
                {/* Cupom */}
                <form onSubmit={handleCouponApply} className="mb-6">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Cupom de desconto"
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-secondary"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-secondary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90"
                    >
                      Aplicar
                    </button>
                  </div>
                </form>

                {/* Opções de entrega */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Método de Entrega</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300"
                        value="standard"
                        checked={shippingOption === 'standard'}
                        onChange={() => setShippingOption('standard')}
                      />
                      <span className="ml-3 flex justify-between w-full">
                        <span className="text-sm text-gray-900">Entrega Padrão (2-4 dias)</span>
                        <span className="text-sm font-medium">€8,00</span>
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300"
                        value="express"
                        checked={shippingOption === 'express'}
                        onChange={() => setShippingOption('express')}
                      />
                      <span className="ml-3 flex justify-between w-full">
                        <span className="text-sm text-gray-900">Entrega Express (1-2 dias)</span>
                        <span className="text-sm font-medium">€15,00</span>
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300"
                        value="pickup"
                        checked={shippingOption === 'pickup'}
                        onChange={() => setShippingOption('pickup')}
                      />
                      <span className="ml-3 flex justify-between w-full">
                        <span className="text-sm text-gray-900">Retirar na Loja</span>
                        <span className="text-sm font-medium">Grátis</span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* Totais */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm font-medium">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Entrega</span>
                    <span className="text-sm font-medium">{formatCurrency(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-base font-medium">Total</span>
                    <span className="text-base font-bold text-secondary">{formatCurrency(totalWithShipping)}</span>
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="mt-6 space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full bg-secondary text-white py-3 px-4 rounded-md flex items-center justify-center hover:bg-opacity-90 transition-colors"
                  >
                    <FiCreditCard className="mr-2" />
                    Finalizar Compra
                  </Link>
                  
                  <Link
                    href="/produtos"
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <FiShoppingBag className="mr-2" />
                    Continuar Comprando
                  </Link>
                </div>
                
                <div className="mt-4 text-xs text-gray-500 text-center">
                  <p>Pagamentos processados com segurança</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <span className="px-2 py-1 bg-gray-100 rounded">Visa</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">Mastercard</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">PayPal</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">MB Way</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
              <FiShoppingBag size={96} />
            </div>
            <h2 className="text-2xl font-medium text-gray-900 mb-3">O seu carrinho está vazio</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Parece que você ainda não adicionou nenhum produto ao seu carrinho.
              Explore nossa loja e descubra nossas ofertas!
            </p>
            <Link
              href="/produtos"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-secondary hover:bg-opacity-90"
            >
              Ver Produtos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 