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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact: info@alitools.pt 