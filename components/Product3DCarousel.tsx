'use client';

import React, { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { Product } from '@/lib/data';

interface Product3DCarouselProps {
  title?: string;
  products: Product[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  backgroundColor?: string;
  textColor?: string;
}

const Product3DCarousel: React.FC<Product3DCarouselProps> = ({
  title = 'Produtos Destacados',
  products,
  autoplay = true,
  autoplaySpeed = 5000,
  backgroundColor = 'bg-black',
  textColor = 'text-white',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const totalItems = products.length;
  
  // Refs para drag functionality
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const dragThreshold = 50; // Quantidade mínima de pixels para mudar o slide

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };
  
  // Função para voltar para o slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
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
  }, [isAutoPlaying, autoplaySpeed, currentIndex, totalItems]);
  
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
  
  // Função para obter o índice do produto anterior
  const getPrevIndex = (index: number) => {
    return (index - 1 + totalItems) % totalItems;
  };
  
  // Função para obter o índice do próximo produto
  const getNextIndex = (index: number) => {
    return (index + 1) % totalItems;
  };
  
  // Função para verificar se um índice está ativo ou adjacente
  const getItemPosition = (index: number) => {
    if (index === currentIndex) return 'active';
    if (index === getPrevIndex(currentIndex)) return 'prev';
    if (index === getNextIndex(currentIndex)) return 'next';
    if (index === getPrevIndex(getPrevIndex(currentIndex))) return 'prev2';
    if (index === getNextIndex(getNextIndex(currentIndex))) return 'next2';
    return 'hidden';
  };
  
  // Drag functionality
  const handleDragStart = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    setIsDragging(true);
    
    // Se for um evento de toque, obtenha a posição X do primeiro toque
    // Caso contrário, obtenha a posição X do mouse
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    
    setStartPosition(clientX);
  };
  
  const handleDragMove = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    
    const currentPosition = clientX;
    const diff = currentPosition - startPosition;
    
    setCurrentTranslate(prevTranslate + diff);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Se o usuário arrastou o suficiente para a esquerda, vá para o próximo slide
    if (currentTranslate < prevTranslate - dragThreshold) {
      nextSlide();
    }
    // Se o usuário arrastou o suficiente para a direita, vá para o slide anterior
    else if (currentTranslate > prevTranslate + dragThreshold) {
      prevSlide();
    }
    
    setPrevTranslate(0);
    setCurrentTranslate(0);
    
    // Retomar autoplay
    if (autoplay) {
      setIsAutoPlaying(true);
    }
  };
  
  return (
    <section className={`py-4 ${backgroundColor}`}>
      <div className="container-custom">
        {/* Título e link "Ver todos" */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl md:text-2xl font-bold ${textColor}`}>{title}</h2>
          
          <Link 
            href="/produtos"
            className="inline-flex items-center px-3 py-1 bg-secondary text-white text-xs sm:text-sm rounded-md hover:bg-opacity-90 transition-colors"
          >
            Ver todos
          </Link>
        </div>
        
        {/* Carrossel 3D - com funcionalidade de arrastar */}
        <div 
          className="relative h-[320px] sm:h-[350px] md:h-[380px] overflow-hidden cursor-grab"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="absolute inset-0 flex items-center justify-center perspective-1000">
            <div className="relative w-full h-full transform-style-3d">
              {products.map((product, index) => {
                const position = getItemPosition(index);
                
                // Estilos baseados na posição do item
                let transformStyle = '';
                let zIndex = 0;
                let opacity = 0;
                let scale = 1;
                
                switch (position) {
                  case 'active':
                    transformStyle = 'translateZ(120px)';
                    zIndex = 30;
                    opacity = 1;
                    scale = 1;
                    break;
                  case 'prev':
                    transformStyle = 'translateX(-55%) translateZ(40px) rotateY(20deg)';
                    zIndex = 20;
                    opacity = 0.8;
                    scale = 0.85;
                    break;
                  case 'next':
                    transformStyle = 'translateX(55%) translateZ(40px) rotateY(-20deg)';
                    zIndex = 20;
                    opacity = 0.8;
                    scale = 0.85;
                    break;
                  case 'prev2':
                    transformStyle = 'translateX(-110%) translateZ(-40px) rotateY(30deg)';
                    zIndex = 10;
                    opacity = 0.5;
                    scale = 0.7;
                    break;
                  case 'next2':
                    transformStyle = 'translateX(110%) translateZ(-40px) rotateY(-30deg)';
                    zIndex = 10;
                    opacity = 0.5;
                    scale = 0.7;
                    break;
                  default:
                    transformStyle = 'translateZ(-150px)';
                    zIndex = 0;
                    opacity = 0;
                    scale = 0;
                    break;
                }
                
                return (
                  <div
                    key={product.id}
                    className="absolute top-1/2 left-1/2 w-56 transition-all duration-500 ease-in-out"
                    style={{
                      transform: `translate(-50%, -50%) ${transformStyle} scale(${scale})`,
                      zIndex,
                      opacity,
                    }}
                  >
                    <div className="w-full h-full p-0.5">
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Controles e indicadores na parte inferior */}
        <div className="flex flex-wrap justify-center items-center mt-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-secondary text-white hover:bg-secondary-dark z-10"
              aria-label="Produto anterior"
            >
              <FiChevronLeft size={20} />
            </button>
            
            <div className="flex justify-center space-x-1">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-secondary w-4' : 'bg-gray-400'
                  }`}
                  aria-label={`Ir para o slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-secondary text-white hover:bg-secondary-dark z-10"
              aria-label="Próximo produto"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product3DCarousel; 