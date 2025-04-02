'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiMenu, 
  FiX, 
  FiBell, 
  FiSearch, 
  FiUser, 
  FiLogOut, 
  FiSettings,
  FiMessageSquare,
  FiChevronDown
} from 'react-icons/fi';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

export default function AdminHeader({ toggleSidebar }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left: Logo and Toggle */}
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none mr-4"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          
          <Link href="/admin" className="flex items-center">
            <div className="relative w-32 h-10">
              <Image
                src="/images/content/ALIMAMEDETOOLS_medium.png"
                alt="AliTools Admin"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="ml-2 text-lg font-semibold text-primary">Admin</span>
          </Link>
        </div>
        
        {/* Center: Search (hidden on small screens) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        
        {/* Right: Notifications and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none relative"
            >
              <FiBell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">3</span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-700">Notificações</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1 bg-green-100 rounded-full p-2">
                        <FiShoppingCart className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Novo pedido</p>
                        <p className="text-sm text-gray-600">Pedido #12345 foi efetuado</p>
                        <p className="text-xs text-gray-500 mt-1">há 5 minutos</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1 bg-blue-100 rounded-full p-2">
                        <FiUser className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Novo cliente</p>
                        <p className="text-sm text-gray-600">João Silva criou uma conta</p>
                        <p className="text-xs text-gray-500 mt-1">há 1 hora</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1 bg-yellow-100 rounded-full p-2">
                        <FiAlertCircle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Alerta de estoque</p>
                        <p className="text-sm text-gray-600">Produto "Martelo Profissional" está com estoque baixo</p>
                        <p className="text-xs text-gray-500 mt-1">há 3 horas</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center border-t border-gray-200">
                  <Link href="/admin/notificacoes" className="text-sm text-primary hover:underline">
                    Ver todas notificações
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Messages (icon only) */}
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none">
            <FiMessageSquare className="w-6 h-6" />
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                <Image 
                  src="/images/content/admin-avatar.jpg" 
                  alt="Admin User" 
                  width={32} 
                  height={32}
                  className="object-cover"
                />
              </div>
              <div className="hidden md:block text-left">
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
              <FiChevronDown className="w-4 h-4 text-gray-600" />
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-800">Admin</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <div>
                  <Link 
                    href="/admin/perfil" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiUser className="mr-2" /> Perfil
                  </Link>
                  <Link 
                    href="/admin/configuracoes" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiSettings className="mr-2" /> Configurações
                  </Link>
                  <div className="border-t border-gray-200">
                    <Link 
                      href="/logout" 
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <FiLogOut className="mr-2" /> Sair
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 