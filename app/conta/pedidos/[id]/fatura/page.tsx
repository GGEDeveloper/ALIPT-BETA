'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiChevronLeft, 
  FiDownload, 
  FiPrinter, 
  FiMail, 
  FiShare2,
  FiCheck,
  FiFileText
} from 'react-icons/fi';
import UserAccountLayout from '@/components/UserAccountLayout';

interface InvoicePageProps {
  params: {
    id: string;
  };
}

// Dados de exemplo para uma fatura
const mockInvoiceDetails = {
  id: 'FT-2023-0745',
  orderId: '1234567',
  date: '12/05/2023',
  dueDate: '26/05/2023',
  status: 'Paga',
  paidDate: '12/05/2023',
  paymentMethod: 'Cartão de Crédito',
  customer: {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '912 345 678',
    vatNumber: 'PT123456789'
  },
  billingAddress: {
    street: 'Rua Principal, 123',
    city: 'Lisboa',
    postalCode: '1000-100',
    country: 'Portugal'
  },
  company: {
    name: 'ALIPT Tools, Lda.',
    address: 'Avenida da Liberdade, 245',
    city: 'Lisboa',
    postalCode: '1250-143',
    country: 'Portugal',
    vatNumber: 'PT500123456',
    email: 'info@alipttools.pt',
    phone: '213 456 789',
    website: 'www.alipttools.pt',
    logo: '/images/logo.png'
  },
  items: [
    {
      id: 'PROD001',
      name: 'Martelo Profissional Stanley FATMAX',
      description: 'Martelo ergonómico de alta qualidade para uso profissional',
      vatRate: 23,
      price: 24.38,
      quantity: 1,
      vat: 5.61,
      total: 29.99
    },
    {
      id: 'PROD045',
      name: 'Furadeira de Impacto Bosch GSB 13 RE 650W',
      description: 'Furadeira de impacto com potência de 650W para trabalhos em madeira e metal',
      vatRate: 23,
      price: 73.16,
      quantity: 1,
      vat: 16.83,
      total: 89.99
    },
    {
      id: 'PROD112',
      name: 'Conjunto de Chaves de Fenda 6 Peças',
      description: 'Kit com 6 chaves de fenda de diferentes tamanhos',
      vatRate: 23,
      price: 16.25,
      quantity: 2,
      vat: 7.49,
      total: 39.98
    }
  ],
  shipping: {
    method: 'Transportadora Standard',
    cost: 4.87,
    vatRate: 23,
    vat: 1.12,
    total: 5.99
  },
  discount: {
    description: 'Cupom BEMVINDO10',
    amount: 10.00
  },
  totals: {
    subtotal: 159.96,
    discount: 10.00,
    shipping: 5.99,
    vatAmount: 36.79,
    total: 192.74
  },
  notes: 'Agradecemos a sua preferência! Para qualquer questão relacionada com esta fatura, por favor contacte o nosso departamento financeiro através do email financeiro@alipttools.pt ou telefone 213 456 790.'
};

