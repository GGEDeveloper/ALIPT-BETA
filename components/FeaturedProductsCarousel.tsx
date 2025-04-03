'use client';

import React from 'react';
import { products } from '@/lib/data';
import Product3DCarousel from './Product3DCarousel';

interface FeaturedProductsCarouselProps {
  maxProducts?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const FeaturedProductsCarousel: React.FC<FeaturedProductsCarouselProps> = ({
  maxProducts = 8,
  autoplay = true,
  autoplaySpeed = 5000,
}) => {
  // Get featured products
  const featuredProducts = products.slice(0, maxProducts);
  
  return (
    <Product3DCarousel 
      title="Destaques"
      products={featuredProducts}
      backgroundColor="bg-black"
      textColor="text-white"
      autoplay={autoplay}
      autoplaySpeed={autoplaySpeed}
    />
  );
};

export default FeaturedProductsCarousel; 