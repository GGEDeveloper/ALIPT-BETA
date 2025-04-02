'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FiShoppingBag, 
  FiHeart, 
  FiBox, 
  FiTruck, 
  FiCheck, 
  FiClock, 
  FiAlertTriangle, 
  FiCreditCard
} from 'react-icons/fi';

export default function ClienteResumo() {
  // Dados de exemplo para o resumo
  const resumoData = {
    pedidosTotal: 8,
    pedidosPendentes: 1,
    pedidosEmTransito: 1,
    produtosFavoritos: 12,
    ultimoPedido: {
      id: '12345',
      data: '10/04/2023',
      status: 'Em processamento',
      valorTotal: '€175,50',
    },
  };

  // Cards informativos para o dashboard
  const dashboardCards = [
    {
      title: 'Total de Pedidos',
      value: resumoData.pedidosTotal,
      icon: <FiShoppingBag className="w-5 h-5" />,
      color: 'bg-blue-500',
      link: '/minha-conta?page=pedidos',
    },
    {
      title: 'Pedidos Pendentes',
      value: resumoData.pedidosPendentes,
      icon: <FiClock className="w-5 h-5" />,
      color: 'bg-yellow-500',
      link: '/minha-conta?page=pedidos&status=pendente',
    },
    {
      title: 'Em Trânsito',
      value: resumoData.pedidosEmTransito,
      icon: <FiTruck className="w-5 h-5" />,
      color: 'bg-green-500',
      link: '/minha-conta?page=pedidos&status=transito',
    },
    {
      title: 'Produtos Favoritos',
      value: resumoData.produtosFavoritos,
      icon: <FiHeart className="w-5 h-5" />,
      color: 'bg-red-500',
      link: '/minha-conta?page=favoritos',
    },
  ];

  return (
    <div>
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardCards.map((card, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-sm p-5 flex items-center"
          >
            <div className={`${card.color} rounded-full p-3 text-white mr-4 flex-shrink-0`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-sm text-gray-500">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <Link 
                href={card.link} 
                className="text-xs text-primary hover:underline mt-1 inline-block"
              >
                Ver detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Último Pedido e Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status de Pedido */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Status do Último Pedido</h2>
          
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Pedido #{resumoData.ultimoPedido.id}</span>
              <span className="text-sm text-gray-500">{resumoData.ultimoPedido.data}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-base font-semibold text-primary">{resumoData.ultimoPedido.valorTotal}</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {resumoData.ultimoPedido.status}
              </span>
            </div>
          </div>
          
          {/* Timeline de Status */}
          <div className="relative">
            <div className="absolute left-2.5 h-full w-0.5 bg-gray-200"></div>
            
            <div className="relative flex items-start mb-6">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary flex-shrink-0 z-10">
                <FiCheck className="text-white w-3 h-3" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Pedido Confirmado</h3>
                <p className="text-xs text-gray-500 mt-1">10/04/2023, 14:30</p>
                <p className="text-sm text-gray-600 mt-1">Seu pedido foi recebido e confirmado.</p>
              </div>
            </div>
            
            <div className="relative flex items-start mb-6">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary flex-shrink-0 z-10">
                <FiCheck className="text-white w-3 h-3" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Pagamento Aprovado</h3>
                <p className="text-xs text-gray-500 mt-1">10/04/2023, 14:35</p>
                <p className="text-sm text-gray-600 mt-1">Seu pagamento foi processado e aprovado.</p>
              </div>
            </div>
            
            <div className="relative flex items-start mb-6">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 flex-shrink-0 z-10 animate-pulse">
                <FiBox className="text-white w-3 h-3" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">Em Processamento</h3>
                <p className="text-xs text-gray-500 mt-1">Aguardando</p>
                <p className="text-sm text-gray-600 mt-1">Seu pedido está sendo preparado para envio.</p>
              </div>
            </div>
            
            <div className="relative flex items-start mb-6 opacity-40">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 flex-shrink-0 z-10">
                <FiTruck className="text-white w-3 h-3" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-700">Em Trânsito</h3>
                <p className="text-xs text-gray-500 mt-1">Pendente</p>
                <p className="text-sm text-gray-600 mt-1">Seu pedido está a caminho.</p>
              </div>
            </div>
            
            <div className="relative flex items-start opacity-40">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 flex-shrink-0 z-10">
                <FiCheck className="text-white w-3 h-3" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-700">Entregue</h3>
                <p className="text-xs text-gray-500 mt-1">Pendente</p>
                <p className="text-sm text-gray-600 mt-1">Seu pedido foi entregue com sucesso.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Informações da Conta */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Informações da Conta</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Informações Pessoais</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-900">João Silva</p>
                <p className="text-sm text-gray-600">joao.silva@email.com</p>
                <p className="text-sm text-gray-600">+351 912 345 678</p>
                <Link href="/minha-conta?page=configuracoes" className="text-xs text-primary hover:underline mt-2 inline-block">
                  Editar informações
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Endereço Principal</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-900">Rua das Flores, 123</p>
                <p className="text-sm text-gray-600">Apartamento 4B</p>
                <p className="text-sm text-gray-600">1000-001 Lisboa, Portugal</p>
                <Link href="/minha-conta?page=enderecos" className="text-xs text-primary hover:underline mt-2 inline-block">
                  Gerenciar endereços
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Método de Pagamento Padrão</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center">
                  <FiCreditCard className="text-gray-500 mr-2" />
                  <p className="text-sm text-gray-900">Cartão de Crédito •••• 4567</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">Válido até 06/25</p>
                <Link href="/minha-conta?page=pagamentos" className="text-xs text-primary hover:underline mt-2 inline-block">
                  Gerenciar métodos de pagamento
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 