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
  FiAlertCircle
} from 'react-icons/fi';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminDashboardCard from '@/components/admin/AdminDashboardCard';
import AdminRecentOrders from '@/components/admin/AdminRecentOrders';
import AdminTopProducts from '@/components/admin/AdminTopProducts';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader toggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Painel de Controle</h1>
            <p className="text-gray-600">Bem-vindo de volta, Administrador</p>
          </div>
          
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          
          {/* Charts & Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Vendas Mensais</h2>
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
                <h2 className="text-xl font-semibold text-gray-800">Categorias Populares</h2>
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