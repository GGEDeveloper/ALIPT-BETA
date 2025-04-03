// Produtos adicionais para preencher todas as categorias
import { Product } from './data';

export const additionalProducts: Product[] = [
  // Ferramentas Manuais - Martelos
  {
    id: "p1",
    name: "Martelo de Carpinteiro Stanley 20oz",
    slug: "martelo-carpinteiro-stanley-20oz",
    description: "Martelo de carpinteiro Stanley 20oz com cabo de fibra de vidro para melhor absorção de impacto e maior conforto.",
    price: 45.99,
    oldPrice: 59.99,
    image: "/images/products-new/martelo-construcao.jpg",
    brand: "Stanley",
    category: "martelos",
    inStock: true,
    isNew: true,
    isFeatured: true,
    specifications: {
      peso: "20oz",
      material: "Aço forjado com cabo de fibra de vidro",
      comprimento: "35cm"
    }
  },
  
  // Ferramentas Manuais - Alicates
  {
    id: "p2",
    name: "Alicate Universal Bosch 8 Polegadas",
    slug: "alicate-universal-bosch-8-polegadas",
    description: "Alicate universal Bosch 8 polegadas com cabo ergonômico isolado até 1000V para trabalhos elétricos com segurança.",
    price: 39.99,
    oldPrice: 49.99,
    image: "/images/products-new/alicate-isolado.jpg",
    brand: "Bosch",
    category: "alicates",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      comprimento: "8 polegadas",
      isolamento: "Até 1000V",
      material: "Aço cromo-vanádio"
    }
  },
  
  // Ferramentas Manuais - Chaves
  {
    id: "p3",
    name: "Conjunto de Chaves de Fenda Stanley 6 Peças",
    slug: "conjunto-chaves-fenda-stanley-6-pecas",
    description: "Conjunto completo com 6 chaves de fenda Stanley, incluindo 3 fendas simples e 3 phillips de diferentes tamanhos.",
    price: 56.99,
    oldPrice: 69.99,
    image: "/images/products-new/jogo-chaves.jpg",
    brand: "Stanley",
    category: "chaves",
    inStock: true,
    isNew: false,
    isFeatured: true,
    specifications: {
      pecas: "6",
      tipos: "Fenda simples e Phillips",
      material: "Aço cromo-vanádio com cabo ergonômico"
    }
  },
  
  // Ferramentas Elétricas - Furadeiras
  {
    id: "p4",
    name: "Furadeira de Impacto DeWalt 800W",
    slug: "furadeira-impacto-dewalt-800w",
    description: "Furadeira de impacto DeWalt com 800W de potência, mandril de 13mm e velocidade variável para diversos materiais.",
    price: 399.99,
    oldPrice: 459.99,
    image: "/images/products-new/furadeira-impacto.jpg",
    brand: "DeWalt",
    category: "furadeiras",
    inStock: true,
    isNew: true,
    isFeatured: true,
    specifications: {
      potencia: "800W",
      mandril: "13mm",
      velocidade: "0-3000 RPM",
      impacto: "0-51000 IPM"
    }
  },
  
  // Ferramentas Elétricas - Serras
  {
    id: "p5",
    name: "Serra Tico-Tico Makita 650W",
    slug: "serra-tico-tico-makita-650w",
    description: "Serra tico-tico Makita com 650W de potência, corte em ângulo de até 45° e ação pendular para cortes mais rápidos.",
    price: 499.99,
    oldPrice: 599.99,
    image: "/images/products-new/serra-tico-tico.jpg",
    brand: "Makita",
    category: "serras",
    inStock: true,
    isNew: false,
    isFeatured: true,
    specifications: {
      potencia: "650W",
      corte_madeira: "90mm",
      corte_aco: "10mm",
      velocidade: "0-3100 cursos/min",
      acao_pendular: "4 estágios"
    }
  },
  
  // Ferramentas Elétricas - Lixadeiras
  {
    id: "p6",
    name: "Esmerilhadeira Angular Bosch 850W",
    slug: "esmerilhadeira-angular-bosch-850w",
    description: "Esmerilhadeira angular Bosch com 850W de potência e disco de 4-1/2 polegadas, ideal para corte e desbaste de metal.",
    price: 299.99,
    oldPrice: 349.99,
    image: "/images/products-new/esmerilhadeira.jpg",
    brand: "Bosch",
    category: "lixadeiras",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      potencia: "850W",
      disco: "4-1/2 polegadas",
      velocidade: "11000 RPM",
      tensao: "220V",
      empunhadura_auxiliar: "Sim"
    }
  },
  
  // Equipamentos de Construção
  {
    id: "p7",
    name: "Betoneira 120L Menegotti",
    slug: "betoneira-120l-menegotti",
    description: "Betoneira com capacidade de 120 litros, motor de 1/2 HP monofásico e tambor em chapa de aço.",
    price: 1299.99,
    oldPrice: 1499.99,
    image: "/images/products-new/betoneira.jpg",
    brand: "Menegotti",
    category: "equipamentos-construcao",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      capacidade: "120L",
      motor: "1/2 HP",
      tensao: "220V",
      peso: "70kg"
    }
  },
  
  // Segurança - Capacetes
  {
    id: "p8",
    name: "Capacete de Segurança MSA Classe B",
    slug: "capacete-seguranca-msa-classe-b",
    description: "Capacete de segurança MSA Classe B para uso em construção civil, com suspensão ajustável e carneira.",
    price: 49.99,
    oldPrice: 59.99,
    image: "/images/products-new/capacete-obra.jpg",
    brand: "MSA",
    category: "capacetes",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      classe: "B",
      material: "Polietileno de alta densidade",
      cores: "Branco, Amarelo, Azul, Vermelho",
      ajuste: "Suspensão com catraca"
    }
  },
  
  // Segurança - Luvas
  {
    id: "p9",
    name: "Luva de Segurança Volk CA 37361",
    slug: "luva-seguranca-volk-ca-37361",
    description: "Luva de segurança Volk com palma em poliuretano e dorso em nylon, ideal para manuseio de peças e montagem.",
    price: 19.99,
    oldPrice: 24.99,
    image: "/images/products-new/luvas-seguranca.jpg",
    brand: "Volk",
    category: "luvas",
    inStock: true,
    isNew: true,
    isFeatured: false,
    specifications: {
      certificacao: "CA 37361",
      material: "Nylon com revestimento em PU",
      tamanhos: "P, M, G, XG",
      cor: "Preta"
    }
  },
  
  // Segurança - Óculos
  {
    id: "p10",
    name: "Óculos de Proteção 3M Virtua",
    slug: "oculos-protecao-3m-virtua",
    description: "Óculos de proteção 3M Virtua com lente em policarbonato, proteção contra impactos e tratamento antirrisco.",
    price: 29.99,
    oldPrice: 34.99,
    image: "/images/products-new/oculos-protecao.jpg",
    brand: "3M",
    category: "oculos",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      certificacao: "CA 34082",
      lente: "Policarbonato transparente",
      tratamento: "Antirrisco",
      protecao: "UV"
    }
  },
  
  // Acessórios
  {
    id: "p11",
    name: "Kit de Ferramentas DeWalt 185 Peças",
    slug: "kit-ferramentas-dewalt-185-pecas",
    description: "Kit completo DeWalt com 185 peças incluindo soquetes, chaves combinadas, alicates e muito mais em maleta resistente.",
    price: 599.99,
    oldPrice: 699.99,
    image: "/images/products-new/kit-ferramenta.jpg",
    brand: "DeWalt",
    category: "acessorios",
    inStock: true,
    isNew: true,
    isFeatured: true,
    specifications: {
      pecas: "185",
      soquetes: "1/4\", 3/8\" e 1/2\"",
      chaves: "Combinadas, allen e bits variados",
      estojo: "Maleta plástica robusta com travas metálicas"
    }
  },
  
  // Jardinagem
  {
    id: "p12",
    name: "Cortador de Grama a Gasolina Husqvarna 163cc",
    slug: "cortador-grama-husqvarna-163cc",
    description: "Cortador de grama a gasolina Husqvarna com motor de 163cc, 4 tempos, corte de 53cm e recolhedor.",
    price: 1999.99,
    oldPrice: 2299.99,
    image: "/images/products-new/cortador-grama.jpg",
    brand: "Husqvarna",
    category: "jardinagem",
    inStock: true,
    isNew: false,
    isFeatured: true,
    specifications: {
      motor: "163cc 4 tempos",
      corte: "53cm",
      altura: "6 posições",
      tracao: "Sim",
      recolhedor: "65L"
    }
  },
  
  // Sanitários - Torneiras
  {
    id: "p13",
    name: "Torneira para Banheiro Docol Link",
    slug: "torneira-banheiro-docol-link",
    description: "Torneira para banheiro Docol Link, monocomando, acabamento cromado e sistema de fechamento em 1/4 de volta.",
    price: 249.99,
    oldPrice: 299.99,
    image: "/images/products-new/torneira-banheiro.jpg",
    brand: "Docol",
    category: "torneiras",
    inStock: true,
    isNew: true,
    isFeatured: false,
    specifications: {
      material: "Latão com acabamento cromado",
      tipo: "Monocomando",
      bitola: "1/2\"",
      garantia: "10 anos"
    }
  },
  
  // Sanitários - Chuveiros
  {
    id: "p14",
    name: "Chuveiro Elétrico Lorenzetti Maxi Ducha 7500W",
    slug: "chuveiro-eletrico-lorenzetti-maxi-ducha-7500w",
    description: "Chuveiro elétrico Lorenzetti Maxi Ducha com 7500W de potência, 4 temperaturas e espalhador de 130mm.",
    price: 119.99,
    oldPrice: 139.99,
    image: "/images/products-new/chuveiro-eletrico.jpg",
    brand: "Lorenzetti",
    category: "chuveiros",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      potencia: "7500W",
      temperaturas: "4",
      espalhador: "130mm",
      pressao: "10 a 400 kPa"
    }
  },
  
  // Pintura - Tintas
  {
    id: "p15",
    name: "Tinta Látex PVA Suvinil 18L",
    slug: "tinta-latex-pva-suvinil-18l",
    description: "Tinta látex PVA Suvinil 18L, acabamento fosco, para paredes internas, secagem rápida e baixo odor.",
    price: 279.99,
    oldPrice: 319.99,
    image: "/images/products-new/tinta-latex.jpg",
    brand: "Suvinil",
    category: "tintas",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      volume: "18L",
      rendimento: "Até 300m² por demão",
      secagem: "4 horas",
      acabamento: "Fosco"
    }
  },
  
  // Pintura - Pincéis
  {
    id: "p16",
    name: "Conjunto de Pincéis Tigre 5 Peças",
    slug: "conjunto-pinceis-tigre-5-pecas",
    description: "Conjunto de pincéis Tigre com 5 peças de diferentes tamanhos, para tintas à base de água e esmaltes.",
    price: 59.99,
    oldPrice: 79.99,
    image: "/images/products-new/conjunto-pinceis.jpg",
    brand: "Tigre",
    category: "pinceis",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      pecas: "5",
      tamanhos: "1/2\", 1\", 1.1/2\", 2\", 3\"",
      cerda: "Sintética",
      cabo: "Madeira"
    }
  },
  
  // Pintura - Rolos
  {
    id: "p17",
    name: "Rolo para Pintura Tigre Antigota 23cm",
    slug: "rolo-pintura-tigre-antigota-23cm",
    description: "Rolo para pintura Tigre Antigota com 23cm, ideal para paredes lisas, com sistema anti-respingo e cabo ergonômico.",
    price: 39.99,
    oldPrice: 49.99,
    image: "/images/products-new/rolo-pintura.jpg",
    brand: "Tigre",
    category: "rolos",
    inStock: true,
    isNew: true,
    isFeatured: false,
    specifications: {
      largura: "23cm",
      material: "Poliamida",
      altura_pelo: "9mm",
      suporte: "Gaiola metálica com cabo plástico"
    }
  },
  
  // Materiais Abrasivos - Escovas
  {
    id: "p18",
    name: "Escova de Aço Geko Circular 75mm",
    slug: "escova-aco-geko-circular-75mm",
    description: "Escova de aço circular Geko com 75mm de diâmetro, ideal para limpeza e remoção de ferrugem em metais.",
    price: 29.99,
    oldPrice: 39.99,
    image: "/images/products/g70189.jpg", // Mantendo a imagem existente
    brand: "Geko",
    category: "escovas",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      diametro: "75mm",
      material: "Aço carbono",
      haste: "1/4\"",
      rotacao: "Até 4500 RPM"
    }
  },
  
  // Outros produtos para categorias específicas Geko
  {
    id: "p19",
    name: "Disco Diamantado Geko para Concreto 115mm",
    slug: "disco-diamantado-geko-concreto-115mm",
    description: "Disco diamantado Geko para corte de concreto, tijolos e materiais de construção, com 115mm de diâmetro.",
    price: 49.99,
    oldPrice: 69.99,
    image: "/images/products-new/disco-corte.jpg",
    brand: "Geko",
    category: "discos-diamantados-concreto",
    inStock: true,
    isNew: true,
    isFeatured: false,
    specifications: {
      diametro: "115mm",
      furo: "22.23mm",
      aplicacao: "Concreto, tijolos e materiais de construção",
      velocidade: "Até 13300 RPM"
    }
  },
  
  {
    id: "p20",
    name: "Compressor de Ar Schulz 20L 8.5 PCM",
    slug: "compressor-ar-schulz-20l",
    description: "Compressor de ar Schulz com reservatório de 20L, 8.5 PCM e 2HP de potência, ideal para pequenas oficinas.",
    price: 799.99,
    oldPrice: 899.99,
    image: "/images/products-new/compressor-ar.jpg",
    brand: "Schulz",
    category: "compressores",
    inStock: true,
    isNew: false,
    isFeatured: true,
    specifications: {
      potencia: "2HP",
      reservatorio: "20L",
      vazao: "8.5 PCM",
      pressao: "120 PSI",
      tensao: "127/220V"
    }
  },
  
  {
    id: "p21",
    name: "Gerador a Gasolina Honda EG6500 6.5 KVA",
    slug: "gerador-gasolina-honda-eg6500",
    description: "Gerador a gasolina Honda EG6500 com 6.5 KVA de potência, monofásico e partida elétrica, ideal para backup de energia.",
    price: 5999.99,
    oldPrice: 6999.99,
    image: "/images/products-new/gerador-energia.jpg",
    brand: "Honda",
    category: "pneumatica",
    inStock: true,
    isNew: false,
    isFeatured: true,
    specifications: {
      potencia: "6.5 KVA",
      motor: "Honda GX390",
      combustivel: "Gasolina",
      autonomia: "6.5h",
      partida: "Elétrica",
      tensao: "127/220V"
    }
  },
  
  {
    id: "p22",
    name: "Máscara de Solda Automática Geko MSAG-1",
    slug: "mascara-solda-automatica-geko-msag1",
    description: "Máscara de solda automática Geko MSAG-1 com escurecimento automático e ajuste de sensibilidade, para soldagem MIG, TIG e eletrodo.",
    price: 199.99,
    oldPrice: 249.99,
    image: "/images/products-new/mascara-solda.jpg",
    brand: "Geko",
    category: "mascaras-soldadura",
    inStock: true,
    isNew: true,
    isFeatured: false,
    specifications: {
      escurecimento: "DIN 9-13",
      tempo_reacao: "1/25000s",
      alimentacao: "Bateria de lítio + células solares",
      peso: "490g",
      aplicacao: "MIG, TIG, MMA"
    }
  },
  
  {
    id: "p23",
    name: "Nível Laser Bosch GLL 2-12 G Verde",
    slug: "nivel-laser-bosch-gll-2-12-g",
    description: "Nível laser Bosch GLL 2-12 G com linhas verdes horizontais e verticais, alcance de 12m e suporte multifuncional.",
    price: 699.99,
    oldPrice: 799.99,
    image: "/images/products-new/nivel-laser.jpg",
    brand: "Bosch",
    category: "niveis-laser",
    inStock: true,
    isNew: true,
    isFeatured: true,
    specifications: {
      tipo: "Linhas cruzadas",
      cor_feixe: "Verde",
      alcance: "12m",
      precisao: "±0.3mm/m",
      alimentacao: "3 pilhas AA"
    }
  },
  
  {
    id: "p24",
    name: "Alicate Amperímetro Digital Hikari HA-3700",
    slug: "alicate-amperimetro-digital-hikari-ha3700",
    description: "Alicate amperímetro digital Hikari HA-3700 com display LCD, medição de corrente AC/DC, tensão, resistência e continuidade.",
    price: 149.99,
    oldPrice: 179.99,
    image: "/images/products-new/alicate-amperimetro.jpg",
    brand: "Hikari",
    category: "medidores-eletricos",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      display: "LCD 3 1/2 dígitos",
      corrente: "AC/DC até 1000A",
      tensao: "AC/DC até 750V/1000V",
      resistencia: "Até 2000Ω",
      precisao: "±2%"
    }
  },
  
  {
    id: "p25",
    name: "Trena Laser Digital Stanley TLM165",
    slug: "trena-laser-digital-stanley-tlm165",
    description: "Trena laser digital Stanley TLM165 com alcance de 50m, precisão de ±1.5mm e funções de área, volume e Pitágoras.",
    price: 399.99,
    oldPrice: 449.99,
    image: "/images/products-new/trena-laser.jpg",
    brand: "Stanley",
    category: "trenas",
    inStock: true,
    isNew: true,
    isFeatured: false,
    specifications: {
      alcance: "50m",
      precisao: "±1.5mm",
      funcoes: "Área, volume, Pitágoras",
      display: "LCD retroiluminado",
      alimentacao: "2 pilhas AAA"
    }
  },
  
  // Adicionando mais produtos para categorias Geko
  {
    id: "p26",
    name: "Broca para Concreto SDS-Plus Bosch 10mm",
    slug: "broca-concreto-sds-plus-bosch-10mm",
    description: "Broca para concreto SDS-Plus Bosch com 10mm de diâmetro e comprimento útil de 150mm, ideal para furos em concreto e alvenaria.",
    price: 39.99,
    oldPrice: 49.99,
    image: "/images/products-new/broca-concreto.jpg",
    brand: "Bosch",
    category: "brocas-diamantadas",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      diametro: "10mm",
      comprimento_util: "150mm",
      comprimento_total: "210mm",
      encaixe: "SDS-Plus",
      material: "Metal duro com ponta de carboneto de tungstênio"
    }
  },
  
  {
    id: "p27",
    name: "Parafusadeira/Furadeira a Bateria Makita 12V",
    slug: "parafusadeira-furadeira-bateria-makita-12v",
    description: "Parafusadeira/Furadeira a bateria Makita 12V com 2 baterias, carregador, 21 níveis de torque e mandril de 10mm.",
    price: 549.99,
    oldPrice: 649.99,
    image: "/images/products-new/parafusadeira.jpg",
    brand: "Makita",
    category: "ferramentas-eletricas",
    inStock: true,
    isNew: true,
    isFeatured: true,
    specifications: {
      potencia: "12V",
      baterias: "2 de Li-Ion",
      mandril: "10mm",
      torque: "21 níveis + perfuração",
      velocidade: "0-350/0-1300 RPM",
      peso: "1.1kg"
    }
  },
  
  {
    id: "p28",
    name: "Pistola de Cola Quente Profissional 100W",
    slug: "pistola-cola-quente-profissional-100w",
    description: "Pistola de cola quente profissional com 100W de potência, bico metálico e base de apoio, para bastões de 11mm.",
    price: 89.99,
    oldPrice: 109.99,
    image: "/images/products-new/pistola-cola.jpg",
    brand: "Tramontina",
    category: "pistolas-cola",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      potencia: "100W",
      bastao: "11mm",
      bico: "Metálico",
      tensao: "127/220V",
      gatilho: "Acionamento suave"
    }
  },
  
  {
    id: "p29",
    name: "Pistola de Pintura HVLP Dewalt 600W",
    slug: "pistola-pintura-hvlp-dewalt-600w",
    description: "Pistola de pintura HVLP Dewalt com 600W, bico de 1.8mm e sistema de alta transferência para menos desperdício.",
    price: 449.99,
    oldPrice: 499.99,
    image: "/images/products-new/pistola-pintura.jpg",
    brand: "DeWalt",
    category: "pistolas-pintura",
    inStock: true,
    isNew: true,
    isFeatured: false,
    specifications: {
      potencia: "600W",
      capacidade: "1000ml",
      bico: "1.8mm",
      tecnologia: "HVLP",
      vazao: "900ml/min",
      pressao: "0.1-0.3 bar"
    }
  },
  
  {
    id: "p30",
    name: "Talhadeira SDS-Max Bosch 400mm",
    slug: "talhadeira-sds-max-bosch-400mm",
    description: "Talhadeira SDS-Max Bosch com 400mm de comprimento total, ponta chata, ideal para quebrar concreto e alvenaria.",
    price: 129.99,
    oldPrice: 149.99,
    image: "/images/products-new/talhadeira.jpg",
    brand: "Bosch",
    category: "talhadeiras-puncoes",
    inStock: true,
    isNew: false,
    isFeatured: false,
    specifications: {
      encaixe: "SDS-Max",
      comprimento: "400mm",
      largura_ponta: "25mm",
      material: "Aço cromo-molibdênio",
      aplicacao: "Concreto e alvenaria"
    }
  }
];

// Função para obter os produtos adicionais
export function getAdditionalProducts() {
  return additionalProducts;
} 