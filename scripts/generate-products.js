const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
const axios = require('axios');
const https = require('https');

// Create directories if they don't exist
const productsImagesDir = path.join(__dirname, '..', 'public', 'images', 'products-new');
if (!fs.existsSync(productsImagesDir)) {
  fs.mkdirSync(productsImagesDir, { recursive: true });
}

// Define categories and subcategories based on the structure
const categories = {
  "ferramentas-manuais": {
    name: "Ferramentas Manuais",
    subcategories: [
      "martelos",
      "alicates",
      "chaves",
      "serras-manuais",
      "formoes",
      "limas",
      "graminhos",
      "plainas",
      "trenas"
    ]
  },
  "ferramentas-eletricas": {
    name: "Ferramentas Elétricas",
    subcategories: [
      "furadeiras",
      "serras",
      "lixadeiras",
      "esmerilhadeiras",
      "parafusadeiras",
      "plainas-eletricas",
      "sopradores-termicos",
      "compressores"
    ]
  },
  "equipamentos-construcao": {
    name: "Equipamentos de Construção",
    subcategories: [
      "betoneiras",
      "geradores",
      "andaimes",
      "escadas",
      "carrinhos-mao",
      "vibradores-concreto"
    ]
  },
  "seguranca": {
    name: "Segurança",
    subcategories: [
      "capacetes",
      "luvas",
      "oculos-protecao",
      "protetores-auriculares",
      "mascaras-respiratorias",
      "calcados-seguranca"
    ]
  },
  "acessorios": {
    name: "Acessórios",
    subcategories: [
      "brocas",
      "discos-corte",
      "lixas",
      "bits-ponteiras",
      "fitas-adesivas",
      "abraçadeiras"
    ]
  },
  "jardinagem": {
    name: "Jardinagem",
    subcategories: [
      "cortadores-grama",
      "aparadores-grama",
      "tesouras-poda",
      "pulverizadores",
      "mangueiras",
      "ferramentas-jardinagem"
    ]
  },
  "sanitarios": {
    name: "Sanitários",
    subcategories: [
      "torneiras",
      "chuveiros",
      "tubos-conexoes",
      "valvulas",
      "sifoes",
      "caixas-agua"
    ]
  },
  "pintura": {
    name: "Pintura",
    subcategories: [
      "pinceis",
      "rolos",
      "pistolas-pintura",
      "espátulas",
      "lixas-pintura",
      "fitas-pintura"
    ]
  }
};

// Define brands for products
const brands = [
  "GEKO", "Bosch", "DeWalt", "Makita", "Stanley", "Black+Decker", 
  "Milwaukee", "Tramontina", "Vonder", "Stihl", "Husqvarna",
  "Metabo", "Ridgid", "Irwin", "Wesco", "Wurth", "Gedore",
  "Fortg", "Starrett", "3M", "Norton", "Bellota", "Grupo SH",
  "Famastil", "Bosh", "Hikoki", "Worx", "Westfer", "MTX", "Docol"
];

// Plausible product specifications for each category
const specifications = {
  "martelos": {
    peso: ["8oz", "12oz", "16oz", "20oz", "24oz", "32oz"],
    material: ["Aço forjado", "Aço forjado com cabo de fibra de vidro", "Aço forjado com cabo de madeira"],
    comprimento: ["25cm", "30cm", "35cm", "40cm"]
  },
  "alicates": {
    comprimento: ["6 polegadas", "7 polegadas", "8 polegadas", "10 polegadas"],
    isolamento: ["Não isolado", "Até 1000V"],
    material: ["Aço cromo-vanádio", "Aço carbono", "Aço liga"]
  },
  // Adding specs for all categories would be too long, but following the same pattern for others
};

// Helper function to get a random item from an array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get a random price between min and max
function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

// Helper function to generate a unique ID
function generateUniqueId(existingIds) {
  let id;
  do {
    id = "p" + Math.floor(10000 + Math.random() * 90000);
  } while (existingIds.includes(id));
  existingIds.push(id);
  return id;
}

// Function to create product variations
function createProductVariations(baseProduct, count, existingIds) {
  const variations = [];
  const variationTypes = ["tamanho", "cor", "potencia", "modelo"];
  const variationType = getRandomItem(variationTypes);
  
  let variationValues;
  switch (variationType) {
    case "tamanho":
      variationValues = ["Pequeno", "Médio", "Grande", "Extra Grande"];
      break;
    case "cor":
      variationValues = ["Azul", "Vermelho", "Preto", "Amarelo", "Verde"];
      break;
    case "potencia":
      variationValues = ["650W", "750W", "850W", "1000W", "1200W"];
      break;
    case "modelo":
      variationValues = ["Básico", "Profissional", "Premium", "Industrial"];
      break;
  }
  
  for (let i = 0; i < count; i++) {
    if (i < variationValues.length) {
      const variation = {...baseProduct};
      variation.id = generateUniqueId(existingIds);
      variation.name = `${baseProduct.name} - ${variationValues[i]}`;
      variation.slug = `${baseProduct.slug}-${variationValues[i].toLowerCase().replace(/\s+/g, '-')}`;
      
      // Adjust price slightly for variations
      const priceAdjustment = (Math.random() * 0.2 + 0.9).toFixed(2); // 0.9 to 1.1
      variation.price = (baseProduct.price * priceAdjustment).toFixed(2);
      variation.oldPrice = (baseProduct.oldPrice * priceAdjustment).toFixed(2);
      
      // Add variation attribute to specifications
      variation.specifications = {...baseProduct.specifications};
      variation.specifications[variationType] = variationValues[i];
      
      variations.push(variation);
    }
  }
  
  return variations;
}

