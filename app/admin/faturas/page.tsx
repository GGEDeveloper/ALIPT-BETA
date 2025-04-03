'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiEye, 
  FiDownload, 
  FiPrinter, 
  FiSearch, 
  FiFilter, 
  FiChevronLeft, 
  FiChevronRight,
  FiFileText,
  FiCreditCard,
  FiCheck,
  FiX,
  FiAlertCircle,
  FiMail
} from 'react-icons/fi';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

// Dados de exemplo para faturas
const mockInvoices = [
  {
    id: 'FT-2023-0745',
    orderId: '8745',
    customer: 'João Silva',
    email: 'joao.silva@email.com',
    date: '12/04/2023',
    dueDate: '12/05/2023',
    total: '€245.99',
    status: 'Paga',
    statusColor: 'bg-green-100 text-green-800',
    paymentMethod: 'Cartão de Crédito',
    vatNumber: 'PT123456789',
  },
  {
    id: 'FT-2023-0744',
    orderId: '8744',
    customer: 'Ana Oliveira',
    email: 'ana.oliveira@email.com',
    date: '12/04/2023',
    dueDate: '12/05/2023',
    total: '€198.50',
    status: 'Pendente',
    statusColor: 'bg-yellow-100 text-yellow-800',
    paymentMethod: 'PayPal',
    vatNumber: 'PT287654321',
  },
  {
    id: 'FT-2023-0743',
    orderId: '8743',
    customer: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    date: '11/04/2023',
    dueDate: '11/05/2023',
    total: '€654.25',
    status: 'Pendente',
    statusColor: 'bg-yellow-100 text-yellow-800',
    paymentMethod: 'Transferência Bancária',
    vatNumber: 'PT546987123',
  },
  {
    id: 'FT-2023-0742',
    orderId: '8742',
    customer: 'Marta Costa',
    email: 'marta.costa@email.com',
    date: '11/04/2023',
    dueDate: '11/05/2023',
    total: '€82.00',
    status: 'Cancelada',
    statusColor: 'bg-red-100 text-red-800',
    paymentMethod: 'MBWay',
    vatNumber: 'PT321456789',
  },
  {
    id: 'FT-2023-0741',
    orderId: '8741',
    customer: 'Pedro Sousa',
    email: 'pedro.sousa@email.com',
    date: '10/04/2023',
    dueDate: '10/05/2023',
    total: '€187.95',
    status: 'Paga',
    statusColor: 'bg-green-100 text-green-800',
    paymentMethod: 'Cartão de Crédito',
    vatNumber: 'PT789456123',
  },
  {
    id: 'FT-2023-0740',
    orderId: '8740',
    customer: 'Sofia Martins',
    email: 'sofia.martins@email.com',
    date: '10/04/2023',
    dueDate: '10/05/2023',
    total: '€345.50',
    status: 'Paga',
    statusColor: 'bg-green-100 text-green-800',
    paymentMethod: 'PayPal',
    vatNumber: 'PT456123789',
  },
  {
    id: 'FT-2023-0739',
    orderId: '8739',
    customer: 'Rui Mendes',
    email: 'rui.mendes@email.com',
    date: '09/04/2023',
    dueDate: '09/05/2023',
    total: '€129.99',
    status: 'Pendente',
    statusColor: 'bg-yellow-100 text-yellow-800',
    paymentMethod: 'Multibanco',
    vatNumber: 'PT963258741',
  },
  {
    id: 'FT-2023-0738',
    orderId: '8738',
    customer: 'Clara Ferreira',
    email: 'clara.ferreira@email.com',
    date: '09/04/2023',
    dueDate: '09/05/2023',
    total: '€523.75',
    status: 'Paga',
    statusColor: 'bg-green-100 text-green-800',
    paymentMethod: 'Cartão de Crédito',
    vatNumber: 'PT741852963',
  },
];

