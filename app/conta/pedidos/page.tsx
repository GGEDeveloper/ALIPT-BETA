'use client';

import React from 'react';
import UserAccountLayout from '@/components/UserAccountLayout';
import { FiEye, FiFileText, FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

const mockOrders = [
  {
    id: '1234567',
    date: '12/05/2023',
    total: '€420,00',
    status: 'Entregue',
    items: 3,
    statusIcon: FiCheckCircle,
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: '1234568',
    date: '25/07/2023',
    total: '€185,50',
    status: 'Em transporte',
    items: 2,
    statusIcon: FiTruck,
    statusColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: '1234569',
    date: '02/09/2023',
    total: '€98,75',
    status: 'Em processamento',
    items: 1,
    statusIcon: FiPackage,
    statusColor: 'bg-yellow-100 text-yellow-700'
  },
  {
    id: '1234570',
    date: '18/10/2023',
    total: '€350,00',
    status: 'Entregue',
    items: 2,
    statusIcon: FiCheckCircle,
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: '1234571',
    date: '05/12/2023',
    total: '€1.250,00',
    status: 'Entregue',
    items: 5,
    statusIcon: FiCheckCircle,
    statusColor: 'bg-green-100 text-green-700'
  }
];

export default function OrdersPage() {
  return (
    <UserAccountLayout title="Meus Pedidos" activeTab="pedidos">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Histórico de Pedidos</h1>
          <p className="text-gray-500 text-sm mt-1">Visualize todos os seus pedidos e acompanhe o status de entrega</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nº do Pedido
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Itens
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockOrders.map((order) => {
                const StatusIcon = order.statusIcon;
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="font-medium">{order.total}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.statusColor}`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.items} {order.items > 1 ? 'itens' : 'item'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-3 justify-end">
                        <Link href={`/conta/pedidos/${order.id}`} className="text-secondary hover:text-secondary-dark">
                          <FiEye className="h-5 w-5" />
                        </Link>
                        <Link href={`/conta/pedidos/${order.id}/fatura`} className="text-gray-500 hover:text-gray-700">
                          <FiFileText className="h-5 w-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {mockOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <FiPackage size={96} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
            <p className="text-gray-500 mb-6">Você ainda não realizou nenhum pedido em nossa loja.</p>
            <Link href="/produtos" className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark">
              Explorar produtos
            </Link>
          </div>
        )}
      </div>
    </UserAccountLayout>
  );
} 