// Replace the downloadProductImages function with a function to generate placeholder images
async function downloadProductImages() {
  console.log("Creating placeholder product images...");
  
  const downloadedImages = [];
  let counter = 1;
  
  // Define colors for different categories
  const categoryColors = {
    "ferramentas-manuais": "#E74C3C",
    "ferramentas-eletricas": "#3498DB",
    "equipamentos-construcao": "#F39C12",
    "seguranca": "#2ECC71",
    "acessorios": "#9B59B6",
    "jardinagem": "#27AE60",
    "sanitarios": "#1ABC9C",
    "pintura": "#E67E22"
  };
  
  // Create placeholder images for each subcategory
  for (const category in categories) {
    const subcategories = categories[category].subcategories;
    const categoryColor = categoryColors[category] || "#34495E";
    
    for (const subcategory of subcategories) {
      // Create multiple images per subcategory
      const imagesToGenerate = 5;
      
      for (let i = 0; i < imagesToGenerate; i++) {
        const imageName = `${subcategory}-${counter}.jpg`;
        const imagePath = path.join(productsImagesDir, imageName);
        
        // Create a canvas for the image
        const canvas = createCanvas(300, 300);
        const ctx = canvas.getContext('2d');
        
        // Fill background
        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw colored rectangle
        ctx.fillStyle = categoryColor;
        ctx.fillRect(30, 30, 240, 240);
        
        // Add border
        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 2;
        ctx.strokeRect(30, 30, 240, 240);
        
        // Add text
        ctx.fillStyle = "#FFFFFF";
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(subcategory.toUpperCase(), 150, 130);
        
        // Add counter
        ctx.font = 'bold 36px Arial';
        ctx.fillText(i + 1, 150, 180);
        
        // Save image
        const buffer = canvas.toBuffer('image/jpeg');
        fs.writeFileSync(imagePath, buffer);
        
        console.log(`Created image ${imageName}`);
        downloadedImages.push({
          category: category,
          subcategory: subcategory,
          path: `/images/products-new/${imageName}`
        });
        counter++;
      }
    }
  }
  
  console.log(`Created ${downloadedImages.length} placeholder images`);
  return downloadedImages;
}

