'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiGrid, 
  FiPackage, 
  FiShoppingBag, 
  FiUsers, 
  FiSettings,
  FiDollarSign,
  FiTrendingUp,
  FiBarChart2,
  FiShoppingCart,
  FiAlertCircle,
  FiFileText,
  FiClock,
  FiTruck,
  FiCheck,
  FiTarget,
  FiCalendar,
  FiPercent,
  FiChevronDown
} from 'react-icons/fi';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminDashboardCard from '@/components/admin/AdminDashboardCard';
import AdminRecentOrders from '@/components/admin/AdminRecentOrders';
import AdminTopProducts from '@/components/admin/AdminTopProducts';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader toggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Painel de Controle</h1>
              <p className="text-gray-600">Bem-vindo de volta, Administrador</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="today">Hoje</option>
                  <option value="week">Esta semana</option>
                  <option value="month">Este mês</option>
                  <option value="year">Este ano</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FiChevronDown className="h-4 w-4" />
                </div>
              </div>
              <Link 
                href="/admin/encomendas/relatorios" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FiBarChart2 className="h-4 w-4 mr-2" />
                Relatórios
              </Link>
            </div>
          </div>
          
          {/* Performance Overview */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Performance Geral</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminDashboardCard 
                title="Vendas Totais" 
                value="€8,459.00" 
                change="+12.5%" 
                isPositive={true}
                icon={<FiDollarSign className="text-white" />}
                bgColor="bg-primary"
              />
              <AdminDashboardCard 
                title="Pedidos Novos" 
                value="124" 
                change="+8.2%" 
                isPositive={true}
                icon={<FiShoppingCart className="text-white" />}
                bgColor="bg-secondary"
              />
              <AdminDashboardCard 
                title="Clientes" 
                value="1,893" 
                change="+15.3%" 
                isPositive={true}
                icon={<FiUsers className="text-white" />}
                bgColor="bg-green-500"
              />
              <AdminDashboardCard 
                title="Produtos Baixo Stock" 
                value="12" 
                change="-2" 
                isPositive={false}
                icon={<FiAlertCircle className="text-white" />}
                bgColor="bg-red-500"
              />
            </div>
          </div>
          
          {/* Pedidos e Faturação */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Gestão de Encomendas e Faturação</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminDashboardCard 
                title="Aguardando Envio" 
                value="28" 
                change="+4" 
                isPositive={false}
                icon={<FiClock className="text-white" />}
                bgColor="bg-yellow-500"
              />
              <AdminDashboardCard 
                title="Em Trânsito" 
                value="45" 
                change="+12" 
                isPositive={true}
                icon={<FiTruck className="text-white" />}
                bgColor="bg-blue-500"
              />
              <AdminDashboardCard 
                title="Faturas Pendentes" 
                value="17" 
                change="-3" 
                isPositive={true}
                icon={<FiFileText className="text-white" />}
                bgColor="bg-indigo-500"
              />
              <AdminDashboardCard 
                title="Valor a Receber" 
                value="€4,850.00" 
                change="+€950.00" 
                isPositive={true}
                icon={<FiTarget className="text-white" />}
                bgColor="bg-purple-500"
              />
            </div>
          </div>
          
          {/* Ações Rápidas */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/admin/pedidos" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                  <FiShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Gerir Encomendas</h3>
                <p className="text-sm text-gray-500">Processar e acompanhar pedidos</p>
              </Link>
              
              <Link href="/admin/faturas" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                  <FiFileText className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Faturas</h3>
                <p className="text-sm text-gray-500">Emitir e gerir documentos fiscais</p>
              </Link>
              
              <Link href="/admin/produtos" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                  <FiPackage className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Gerir Produtos</h3>
                <p className="text-sm text-gray-500">Atualizar stock e preços</p>
              </Link>
              
              <Link href="/admin/promocoes" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
                  <FiPercent className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Promoções</h3>
                <p className="text-sm text-gray-500">Criar e gerir descontos</p>
              </Link>
            </div>
          </div>
          
          {/* Charts & Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Vendas Mensais</h2>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>Últimos 30 dias</option>
                  <option>Este mês</option>
                  <option>Este ano</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                <span className="text-gray-500">Gráfico de Vendas (Demo)</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Categorias Populares</h2>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>Últimos 30 dias</option>
                  <option>Este mês</option>
                  <option>Este ano</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                <span className="text-gray-500">Gráfico de Categorias (Demo)</span>
              </div>
            </div>
          </div>
          
          {/* Recent Orders & Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminRecentOrders />
            <AdminTopProducts />
          </div>
        </main>
      </div>
    </div>
  );
} 