'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiShoppingCart, FiSearch, FiUser, FiHeart, FiPackage, FiMapPin, FiCreditCard, FiSettings, FiLogOut } from 'react-icons/fi';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const { user, isLoggedIn, isAdmin, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para fechar o menu do usuário quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container') && isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
      if (!target.closest('.login-modal') && !target.closest('.login-button') && isLoginModalOpen) {
        setIsLoginModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen, isLoginModalOpen]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempted');
    setIsLoginModalOpen(false);
    
    // Login usando o contexto de autenticação
    login({
      id: 'user-1',
      name: 'João Silva',
      email: 'joao.silva@example.com',
      isAdmin: false
    });
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  // Funções para login de desenvolvimento
  const handleDevUserLogin = () => {
    login({
      id: 'dev-user-1',
      name: 'Cliente Teste',
      email: 'cliente@exemplo.com',
      isAdmin: false
    });
    console.log('Dev User Login: Cliente logado');
    setIsLoginModalOpen(false);
  };

  const handleDevAdminLogin = () => {
    login({
      id: 'dev-admin-1',
      name: 'Admin Teste',
      email: 'admin@exemplo.com',
      isAdmin: true
    });
    console.log('Dev Admin Login: Administrador logado');
    setIsLoginModalOpen(false);
  };

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="hover:text-secondary transition-colors">
            <div className="relative w-72 h-24 md:w-96 md:h-30">
              <Image
                src="/images/content/ALIMAMEDETOOLS_medium.png"
                alt="AliTools Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            <Link href="/produtos" className="hover:text-secondary transition-colors">
              Produtos
            </Link>
            <Link href="/sobre" className="hover:text-secondary transition-colors">
              Sobre
            </Link>
            <Link href="/contato" className="hover:text-secondary transition-colors">
              Contato
            </Link>
            {isAdmin && (
              <Link href="/admin" className="hover:text-secondary transition-colors bg-accent px-3 py-1 rounded-md">
                Admin
              </Link>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button 
                  className="login-button bg-secondary hover:bg-accent text-white px-4 py-2 rounded-md transition-colors"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </button>
                {/* Botões de desenvolvimento para login */}
                <div className="hidden md:flex space-x-2">
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded-md transition-colors"
                    onClick={handleDevUserLogin}
                  >
                    DevLogin-User
                  </button>
                  <button 
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md transition-colors"
                    onClick={handleDevAdminLogin}
                  >
                    DevLogin-Admin
                  </button>
                </div>
              </>
            ) : (
              <div className="relative user-menu-container">
                <button 
                  className="flex items-center space-x-2 hover:text-secondary transition-colors"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <FiUser className="w-5 h-5" />
                  <span className="hidden md:inline">{user?.name}</span>
                  {isAdmin && <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">Admin</span>}
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-gray-500 text-xs">{isAdmin ? 'Administrador' : 'Cliente'}</p>
                    </div>
                    
                    {!isAdmin && (
                      <>
                        <Link href="/conta" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <FiUser className="mr-2" /> Minha Conta
                        </Link>
                        <Link href="/conta/pedidos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <FiPackage className="mr-2" /> Pedidos
                        </Link>
                        <Link href="/conta/favoritos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <FiHeart className="mr-2" /> Favoritos
                        </Link>
                        <Link href="/conta/enderecos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <FiMapPin className="mr-2" /> Endereços
                        </Link>
                      </>
                    )}
                    
                    {isAdmin && (
                      <>
                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <FiSettings className="mr-2" /> Painel Admin
                        </Link>
                        <Link href="/admin/produtos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <FiPackage className="mr-2" /> Gerenciar Produtos
                        </Link>
                        <Link href="/admin/pedidos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <FiShoppingCart className="mr-2" /> Gerenciar Pedidos
                        </Link>
                      </>
                    )}
                    
                    <div className="border-t">
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FiLogOut className="mr-2" /> Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <button className="text-white hover:text-secondary transition-colors" onClick={toggleCart}>
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className="md:hidden text-white hover:text-secondary transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="login-modal bg-white rounded-lg p-8 w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary text-gray-900"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Lembrar-me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-secondary hover:text-accent">
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                >
                  Entrar
                </button>
              </div>
              <div className="mt-3 flex justify-between">
                <button
                  type="button"
                  onClick={handleDevUserLogin}
                  className="flex-1 mr-2 flex justify-center py-2 px-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  DevLogin-User
                </button>
                <button
                  type="button"
                  onClick={handleDevAdminLogin}
                  className="flex-1 ml-2 flex justify-center py-2 px-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  DevLogin-Admin
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-600">Não tem uma conta? </span>
              <a href="#" className="text-sm font-medium text-secondary hover:text-accent">
                Registre-se
              </a>
            </div>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
} 