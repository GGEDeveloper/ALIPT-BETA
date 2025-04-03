'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiShare2, FiCheck, FiX, FiChevronRight, FiTruck, FiClock, FiPlus, FiMinus, FiShield, FiRefreshCw, FiUser } from 'react-icons/fi';

import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency, calculateDiscountPercentage, formatDiscountPercentage } from '@/utils/format';

type SpecValue = string | number | { [key: string]: string };

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();

  const product = products.find((p) => p.slug === params.slug);
  
  if (!product) {
    notFound();
  }

  const { id, name, price, oldPrice, image, brand, category, description, specifications, relatedProducts, reviews } = product;
  
  const discountPercentage = oldPrice ? calculateDiscountPercentage(oldPrice, price) : 0;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addItem({
      id: parseInt(id),
      name,
      price,
      originalPrice: oldPrice || undefined,
      image,
    });
  };

  const handleImageError = () => {
    setImgError(true);
  };

  const averageRating = reviews ? 
    (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) : 
    '0.0';

  // Convert specifications object to array of key-value pairs
  const specsList = Object.entries(product.specifications || {})
    .filter(([_, value]) => typeof value !== 'object')
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`);

  const formatSpecValue = (value: SpecValue): string => {
    if (typeof value === 'object') {
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${val}`)
        .join(', ');
    }
    return String(value);
  };

  // Get related products (same category, excluding current product)
  const relatedProductsFiltered = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  // Login Button Component
  const LoginButton = () => (
    <Link href="/login">
      <button 
        className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white py-3 px-6 rounded-md text-base font-medium transition-colors"
      >
        <FiUser className="w-5 h-5" />
        <span>Login para ver preço e comprar</span>
      </button>
    </Link>
  );

  return (
    <>
      <main className="py-8">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-gray-500">
            <ol className="flex items-center flex-wrap">
              <li className="flex items-center">
                <Link href="/" className="hover:text-primary">Início</Link>
                <FiChevronRight className="mx-2" />
              </li>
              <li className="flex items-center">
                <Link href="/produtos" className="hover:text-primary">Produtos</Link>
                <FiChevronRight className="mx-2" />
              </li>
              <li className="flex items-center">
                <Link 
                  href={`/categoria/${product.category.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="hover:text-primary"
                >
                  {product.category}
                </Link>
                <FiChevronRight className="mx-2" />
              </li>
              <li className="text-gray-800 font-medium truncate">{product.name}</li>
            </ol>
          </nav>
          
          {/* Product Overview Section */}
          <div className="flex flex-col lg:flex-row gap-10 mb-12">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 aspect-square relative">
                {imgError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-4xl font-bold text-gray-300">{product.brand}</div>
                  </div>
                ) : (
                  <Image
                    src={image || '/images/products/produto-sem-imagem.jpg'}
                    alt={name}
                    fill
                    className="object-contain p-4"
                    onError={handleImageError}
                    priority
                  />
                )}
                
                {isLoggedIn && oldPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded z-10">
                    -{formatDiscountPercentage(discountPercentage)}
                  </div>
                )}
              </div>
              
              {/* Thumbnail images */}
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-md shadow-sm overflow-hidden aspect-square cursor-pointer hover:ring-2 hover:ring-primary"
                  >
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                      <div className="text-sm font-bold text-gray-300">{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="text-sm text-gray-500 mr-4">
                  <span className="font-semibold text-gray-700">Marca:</span> {product.brand}
                </div>
                <div className="text-sm text-gray-500 mr-4">
                  <span className="font-semibold text-gray-700">Código:</span> {product.code}
                </div>
                {isLoggedIn && (
                  <div 
                    className={`badge ${product.inStock ? 'badge-success' : 'badge-danger'}`}
                  >
                    {product.inStock ? 'Em Stock' : 'Sem Stock'}
                  </div>
                )}
              </div>
              
              {isLoggedIn ? (
                <>
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      {oldPrice && (
                        <span className="line-through text-gray-500 mr-2">€{formatCurrency(oldPrice)}</span>
                      )}
                      <span className="text-3xl font-bold text-primary">€{formatCurrency(price)}</span>
                      {oldPrice && (
                        <span className="ml-3 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                          POUPE €{(oldPrice - price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">IVA incluído</p>
                  </div>
                  
                  <div className="border-t border-b border-gray-200 py-6 mb-6">
                    <p className="text-gray-700 mb-4">{product.description || 'Produto de alta qualidade para uso profissional.'}</p>
                    
                    {/* Key features list */}
                    <ul className="space-y-2">
                      {specsList && specsList.length > 0 ? (
                        specsList.slice(0, 4).map((spec, index) => (
                          <li key={index} className="flex items-start">
                            <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{spec}</span>
                          </li>
                        ))
                      ) : (
                        <li className="flex items-start">
                          <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">Produto da marca {product.brand}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Add to cart section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <label htmlFor="quantity" className="form-label">Quantidade</label>
                        <div className="flex">
                          <button 
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                            className="border border-gray-300 px-3 py-2 rounded-l-md hover:bg-gray-100"
                          >
                            <FiMinus />
                          </button>
                          <input 
                            type="number" 
                            id="quantity" 
                            className="form-input w-16 rounded-none text-center border-x-0" 
                            min="1" 
                            defaultValue="1" 
                          />
                          <button 
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="border border-gray-300 px-3 py-2 rounded-r-md hover:bg-gray-100"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm mb-2">
                          <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                            {product.inStock ? (
                              <div>
                                <span className="flex items-center text-lg mb-2">
                                  <FiCheck className="mr-2" /> Disponível em Stock
                                </span>
                                {/* Indicadores de stock */}
                                <div className="flex items-center">
                                  <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((index) => {
                                      const stockLevel = parseInt(product.id) % 4;
                                      let bgColor = 'bg-gray-200';
                                      
                                      if (stockLevel === 0) {
                                        // Stock cheio
                                        bgColor = 'bg-green-500';
                                      } else if (stockLevel === 1 && index <= 4) {
                                        // Stock alto
                                        bgColor = index <= 4 ? 'bg-green-500' : 'bg-yellow-500';
                                      } else if (stockLevel === 2 && index <= 3) {
                                        // Stock médio
                                        bgColor = index <= 3 ? 'bg-yellow-500' : 'bg-gray-200';
                                      } else if (stockLevel === 3 && index <= 1) {
                                        // Stock baixo
                                        bgColor = index <= 1 ? 'bg-red-500' : 'bg-gray-200';
                                      }
                                      
                                      return (
                                        <div 
                                          key={index} 
                                          className={`w-5 h-2 rounded ${bgColor}`}
                                        />
                                      );
                                    })}
                                  </div>
                                  <span className="ml-2 text-xs text-gray-500">
                                    {['Muito elevado', 'Elevado', 'Médio', 'Baixo'][parseInt(product.id) % 4]}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center text-lg">
                                <FiX className="mr-2" /> Fora de Stock
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button 
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className={`flex items-center justify-center py-3 px-6 rounded-md font-medium ${
                          product.inStock 
                            ? 'bg-primary text-white hover:bg-primary-dark' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <FiShoppingCart className="mr-2" />
                        <span>Adicionar ao Carrinho</span>
                      </button>
                      <button 
                        onClick={() => {
                          handleAddToCart();
                          // Navigate to checkout
                          window.location.href = '/checkout';
                        }}
                        disabled={!product.inStock}
                        className={`flex items-center justify-center py-3 px-6 rounded-md font-medium ${
                          product.inStock 
                            ? 'bg-secondary text-white hover:bg-secondary-dark' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <span>Comprar Agora</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // Mostra informações básicas do produto e botão de login quando não está logado
                <>
                  <div className="border-t border-b border-gray-200 py-6 mb-6">
                    <p className="text-gray-700 mb-4">{product.description || 'Produto de alta qualidade para uso profissional.'}</p>
                    
                    {/* Key features list */}
                    <ul className="space-y-2">
                      {specsList && specsList.length > 0 ? (
                        specsList.slice(0, 4).map((spec, index) => (
                          <li key={index} className="flex items-start">
                            <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{spec}</span>
                          </li>
                        ))
                      ) : (
                        <li className="flex items-start">
                          <FiCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">Produto da marca {product.brand}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Entre para ver preços e disponibilidade
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Para visualizar preços, disponibilidade e realizar compras, 
                      por favor faça login na sua conta ou crie uma nova.
                    </p>
                    <LoginButton />
                  </div>
                </>
              )}
              
              {/* Delivery & Returns */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Informações de Entrega e Garantia</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiTruck className="text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Entrega em Todo o País</h4>
                      <p className="text-sm text-gray-600">
                        Entrega estimada em 2-4 dias úteis. Portes grátis em compras acima de €100.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FiShield className="text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Garantia de 2 Anos</h4>
                      <p className="text-sm text-gray-600">
                        Todos os produtos têm garantia do fabricante e suporte técnico especializado.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FiRefreshCw className="text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Devolução Gratuita</h4>
                      <p className="text-sm text-gray-600">
                        Tem 14 dias para devolver o produto se não estiver satisfeito.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mb-12">
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  className={`border-primary text-primary whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description' ? 'border-b-2' : ''
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Descrição
                </button>
                <button
                  className={`border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'specifications' ? 'border-b-2' : ''
                  }`}
                  onClick={() => setActiveTab('specifications')}
                >
                  Especificações
                </button>
                <button
                  className={`border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reviews' ? 'border-b-2' : ''
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Avaliações
                </button>
              </nav>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Detalhes do Produto</h3>
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Product Specifications */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Especificações Técnicas</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  {product.specifications && product.specifications.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {product.specifications.map((spec, index) => (
                        <div key={index} className="flex items-start py-3 border-b border-gray-200 last:border-0">
                          <dt className="w-1/3 font-medium text-gray-700">{spec.name}</dt>
                          <dd className="w-2/3 text-gray-900">{spec.value}</dd>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">Especificações técnicas não disponíveis para este produto.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="quantity" className="block text-base font-medium text-gray-700">
                    Quantidade
                  </label>
                  <div className="flex items-center space-x-3 bg-white rounded-lg border border-gray-300">
                    <button 
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-x border-gray-300 py-1 text-gray-700"
                      min="1"
                    />
                    <button 
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-6">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 text-lg font-medium transition-colors
                    ${product.inStock 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                    }`}
                >
                  <FiShoppingCart className="text-xl" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Produtos Relacionados</h2>
              <Link href={`/categoria/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline">
                Ver Mais &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {relatedProductsFiltered.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  id={relProduct.id}
                  name={relProduct.name}
                  slug={relProduct.slug}
                  code={relProduct.code}
                  price={relProduct.price}
                  oldPrice={relProduct.oldPrice}
                  image={relProduct.image}
                  inStock={relProduct.inStock}
                  category={relProduct.category}
                  brand={relProduct.brand}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
} 