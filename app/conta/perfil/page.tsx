'use client';

import React from 'react';
import UserAccountLayout from '@/components/UserAccountLayout';
import { FiEdit, FiCamera } from 'react-icons/fi';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <UserAccountLayout title="Meu Perfil" activeTab="perfil">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Perfil Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <div className="relative mb-4 md:mb-0 md:mr-8">
            <div className="w-32 h-32 rounded-full bg-gray-200 relative overflow-hidden">
              <Image 
                src="/images/content/avatar-placeholder.png" 
                alt="Avatar do usuário"
                fill
                className="object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full hover:bg-opacity-90">
              <FiCamera size={16} />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-1">João Silva</h2>
            <p className="text-gray-500 mb-4">joao.silva@example.com</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                Cliente desde 2023
              </span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                5 compras realizadas
              </span>
            </div>
          </div>
        </div>
        
        {/* Informações Pessoais */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Informações Pessoais</h3>
            <button className="text-secondary hover:text-secondary-dark flex items-center">
              <FiEdit size={16} className="mr-1" /> Editar
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Nome Completo</label>
              <p className="font-medium">João António Silva</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <p className="font-medium">joao.silva@example.com</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Telefone</label>
              <p className="font-medium">+351 912 345 678</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Data de Nascimento</label>
              <p className="font-medium">12/04/1985</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">NIF</label>
              <p className="font-medium">123456789</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Género</label>
              <p className="font-medium">Masculino</p>
            </div>
          </div>
        </div>
        
        {/* Endereço Principal */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Endereço Principal</h3>
            <button className="text-secondary hover:text-secondary-dark flex items-center">
              <FiEdit size={16} className="mr-1" /> Editar
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="font-medium mb-1">João António Silva</p>
            <p className="text-gray-600 mb-1">Rua Principal, 123, Apt. 4B</p>
            <p className="text-gray-600 mb-1">Lisboa, 1000-100</p>
            <p className="text-gray-600">Portugal</p>
          </div>
        </div>
        
        {/* Preferências */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Preferências</h3>
            <button className="text-secondary hover:text-secondary-dark flex items-center">
              <FiEdit size={16} className="mr-1" /> Editar
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-gray-100 w-5 h-5 flex items-center justify-center rounded mr-3">
                <div className="bg-secondary w-3 h-3 rounded"></div>
              </div>
              <span>Receber emails sobre novos produtos</span>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 w-5 h-5 flex items-center justify-center rounded mr-3">
                <div className="bg-secondary w-3 h-3 rounded"></div>
              </div>
              <span>Receber emails sobre promoções</span>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-100 w-5 h-5 flex items-center justify-center rounded mr-3">
                <div className="w-3 h-3 rounded"></div>
              </div>
              <span>Receber notificações por SMS</span>
            </div>
          </div>
        </div>
      </div>
    </UserAccountLayout>
  );
} 