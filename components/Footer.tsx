'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Sobre</h3>
            <p className="text-gray-300 mb-4">
              AliTools é a sua loja online de ferramentas profissionais. Oferecemos produtos de alta qualidade para profissionais e entusiastas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-secondary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-secondary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-secondary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/ferramentas-manuais" className="text-gray-300 hover:text-secondary transition-colors">
                  Ferramentas Manuais
                </Link>
              </li>
              <li>
                <Link href="/categoria/ferramentas-eletricas" className="text-gray-300 hover:text-secondary transition-colors">
                  Ferramentas Elétricas
                </Link>
              </li>
              <li>
                <Link href="/categoria/equipamentos" className="text-gray-300 hover:text-secondary transition-colors">
                  Equipamentos
                </Link>
              </li>
              <li>
                <Link href="/categoria/acessorios" className="text-gray-300 hover:text-secondary transition-colors">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-2" />
                Rua Principal, 123
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-2" />
                +351 123 456 789
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-2" />
                info@alitools.com
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} AliTools. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
} 