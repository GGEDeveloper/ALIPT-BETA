'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { login } = useAuth();

  const handleToggleView = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login logic - simplified for demo
      if (email === 'cliente@exemplo.com' && password === 'senha123') {
        login({
          id: 'user-1',
          name: 'Cliente Teste',
          email: 'cliente@exemplo.com',
          isAdmin: false
        });
        router.push('/');
        return;
      }
      
      if (email === 'admin@exemplo.com' && password === 'admin123') {
        login({
          id: 'admin-1',
          name: 'Admin Teste',
          email: 'admin@exemplo.com',
          isAdmin: true
        });
        router.push('/admin');
        return;
      }
      
      // Development shortcuts
      if (email === 'DevLogin-User' || email === 'DevLogin-Admin') {
        login({
          id: email === 'DevLogin-User' ? 'dev-user-1' : 'dev-admin-1',
          name: email === 'DevLogin-User' ? 'Cliente Teste' : 'Admin Teste',
          email: email === 'DevLogin-User' ? 'cliente@exemplo.com' : 'admin@exemplo.com',
          isAdmin: email === 'DevLogin-Admin'
        });
        router.push(email === 'DevLogin-Admin' ? '/admin' : '/');
        return;
      }
      
      setError('Email ou senha inválidos.');
    } else {
      // Registration logic - simplified for demo
      if (!name.trim()) {
        setError('Por favor, insira seu nome.');
        return;
      }
      
      if (!email.includes('@')) {
        setError('Por favor, insira um email válido.');
        return;
      }
      
      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
      }
      
      // Simulate successful registration
      login({
        id: 'new-user-' + Date.now(),
        name,
        email,
        isAdmin: false
      });
      
      router.push('/');
    }
  };

  // Quick login buttons for development
  const handleDevLogin = (type: 'user' | 'admin') => {
    login({
      id: type === 'user' ? 'dev-user-1' : 'dev-admin-1',
      name: type === 'user' ? 'Cliente Teste' : 'Admin Teste',
      email: type === 'user' ? 'cliente@exemplo.com' : 'admin@exemplo.com',
      isAdmin: type === 'admin'
    });
    router.push(type === 'admin' ? '/admin' : '/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center mb-5 text-gray-600 hover:text-gray-900">
          <FiArrowLeft className="mr-2" />
          <span>Voltar para a loja</span>
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
          {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? 'Novo por aqui?' : 'Já tem uma conta?'}{' '}
          <button
            onClick={handleToggleView}
            className="font-medium text-primary hover:text-primary-dark"
          >
            {isLogin ? 'Crie uma conta' : 'Faça login'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 text-red-700 p-3 rounded border border-red-200">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome completo
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 block w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}
            
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
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 block w-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {isLogin && (
                <div className="text-sm text-right mt-2">
                  <Link href="/esqueci-senha" className="font-medium text-primary hover:text-primary-dark">
                    Esqueceu a senha?
                  </Link>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLogin ? 'Entrar' : 'Cadastrar'}
              </button>
            </div>
          </form>

          {/* Dev Login Section - apenas para desenvolvimento */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Acesso rápido para desenvolvimento</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDevLogin('user')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                DevLogin-User
              </button>
              <button
                onClick={() => handleDevLogin('admin')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                DevLogin-Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 