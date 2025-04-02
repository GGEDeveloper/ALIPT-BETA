'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiUser, 
  FiShoppingBag, 
  FiHeart, 
  FiMapPin, 
  FiCreditCard, 
  FiSettings, 
  FiLogOut, 
  FiChevronRight 
} from 'react-icons/fi';

interface ClienteSidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function ClienteSidebar({ activePage, setActivePage }: ClienteSidebarProps) {
  // Itens do menu da sidebar
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Resumo da Conta',
      icon: <FiUser className="w-5 h-5" />,
    },
    {
      id: 'pedidos',
      title: 'Meus Pedidos',
      icon: <FiShoppingBag className="w-5 h-5" />,
    },
    {
      id: 'favoritos',
      title: 'Lista de Favoritos',
      icon: <FiHeart className="w-5 h-5" />,
    },
    {
      id: 'enderecos',
      title: 'Endereços',
      icon: <FiMapPin className="w-5 h-5" />,
    },
    {
      id: 'pagamentos',
      title: 'Métodos de Pagamento',
      icon: <FiCreditCard className="w-5 h-5" />,
    },
    {
      id: 'configuracoes',
      title: 'Configurações',
      icon: <FiSettings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Perfil do Usuário */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-200 relative overflow-hidden">
              <Image 
                src="/images/content/avatar-default.jpg" 
                alt="Perfil do Cliente" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">João Silva</h3>
            <p className="text-sm text-gray-500">Cliente desde Abril 2023</p>
          </div>
        </div>
      </div>
      
      {/* Menu de Navegação */}
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center py-3 px-4 rounded-md transition-colors ${
                  activePage === item.id
                    ? 'bg-gray-100 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className={`${activePage === item.id ? 'text-primary' : 'text-gray-500'} mr-3`}>
                  {item.icon}
                </span>
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Logout */}
      <div className="p-4 mt-2 border-t border-gray-200">
        <Link 
          href="/logout" 
          className="flex items-center py-2 px-4 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <FiLogOut className="mr-3" />
          <span>Sair da Conta</span>
        </Link>
      </div>
      
      {/* Suporte */}
      <div className="p-6 bg-gray-50 mt-2">
        <h4 className="font-medium text-gray-800 mb-2">Precisa de ajuda?</h4>
        <p className="text-sm text-gray-600 mb-3">Nossa equipe de suporte está disponível para ajudar.</p>
        <Link 
          href="/contato" 
          className="text-primary hover:underline flex items-center text-sm font-medium"
        >
          Fale Conosco
          <FiChevronRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
} 