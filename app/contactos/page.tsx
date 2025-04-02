import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail, FiClock, FiChevronRight, FiTruck } from 'react-icons/fi';

import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4 font-heading">Contacte-nos</h1>
              <p className="text-lg mb-0 text-white/90">
                Estamos aqui para responder a todas as suas perguntas. Entre em contacto connosco e teremos todo o gosto em ajudar.
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
                <li className="text-gray-800 font-medium">Contactos</li>
              </ol>
            </nav>
          </div>
        </div>
        
        {/* Contact Info and Form */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6 font-heading">Envie-nos uma mensagem</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="form-label">Nome</label>
                      <input
                        type="text"
                        id="name"
                        className="form-input"
                        placeholder="Digite o seu nome"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="Digite o seu email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="form-label">Telefone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-input"
                      placeholder="Digite o seu número de telefone"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="form-label">Assunto</label>
                    <select id="subject" className="form-select" required>
                      <option value="">Selecione um assunto</option>
                      <option value="product-inquiry">Informação sobre produtos</option>
                      <option value="order-status">Estado da encomenda</option>
                      <option value="technical-support">Suporte técnico</option>
                      <option value="partnerships">Parcerias</option>
                      <option value="other">Outro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="form-label">Mensagem</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="form-input"
                      placeholder="Digite a sua mensagem"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy"
                        type="checkbox"
                        className="form-checkbox"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="privacy" className="text-gray-600">
                        Concordo com a <Link href="/privacidade" className="text-primary hover:underline">Política de Privacidade</Link>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary w-full md:w-auto"
                    >
                      Enviar Mensagem
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6 font-heading">Informações de Contacto</h2>
                
                <div className="space-y-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <FiMapPin className="text-primary text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Nossa Localização</h3>
                        <p className="text-gray-600">
                          Rua das Ferramentas, 123<br />
                          4000-001 Porto<br />
                          Portugal
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <FiPhone className="text-primary text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Telefone</h3>
                        <p className="text-gray-600">
                          <Link href="tel:+351220000000" className="hover:text-primary">
                            +351 220 000 000
                          </Link>
                          <br />
                          <Link href="tel:+351910000000" className="hover:text-primary">
                            +351 910 000 000
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <FiMail className="text-primary text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Email</h3>
                        <p className="text-gray-600">
                          <Link href="mailto:info@alimamedetools.pt" className="hover:text-primary">
                            info@alimamedetools.pt
                          </Link>
                          <br />
                          <Link href="mailto:vendas@alimamedetools.pt" className="hover:text-primary">
                            vendas@alimamedetools.pt
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <FiClock className="text-primary text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Horário de Funcionamento</h3>
                        <p className="text-gray-600">
                          <span className="font-medium">Segunda-Sexta:</span> 9:00 - 18:00<br />
                          <span className="font-medium">Sábado:</span> 10:00 - 13:00<br />
                          <span className="font-medium">Domingo:</span> Fechado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="bg-gray-100 py-16">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8 text-center font-heading">Nossa Localização</h2>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              {/* This would be a real Google Map in production */}
              <div className="h-96 bg-gray-300 flex items-center justify-center">
                <div className="text-gray-600 text-center p-8">
                  <div className="text-lg font-semibold mb-2">Mapa do Google</div>
                  <p>Um mapa interativo seria exibido aqui na versão de produção.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="bg-primary/5 rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading">Tem alguma questão?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Se tem alguma dúvida ou precisa de assistência imediata, não hesite em contactar-nos por telefone. Estamos aqui para ajudar!
              </p>
              <div className="inline-flex items-center justify-center bg-white rounded-full px-6 py-4 shadow-sm">
                <FiPhone className="text-primary text-xl mr-3" />
                <span className="text-xl font-semibold">+351 220 000 000</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
} 