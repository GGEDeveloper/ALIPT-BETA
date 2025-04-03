# ALIPT - Professional Tools E-commerce Platform

## Project Overview

ALIPT is a modern e-commerce platform for professional tools and equipment, featuring an intuitive user interface, comprehensive product catalog, and seamless shopping experience. The platform combines a Next.js frontend with data from various sources, including the Geko B2B catalog.

## Repository Structure

The project is organized into two main components:

1. **Frontend (root directory)** - The main Next.js e-commerce website
2. **Data Tools (/tools/geko-scraper)** - Data scraping tools for the Geko B2B catalog

### Core Technologies

#### Frontend
- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - For type safety and improved developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Context API** - For state management (cart, user authentication)

#### Data Tools
- **Python** - Core scripting language for web scraping
- **BeautifulSoup** - HTML parsing and data extraction
- **SQLite** - Local database for product storage
- **Custom Export Tools** - For converting data to TypeScript/JSON

## Getting Started

### Prerequisites
- Node.js 18.17.0 or later
- npm or yarn
- Python 3.8+ (for scraper tools)
- Git

### Installation and Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/GGEDeveloper/ALIPT.git
cd ALIPT
```

#### 2. Frontend Setup
```bash
npm install
npm run dev
```
The website will be available at http://localhost:3004

#### 3. Scraper Setup
```bash
cd tools/geko-scraper
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Project Components

### E-commerce Frontend

#### Key Features
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Product Catalog** - Organized by categories with filtering and sorting
- **Shopping Cart** - Add, remove, and update product quantities
- **User Authentication** - Login, registration, and account management
- **Product Detail Pages** - Comprehensive product information
- **Search Functionality** - Find products easily
- **Contact Form** - Direct communication with the company

#### Homepage Structure
The homepage is organized into the following sections:

1. **Hero Section**: 
   - Background color: rgb(140,140,140) (cinza)
   - Features a large ALITOOLS logo, headline, and description
   - Primary CTA buttons for products and contact

2. **Featured Categories**:
   - Modular component that dynamically displays product categories
   - Each category with image, title, and link to category page

3. **Featured Products Carousel**:
   - 3D carousel effect that shows adjacent products
   - Interactive navigation with next/previous controls
   - Responsive design adapts to different screen sizes

4. **Promotions Carousel**:
   - Displays products on sale with reduced pricing
   - Compact design to minimize vertical space
   - Includes "Ver todos" link to view all promotions

5. **Features Section**:
   - Grid layout with 4 key selling points:
     - Qualidade Garantida (Quality Guarantee)
     - Garantia Total (Total Warranty)
     - Entrega Rápida (Fast Delivery)
     - Apoio Técnico (Technical Support)
   - Each feature with icon and description

6. **CTA Section**:
   - Background color: #FFC03A (light orange)
   - Title: "Precisa de Ajuda a Escolher as Ferramentas Certas?"
   - Buttons for contact and about us pages

7. **Footer**:
   - Contains company information, navigation, and social links

### Custom Components

#### Header
- Fixed positioning at the top of all pages
- Responsive navigation menu
- Enlarged logo for better brand visibility
- Shopping cart and user account links

#### Product Carousels
- **Product3DCarousel.tsx**: Special 3D effect for featured products
  - Width: 56rem (w-56)
  - Added padding for better display of product borders
  - Height adjusts responsively (h-[320px] on smaller screens)

- **ProductCarousel.tsx**: Standard carousel used for promotions
  - Reduced vertical padding (py-6)
  - Smaller title size for efficiency (text-xl md:text-2xl)
  - Condensed controls and indicators to save space

#### FeaturedCategories
- Modular component for displaying product categories
- Grid layout adapts from 2 columns on mobile to 4 columns on desktop

### Categorias do Geko

Novas categorias do catálogo Geko foram adicionadas ao projeto:

