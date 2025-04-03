'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  name: string;
  image: string;
  slug: string;
}

interface FeaturedCategoriesProps {
  maxCategories?: number;
  title?: string;
  backgroundColor?: string;
  titleColor?: string;
}

const homeCategories = [
  { name: 'Construção', image: '/images/categories/ALIMAMEDETOOLS_CONTRUCAO.png', slug: 'construcao' },
  { name: 'Eletricidade', image: '/images/categories/ALIMAMEDETOOLS_ELETRICIDADE.png', slug: 'eletricidade' },
  { name: 'Ferramentas', image: '/images/categories/ALIMAMEDETOOLS_FERRAMENTAS.png', slug: 'ferramentas' },
  { name: 'Geral', image: '/images/categories/ALIMAMEDETOOLS_GERAL.png', slug: 'geral' },
  { name: 'Jardim', image: '/images/categories/ALIMAMEDETOOLS_JARDIM.png', slug: 'jardim' },
  { name: 'Oficina e Mecânica', image: '/images/categories/ALIMAMEDETOOLS_OFICINA.png', slug: 'oficina-mecanica' },
  { name: 'Proteção e Segurança', image: '/images/categories/ALIMAMEDETOOLS_SECTORES7.png', slug: 'protecao-seguranca' },
  { name: 'Luzes de Proteção', image: '/images/categories/ALIMAMEDETOOLS_SECTORES8.png', slug: 'luzes-protecao' },
  { name: 'Setor 9', image: '/images/categories/ALIMAMEDETOOLS_SECTORES9.png', slug: 'setor-9' },
  { name: 'Setor 10', image: '/images/categories/ALIMAMEDETOOLS_SECTORES10.png', slug: 'setor-10' },
  { name: 'Setor 12', image: '/images/categories/ALIMAMEDETOOLS_SECTORES12.png', slug: 'setor-12' },
  { name: 'Setor 16', image: '/images/categories/ALIMAMEDETOOLS_SECTORES16.png', slug: 'setor-16' },
  { name: 'Materiais Abrasivos', image: '/images/categories/placeholder.png', slug: 'materiais-abrasivos' },
  { name: 'Construção e Renovação', image: '/images/categories/placeholder.png', slug: 'construcao-renovacao' },
  { name: 'Ferramentas de Corte', image: '/images/categories/placeholder.png', slug: 'ferramentas-corte' },
  { name: 'Ferramentas Diamantadas', image: '/images/categories/placeholder.png', slug: 'ferramentas-diamantadas' },
  { name: 'Ferramentas Mecânicas Gerais', image: '/images/categories/placeholder.png', slug: 'ferramentas-mecanicas-gerais' },
  { name: 'Artigos de Saúde e Segurança', image: '/images/categories/placeholder.png', slug: 'artigos-saude-seguranca' },
  { name: 'Aquecedores e Radiadores', image: '/images/categories/placeholder.png', slug: 'aquecedores-radiadores' },
  { name: 'Artigos Domésticos', image: '/images/categories/placeholder.png', slug: 'artigos-domesticos' },
  { name: 'Ferramentas de Junção', image: '/images/categories/placeholder.png', slug: 'ferramentas-juncao' },
  { name: 'Ferramentas Laser', image: '/images/categories/placeholder.png', slug: 'ferramentas-laser' },
  { name: 'Ferramentas de Medição', image: '/images/categories/placeholder.png', slug: 'ferramentas-medicao' },
  { name: 'Pneumática', image: '/images/categories/placeholder.png', slug: 'pneumatica' },
  { name: 'Aspiradores', image: '/images/categories/placeholder.png', slug: 'aspiradores' },
  { name: 'Equipamentos de Soldadura', image: '/images/categories/placeholder.png', slug: 'equipamentos-soldadura' },
  { name: 'Ferramentas para Eletricistas', image: '/images/categories/placeholder.png', slug: 'ferramentas-eletricistas' },
  { name: 'Ferramentas para Canalizadores', image: '/images/categories/placeholder.png', slug: 'ferramentas-canalizadores' },
  { name: 'Ferramentas para Oficina', image: '/images/categories/placeholder.png', slug: 'ferramentas-oficina-garagem' },
  { name: 'Equipamento Turístico', image: '/images/categories/placeholder.png', slug: 'equipamento-turistico' },
];

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  maxCategories = 8,
  title = "Categorias Principais",
  backgroundColor = "bg-[#FFC03A]",
  titleColor = "text-[rgb(25,25,25)]"
}) => {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container-custom">
        <h2 className={`text-3xl font-bold mb-8 text-center font-heading ${titleColor}`}>{title}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {homeCategories.slice(0, maxCategories).map((category) => (
            <Link 
              key={category.slug}
              href={`/produtos?categoria=${category.slug}`}
              className="group bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105"
            >
              <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <h2 className="text-lg font-semibold text-center group-hover:text-orange-500">
                {category.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories; 