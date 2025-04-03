'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiEye, 
  FiEdit2, 
  FiTrash2, 
  FiDownload, 
  FiSearch, 
  FiFilter, 
  FiCheck, 
  FiX, 
  FiChevronLeft, 
  FiChevronRight,
  FiClock,
  FiTruck,
  FiPackage,
  FiAlertCircle,
  FiFileText
} from 'react-icons/fi';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

// Dados de exemplo para pedidos
const mockOrders = [
  {
    id: '8745',
    customer: 'João Silva',
    email: 'joao.silva@email.com',
    date: '12/04/2023',
    total: '€245.99',
    status: 'Completo',
    paymentMethod: 'Cartão de Crédito',
    statusColor: 'bg-green-100 text-green-800',
    items: 3,
  },
  {
    id: '8744',
    customer: 'Ana Oliveira',
    email: 'ana.oliveira@email.com',
    date: '12/04/2023',
    total: '€198.50',
    status: 'Processando',
    paymentMethod: 'PayPal',
    statusColor: 'bg-blue-100 text-blue-800',
    items: 2,
  },
  {
    id: '8743',
    customer: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    date: '11/04/2023',
    total: '€654.25',
    status: 'Pendente',
    paymentMethod: 'Transferência Bancária',
    statusColor: 'bg-yellow-100 text-yellow-800',
    items: 5,
  },
  {
    id: '8742',
    customer: 'Marta Costa',
    email: 'marta.costa@email.com',
    date: '11/04/2023',
    total: '€82.00',
    status: 'Cancelado',
    paymentMethod: 'MBWay',
    statusColor: 'bg-red-100 text-red-800',
    items: 1,
  },
  {
    id: '8741',
    customer: 'Pedro Sousa',
    email: 'pedro.sousa@email.com',
    date: '10/04/2023',
    total: '€187.95',
    status: 'Enviado',
    paymentMethod: 'Cartão de Crédito',
    statusColor: 'bg-indigo-100 text-indigo-800',
    items: 2,
  },
  {
    id: '8740',
    customer: 'Sofia Martins',
    email: 'sofia.martins@email.com',
    date: '10/04/2023',
    total: '€345.50',
    status: 'Entregue',
    paymentMethod: 'PayPal',
    statusColor: 'bg-green-100 text-green-800',
    items: 4,
  },
  {
    id: '8739',
    customer: 'Rui Mendes',
    email: 'rui.mendes@email.com',
    date: '09/04/2023',
    total: '€129.99',
    status: 'Processando',
    paymentMethod: 'Multibanco',
    statusColor: 'bg-blue-100 text-blue-800',
    items: 1,
  },
  {
    id: '8738',
    customer: 'Clara Ferreira',
    email: 'clara.ferreira@email.com',
    date: '09/04/2023',
    total: '€523.75',
    status: 'Entregue',
    paymentMethod: 'Cartão de Crédito',
    statusColor: 'bg-green-100 text-green-800',
    items: 3,
  },
  {
    id: '8737',
    customer: 'Hugo Barbosa',
    email: 'hugo.barbosa@email.com',
    date: '08/04/2023',
    total: '€1,245.00',
    status: 'Enviado',
    paymentMethod: 'Transferência Bancária',
    statusColor: 'bg-indigo-100 text-indigo-800',
    items: 7,
  },
  {
    id: '8736',
    customer: 'Beatriz Lima',
    email: 'beatriz.lima@email.com',
    date: '08/04/2023',
    total: '€78.90',
    status: 'Pendente',
    paymentMethod: 'MBWay',
    statusColor: 'bg-yellow-100 text-yellow-800',
    items: 1,
  },
];

