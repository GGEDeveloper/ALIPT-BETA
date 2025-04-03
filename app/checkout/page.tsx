'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiCreditCard, FiCheck, FiChevronRight, FiArrowLeft, FiLock, FiUser, FiMapPin, FiTruck, FiPackage } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/utils/format';

type PaymentMethod = 'credit-card' | 'bank-transfer' | 'paypal';
type ShippingMethod = 'standard' | 'express' | 'pickup';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Portugal',
    phone: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const shippingCost = 
    shippingMethod === 'standard' 
      ? 8.99 
      : shippingMethod === 'express' 
        ? 14.99 
        : 0;
  
  const orderTotal = totalPrice + shippingCost;

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login?redirect=checkout');
      return;
    }

    if (items.length === 0 && !orderPlaced) {
      router.push('/carrinho');
    }
  }, [isLoggedIn, items.length, router, orderPlaced]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const goToPayment = () => {
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };

  const goToReview = () => {
    setCurrentStep('review');
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
    window.scrollTo(0, 0);
  };

  const placeOrder = () => {
    // Generate a random order ID
    const newOrderId = 'ORD-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container-custom max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Pedido Realizado com Sucesso!</h1>
            <p className="text-gray-600 mb-6">
              Seu pedido #{orderId} foi confirmado e está sendo processado.
              Enviamos um email com os detalhes da sua compra.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="font-semibold text-lg mb-4">Resumo do Pedido</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Itens:</span>
                <span className="font-medium">{items.length}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">€{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Envio:</span>
                <span className="font-medium">€{formatCurrency(shippingCost)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                <span className="text-gray-800 font-semibold">Total:</span>
                <span className="font-bold text-primary">€{formatCurrency(orderTotal)}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/conta/pedidos" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                <FiPackage className="mr-2" />
                Ver Meus Pedidos
              </Link>
              <Link href="/produtos" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <FiArrowLeft className="mr-2" />
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/carrinho" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <FiArrowLeft className="mr-2" />
            Voltar para o Carrinho
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto z-10 relative ${currentStep === 'shipping' ? 'bg-primary text-white' : 'bg-green-500 text-white'}`}>
                {currentStep === 'shipping' ? '1' : <FiCheck />}
              </div>
              <div className="text-center mt-2 text-sm font-medium">Envio</div>
            </div>
            <div className="flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto z-10 relative ${
                currentStep === 'payment' 
                  ? 'bg-primary text-white' 
                  : currentStep === 'review' || currentStep === 'confirmation' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300 text-gray-500'
              }`}>
                {currentStep === 'payment' ? '2' : currentStep === 'review' || currentStep === 'confirmation' ? <FiCheck /> : '2'}
              </div>
              <div className="text-center mt-2 text-sm font-medium">Pagamento</div>
            </div>
            <div className="flex-1 relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto z-10 relative ${
                currentStep === 'review' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-300 text-gray-500'
              }`}>
                3
              </div>
              <div className="text-center mt-2 text-sm font-medium">Confirmação</div>
            </div>
            
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            {currentStep === 'shipping' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-6 flex items-center">
                  <FiMapPin className="mr-2 text-primary" />
                  Informações de Envio
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        País
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                      >
                        <option value="Portugal">Portugal</option>
                        <option value="Espanha">Espanha</option>
                        <option value="França">França</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>
                
                <h3 className="text-base font-medium mt-8 mb-4 flex items-center">
                  <FiTruck className="mr-2 text-primary" />
                  Método de Entrega
                </h3>
                
                <div className="space-y-3">
                  <label className="block border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="shipping-method"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <div className="ml-6 -mt-4">
                      <span className="block text-sm font-medium text-gray-900">Entrega Padrão (2-4 dias)</span>
                      <span className="mt-1 block text-sm text-gray-500">
                        Entrega em 2 a 4 dias úteis para todo o país
                      </span>
                      <span className="mt-1 block text-sm font-medium text-gray-900">€8,99</span>
                    </div>
                  </label>
                  
                  <label className="block border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="shipping-method"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <div className="ml-6 -mt-4">
                      <span className="block text-sm font-medium text-gray-900">Entrega Expresso (1-2 dias)</span>
                      <span className="mt-1 block text-sm text-gray-500">
                        Entrega rápida com prioridade em 1 a 2 dias úteis
                      </span>
                      <span className="mt-1 block text-sm font-medium text-gray-900">€14,99</span>
                    </div>
                  </label>
                  
                  <label className="block border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="shipping-method"
                      value="pickup"
                      checked={shippingMethod === 'pickup'}
                      onChange={() => setShippingMethod('pickup')}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <div className="ml-6 -mt-4">
                      <span className="block text-sm font-medium text-gray-900">Retirar na Loja</span>
                      <span className="mt-1 block text-sm text-gray-500">
                        Disponível para retirada em 24 horas na nossa loja
                      </span>
                      <span className="mt-1 block text-sm font-medium text-gray-900">Grátis</span>
                    </div>
                  </label>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={goToPayment}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                  >
                    Continuar para Pagamento
                    <FiChevronRight className="ml-2" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Payment Information */}
            {currentStep === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-6 flex items-center">
                  <FiCreditCard className="mr-2 text-primary" />
                  Informações de Pagamento
                </h2>
                
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-4">Método de Pagamento</h3>
                  <div className="space-y-3">
                    <label className="block border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={() => setPaymentMethod('credit-card')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <div className="ml-6 -mt-4">
                        <span className="block text-sm font-medium text-gray-900">Cartão de Crédito/Débito</span>
                        <span className="mt-1 block text-sm text-gray-500">
                          Visa, Mastercard, American Express
                        </span>
                      </div>
                    </label>
                    
                    <label className="block border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="payment-method"
                        value="bank-transfer"
                        checked={paymentMethod === 'bank-transfer'}
                        onChange={() => setPaymentMethod('bank-transfer')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <div className="ml-6 -mt-4">
                        <span className="block text-sm font-medium text-gray-900">Transferência Bancária</span>
                        <span className="mt-1 block text-sm text-gray-500">
                          Pagamento via transferência bancária
                        </span>
                      </div>
                    </label>
                    
                    <label className="block border border-gray-200 rounded-md p-3 cursor-pointer hover:bg-gray-50 transition">
                      <input
                        type="radio"
                        name="payment-method"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <div className="ml-6 -mt-4">
                        <span className="block text-sm font-medium text-gray-900">PayPal</span>
                        <span className="mt-1 block text-sm text-gray-500">
                          Pagamento rápido e seguro via PayPal
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="border-t border-gray-200 pt-6 space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome no Cartão
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Data de Expiração (MM/AA)
                        </label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/AA"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                          CVC/CVV
                        </label>
                        <input
                          type="text"
                          id="cardCvc"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 text-sm text-gray-500">
                      <FiLock className="mr-2 text-gray-400" />
                      <span>Seus dados de pagamento estão seguros e criptografados</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FiArrowLeft className="mr-2" />
                    Voltar
                  </button>
                  
                  <button
                    onClick={goToReview}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
                  >
                    Revisar Pedido
                    <FiChevronRight className="ml-2" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Order Review */}
            {currentStep === 'review' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-6">Revisar Pedido</h2>
                
                <div className="space-y-6 divide-y divide-gray-200">
                  <div className="space-y-3">
                    <h3 className="text-base font-medium flex items-center">
                      <FiUser className="mr-2 text-primary" />
                      Dados Pessoais
                    </h3>
                    <p className="text-sm text-gray-600">{formData.fullName}</p>
                    <p className="text-sm text-gray-600">{formData.email}</p>
                    <p className="text-sm text-gray-600">{formData.phone}</p>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <h3 className="text-base font-medium flex items-center">
                      <FiMapPin className="mr-2 text-primary" />
                      Endereço de Entrega
                    </h3>
                    <p className="text-sm text-gray-600">{formData.address}</p>
                    <p className="text-sm text-gray-600">{formData.city}, {formData.postalCode}</p>
                    <p className="text-sm text-gray-600">{formData.country}</p>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <h3 className="text-base font-medium flex items-center">
                      <FiTruck className="mr-2 text-primary" />
                      Método de Entrega
                    </h3>
                    <p className="text-sm text-gray-600">
                      {shippingMethod === 'standard' && 'Entrega Padrão (2-4 dias úteis)'}
                      {shippingMethod === 'express' && 'Entrega Expresso (1-2 dias úteis)'}
                      {shippingMethod === 'pickup' && 'Retirar na Loja (Disponível em 24 horas)'}
                    </p>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <h3 className="text-base font-medium flex items-center">
                      <FiCreditCard className="mr-2 text-primary" />
                      Método de Pagamento
                    </h3>
                    <p className="text-sm text-gray-600">
                      {paymentMethod === 'credit-card' && 'Cartão de Crédito/Débito'}
                      {paymentMethod === 'bank-transfer' && 'Transferência Bancária'}
                      {paymentMethod === 'paypal' && 'PayPal'}
                    </p>
                    {paymentMethod === 'credit-card' && (
                      <p className="text-sm text-gray-600">
                        **** **** **** {formData.cardNumber.slice(-4)}
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-base font-medium mb-3">Itens do Pedido</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center py-3">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h4>{item.name}</h4>
                                <p className="ml-4">€{formatCurrency(item.price * item.quantity)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Qtd: {item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FiArrowLeft className="mr-2" />
                    Voltar
                  </button>
                  
                  <button
                    onClick={placeOrder}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark"
                  >
                    Finalizar Compra
                    <FiChevronRight className="ml-2" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-6">Resumo do Pedido</h2>
              
              <div className="flow-root mb-6">
                <ul className="-my-4 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3 className="line-clamp-2">{item.name}</h3>
                            <p className="ml-1">€{formatCurrency(item.price * item.quantity)}</p>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">Qtd: {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">€{formatCurrency(totalPrice)}</dd>
                </div>
                
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Envio</dt>
                  <dd className="font-medium text-gray-900">€{formatCurrency(shippingCost)}</dd>
                </div>
                
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">IVA (incluído)</dt>
                  <dd className="font-medium text-gray-900">€{formatCurrency(orderTotal * 0.23)}</dd>
                </div>
                
                <div className="flex justify-between text-base font-medium mt-4 pt-4 border-t border-gray-200">
                  <dt className="text-gray-900">Total</dt>
                  <dd className="text-primary">€{formatCurrency(orderTotal)}</dd>
                </div>
              </div>
              
              <div className="mt-6 text-xs text-gray-500 space-y-2">
                <p className="flex items-center">
                  <FiLock className="mr-1 text-gray-400" /> Pagamento seguro e criptografado
                </p>
                <p>Todos os impostos incluídos no preço final</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 