export default function InvoicePage({ params }: InvoicePageProps) {
  const { id } = params;
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Na prática, aqui buscaria os detalhes da fatura com base no ID do pedido
  const invoice = mockInvoiceDetails;
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // Em uma aplicação real, aqui teria a lógica para download do PDF
    alert('Download da fatura em PDF iniciado');
  };
  
  const handleShare = (method: string) => {
    // Em uma aplicação real, aqui teria a lógica para compartilhar
    alert(`Compartilhando fatura via ${method}`);
    setShowShareModal(false);
  };
  
  const handleSendEmail = () => {
    // Em uma aplicação real, aqui teria a lógica para envio de email
    alert(`Email com a fatura enviado para ${invoice.customer.email}`);
  };
  
  return (
    <UserAccountLayout title="Fatura" activeTab="pedidos">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden print:shadow-none print:mt-0">
        {/* Barra de ferramentas - não aparece na impressão */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center print:hidden">
          <div className="flex items-center">
            <Link href={`/conta/pedidos/${invoice.orderId}`} className="text-gray-500 hover:text-gray-700 mr-2">
              <FiChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">Fatura {invoice.id}</h1>
          </div>
          
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <button 
              onClick={handleDownload}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FiDownload className="mr-2 h-4 w-4" />
              Download
            </button>
            <button 
              onClick={handlePrint}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FiPrinter className="mr-2 h-4 w-4" />
              Imprimir
            </button>
            <button 
              onClick={handleSendEmail}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FiMail className="mr-2 h-4 w-4" />
              Email
            </button>
            <button 
              onClick={() => setShowShareModal(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FiShare2 className="mr-2 h-4 w-4" />
              Compartilhar
            </button>
          </div>
        </div>
        
        {/* Conteúdo da Fatura */}
        <div className="p-8">
          {/* Cabeçalho da Fatura */}
          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div className="mb-4 sm:mb-0">
              <div className="relative h-12 w-40 mb-4">
                <Image 
                  src={invoice.company.logo} 
                  alt={invoice.company.name}
                  fill
                  className="object-contain"
                />
              </div>
              
              <h2 className="text-lg font-bold text-gray-900">{invoice.company.name}</h2>
              <address className="not-italic text-sm text-gray-600 mt-2">
                <p>{invoice.company.address}</p>
                <p>{invoice.company.postalCode} {invoice.company.city}</p>
                <p>{invoice.company.country}</p>
                <p className="mt-2">NIF: {invoice.company.vatNumber}</p>
              </address>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Email:</span> {invoice.company.email}
                </p>
                <p>
                  <span className="font-medium">Tel:</span> {invoice.company.phone}
                </p>
                <p>
                  <span className="font-medium">Website:</span> {invoice.company.website}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                <FiCheck className="mr-1.5 h-4 w-4" />
                {invoice.status}
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">FATURA</h1>
              <p className="text-gray-600 mb-4"># {invoice.id}</p>
              
              <div className="text-sm text-gray-600">
                <div className="grid grid-cols-2 gap-x-2">
                  <p className="text-right">Data de Emissão:</p>
                  <p className="text-right font-medium">{invoice.date}</p>
                  <p className="text-right">Data de Vencimento:</p>
                  <p className="text-right font-medium">{invoice.dueDate}</p>
                  {invoice.status === 'Paga' && (
                    <>
                      <p className="text-right">Data de Pagamento:</p>
                      <p className="text-right font-medium">{invoice.paidDate}</p>
                    </>
                  )}
                  <p className="text-right">Referência:</p>
                  <p className="text-right font-medium">Encomenda #{invoice.orderId}</p>
                </div>
              </div>
            </div>
          </div>
          
          <hr className="my-8 border-gray-200" />
          
          {/* Informações do Cliente */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">Faturado a:</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-900">{invoice.customer.name}</p>
              <address className="not-italic text-sm text-gray-600 mt-2">
                <p>{invoice.billingAddress.street}</p>
                <p>{invoice.billingAddress.postalCode} {invoice.billingAddress.city}</p>
                <p>{invoice.billingAddress.country}</p>
                <p className="mt-2">NIF: {invoice.customer.vatNumber}</p>
              </address>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Email:</span> {invoice.customer.email}
                </p>
                <p>
                  <span className="font-medium">Tel:</span> {invoice.customer.phone}
                </p>
              </div>
            </div>
          </div>
          
          {/* Tabela de Itens */}
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qtd.
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço Unit.
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IVA %
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IVA
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                      <div className="text-xs text-gray-500">REF: {item.id}</div>
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-gray-500">
                      €{item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-gray-500">
                      {item.vatRate}%
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-gray-500">
                      €{item.vat.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-right text-sm font-medium text-gray-900">
                      €{item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
                
                {/* Linha de Envio */}
                <tr>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">Envio</div>
                    <div className="text-xs text-gray-500">{invoice.shipping.method}</div>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-500">
                    1
                  </td>
                  <td className="px-4 py-4 text-right text-sm text-gray-500">
                    €{invoice.shipping.cost.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-500">
                    {invoice.shipping.vatRate}%
                  </td>
                  <td className="px-4 py-4 text-right text-sm text-gray-500">
                    €{invoice.shipping.vat.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium text-gray-900">
                    €{invoice.shipping.total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Resumo de Valores */}
          <div className="flex justify-end mb-8">
            <div className="w-full sm:w-80">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flow-root">
                  <dl className="-my-3 text-sm">
                    <div className="py-3 flex justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="font-medium text-gray-900">€{invoice.totals.subtotal.toFixed(2)}</dd>
                    </div>
                    
                    {invoice.discount.amount > 0 && (
                      <div className="py-3 flex justify-between border-t border-gray-200">
                        <dt className="text-gray-600">Desconto ({invoice.discount.description})</dt>
                        <dd className="font-medium text-green-600">-€{invoice.discount.amount.toFixed(2)}</dd>
                      </div>
                    )}
                    
                    <div className="py-3 flex justify-between border-t border-gray-200">
                      <dt className="text-gray-600">Envio</dt>
                      <dd className="font-medium text-gray-900">€{invoice.shipping.total.toFixed(2)}</dd>
                    </div>
                    
                    <div className="py-3 flex justify-between border-t border-gray-200">
                      <dt className="text-gray-600">Total IVA</dt>
                      <dd className="font-medium text-gray-900">€{invoice.totals.vatAmount.toFixed(2)}</dd>
                    </div>
                    
                    <div className="py-3 flex justify-between border-t border-gray-200 text-base">
                      <dt className="font-medium text-gray-900">Total</dt>
                      <dd className="font-bold text-gray-900">€{invoice.totals.total.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          {/* Informações de Pagamento */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">Informações de Pagamento</h2>
            <div className="bg-gray-50 p-4 rounded-lg flex items-start">
              <div className="mr-4 mt-1">
                <FiCreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Método de Pagamento: {invoice.paymentMethod}</p>
                {invoice.status === 'Paga' ? (
                  <p className="text-sm text-green-600 mt-1">Pago em {invoice.paidDate}</p>
                ) : (
                  <p className="text-sm text-yellow-600 mt-1">Pagamento pendente. Data de vencimento: {invoice.dueDate}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Notas */}
          {invoice.notes && (
            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">Notas</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{invoice.notes}</p>
              </div>
            </div>
          )}
          
          {/* Rodapé */}
          <div className="text-center text-xs text-gray-500 mt-12 pt-8 border-t border-gray-200">
            <p>Este documento foi gerado eletronicamente e é válido sem assinatura.</p>
            <p className="mt-1">Processado pelo sistema de faturação ALIPT Tools, certificado pela AT (Nº 0123/AT).</p>
          </div>
        </div>
      </div>
      
      {/* Modal de Compartilhamento */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 print:hidden">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowShareModal(false)}></div>
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative z-10">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Compartilhar Fatura</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleShare('WhatsApp')}
                className="bg-green-500 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-green-600 transition"
              >
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => handleShare('Email')}
                className="bg-blue-500 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
              >
                <span>Email</span>
              </button>
              <button
                onClick={() => handleShare('SMS')}
                className="bg-yellow-500 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-yellow-600 transition"
              >
                <span>SMS</span>
              </button>
              <button
                onClick={() => handleShare('Link')}
                className="bg-purple-500 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-purple-600 transition"
              >
                <span>Copiar Link</span>
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      
      {/* Estilos para impressão */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </UserAccountLayout>
  );
} 