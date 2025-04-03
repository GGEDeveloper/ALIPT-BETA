'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiEye, FiStar, FiUser } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
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
  isListView?: boolean;
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
  isListView = false,
}) => {
  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0;

  // Variação do estoque baseada no ID do produto para demonstração
  const numericId = typeof id === 'string' ? parseInt(id.replace(/\D/g, '')) || 1 : id;
  const stockVariation = numericId % 4; // 0, 1, 2 ou 3
  
  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id,
      name,
      price,
      originalPrice,
      image,
    }, quantity);
  };

  const handleImageError = () => {
    setImgError(true);
  };

  // Componente de botão de login
  const LoginButton = () => (
    <Link href="/login" onClick={(e) => e.stopPropagation()}>
      <button 
        className="w-full flex items-center justify-center gap-1 bg-secondary hover:bg-secondary-dark text-white py-2 px-3 rounded-md text-sm transition-colors"
      >
        <FiUser className="w-4 h-4" />
        <span>Login para ver preço</span>
      </button>
    </Link>
  );

  if (isListView) {
    return (
      <Link href={`/produto/${slug}`}>
        <div
          className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md flex"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Product Image - List View */}
          <div className="relative w-[120px] h-[120px] flex-shrink-0">
            {imgError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-lg font-bold text-gray-300">
                  {name.split(' ')[0]}
                </div>
              </div>
            ) : (
              <Image
                src={image || "/images/products/produto-sem-imagem.jpg"}
                alt={name}
                fill
                sizes="120px"
                className="object-contain p-2"
                onError={handleImageError}
              />
            )}

            {/* Labels */}
            <div className="absolute top-1 left-1 flex flex-col gap-1">
              {isLoggedIn && discountPercentage > 0 && (
                <span className="bg-secondary text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                  -{formatDiscountPercentage(discountPercentage)}
                </span>
              )}
              
              {isNew && (
                <span className="bg-green-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                  NOVO
                </span>
              )}
            </div>
          </div>
          
          {/* Product Info - List View */}
          <div className="p-3 flex-grow flex flex-col justify-between">
            <div>
              <div className="mb-1">
                {category && (
                  <span className="text-xs text-gray-500">{category}</span>
                )}
                <h3 className="text-sm font-medium text-gray-700">{name}</h3>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <FiStar
                      key={index}
                      className={`w-3 h-3 ${
                        index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray-500">({Math.floor(Math.random() * 50) + 5})</span>
              </div>
              
              {/* Stock info - apenas visível quando logado */}
              {isLoggedIn && (
                <div className="mb-1">
                  {!inStock && (
                    <span className="inline-block bg-gray-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                      SEM STOCK
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-2">
              {isLoggedIn ? (
                <>
                  {/* Price - Visível apenas quando logado */}
                  <div className="flex items-center">
                    <span className="text-base font-bold text-primary">€{formatCurrency(price)}</span>
                    {originalPrice && (
                      <span className="ml-2 text-xs text-gray-500 line-through">€{formatCurrency(originalPrice)}</span>
                    )}
                  </div>
                  
                  {/* Quantity controls - Visíveis apenas quando logado e em estoque */}
                  {inStock && (
                    <div className="flex items-center mr-2 bg-gray-100 rounded-md">
                      <button 
                        onClick={decrementQuantity}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded-l-md text-xs"
                        disabled={quantity === 1}
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-medium">{quantity}</span>
                      <button 
                        onClick={incrementQuantity}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded-r-md text-xs"
                      >
                        +
                      </button>
                    </div>
                  )}
                  
                  {/* Actions - Visíveis apenas quando logado */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (inStock) handleAddToCart(e);
                      }}
                      className={`flex items-center justify-center py-1 px-2 rounded-md text-xs font-medium transition-colors ${
                        inStock 
                        ? 'bg-primary text-white hover:bg-primary-dark' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!inStock}
                    >
                      <FiShoppingCart className="mr-1 w-3 h-3" />
                      <span>Adicionar</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (inStock) {
                          handleAddToCart(e);
                          window.location.href = "/checkout";
                        }
                      }}
                      className={`py-1 px-2 rounded-md text-xs font-medium transition-colors ${
                        inStock 
                        ? 'bg-secondary text-white hover:bg-secondary-dark' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!inStock}
                    >
                      Comprar
                    </button>
                  </div>
                </>
              ) : (
                // Se não estiver logado, mostrar botão de login
                <div className="w-full">
                  <LoginButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

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
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isLoggedIn && discountPercentage > 0 && (
              <span className="bg-secondary text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                -{formatDiscountPercentage(discountPercentage)}
              </span>
            )}
            
            {isNew && (
              <span className="bg-green-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                NOVO
              </span>
            )}
          </div>
          
          {/* Quick Action Buttons - Mostrar apenas se logado */}
          {isLoggedIn && isHovered && (
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-white bg-opacity-90 flex justify-center space-x-2 transform transition-transform duration-300">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Implement quick view functionality
                }}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                aria-label="Quick view"
              >
                <FiEye className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (inStock) handleAddToCart(e);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  inStock 
                  ? 'bg-primary hover:bg-primary-dark text-white' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!inStock}
                aria-label="Add to cart"
              >
                <FiShoppingCart className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Implement wishlist functionality
                }}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                aria-label="Add to wishlist"
              >
                <FiHeart className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            {category && (
              <span className="text-xs text-gray-500">{category}</span>
            )}
            <h3 className="text-sm md:text-base font-medium text-gray-800 line-clamp-2 min-h-[2.5rem]">{name}</h3>
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
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
          
          {isLoggedIn ? (
            <>
              {/* Price - Visível apenas quando logado */}
              <div className="flex items-center mb-2">
                <span className="text-lg font-bold text-primary">€{formatCurrency(price)}</span>
                {originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">€{formatCurrency(originalPrice)}</span>
                )}
              </div>
              
              {/* Stock info - apenas visível quando logado */}
              <div className="flex items-center justify-between">
                {!inStock && (
                  <span className="text-xs text-red-500 font-medium">Sem estoque</span>
                )}
                
                {/* Ações de compra - apenas visíveis quando logado e em estoque */}
                {inStock && (
                  <div className="flex gap-2 flex-wrap justify-end">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(e);
                      }}
                      className="py-1 px-3 bg-secondary text-white text-xs font-medium rounded-md hover:bg-secondary-dark transition-colors"
                    >
                      Adicionar
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(e);
                        window.location.href = "/checkout";
                      }}
                      className="py-1 px-3 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Comprar Agora
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Se não estiver logado, mostrar botão de login
            <div className="mt-2">
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard; 