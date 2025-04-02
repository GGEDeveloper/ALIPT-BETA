'use client';

import React from 'react';
import UserAccountLayout from '@/components/UserAccountLayout';
import { FiUser, FiPackage, FiHeart, FiMapPin, FiCreditCard, FiChevronRight, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

export default function AccountDashboardPage() {
  return (
    <UserAccountLayout title="Painel de Controle" activeTab="dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resumo de Perfil */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <FiUser className="text-secondary mr-3" size={20} />
              <h3 className="text-lg font-semibold">Informações Pessoais</h3>
            </div>
            <Link href="/conta/perfil" className="text-secondary hover:underline text-sm flex items-center">
              Editar <FiChevronRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            <p><span className="text-gray-500">Nome:</span> João António Silva</p>
            <p><span className="text-gray-500">Email:</span> joao.silva@example.com</p>
            <p><span className="text-gray-500">Telefone:</span> +351 912 345 678</p>
          </div>
        </div>
        
        {/* Pedidos Recentes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <FiPackage className="text-secondary mr-3" size={20} />
              <h3 className="text-lg font-semibold">Pedidos Recentes</h3>
            </div>
            <Link href="/conta/pedidos" className="text-secondary hover:underline text-sm flex items-center">
              Ver todos <FiChevronRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <p className="font-medium">#1234567</p>
                <p className="text-sm text-gray-500">12/05/2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">€420,00</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Entregue
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <p className="font-medium">#1234568</p>
                <p className="text-sm text-gray-500">25/07/2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">€185,50</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Em transporte
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Endereços */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <FiMapPin className="text-secondary mr-3" size={20} />
              <h3 className="text-lg font-semibold">Endereços</h3>
            </div>
            <Link href="/conta/enderecos" className="text-secondary hover:underline text-sm flex items-center">
              Gerenciar <FiChevronRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <div className="border rounded-md p-4 mb-4">
            <div className="flex justify-between">
              <p className="font-medium">Endereço Principal</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Padrão
              </span>
            </div>
            <p className="text-gray-600 mt-2">Rua Principal, 123, Apt. 4B</p>
            <p className="text-gray-600">Lisboa, 1000-100</p>
            <p className="text-gray-600">Portugal</p>
          </div>
        </div>
        
        {/* Favoritos */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <FiHeart className="text-secondary mr-3" size={20} />
              <h3 className="text-lg font-semibold">Favoritos</h3>
            </div>
            <Link href="/conta/favoritos" className="text-secondary hover:underline text-sm flex items-center">
              Ver todos <FiChevronRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <div className="text-center py-4">
            <p className="text-gray-600 mb-2">4 produtos na sua lista de favoritos</p>
            <Link href="/conta/favoritos" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-opacity-90">
              Ver Favoritos
            </Link>
          </div>
        </div>
        
        {/* Métodos de Pagamento */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <FiCreditCard className="text-secondary mr-3" size={20} />
              <h3 className="text-lg font-semibold">Métodos de Pagamento</h3>
            </div>
            <Link href="/conta/pagamentos" className="text-secondary hover:underline text-sm flex items-center">
              Gerenciar <FiChevronRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <div className="flex items-center justify-center py-6 border border-dashed border-gray-300 rounded-md">
            <FiAlertCircle className="text-gray-400 mr-2" size={20} />
            <p className="text-gray-500">Nenhum método de pagamento salvo</p>
          </div>
        </div>
      </div>
    </UserAccountLayout>
  );
} 