export default function AdminOrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    } else {
      setSelectedOrders(prev => [...prev, orderId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleDateFilter = (period: string) => {
    setDateFilter(period);
    setCurrentPage(1);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filtragem e ordenação dos pedidos
  let filteredOrders = [...mockOrders];

  // Aplicar filtro de status
  if (statusFilter !== 'all') {
    filteredOrders = filteredOrders.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase());
  }

  // Aplicar filtro de data (lógica simplificada)
  if (dateFilter !== 'all') {
    // Em uma aplicação real, aqui teria lógica para filtrar por data
    // Para o exemplo, vamos apenas filtrar alguns IDs aleatoriamente
    if (dateFilter === 'today') {
      filteredOrders = filteredOrders.filter(order => order.id > '8740');
    } else if (dateFilter === 'week') {
      filteredOrders = filteredOrders.filter(order => order.id > '8738');
    } else if (dateFilter === 'month') {
      filteredOrders = filteredOrders.filter(order => order.id > '8735');
    }
  }

  // Aplicar pesquisa
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredOrders = filteredOrders.filter(order =>
      order.id.toLowerCase().includes(term) ||
      order.customer.toLowerCase().includes(term) ||
      order.email.toLowerCase().includes(term) ||
      order.status.toLowerCase().includes(term) ||
      order.total.toLowerCase().includes(term)
    );
  }

  // Aplicar ordenação
  filteredOrders.sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'id':
        comparison = a.id.localeCompare(b.id);
        break;
      case 'customer':
        comparison = a.customer.localeCompare(b.customer);
        break;
      case 'date':
        // Para simplicidade, estamos tratando como string, mas idealmente seriam objetos Date
        const dateA = a.date.split('/').reverse().join('-');
        const dateB = b.date.split('/').reverse().join('-');
        comparison = dateA.localeCompare(dateB);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'total':
        // Remover símbolo de moeda e converter para número
        const valueA = parseFloat(a.total.replace('€', '').replace(',', ''));
        const valueB = parseFloat(b.total.replace('€', '').replace(',', ''));
        comparison = valueA - valueB;
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Paginação
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Renderizar status com ícone
  const renderStatus = (status: string, colorClass: string) => {
    let icon;
    
    switch (status.toLowerCase()) {
      case 'pendente':
        icon = <FiClock className="w-4 h-4" />;
        break;
      case 'processando':
        icon = <FiPackage className="w-4 h-4" />;
        break;
      case 'enviado':
        icon = <FiTruck className="w-4 h-4" />;
        break;
      case 'entregue':
      case 'completo':
        icon = <FiCheck className="w-4 h-4" />;
        break;
      case 'cancelado':
        icon = <FiX className="w-4 h-4" />;
        break;
      default:
        icon = <FiAlertCircle className="w-4 h-4" />;
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        {icon}
        <span className="ml-1">{status}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader toggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Gestão de Encomendas</h1>
              <p className="text-gray-600">Gerencie todos os pedidos da sua loja</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <Link 
                href="/admin/pedidos/novo" 
                className="bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary-dark"
              >
                Criar Pedido Manual
              </Link>
              <button 
                className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                <FiDownload className="inline-block mr-1" />
                Exportar
              </button>
            </div>
          </div>
          
          {/* Filtros e Pesquisa */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Pesquisar pedidos por ID, cliente, email..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="relative inline-block text-left">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    value={statusFilter}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                  >
                    <option value="all">Todos os Status</option>
                    <option value="pendente">Pendente</option>
                    <option value="processando">Em Processamento</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregue">Entregue</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
                
                <div className="relative inline-block text-left">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    value={dateFilter}
                    onChange={(e) => handleDateFilter(e.target.value)}
                  >
                    <option value="all">Todas as Datas</option>
                    <option value="today">Hoje</option>
                    <option value="week">Esta Semana</option>
                    <option value="month">Este Mês</option>
                  </select>
                </div>
                
                <button 
                  onClick={() => {
                    setStatusFilter('all');
                    setDateFilter('all');
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>
          
          {/* Lista de Pedidos */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {/* Ações em Massa */}
            {selectedOrders.length > 0 && (
              <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
                <div className="text-sm text-blue-700">
                  <span className="font-medium">{selectedOrders.length}</span> pedidos selecionados
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    onClick={() => {/* Implementar lógica de impressão em massa */}}
                  >
                    Imprimir Faturas
                  </button>
                  <button 
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                    onClick={() => {/* Implementar lógica de atualização em massa */}}
                  >
                    Atualizar Status
                  </button>
                  <button 
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                    onClick={() => {/* Implementar lógica de exclusão em massa */}}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center">
                        <span>ID</span>
                        {sortField === 'id' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('customer')}
                    >
                      <div className="flex items-center">
                        <span>Cliente</span>
                        {sortField === 'customer' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center">
                        <span>Data</span>
                        {sortField === 'date' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('total')}
                    >
                      <div className="flex items-center">
                        <span>Total</span>
                        {sortField === 'total' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        <span>Status</span>
                        {sortField === 'status' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pagamento
                    </th>
                    <th scope="col" className="relative px-4 py-3">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              checked={selectedOrders.includes(order.id)}
                              onChange={() => handleSelectOrder(order.id)}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Link href={`/admin/pedidos/${order.id}`} className="text-primary hover:underline font-medium">
                              #{order.id}
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                            <div className="text-xs text-gray-500">{order.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.total}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {renderStatus(order.status, order.statusColor)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.paymentMethod}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-3 justify-end">
                            <Link href={`/admin/pedidos/${order.id}`} className="text-blue-600 hover:text-blue-800" title="Ver Detalhes">
                              <FiEye className="w-5 h-5" />
                            </Link>
                            <Link href={`/admin/pedidos/${order.id}/editar`} className="text-yellow-600 hover:text-yellow-800" title="Editar">
                              <FiEdit2 className="w-5 h-5" />
                            </Link>
                            <Link href={`/admin/faturas/${order.id}`} className="text-purple-600 hover:text-purple-800" title="Ver Fatura">
                              <FiFileText className="w-5 h-5" />
                            </Link>
                            <button className="text-red-600 hover:text-red-800" title="Excluir">
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                        Nenhum pedido encontrado para os filtros aplicados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Paginação */}
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{indexOfFirstOrder + 1}</span> a <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> de <span className="font-medium">{filteredOrders.length}</span> resultados
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <select
                      className="text-sm border-gray-300 rounded-md"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value={5}>5 por página</option>
                      <option value={10}>10 por página</option>
                      <option value={25}>25 por página</option>
                      <option value={50}>50 por página</option>
                    </select>
                    
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Paginação">
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Anterior</span>
                        <FiChevronLeft className="h-5 w-5" />
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                        let pageNumber;
                        
                        if (totalPages <= 5) {
                          // Se temos 5 ou menos páginas, mostrar todas
                          pageNumber = index + 1;
                        } else if (currentPage <= 3) {
                          // Se estamos nas primeiras 3 páginas
                          pageNumber = index + 1;
                          if (index === 4) pageNumber = totalPages;
                        } else if (currentPage >= totalPages - 2) {
                          // Se estamos nas últimas 3 páginas
                          pageNumber = totalPages - 4 + index;
                        } else {
                          // Se estamos no meio
                          pageNumber = currentPage - 2 + index;
                        }
                        
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNumber
                                ? 'z-10 bg-primary border-primary text-white'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Próxima</span>
                        <FiChevronRight className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-blue-100 text-blue-600">
                  <FiPackage className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total de Pedidos</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{mockOrders.length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-green-100 text-green-600">
                  <FiCheck className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pedidos Concluídos</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {mockOrders.filter(o => o.status === 'Completo' || o.status === 'Entregue').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <FiClock className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Aguardando Processamento</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {mockOrders.filter(o => o.status === 'Pendente' || o.status === 'Processando').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-red-100 text-red-600">
                  <FiX className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pedidos Cancelados</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {mockOrders.filter(o => o.status === 'Cancelado').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 