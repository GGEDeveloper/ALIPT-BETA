'use client';

import React, { useState } from 'react';
import { FiMapPin, FiEdit2, FiTrash2, FiPlus, FiCheck } from 'react-icons/fi';

// Dados de exemplo para endereços
const enderecos = [
  {
    id: 1,
    nome: 'Casa',
    endereco: 'Rua das Flores, 123',
    complemento: 'Apartamento 4B',
    cidade: 'Lisboa',
    codigoPostal: '1000-001',
    pais: 'Portugal',
    telefone: '+351 912 345 678',
    padrao: true,
  },
  {
    id: 2,
    nome: 'Trabalho',
    endereco: 'Avenida da Liberdade, 456',
    complemento: 'Andar 3, Sala 304',
    cidade: 'Lisboa',
    codigoPostal: '1250-096',
    pais: 'Portugal',
    telefone: '+351 965 432 198',
    padrao: false,
  },
];

export default function ClienteEnderecos() {
  const [modalAberto, setModalAberto] = useState(false);
  const [enderecoAtual, setEnderecoAtual] = useState<typeof enderecos[0] | null>(null);
  const [listaEnderecos, setListaEnderecos] = useState(enderecos);
  
  // Abre o modal para adicionar novo endereço
  const abrirModalNovoEndereco = () => {
    setEnderecoAtual(null);
    setModalAberto(true);
  };
  
  // Abre o modal para editar endereço existente
  const abrirModalEditarEndereco = (endereco: typeof enderecos[0]) => {
    setEnderecoAtual(endereco);
    setModalAberto(true);
  };
  
  // Fecha o modal
  const fecharModal = () => {
    setModalAberto(false);
    setEnderecoAtual(null);
  };
  
  // Define endereço como padrão
  const definirEnderecoPadrao = (id: number) => {
    setListaEnderecos(
      listaEnderecos.map((endereco) => ({
        ...endereco,
        padrao: endereco.id === id,
      }))
    );
  };
  
  // Remove endereço
  const removerEndereco = (id: number) => {
    setListaEnderecos(listaEnderecos.filter((endereco) => endereco.id !== id));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Meus Endereços</h2>
        <button
          onClick={abrirModalNovoEndereco}
          className="bg-primary text-white py-2 px-4 rounded-md flex items-center text-sm hover:bg-primary-dark"
        >
          <FiPlus className="mr-2" />
          Adicionar Endereço
        </button>
      </div>
      
      {listaEnderecos.length > 0 ? (
        <div className="p-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {listaEnderecos.map((endereco) => (
            <div 
              key={endereco.id} 
              className={`border rounded-lg p-5 relative ${endereco.padrao ? 'border-primary' : 'border-gray-200'}`}
            >
              {endereco.padrao && (
                <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Padrão
                </div>
              )}
              
              <div className="flex items-start mb-4">
                <FiMapPin className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">{endereco.nome}</h3>
                  <p className="text-gray-600 mt-1">{endereco.endereco}</p>
                  {endereco.complemento && (
                    <p className="text-gray-600">{endereco.complemento}</p>
                  )}
                  <p className="text-gray-600">
                    {endereco.cidade}, {endereco.codigoPostal}
                  </p>
                  <p className="text-gray-600">{endereco.pais}</p>
                  <p className="text-gray-600 mt-1">{endereco.telefone}</p>
                </div>
              </div>
              
              <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                {!endereco.padrao && (
                  <button
                    onClick={() => definirEnderecoPadrao(endereco.id)}
                    className="text-primary text-sm font-medium flex items-center mr-6 hover:underline"
                  >
                    <FiCheck className="mr-1" />
                    Definir como padrão
                  </button>
                )}
                
                <button
                  onClick={() => abrirModalEditarEndereco(endereco)}
                  className="text-gray-600 text-sm font-medium flex items-center mr-6 hover:text-primary"
                >
                  <FiEdit2 className="mr-1" />
                  Editar
                </button>
                
                {!endereco.padrao && (
                  <button
                    onClick={() => removerEndereco(endereco.id)}
                    className="text-red-600 text-sm font-medium flex items-center hover:underline"
                  >
                    <FiTrash2 className="mr-1" />
                    Remover
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <FiMapPin className="text-gray-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum endereço cadastrado</h3>
          <p className="text-gray-500 mb-4">Adicione um endereço para facilitar suas compras futuras.</p>
          <button
            onClick={abrirModalNovoEndereco}
            className="bg-primary text-white py-2 px-4 rounded-md inline-flex items-center hover:bg-primary-dark"
          >
            <FiPlus className="mr-2" />
            Adicionar Endereço
          </button>
        </div>
      )}
      
      {/* Modal de Edição/Adição de Endereço */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-6">
              {enderecoAtual ? 'Editar Endereço' : 'Adicionar Endereço'}
            </h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Endereço
                </label>
                <input
                  type="text"
                  id="nome"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Casa, Trabalho"
                  defaultValue={enderecoAtual?.nome}
                />
              </div>
              
              <div>
                <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  id="endereco"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Rua, Número"
                  defaultValue={enderecoAtual?.endereco}
                />
              </div>
              
              <div>
                <label htmlFor="complemento" className="block text-sm font-medium text-gray-700 mb-1">
                  Complemento (opcional)
                </label>
                <input
                  type="text"
                  id="complemento"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Apartamento, Sala, etc."
                  defaultValue={enderecoAtual?.complemento}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={enderecoAtual?.cidade}
                  />
                </div>
                
                <div>
                  <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    id="codigoPostal"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={enderecoAtual?.codigoPostal}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="pais" className="block text-sm font-medium text-gray-700 mb-1">
                  País
                </label>
                <select
                  id="pais"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={enderecoAtual?.pais || 'Portugal'}
                >
                  <option value="Portugal">Portugal</option>
                  <option value="Espanha">Espanha</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="+351 900 000 000"
                  defaultValue={enderecoAtual?.telefone}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="padrao"
                  className="mr-2"
                  defaultChecked={enderecoAtual?.padrao}
                />
                <label htmlFor="padrao" className="text-sm text-gray-700">
                  Definir como endereço padrão
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={fecharModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  {enderecoAtual ? 'Salvar Alterações' : 'Adicionar Endereço'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 