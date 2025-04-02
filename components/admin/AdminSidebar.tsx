'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiGrid, 
  FiPackage, 
  FiShoppingBag, 
  FiUsers, 
  FiSettings, 
  FiTruck, 
  FiPieChart, 
  FiTag, 
  FiList,
  FiMessageSquare,
  FiCreditCard,
  FiAward,
  FiHelpCircle,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';

interface AdminSidebarProps {
  isOpen: boolean;
}

type MenuItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: { title: string; href: string }[];
};

export default function AdminSidebar({ isOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  const menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <FiGrid className="w-5 h-5" />,
    },
    {
      title: 'Produtos',
      href: '/admin/produtos',
      icon: <FiPackage className="w-5 h-5" />,
      submenu: [
        { title: 'Todos os Produtos', href: '/admin/produtos' },
        { title: 'Adicionar Produto', href: '/admin/produtos/adicionar' },
        { title: 'Categorias', href: '/admin/produtos/categorias' },
        { title: 'Atributos', href: '/admin/produtos/atributos' },
      ],
    },
    {
      title: 'Pedidos',
      href: '/admin/pedidos',
      icon: <FiShoppingBag className="w-5 h-5" />,
      submenu: [
        { title: 'Todos os Pedidos', href: '/admin/pedidos' },
        { title: 'Pendentes', href: '/admin/pedidos/pendentes' },
        { title: 'Processando', href: '/admin/pedidos/processando' },
        { title: 'Completos', href: '/admin/pedidos/completos' },
      ],
    },
    {
      title: 'Clientes',
      href: '/admin/clientes',
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      title: 'Cupons',
      href: '/admin/cupons',
      icon: <FiTag className="w-5 h-5" />,
    },
    {
      title: 'Relatórios',
      href: '/admin/relatorios',
      icon: <FiPieChart className="w-5 h-5" />,
      submenu: [
        { title: 'Vendas', href: '/admin/relatorios/vendas' },
        { title: 'Clientes', href: '/admin/relatorios/clientes' },
        { title: 'Produtos', href: '/admin/relatorios/produtos' },
      ],
    },
    {
      title: 'Mensagens',
      href: '/admin/mensagens',
      icon: <FiMessageSquare className="w-5 h-5" />,
    },
    {
      title: 'Configurações',
      href: '/admin/configuracoes',
      icon: <FiSettings className="w-5 h-5" />,
      submenu: [
        { title: 'Geral', href: '/admin/configuracoes' },
        { title: 'Pagamentos', href: '/admin/configuracoes/pagamentos' },
        { title: 'Envio', href: '/admin/configuracoes/envio' },
        { title: 'Usuários', href: '/admin/configuracoes/usuarios' },
      ],
    },
  ];

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside 
      className={`fixed top-16 left-0 bottom-0 bg-white shadow-sm z-40 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } overflow-y-auto`}
    >
      <div className="py-4">
        <nav className="px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.title}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={`w-full flex items-center p-3 rounded-md transition-colors ${
                        pathname?.startsWith(item.href)
                          ? 'bg-gray-100 text-primary'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.icon}
                      {isOpen && (
                        <>
                          <span className="ml-3 flex-1 text-left">{item.title}</span>
                          {openSubmenu === item.title ? (
                            <FiChevronDown className="w-4 h-4" />
                          ) : (
                            <FiChevronRight className="w-4 h-4" />
                          )}
                        </>
                      )}
                    </button>
                    {isOpen && openSubmenu === item.title && (
                      <ul className="mt-1 pl-8 space-y-1">
                        {item.submenu.map((subitem) => (
                          <li key={subitem.title}>
                            <Link
                              href={subitem.href}
                              className={`block p-2 rounded-md text-sm ${
                                isActive(subitem.href)
                                  ? 'bg-gray-100 text-primary'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {subitem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-md transition-colors ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-primary'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    {isOpen && <span className="ml-3">{item.title}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Support and Help Section */}
        {isOpen && (
          <div className="mt-10 px-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-3">Precisa de ajuda?</h4>
              <p className="text-xs text-gray-600 mb-3">
                Acesse nosso centro de ajuda para obter suporte com o painel administrativo.
              </p>
              <Link 
                href="/admin/suporte" 
                className="text-sm text-primary font-medium flex items-center"
              >
                <FiHelpCircle className="mr-2" /> Centro de Ajuda
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
} 