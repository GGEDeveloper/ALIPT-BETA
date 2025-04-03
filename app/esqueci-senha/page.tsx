'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Por favor, insira seu email.');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, insira um email válido.');
      return;
    }
    
    // Simular envio de email de recuperação
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/login" className="flex items-center justify-center mb-5 text-gray-600 hover:text-gray-900">
          <FiArrowLeft className="mr-2" />
          <span>Voltar para login</span>
        </Link>
        
        <Link href="/" className="flex justify-center">
          <Image 
            src="/images/logo.png" 
            alt="ALIPT Tools" 
            width={150} 
            height={50}
            className="mb-5"
          />
        </Link>
        
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Recuperação de Senha
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Digite seu email e enviaremos instruções para redefinir sua senha.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSubmitted ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <FiCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Email Enviado</h3>
              <p className="mt-1 text-sm text-gray-500">
                Enviamos um email para <strong>{email}</strong> com instruções para redefinir sua senha.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Não recebeu o email? Verifique sua pasta de spam ou{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="font-medium text-primary hover:text-primary-dark"
                >
                  tente novamente
                </button>.
              </p>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Voltar para login
                </Link>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 bg-red-50 text-red-700 p-3 rounded border border-red-200">
                  {error}
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 block w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Enviar instruções
                  </button>
                </div>
                
                <div className="text-sm text-center">
                  <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
                    Lembrou da senha? Faça login
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 