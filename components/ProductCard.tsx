'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { formatCurrency, calculateDiscountPercentage, formatDiscountPercentage } from '@/utils/format';

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  isNew?: boolean;
  category?: string;
  rating?: number;
  inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  slug,
  isNew = false,
  category,
  rating = 4.5,
  inStock = true,
}) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0;

  // Variação do estoque baseada no ID do produto para demonstração
  const numericId = typeof id === 'string' ? parseInt(id.replace(/\D/g, '')) || 1 : id;
  const stockVariation = numericId % 4; // 0, 1, 2 ou 3
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      name,
      price,
      originalPrice,
      image,
    });
  };

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <Link href={`/produto/${slug}`}>
      <div
        className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-square">
          {imgError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-2xl font-bold text-gray-300">
                {name.split(' ')[0]}
              </div>
            </div>
          ) : (
            <Image
              src={image || "/images/products/produto-sem-imagem.jpg"}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-4"
              onError={handleImageError}
            />
          )}

          {/* Labels */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <span className="bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
                -{formatDiscountPercentage(discountPercentage)}
              </span>
            )}
            
            {isNew && (
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                NOVO
              </span>
            )}
            
            {!inStock && (
              <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded">
                SEM STOCK
              </span>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              className="bg-white text-primary p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
              onClick={handleAddToCart}
              aria-label="Adicionar ao Carrinho"
            >
              <FiShoppingCart className="w-5 h-5" />
            </button>
            
            <button
              className="bg-white text-primary p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
              aria-label="Adicionar aos Favoritos"
            >
              <FiHeart className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-sm font-medium text-gray-700 line-clamp-2">{name}</h3>
          </div>

          {/* Price */}
          <div className="flex items-center mb-2">
            <span className="text-xl font-bold text-primary">€{formatCurrency(price)}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">€{formatCurrency(originalPrice)}</span>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <FiStar
                  key={index}
                  className={`w-4 h-4 ${
                    index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">({Math.floor(Math.random() * 50) + 5})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 