1. **Materiais Abrasivos**
2. **Construção e Renovação**
3. **Ferramentas de Corte**
4. **Ferramentas Diamantadas**
5. **Ferramentas Mecânicas Gerais**
6. **Artigos de Saúde e Segurança**
7. **Aquecedores e Radiadores**
8. **Artigos Domésticos**
9. **Ferramentas de Junção**
10. **Ferramentas Laser**
11. **Ferramentas de Medição**
12. **Pneumática**
13. **Aspiradores**
14. **Equipamentos de Soldadura**
15. **Ferramentas para Eletricistas**
16. **Ferramentas para Canalizadores**
17. **Ferramentas para Oficina e Garagem**
18. **Equipamento Turístico**

#### Implementação das Categorias
As categorias foram implementadas nas seguintes partes da aplicação:

1. **Dados** - Definidas em `/lib/data.ts` com suas respectivas subcategorias
2. **Homepage** - Integradas no componente `FeaturedCategories.tsx`
3. **Página de Produtos** - Sidebar de navegação completa com todas as categorias e subcategorias
4. **Banner Informativo** - Adicionado na página de produtos para destacar as novas categorias

#### Tarefas Pendentes para Categorias Geko
- [ ] Criar imagens específicas para cada categoria (atualmente usando placeholder em `/images/categories/placeholder.png`)
- [ ] Criar ícones para categorias e subcategorias (atualmente usando placeholder em `/images/icons/categories/placeholder.avif`)
- [ ] Completar a tradução das subcategorias
- [ ] Vincular produtos às novas categorias
- [ ] Otimizar a navegação para o número expandido de categorias

### Data Scraper

#### Key Features
- **Web Scraping** - Extracts product data from Geko B2B website
- **Data Storage** - Saves to SQLite database and JSON files
- **Image Download** - Retrieves and stores product images
- **Catalog Traversal** - Pagination support for large catalogs
- **Data Export** - Converts data to formats usable by the frontend

## Development Workflow

### Frontend Development
```bash
npm run dev
```

### Running the Scraper
```bash
cd tools/geko-scraper
python catalog_scraper.py
```

### Exporting Data for Frontend
```bash
cd tools/geko-scraper
python export_to_ts.py
```

## Project Roadmap and To-Do List

### High Priority
- [x] Design and implement homepage with all key sections
- [x] Create responsive product carousels with 3D effects
- [x] Implement fixed header across all pages
- [x] Integrar as categorias do catálogo Geko
- [ ] Complete product catalog scraping from Geko B2B
- [ ] Implement user authentication system
- [ ] Fix login modal functionality
- [ ] Add proper checkout flow
- [ ] Improve responsive design for mobile devices

### Medium Priority
- [ ] Add filtering by price range
- [ ] Implement product search functionality
- [ ] Create admin dashboard for product management
- [ ] Add product recommendations
- [ ] Set up automated data synchronization

### Low Priority
- [ ] Add internationalization support
- [ ] Implement customer reviews
- [ ] Add wishlist functionality
- [ ] Create email notification system
- [ ] Add product comparisons

## Color Scheme
- Primary Orange: #FFC03A (lighter shade used for homepage background)
- Dark Gray: rgb(140,140,140) (used for hero section background)
- Light Gray: rgb(198,198,198) (used for feature icons background)
- White: rgb(255,255,255) (used for cards and sections background)
- Dark Text: rgb(25,25,25) (used for headings)
- Gray Text: rgb(140,140,140) (used for descriptions)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact: info@alitools.pt

## Funcionalidades Principais

- Interface responsiva e moderna
- Catálogo de produtos completo com filtros e busca
- Visualização detalhada de produtos
- Carrinho de compras funcional
- Painel administrativo
- Sistema de autenticação com diferentes níveis de acesso
- **Restrição de preços e estoque** - Preços e informações de estoque só visíveis para usuários logados

## Documentação

A documentação detalhada do projeto pode ser encontrada na pasta `/docs`:

- [Restrição de Preços e Estoque](/docs/restricao-preco-estoque.md) - Documentação da funcionalidade de exibição de preços e estoque apenas para usuários logados.
- [Componentes de Autenticação](/docs/componentes-autenticacao.md) - Detalhes sobre o sistema de autenticação e seus componentes.
- [Exemplos de Uso da Autenticação](/docs/exemplo-uso-auth.md) - Exemplos práticos de uso do contexto de autenticação em diferentes componentes. 