'use client';

import React from 'react';
import { products } from '@/lib/data';
import ProductCarousel from './ProductCarousel';

interface PromotionsCarouselProps {
  maxProducts?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const PromotionsCarousel: React.FC<PromotionsCarouselProps> = ({
  maxProducts = 8,
  autoplay = true,
  autoplaySpeed = 6000,
}) => {
  // Get products on sale (those with oldPrice)
  const onSaleProducts = products
    .filter(product => product.oldPrice)
    .slice(0, maxProducts);
  
  return (
    <ProductCarousel 
      title="Promoções"
      products={onSaleProducts}
      backgroundColor="bg-[#FFC03A]"
      textColor="text-[rgb(25,25,25)]"
      slidesToShow={4}
      autoplay={autoplay}
      autoplaySpeed={autoplaySpeed}
    />
  );
};

export default PromotionsCarousel; 