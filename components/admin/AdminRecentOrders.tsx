'use client';

import React from 'react';
import Link from 'next/link';
import { FiEye, FiEdit2, FiTrash2, FiMoreVertical, FiChevronRight, FiChevronLeft, FiPackage } from 'react-icons/fi';

// Dados de exemplo para pedidos recentes
const recentOrders = [
  {
    id: '8745',
    customer: 'João Silva',
    date: '12/04/2023',
    total: '€245.99',
    status: 'Completo',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    id: '8744',
    customer: 'Ana Oliveira',
    date: '12/04/2023',
    total: '€198.50',
    status: 'Processando',
    statusColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: '8743',
    customer: 'Carlos Santos',
    date: '11/04/2023',
    total: '€654.25',
    status: 'Pendente',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    id: '8742',
    customer: 'Marta Costa',
    date: '11/04/2023',
    total: '€82.00',
    status: 'Cancelado',
    statusColor: 'bg-red-100 text-red-800',
  },
  {
    id: '8741',
    customer: 'Pedro Sousa',
    date: '10/04/2023',
    total: '€187.95',
    status: 'Completo',
    statusColor: 'bg-green-100 text-green-800',
  },
];

export default function AdminRecentOrders() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Pedidos Recentes</h2>
          <p className="text-sm text-gray-600">Lista dos últimos pedidos recebidos</p>
        </div>
        <Link href="/admin/pedidos" className="text-sm text-primary hover:underline">
          Ver Todos
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedido
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
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
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiPackage className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">#{order.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.customer}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{order.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.total}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Link 
                      href={`/admin/pedidos/${order.id}`}
                      className="text-gray-500 hover:text-primary"
                      title="Ver Detalhes"
                    >
                      <FiEye className="w-4 h-4" />
                    </Link>
                    <Link 
                      href={`/admin/pedidos/${order.id}/editar`}
                      className="text-gray-500 hover:text-primary"
                      title="Editar"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <button
                      className="text-gray-500 hover:text-red-600"
                      title="Excluir"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">1</span> até <span className="font-medium">5</span> de <span className="font-medium">42</span> resultados
          </div>
          <div className="flex space-x-2">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <FiChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Próximo
              <FiChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 