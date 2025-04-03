'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiChevronLeft, 
  FiFileText, 
  FiPackage, 
  FiTruck, 
  FiCheckSquare, 
  FiClock,
  FiShoppingCart,
  FiDollarSign,
  FiMail,
  FiPrinter,
  FiCreditCard,
  FiMap,
  FiUser,
  FiDownload
} from 'react-icons/fi';
import UserAccountLayout from '@/components/UserAccountLayout';

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

// Dados de exemplo para um pedido
const mockOrderDetails = {
  id: '1234567',
  date: '12/05/2023',
  status: 'Em transporte',
  statusIcon: FiTruck,
  statusColor: 'bg-blue-100 text-blue-700',
  estimatedDelivery: '15/05/2023',
  customer: {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '912 345 678'
  },
  shippingAddress: {
    street: 'Rua Principal, 123',
    city: 'Lisboa',
    postalCode: '1000-100',
    country: 'Portugal'
  },
  billingAddress: {
    street: 'Rua Principal, 123',
    city: 'Lisboa',
    postalCode: '1000-100',
    country: 'Portugal'
  },
  paymentMethod: 'Cartão de Crédito',
  paymentDetails: '**** **** **** 4567',
  invoice: {
    id: 'FT-2023-0745',
    date: '12/05/2023',
    url: '/faturas/FT-2023-0745.pdf'
  },
  items: [
    {
      id: 'PROD001',
      name: 'Martelo Profissional Stanley FATMAX',
      price: 29.99,
      quantity: 1,
      total: 29.99,
      image: '/images/products/martelo-stanley.jpg'
    },
    {
      id: 'PROD045',
      name: 'Furadeira de Impacto Bosch GSB 13 RE 650W',
      price: 89.99,
      quantity: 1,
      total: 89.99,
      image: '/images/products/berbequim-dewalt.jpg'
    },
    {
      id: 'PROD112',
      name: 'Conjunto de Chaves de Fenda 6 Peças',
      price: 19.99,
      quantity: 2,
      total: 39.98,
      image: '/images/products/chaves-fenda-stanley.jpg'
    }
  ],
  shipping: 5.99,
  discount: 10.00,
  subtotal: 159.96,
  tax: 36.79,
  total: 192.74,
  trackingHistory: [
    {
      date: '12/05/2023',
      time: '09:15',
      status: 'Pedido recebido',
      description: 'Seu pedido foi recebido e está sendo processado.',
      icon: FiShoppingCart,
      iconColor: 'text-blue-500'
    },
    {
      date: '12/05/2023',
      time: '14:30',
      status: 'Pagamento confirmado',
      description: 'O pagamento foi aprovado e confirmado.',
      icon: FiDollarSign,
      iconColor: 'text-green-500'
    },
    {
      date: '13/05/2023',
      time: '10:45',
      status: 'Em preparação',
      description: 'Seu pedido está sendo preparado para envio.',
      icon: FiPackage,
      iconColor: 'text-yellow-500'
    },
    {
      date: '14/05/2023',
      time: '09:20',
      status: 'Enviado',
      description: 'Seu pedido foi enviado e está a caminho.',
      icon: FiTruck,
      iconColor: 'text-purple-500'
    }
  ]
};

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = params;
  const [activeTab, setActiveTab] = useState<'details' | 'tracking'>('details');
  
  // Na prática, aqui buscaria os detalhes do pedido com base no ID
  const order = mockOrderDetails;
  
  const StatusIcon = order.statusIcon;
  
  return (
    <UserAccountLayout title="Detalhes do Pedido" activeTab="pedidos">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Cabeçalho */}
        <div className="border-b border-gray-200">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Link href="/conta/pedidos" className="text-gray-500 hover:text-gray-700 mr-2">
                    <FiChevronLeft className="h-5 w-5" />
                  </Link>
                  <h1 className="text-xl font-semibold text-gray-900">Pedido #{id}</h1>
                </div>
                <p className="text-gray-500 text-sm">Realizado em {order.date}</p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                <Link href={`/conta/pedidos/${id}/fatura`} className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <FiFileText className="mr-2 h-4 w-4" />
                  Ver Fatura
                </Link>
                <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary-dark">
                  <FiShoppingCart className="mr-2 h-4 w-4" />
                  Comprar Novamente
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex items-center">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                <StatusIcon className="mr-1.5 h-4 w-4" />
                {order.status}
              </span>
              {order.status === 'Em transporte' && (
                <span className="ml-4 text-sm text-gray-600">
                  Entrega estimada: <span className="font-medium">{order.estimatedDelivery}</span>
                </span>
              )}
            </div>
          </div>
          
          {/* Abas */}
          <div className="px-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'details'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Detalhes do Pedido
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tracking'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rastreamento
              </button>
            </nav>
          </div>
        </div>
        
        {/* Conteúdo da aba selecionada */}
        <div className="p-6">
          {activeTab === 'details' ? (
            <div>
              {/* Itens do Pedido */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Itens do Pedido</h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-base font-medium text-gray-900">
                          <Link href={`/produto/${item.id.toLowerCase()}`} className="hover:text-primary">
                            {item.name}
                          </Link>
                        </h3>
                        <div className="mt-1 text-sm text-gray-600">
                          <span>Qtd: {item.quantity}</span>
                          <span className="mx-2">|</span>
                          <span>Preço: €{item.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-medium text-gray-900">€{item.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Resumo do Pedido e Informações de Pagamento */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Resumo do Pedido */}
                <div className="lg:col-span-2">
                  <h2 className="text-lg font-medium mb-4">Resumo do Pedido</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flow-root">
                      <dl className="-my-4 text-sm">
                        <div className="py-4 flex justify-between">
                          <dt className="text-gray-600">Subtotal</dt>
                          <dd className="font-medium text-gray-900">€{order.subtotal.toFixed(2)}</dd>
                        </div>
                        <div className="py-4 flex justify-between border-t border-gray-200">
                          <dt className="text-gray-600">Envio</dt>
                          <dd className="font-medium text-gray-900">€{order.shipping.toFixed(2)}</dd>
                        </div>
                        <div className="py-4 flex justify-between border-t border-gray-200">
                          <dt className="text-gray-600">Desconto</dt>
                          <dd className="font-medium text-green-600">-€{order.discount.toFixed(2)}</dd>
                        </div>
                        <div className="py-4 flex justify-between border-t border-gray-200">
                          <dt className="text-gray-600">IVA (23%)</dt>
                          <dd className="font-medium text-gray-900">€{order.tax.toFixed(2)}</dd>
                        </div>
                        <div className="py-4 flex justify-between border-t border-gray-200">
                          <dt className="text-base font-medium text-gray-900">Total</dt>
                          <dd className="text-base font-medium text-gray-900">€{order.total.toFixed(2)}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
                
                {/* Informações de Pagamento e Envio */}
                <div>
                  <h2 className="text-lg font-medium mb-4">Informações</h2>
                  <div className="bg-gray-50 p-6 rounded-lg space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 flex items-center mb-2">
                        <FiCreditCard className="mr-2 h-4 w-4 text-gray-500" />
                        Método de Pagamento
                      </h3>
                      <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                      <p className="text-sm text-gray-600">{order.paymentDetails}</p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center mb-2">
                        <FiMap className="mr-2 h-4 w-4 text-gray-500" />
                        Endereço de Entrega
                      </h3>
                      <address className="not-italic text-sm text-gray-600">
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                        <p>{order.shippingAddress.country}</p>
                      </address>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center mb-2">
                        <FiUser className="mr-2 h-4 w-4 text-gray-500" />
                        Informações de Contato
                      </h3>
                      <p className="text-sm text-gray-600">{order.customer.name}</p>
                      <p className="text-sm text-gray-600">{order.customer.email}</p>
                      <p className="text-sm text-gray-600">{order.customer.phone}</p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center mb-2">
                        <FiFileText className="mr-2 h-4 w-4 text-gray-500" />
                        Fatura
                      </h3>
                      <p className="text-sm text-gray-600">Nº {order.invoice.id}</p>
                      <p className="text-sm text-gray-600">Emitida em {order.invoice.date}</p>
                      <div className="mt-2 flex space-x-2">
                        <Link href={order.invoice.url} className="inline-flex items-center text-xs font-medium text-primary hover:text-primary-dark">
                          <FiDownload className="mr-1 h-3 w-3" />
                          Download
                        </Link>
                        <button className="inline-flex items-center text-xs font-medium text-primary hover:text-primary-dark">
                          <FiPrinter className="mr-1 h-3 w-3" />
                          Imprimir
                        </button>
                        <button className="inline-flex items-center text-xs font-medium text-primary hover:text-primary-dark">
                          <FiMail className="mr-1 h-3 w-3" />
                          Enviar por Email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-medium mb-4">Histórico de Rastreamento</h2>
              <div className="flow-root">
                <ul className="-mb-8">
                  {order.trackingHistory.map((event, eventIdx) => {
                    const Icon = event.icon;
                    return (
                      <li key={eventIdx}>
                        <div className="relative pb-8">
                          {eventIdx !== order.trackingHistory.length - 1 ? (
                            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                          ) : null}
                          <div className="relative flex items-start space-x-4">
                            <div className="relative">
                              <div className={`h-10 w-10 rounded-full bg-white flex items-center justify-center ring-8 ring-white ${event.iconColor}`}>
                                <Icon className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1 py-1.5">
                              <div className="text-sm text-gray-500">
                                <div className="font-medium text-gray-900">{event.status}</div>
                                <span className="mr-2">{event.date}</span>
                                <span className="text-gray-700">{event.time}</span>
                              </div>
                              <div className="mt-1 text-sm text-gray-600">
                                {event.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              {/* Informações de rastreamento da transportadora */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiTruck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Informações de Rastreamento</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>Transportadora: Transportes Rápidos, Lda.</p>
                        <p className="mt-1">Nº de Rastreamento: <span className="font-medium">TR123456789PT</span></p>
                        <a
                          href="https://tracking.example.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          Acompanhar no site da transportadora
                          <svg
                            className="ml-1 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Botões de Ação */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <FiMail className="mr-2 -ml-1 h-4 w-4" />
              Enviar Mensagem
            </button>
            <button className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-secondary-dark">
              <FiPackage className="mr-2 -ml-1 h-4 w-4" />
              Solicitar Devolução
            </button>
          </div>
        </div>
      </div>
    </UserAccountLayout>
  );
} 