// Function to generate products
async function generateProducts() {
  const existingIds = [];
  const products = [];
  const totalProducts = 2000;
  
  // First, download product images
  console.log("Downloading product images...");
  const productImages = await downloadProductImages();
  
  if (productImages.length === 0) {
    console.error("No images downloaded. Using placeholder images instead.");
    
    // Generate placeholder images as a fallback
    for (const category in categories) {
      const subcategories = categories[category].subcategories;
      for (const subcategory of subcategories) {
        for (let i = 0; i < 5; i++) {
          productImages.push({
            category: category,
            subcategory: subcategory,
            path: `/images/products-new/placeholder-${subcategory}-${i+1}.jpg`
          });
        }
      }
    }
  }
  
  console.log(`Downloaded ${productImages.length} images.`);
  
  // Generate products for each subcategory
  let productsToGenerate = totalProducts;
  
  // Count total subcategories
  let totalSubcategories = 0;
  for (const category in categories) {
    totalSubcategories += categories[category].subcategories.length;
  }
  
  // Calculate average products per subcategory
  const avgProductsPerSubcategory = Math.ceil(productsToGenerate / totalSubcategories);
  
  for (const category in categories) {
    const subcategories = categories[category].subcategories;
    
    for (const subcategory of subcategories) {
      // Get images for this subcategory
      const subcategoryImages = productImages.filter(
        img => img.subcategory === subcategory || img.category === category
      );
      
      // If no specific images, use any image
      const imagesToUse = subcategoryImages.length > 0 ? subcategoryImages : productImages;
      
      // Generate products for this subcategory
      const productsForSubcategory = Math.min(
        avgProductsPerSubcategory,
        productsToGenerate
      );
      
      for (let i = 0; i < productsForSubcategory; i++) {
        const productId = generateUniqueId(existingIds);
        const brand = getRandomItem(brands);
        
        // Generate product name based on subcategory
        let productName;
        switch (subcategory) {
          case "martelos":
            productName = `Martelo ${getRandomItem(["de Carpinteiro", "de Borracha", "de Unha", "de Bola"])} ${brand} ${getRandomItem(specifications.martelos.peso || ["Pro"])}`;
            break;
          case "alicates":
            productName = `Alicate ${getRandomItem(["Universal", "de Corte", "de Bico", "de Pressão"])} ${brand} ${getRandomItem(specifications.alicates.comprimento || ["8 Polegadas"])}`;
            break;
          // Add more specific subcategories here
          default:
            // Generic product name generation
            const adjectives = ["Profissional", "Premium", "Industrial", "Residencial", "Robusto", "Avançado"];
            productName = `${getRandomItem(adjectives)} ${subcategory.replace(/-/g, ' ')} ${brand}`;
            
            // Capitalize first letter of each word
            productName = productName.split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
        }
        
        // Create slug from product name
        const slug = productName
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        // Generate random price between 10 and 2000
        const price = parseFloat(getRandomPrice(10, 2000));
        const oldPrice = (price * (Math.random() * 0.3 + 1.1)).toFixed(2); // 10-40% higher
        
        // Get random image for this product
        const productImage = getRandomItem(imagesToUse).path;
        
        // Generate generic product description
        const description = `${productName} de alta qualidade. Produto ${getRandomItem(["profissional", "premium", "industrial", "robusto"])} para uso ${getRandomItem(["residencial", "profissional", "industrial", "em obras"])}.`;
        
        // Generate product specifications
        const specs = {};
        
        // Add some basic specs
        specs.marca = brand;
        specs.modelo = `${brand}-${Math.floor(1000 + Math.random() * 9000)}`;
        
        // Add category-specific specs if available
        if (specifications[subcategory]) {
          for (const spec in specifications[subcategory]) {
            specs[spec] = getRandomItem(specifications[subcategory][spec]);
          }
        }
        
        // Create the product
        const product = {
          id: productId,
          name: productName,
          slug: slug,
          description: description,
          price: parseFloat(price),
          oldPrice: parseFloat(oldPrice),
          image: productImage,
          brand: brand,
          category: subcategory,
          inStock: Math.random() > 0.1, // 90% chance of being in stock
          isNew: Math.random() > 0.7,   // 30% chance of being new
          isFeatured: Math.random() > 0.8, // 20% chance of being featured
          specifications: specs
        };
        
        products.push(product);
        
        // Create variations for some products (20% chance)
        if (Math.random() > 0.8) {
          const numVariations = Math.floor(Math.random() * 3) + 2; // 2-4 variations
          const variations = createProductVariations(product, numVariations, existingIds);
          products.push(...variations);
          
          // Subtract the variations from the remaining products to generate
          productsToGenerate -= variations.length;
        }
        
        productsToGenerate--;
      }
      
      if (productsToGenerate <= 0) break;
    }
    
    if (productsToGenerate <= 0) break;
  }
  
  console.log(`Generated ${products.length} products.`);
  
  // Write the products to a file as a TypeScript module
  const outputPath = path.join(__dirname, '..', 'lib', 'data_generated_products.ts');
  
  const fileContent = `// Generated products
import { Product } from './data';

export const generatedProducts: Product[] = ${JSON.stringify(products, null, 2)};

export function getGeneratedProducts() {
  return generatedProducts;
}
`;
  
  fs.writeFileSync(outputPath, fileContent);
  console.log(`Products written to ${outputPath}`);
  
  // Create a file to import the generated products
  const importPath = path.join(__dirname, '..', 'lib', 'import_generated_products.ts');
  
  const importContent = `// Import generated products into data.ts
import { allProducts, setProducts, allCategories, addCategories } from './data';
import { generatedProducts } from './data_generated_products';

export function importGeneratedProducts() {
  // Add generated products to the existing products
  const updatedProducts = [...allProducts, ...generatedProducts];
  setProducts(updatedProducts);
  
  // Make sure all subcategories are included in allCategories
  const subcategories = new Set();
  generatedProducts.forEach(product => {
    subcategories.add(product.category);
  });
  
  // Add any missing subcategories
  const newCategories = Array.from(subcategories).filter(
    category => !allCategories.some(c => c.slug === category)
  ).map(category => ({
    name: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    slug: category,
    description: \`Produtos da categoria \${category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}\`,
    isFeatured: false
  }));
  
  if (newCategories.length > 0) {
    addCategories(newCategories);
  }
  
  console.log(\`Imported \${generatedProducts.length} generated products\`);
  console.log(\`Added \${newCategories.length} new categories\`);
  
  return updatedProducts;
}
`;
  
  fs.writeFileSync(importPath, importContent);
  console.log(`Import file written to ${importPath}`);
}

// Run the product generator
generateProducts().catch(console.error); 