export default function AdminInvoicesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSelectInvoice = (invoiceId: string) => {
    if (selectedInvoices.includes(invoiceId)) {
      setSelectedInvoices(prev => prev.filter(id => id !== invoiceId));
    } else {
      setSelectedInvoices(prev => [...prev, invoiceId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(invoice => invoice.id));
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

  // Filtragem e ordenação das faturas
  let filteredInvoices = [...mockInvoices];

  // Aplicar filtro de status
  if (statusFilter !== 'all') {
    filteredInvoices = filteredInvoices.filter(invoice => invoice.status.toLowerCase() === statusFilter.toLowerCase());
  }

  // Aplicar filtro de data (lógica simplificada)
  if (dateFilter !== 'all') {
    // Em uma aplicação real, aqui teria lógica para filtrar por data
    if (dateFilter === 'today') {
      filteredInvoices = filteredInvoices.filter(invoice => invoice.id > 'FT-2023-0740');
    } else if (dateFilter === 'week') {
      filteredInvoices = filteredInvoices.filter(invoice => invoice.id > 'FT-2023-0738');
    } else if (dateFilter === 'month') {
      filteredInvoices = filteredInvoices.filter(invoice => invoice.id > 'FT-2023-0730');
    }
  }

  // Aplicar pesquisa
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredInvoices = filteredInvoices.filter(invoice =>
      invoice.id.toLowerCase().includes(term) ||
      invoice.orderId.toLowerCase().includes(term) ||
      invoice.customer.toLowerCase().includes(term) ||
      invoice.email.toLowerCase().includes(term) ||
      invoice.status.toLowerCase().includes(term) ||
      invoice.vatNumber.toLowerCase().includes(term) ||
      invoice.total.toLowerCase().includes(term)
    );
  }

  // Aplicar ordenação
  filteredInvoices.sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'id':
        comparison = a.id.localeCompare(b.id);
        break;
      case 'orderId':
        comparison = a.orderId.localeCompare(b.orderId);
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
      case 'dueDate':
        const dueDateA = a.dueDate.split('/').reverse().join('-');
        const dueDateB = b.dueDate.split('/').reverse().join('-');
        comparison = dueDateA.localeCompare(dueDateB);
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
  const indexOfLastInvoice = currentPage * itemsPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

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
      case 'paga':
        icon = <FiCheck className="w-4 h-4" />;
        break;
      case 'pendente':
        icon = <FiAlertCircle className="w-4 h-4" />;
        break;
      case 'cancelada':
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
              <h1 className="text-2xl font-bold text-gray-800">Gestão de Faturas</h1>
              <p className="text-gray-600">Gerencie todos os documentos fiscais da sua loja</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <Link 
                href="/admin/faturas/nova" 
                className="bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary-dark"
              >
                <FiFileText className="inline-block mr-1" />
                Nova Fatura
              </Link>
              <button 
                className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                <FiDownload className="inline-block mr-1" />
                Exportar
              </button>
            </div>
          </div>
          
          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-purple-100 text-purple-600">
                  <FiFileText className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total de Faturas</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{mockInvoices.length}</div>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Faturas Pagas</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {mockInvoices.filter(i => i.status === 'Paga').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <FiAlertCircle className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Faturas Pendentes</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {mockInvoices.filter(i => i.status === 'Pendente').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <FiCreditCard className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Valor Total</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        €{mockInvoices.reduce((acc, invoice) => {
                          const value = parseFloat(invoice.total.replace('€', '').replace(',', ''));
                          return acc + value;
                        }, 0).toFixed(2)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
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
                  placeholder="Pesquisar faturas por número, cliente, NIF..."
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
                    <option value="paga">Paga</option>
                    <option value="pendente">Pendente</option>
                    <option value="cancelada">Cancelada</option>
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
          
          {/* Lista de Faturas */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {/* Ações em Massa */}
            {selectedInvoices.length > 0 && (
              <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
                <div className="text-sm text-blue-700">
                  <span className="font-medium">{selectedInvoices.length}</span> faturas selecionadas
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    onClick={() => {/* Implementar lógica de impressão em massa */}}
                  >
                    <FiPrinter className="inline-block mr-1" />
                    Imprimir
                  </button>
                  <button 
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
                    onClick={() => {/* Implementar lógica de envio em massa */}}
                  >
                    <FiMail className="inline-block mr-1" />
                    Enviar por Email
                  </button>
                  <button 
                    className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                    onClick={() => {/* Implementar lógica de download em massa */}}
                  >
                    <FiDownload className="inline-block mr-1" />
                    Download
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
                          checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
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
                        <span>Nº Fatura</span>
                        {sortField === 'id' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('orderId')}
                    >
                      <div className="flex items-center">
                        <span>Nº Encomenda</span>
                        {sortField === 'orderId' && (
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
                        <span>Data Emissão</span>
                        {sortField === 'date' && (
                          <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('dueDate')}
                    >
                      <div className="flex items-center">
                        <span>Data Vencimento</span>
                        {sortField === 'dueDate' && (
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
                    <th scope="col" className="relative px-4 py-3">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentInvoices.length > 0 ? (
                    currentInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                              checked={selectedInvoices.includes(invoice.id)}
                              onChange={() => handleSelectInvoice(invoice.id)}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Link href={`/admin/faturas/${invoice.id}`} className="text-primary hover:underline font-medium">
                              {invoice.id}
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Link href={`/admin/pedidos/${invoice.orderId}`} className="text-blue-600 hover:underline">
                            #{invoice.orderId}
                          </Link>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{invoice.customer}</div>
                            <div className="text-xs text-gray-500">{invoice.vatNumber}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.dueDate}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {invoice.total}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {renderStatus(invoice.status, invoice.statusColor)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-3 justify-end">
                            <Link href={`/admin/faturas/${invoice.id}`} className="text-blue-600 hover:text-blue-800" title="Ver Detalhes">
                              <FiEye className="w-5 h-5" />
                            </Link>
                            <button className="text-green-600 hover:text-green-800" title="Download">
                              <FiDownload className="w-5 h-5" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-800" title="Imprimir">
                              <FiPrinter className="w-5 h-5" />
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-800" title="Enviar por Email">
                              <FiMail className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                        Nenhuma fatura encontrada para os filtros aplicados.
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
                    Mostrando <span className="font-medium">{indexOfFirstInvoice + 1}</span> a <span className="font-medium">{Math.min(indexOfLastInvoice, filteredInvoices.length)}</span> de <span className="font-medium">{filteredInvoices.length}</span> resultados
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
        </main>
      </div>
    </div>
  );
} 