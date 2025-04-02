'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiUser, 
  FiPackage, 
  FiHeart, 
  FiMapPin, 
  FiCreditCard, 
  FiSettings, 
  FiLogOut,
  FiChevronRight
} from 'react-icons/fi';

interface UserAccountLayoutProps {
  children: ReactNode;
  title: string;
  activeTab?: string;
}

const navigationItems = [
  { id: 'perfil', href: '/conta/perfil', label: 'Meu Perfil', icon: FiUser },
  { id: 'pedidos', href: '/conta/pedidos', label: 'Meus Pedidos', icon: FiPackage },
  { id: 'favoritos', href: '/conta/favoritos', label: 'Meus Favoritos', icon: FiHeart },
  { id: 'enderecos', href: '/conta/enderecos', label: 'Endereços', icon: FiMapPin },
  { id: 'pagamentos', href: '/conta/pagamentos', label: 'Métodos de Pagamento', icon: FiCreditCard },
  { id: 'configuracoes', href: '/conta/configuracoes', label: 'Configurações', icon: FiSettings },
];

export default function UserAccountLayout({ children, title, activeTab }: UserAccountLayoutProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-secondary">
              Home
            </Link>
            <FiChevronRight className="mx-2 h-5 w-5 text-gray-400" />
            <span className="text-gray-700 font-medium">Minha Conta</span>
            {title && (
              <>
                <FiChevronRight className="mx-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-900 font-medium">{title}</span>
              </>
            )}
          </nav>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 bg-primary text-white">
                <h2 className="text-lg font-bold">Minha Conta</h2>
                <p className="text-gray-300 text-sm mt-1">Olá, João Silva</p>
              </div>
              
              <nav className="p-2">
                <ul>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <Link 
                          href={item.href}
                          className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                            isActive(item.href) 
                              ? 'bg-gray-100 text-secondary font-medium' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-secondary' : 'text-gray-500'}`} />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link 
                      href="/"
                      className="flex items-center px-4 py-3 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiLogOut className="mr-3 h-5 w-5 text-gray-500" />
                      Sair
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 