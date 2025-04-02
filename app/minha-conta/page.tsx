'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiUser, 
  FiShoppingBag, 
  FiHeart, 
  FiMapPin, 
  FiCreditCard, 
  FiSettings, 
  FiLogOut, 
  FiPackage,
  FiBell,
  FiCalendar,
  FiClock,
  FiTruck,
  FiCheck,
  FiAlertCircle,
  FiEdit
} from 'react-icons/fi';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClienteSidebar from '@/components/cliente/ClienteSidebar';
import ClienteResumo from '@/components/cliente/ClienteResumo';
import ClientePedidosRecentes from '@/components/cliente/ClientePedidosRecentes';
import ClienteEnderecos from '@/components/cliente/ClienteEnderecos';

export default function ClienteAreaPage() {
  const [activePage, setActivePage] = useState('dashboard');
  
  // Função para renderizar a página ativa
  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <>
            <ClienteResumo />
            <div className="mt-8">
              <ClientePedidosRecentes />
            </div>
          </>
        );
      case 'pedidos':
        return <ClientePedidosRecentes showAllOrders />;
      case 'favoritos':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Meus Favoritos</h2>
            <p className="text-gray-500">Você ainda não adicionou nenhum produto aos favoritos.</p>
          </div>
        );
      case 'enderecos':
        return <ClienteEnderecos />;
      case 'pagamentos':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Métodos de Pagamento</h2>
            <p className="text-gray-500">Você ainda não tem nenhum método de pagamento salvo.</p>
          </div>
        );
      case 'configuracoes':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Configurações da Conta</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Dados Pessoais</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    defaultValue="João Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    defaultValue="joao.silva@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input 
                    type="tel" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    defaultValue="+351 912 345 678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIF</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    defaultValue="123456789"
                  />
                </div>
              </div>
              <button className="mt-4 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded">
                Salvar Alterações
              </button>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Alterar Senha</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
                  <input 
                    type="password" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                  <input 
                    type="password" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
                  <input 
                    type="password" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                  />
                </div>
              </div>
              <button className="mt-4 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded">
                Alterar Senha
              </button>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Preferências de Notificação</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="notification-orders" 
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="notification-orders">Atualizações de pedidos</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="notification-offers" 
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="notification-offers">Ofertas e promoções</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="notification-newsletter" 
                    className="mr-2"
                    defaultChecked
                  />
                  <label htmlFor="notification-newsletter">Newsletter semanal</label>
                </div>
              </div>
              <button className="mt-4 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded">
                Salvar Preferências
              </button>
            </div>
          </div>
        );
      default:
        return <ClienteResumo />;
    }
  };
  
  return (
    <>
      <Header />
      
      <main className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4">
              <ClienteSidebar 
                activePage={activePage} 
                setActivePage={setActivePage} 
              />
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                  {activePage === 'dashboard' && 'Minha Conta'}
                  {activePage === 'pedidos' && 'Meus Pedidos'}
                  {activePage === 'favoritos' && 'Meus Favoritos'}
                  {activePage === 'enderecos' && 'Meus Endereços'}
                  {activePage === 'pagamentos' && 'Métodos de Pagamento'}
                  {activePage === 'configuracoes' && 'Configurações da Conta'}
                </h1>
                <p className="text-gray-600">
                  Bem-vindo, João Silva
                </p>
              </div>
              
              {renderActivePage()}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
} 