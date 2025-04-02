'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiEye, FiChevronRight, FiChevronLeft, FiPackage, FiFileText, FiAlertCircle, FiCheck, FiTruck, FiClock } from 'react-icons/fi';

interface ClientePedidosRecentesProps {
  showAllOrders?: boolean;
}

export default function ClientePedidosRecentes({ showAllOrders = false }: ClientePedidosRecentesProps) {
  // Dados de exemplo para pedidos
  const pedidos = [
    {
      id: '12345',
      data: '10/04/2023',
      status: 'Em processamento',
      statusCor: 'bg-yellow-100 text-yellow-800',
      statusIcon: <FiClock className="w-4 h-4" />,
      valorTotal: '€175,50',
      itens: [
        {
          nome: 'Martelo Profissional Stanley',
          quantidade: 1,
          preco: '€29,99',
          imagem: '/images/products/martelo-stanley.jpg',
        },
        {
          nome: 'Furadeira de Impacto Bosch',
          quantidade: 1,
          preco: '€119,99',
          imagem: '/images/products/berbequim-dewalt.jpg',
        },
      ],
    },
    {
      id: '12344',
      data: '05/04/2023',
      status: 'Enviado',
      statusCor: 'bg-blue-100 text-blue-800',
      statusIcon: <FiTruck className="w-4 h-4" />,
      valorTotal: '€45,95',
      itens: [
        {
          nome: 'Jogo de Chaves de Fenda Stanley',
          quantidade: 1,
          preco: '€45,95',
          imagem: '/images/products/chaves-fenda-stanley.jpg',
        },
      ],
    },
    {
      id: '12343',
      data: '28/03/2023',
      status: 'Entregue',
      statusCor: 'bg-green-100 text-green-800',
      statusIcon: <FiCheck className="w-4 h-4" />,
      valorTotal: '€89,90',
      itens: [
        {
          nome: 'Serra Circular Makita',
          quantidade: 1,
          preco: '€89,90',
          imagem: '/images/products/serra-circular-makita.jpg',
        },
      ],
    },
    {
      id: '12342',
      data: '15/03/2023',
      status: 'Entregue',
      statusCor: 'bg-green-100 text-green-800',
      statusIcon: <FiCheck className="w-4 h-4" />,
      valorTotal: '€129,90',
      itens: [
        {
          nome: 'Capacete de Segurança MSA',
          quantidade: 2,
          preco: '€45,90',
          imagem: '/images/products/capacete-msa.jpg',
        },
        {
          nome: 'Kit de Ferramentas Tramontina',
          quantidade: 1,
          preco: '€38,10',
          imagem: '/images/products/kit-ferramentas-tramontina.jpg',
        },
      ],
    },
  ];

  // Filtrar pedidos se não estiver mostrando todos
  const pedidosExibidos = showAllOrders ? pedidos : pedidos.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {showAllOrders ? 'Histórico de Pedidos' : 'Pedidos Recentes'}
          </h2>
          <p className="text-sm text-gray-600">
            {showAllOrders 
              ? 'Todos os seus pedidos realizados' 
              : 'Seus últimos pedidos realizados'
            }
          </p>
        </div>
        {!showAllOrders && (
          <Link href="/minha-conta?page=pedidos" className="text-primary hover:underline text-sm font-medium">
            Ver todos
          </Link>
        )}
      </div>
      
      {pedidosExibidos.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {pedidosExibidos.map((pedido) => (
            <div key={pedido.id} className="p-5 hover:bg-gray-50">
              <div className="mb-4 flex flex-wrap justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-gray-700">Pedido #{pedido.id}</span>
                  <span className="text-sm text-gray-500 ml-4">{pedido.data}</span>
                </div>
                <div className="flex items-center">
                  <span className={`flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${pedido.statusCor}`}>
                    {pedido.statusIcon}
                    <span className="ml-1">{pedido.status}</span>
                  </span>
                  <span className="ml-4 text-base font-semibold text-primary">{pedido.valorTotal}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {pedido.itens.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md overflow-hidden relative border border-gray-200">
                      <Image
                        src={item.imagem}
                        alt={item.nome}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.nome}</p>
                      <p className="text-sm text-gray-500">Qtd: {item.quantidade} × {item.preco}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between">
                <Link
                  href={`/minha-conta/pedidos/${pedido.id}`}
                  className="text-primary hover:underline text-sm font-medium flex items-center"
                >
                  <FiEye className="mr-1" />
                  Ver detalhes
                </Link>
                
                {pedido.status === 'Entregue' && (
                  <Link
                    href={`/minha-conta/pedidos/${pedido.id}/comprar-novamente`}
                    className="text-secondary hover:underline text-sm font-medium"
                  >
                    Comprar novamente
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FiPackage className="text-gray-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido realizado</h3>
          <p className="text-gray-500 mb-4">Você ainda não realizou nenhum pedido em nossa loja.</p>
          <Link href="/produtos" className="bg-primary text-white py-2 px-4 rounded-md inline-block hover:bg-primary-dark">
            Explorar produtos
          </Link>
        </div>
      )}
      
      {showAllOrders && pedidosExibidos.length > 0 && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">1</span> até <span className="font-medium">{pedidosExibidos.length}</span> de <span className="font-medium">{pedidos.length}</span> pedidos
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
      )}
    </div>
  );
} 