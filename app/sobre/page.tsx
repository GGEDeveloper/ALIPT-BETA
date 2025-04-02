import Link from 'next/link';
import Image from 'next/image';
import { FiChevronRight, FiAward, FiUsers, FiCheck } from 'react-icons/fi';

import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4 font-heading">Sobre a Alimamedetools</h1>
              <p className="text-lg mb-0">
                Fornecemos ferramentas e equipamentos de alta qualidade para profissionais há mais de 15 anos.
              </p>
            </div>
          </div>
        </section>
        
        {/* Breadcrumbs */}
        <div className="bg-gray-100 py-4">
          <div className="container-custom">
            <nav className="text-sm text-gray-500">
              <ol className="flex items-center flex-wrap">
                <li className="flex items-center">
                  <Link href="/" className="hover:text-primary">Início</Link>
                  <FiChevronRight className="mx-2" />
                </li>
                <li className="text-gray-800 font-medium">Sobre Nós</li>
              </ol>
            </nav>
          </div>
        </div>
        
        {/* Company Overview */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <div className="bg-gray-200 rounded-lg overflow-hidden aspect-video">
                  {/* Placeholder for company image */}
                  <div className="h-full w-full flex items-center justify-center bg-gray-300">
                    <span className="text-lg font-bold text-gray-500">Imagem da Empresa</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 font-heading">A Nossa História</h2>
                <p className="text-gray-600 mb-4">
                  Fundada em 2008, a Alimamedetools nasceu da paixão por oferecer ferramentas de qualidade para o mercado português. 
                  Começámos como uma pequena loja familiar e hoje somos uma referência no setor de equipamentos para construção, agricultura e indústria.
                </p>
                <p className="text-gray-600 mb-6">
                  A nossa missão é fornecer as melhores ferramentas e equipamentos aos profissionais, 
                  garantindo qualidade, durabilidade e atendimento personalizado. Estamos comprometidos com a satisfação dos nossos clientes, 
                  oferecendo produtos de marcas reconhecidas e assistência técnica especializada.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <FiCheck className="text-primary" />
                    </div>
                    <span className="text-gray-700">Atendimento personalizado</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <FiCheck className="text-primary" />
                    </div>
                    <span className="text-gray-700">Assistência técnica</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <FiCheck className="text-primary" />
                    </div>
                    <span className="text-gray-700">Produtos certificados</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <FiCheck className="text-primary" />
                    </div>
                    <span className="text-gray-700">Entrega em todo o país</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Statistics */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-gray-700">Anos de Experiência</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-primary mb-2">5.000+</div>
                <div className="text-gray-700">Clientes Satisfeitos</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-primary mb-2">15.000+</div>
                <div className="text-gray-700">Produtos Entregues</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <div className="text-gray-700">Marcas Parceiras</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center font-heading">Os Nossos Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FiAward className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Qualidade</h3>
                <p className="text-gray-600">
                  Comprometemo-nos a fornecer apenas produtos de alta qualidade e durabilidade, 
                  garantindo a satisfação dos nossos clientes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FiUsers className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Confiança</h3>
                <p className="text-gray-600">
                  Construímos relações de confiança com nossos clientes e fornecedores, 
                  baseadas na transparência, honestidade e integridade.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FiCheck className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Compromisso</h3>
                <p className="text-gray-600">
                  Estamos comprometidos com a excelência em todos os aspectos do nosso negócio, 
                  desde o atendimento até o serviço pós-venda.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-2 text-center font-heading">Nossa Equipa</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Contamos com profissionais qualificados e experientes, comprometidos em oferecer 
              o melhor atendimento e suporte técnico aos nossos clientes.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square bg-gray-200 relative">
                  {/* Placeholder for team member photo */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500">Foto</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">João Silva</h3>
                  <p className="text-gray-500 mb-2">CEO & Fundador</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square bg-gray-200 relative">
                  {/* Placeholder for team member photo */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500">Foto</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">Ana Santos</h3>
                  <p className="text-gray-500 mb-2">Diretora Comercial</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square bg-gray-200 relative">
                  {/* Placeholder for team member photo */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500">Foto</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">Miguel Costa</h3>
                  <p className="text-gray-500 mb-2">Diretor Técnico</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Team Member 4 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square bg-gray-200 relative">
                  {/* Placeholder for team member photo */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500">Foto</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">Sofia Oliveira</h3>
                  <p className="text-gray-500 mb-2">Gestora de Clientes</p>
                  <div className="flex justify-center space-x-3">
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 font-heading">Junte-se aos Nossos Clientes Satisfeitos</h2>
              <p className="text-lg mb-8">
                Procura ferramentas e equipamentos de qualidade para o seu negócio? 
                Entre em contacto connosco e descubra como podemos ajudar.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contactos" className="btn bg-white text-primary hover:bg-gray-100">
                  Contacte-nos
                </Link>
                <Link href="/produtos" className="btn border border-white text-white hover:bg-white hover:text-primary">
                  Ver Produtos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
} 