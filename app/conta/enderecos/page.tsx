'use client';

import React, { useState } from 'react';
import UserAccountLayout from '@/components/UserAccountLayout';
import { FiEdit, FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';
import Link from 'next/link';

// Mock de endereços de exemplo
const mockAddresses = [
  {
    id: 1,
    title: 'Casa',
    isDefault: true,
    name: 'João António Silva',
    address: 'Rua Principal, 123, Apt. 4B',
    city: 'Lisboa',
    postalCode: '1000-100',
    country: 'Portugal',
    phone: '+351 912 345 678'
  },
  {
    id: 2,
    title: 'Trabalho',
    isDefault: false,
    name: 'João Silva',
    address: 'Avenida da Liberdade, 432, 5º Andar',
    city: 'Lisboa',
    postalCode: '1250-200',
    country: 'Portugal',
    phone: '+351 912 345 678'
  }
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showForm, setShowForm] = useState(false);

  return (
    <UserAccountLayout title="Meus Endereços" activeTab="enderecos">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600 mb-3 sm:mb-0">
          Gerencie seus endereços para envio de pedidos e recebimento de faturas.
        </p>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-opacity-90"
        >
          <FiPlus className="mr-2" />
          Adicionar Endereço
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Novo Endereço</h3>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título do Endereço
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Ex: Casa, Trabalho"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Rua, número, complemento"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Código Postal
                </label>
                <input
                  type="text"
                  id="postalCode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  País
                </label>
                <select
                  id="country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="Portugal">Portugal</option>
                  <option value="Espanha">Espanha</option>
                  <option value="Brasil">Brasil</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
              
              <div className="sm:col-span-2 flex items-center">
                <input
                  type="checkbox"
                  id="setDefault"
                  className="h-4 w-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                />
                <label htmlFor="setDefault" className="ml-2 block text-sm text-gray-700">
                  Definir como endereço padrão
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-opacity-90"
              >
                Salvar Endereço
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {addresses.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {addresses.map((address) => (
              <div key={address.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold">{address.title}</h3>
                      {address.isDefault && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FiCheck className="mr-1" size={12} />
                          Padrão
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-1">{address.name}</p>
                    <p className="text-gray-600 mb-1">{address.address}</p>
                    <p className="text-gray-600 mb-1">{address.city}, {address.postalCode}</p>
                    <p className="text-gray-600 mb-1">{address.country}</p>
                    <p className="text-gray-600">{address.phone}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-secondary p-1" title="Editar">
                      <FiEdit size={18} />
                    </button>
                    <button className="text-gray-500 hover:text-red-500 p-1" title="Remover">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
                
                {!address.isDefault && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <button className="text-secondary hover:text-secondary-dark text-sm">
                      Definir como endereço padrão
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <FiPlus size={48} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum endereço cadastrado</h3>
            <p className="text-gray-500 mb-6">Adicione endereços para agilizar seu processo de compra.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-opacity-90"
            >
              <FiPlus className="mr-2" />
              Adicionar Endereço
            </button>
          </div>
        )}
      </div>
    </UserAccountLayout>
  );
} 