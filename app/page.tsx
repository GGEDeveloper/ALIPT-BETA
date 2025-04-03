"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiTool, FiShield, FiTruck, FiHeadphones } from 'react-icons/fi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FeaturedProductsCarousel from '@/components/FeaturedProductsCarousel';
import PromotionsCarousel from '@/components/PromotionsCarousel';
import FeaturedCategories from '@/components/FeaturedCategories';
import { products, categories as dbCategories, brands, logProductCategories } from '@/lib/data';
import { importGeneratedProducts } from "@/lib/import_generated_products";

// Import generated products
importGeneratedProducts();

function DebugButton() {
  return (
    <button 
      onClick={() => {
        console.log("Debug: Logging product categories");
        logProductCategories();
        console.log(`Total products: ${products.length}`);
      }}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      DEBUG ({products.length} Products)
    </button>
  );
}

export default function Home() {
  return (
    <main className="bg-[#FFC03A]">
      {/* Hero Section */}
      <section className="bg-[rgb(140,140,140)] text-white py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
                Ferramentas Profissionais para Todos os Projetos
              </h1>
              <p className="text-lg mb-8 text-[rgb(255,255,255)]">
                Descubra a nossa ampla gama de ferramentas e equipamentos de alta qualidade para construção, agricultura e indústria.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/produtos" className="btn bg-white text-[rgb(140,140,140)] hover:bg-[rgb(198,198,198)] py-2 px-4 font-medium text-sm rounded transition-colors duration-200">
                  Ver Produtos
                </Link>
                <Link href="/contactos" className="btn border border-white text-white hover:bg-white hover:text-[rgb(140,140,140)] py-2 px-4 font-medium text-sm rounded transition-colors duration-200">
                  Contacte-nos
                </Link>
                <DebugButton />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src="/images/content/ALIMAMEDETOOLS_medium.png"
                  alt="ALITOOLS Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <FeaturedCategories />
      
      {/* Featured Products */}
      <FeaturedProductsCarousel />
      
      {/* On Sale Section */}
      <PromotionsCarousel />

      {/* Features Section */}
      <section className="py-12 bg-[rgb(255,255,255)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <div className="bg-[rgb(198,198,198)] p-3 rounded-lg mr-4">
                <FiTool className="text-[rgb(140,140,140)] text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[rgb(25,25,25)]">Qualidade Garantida</h3>
                <p className="text-[rgb(140,140,140)]">Ferramentas de alta qualidade para as suas necessidades profissionais.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <div className="bg-[rgb(198,198,198)] p-3 rounded-lg mr-4">
                <FiShield className="text-[rgb(140,140,140)] text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[rgb(25,25,25)]">Garantia Total</h3>
                <p className="text-[rgb(140,140,140)]">Todos os produtos com garantia do fabricante e satisfação assegurada.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <div className="bg-[rgb(198,198,198)] p-3 rounded-lg mr-4">
                <FiTruck className="text-[rgb(140,140,140)] text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[rgb(25,25,25)]">Entrega Rápida</h3>
                <p className="text-[rgb(140,140,140)]">Enviamos os seus produtos de forma rápida e segura para todo o país.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
              <div className="bg-[rgb(198,198,198)] p-3 rounded-lg mr-4">
                <FiHeadphones className="text-[rgb(140,140,140)] text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[rgb(25,25,25)]">Apoio Técnico</h3>
                <p className="text-[rgb(140,140,140)]">Equipa de suporte técnico disponível para responder a todas as suas dúvidas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Brand Section - Temporarily disabled
      <section className="py-16 bg-[rgb(255,255,255)]">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center font-heading text-[rgb(25,25,25)]">Marcas em Destaque</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-[3/2]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[rgb(140,140,140)] font-semibold">{brand.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}
      
      {/* CTA Section */}
      <section className="py-20 bg-[#FFC03A] text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 font-heading">Precisa de Ajuda a Escolher as Ferramentas Certas?</h2>
            <p className="text-lg mb-8">
              A nossa equipa de especialistas está pronta para o ajudar a encontrar as melhores ferramentas para o seu projeto.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contactos" className="btn bg-white text-[#FFC03A] hover:bg-gray-100 py-2 px-4 font-medium text-sm rounded transition-colors duration-200">
                Contacte-nos
              </Link>
              <Link href="/sobre" className="btn border border-white text-white hover:bg-white hover:text-[#FFC03A] py-2 px-4 font-medium text-sm rounded transition-colors duration-200">
                Sobre Nós
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 