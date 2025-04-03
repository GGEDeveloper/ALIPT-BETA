'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { Product } from '@/lib/data';

interface ProductCarouselProps {
  title?: string;
  products: Product[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  slidesToShow?: number;
  backgroundColor?: string;
  textColor?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title = 'Produtos Destacados',
  products,
  autoplay = true,
  autoplaySpeed = 5000, // 5 segundos
  slidesToShow = 4,
  backgroundColor = 'bg-white',
  textColor = 'text-gray-900',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  // Ajusta o número de slides a mostrar com base no tamanho da tela
  const [visibleSlides, setVisibleSlides] = useState(slidesToShow);
  
  useEffect(() => {
    const handleResize = () => {
      // Lógica para ajustar o número de slides com base no tamanho da tela
      if (window.innerWidth < 640) {
        setVisibleSlides(1); // Mobile
      } else if (window.innerWidth < 768) {
        setVisibleSlides(2); // Tablet pequeno
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(3); // Tablet grande
      } else {
        setVisibleSlides(slidesToShow); // Desktop
      }
    };
    
    // Inicializar
    handleResize();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Limpar listener
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesToShow]);
  
  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Se chegarmos ao último slide possível, voltar para o início
      if (prevIndex + visibleSlides >= products.length) {
        return 0;
      }
      return prevIndex + 1;
    });
  };
  
  // Função para voltar para o slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Se estivermos no início, ir para o último slide possível
      if (prevIndex <= 0) {
        return Math.max(0, products.length - visibleSlides);
      }
      return prevIndex - 1;
    });
  };
  
  // Configurar autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, autoplaySpeed);
    }
    
    // Limpar o intervalo ao desmontar o componente
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, autoplaySpeed, currentIndex, visibleSlides, products.length]);
  
  // Pausar autoplay ao passar o mouse ou tocar
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      setIsAutoPlaying(false);
    }
  };
  
  // Retomar autoplay ao remover o mouse
  const handleMouseLeave = () => {
    if (autoplay && !isAutoPlaying) {
      setIsAutoPlaying(true);
    }
  };
  
  // Calcular se os botões de navegação devem estar desativados
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + visibleSlides >= products.length;
  
  return (
    <section className={`py-6 ${backgroundColor}`}>
      <div className="container-custom">
        {/* Título e Controles */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl md:text-2xl font-bold ${textColor}`}>{title}</h2>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className={`p-1.5 rounded-full ${isPrevDisabled 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-secondary text-white hover:bg-secondary-dark'}`}
              disabled={isPrevDisabled}
              aria-label="Produto anterior"
            >
              <FiChevronLeft size={20} />
            </button>
            
            <button
              onClick={nextSlide}
              className={`p-1.5 rounded-full ${isNextDisabled 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-secondary text-white hover:bg-secondary-dark'}`}
              disabled={isNextDisabled}
              aria-label="Próximo produto"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Carrossel */}
        <div 
          className="relative overflow-hidden" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
              width: `${(products.length / visibleSlides) * 100}%`
            }}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="px-1.5 py-1"
                style={{ width: `${100 / products.length * visibleSlides}%` }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  originalPrice={product.oldPrice}
                  image={product.image}
                  isNew={product.isNew}
                  category={product.category}
                  rating={4.5}
                  inStock={product.inStock}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Indicadores e Link em uma única linha */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
          <div className="flex justify-center space-x-1">
            {Array.from({ length: Math.ceil((products.length - visibleSlides + 1) / 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === Math.floor(currentIndex / 1) 
                    ? 'bg-secondary w-4' 
                    : 'bg-gray-300'
                }`}
                aria-label={`Ir para o slide ${index + 1}`}
              />
            ))}
          </div>
          
          <Link 
            href="/produtos"
            className="inline-flex items-center px-4 py-1.5 bg-secondary text-white text-sm rounded-md hover:bg-opacity-90 transition-colors"
          >
            Ver todos os produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel; 