// Import generated products into data.ts
import { allProducts, setProducts, categories, addCategories } from './data';
import { generatedProducts } from './data_generated_products';

// Flag to track if products have been imported
let hasImportedProducts = false;

export function importGeneratedProducts() {
  // Verificar se os produtos já foram importados pela verificação do tamanho
  if (allProducts.length > 100 || hasImportedProducts) {
    console.log(`Produtos já foram importados anteriormente. Total atual: ${allProducts.length}`);
    
    // Importante: retornar o array atualizado mesmo que já tenha sido importado
    return allProducts;
  }
  
  console.log(`Importando produtos: ${allProducts.length} produtos existentes + ${generatedProducts.length} produtos gerados`);
  
  try {
    // Add generated products to the existing products
    const updatedProducts = [...allProducts];
    
    // Adicionar apenas produtos que não existem ainda, verificando pelo id
    const existingIds = new Set(updatedProducts.map(p => p.id));
    let newProductsCount = 0;
    
    generatedProducts.forEach(product => {
      if (!existingIds.has(product.id)) {
        updatedProducts.push(product);
        existingIds.add(product.id);
        newProductsCount++;
      }
    });
    
    // Atualizar o array global de produtos apenas se tiver novos produtos
    if (newProductsCount > 0) {
      setProducts(updatedProducts);
      console.log(`Adicionados ${newProductsCount} novos produtos`);
    }
    
    // Make sure all subcategories are included in categories
    const subcategories = new Set();
    generatedProducts.forEach(product => {
      subcategories.add(product.category);
    });
    
    // Add any missing subcategories
    const newCategories = Array.from(subcategories).filter(
      category => !categories.some(c => c.slug === category)
    ).map(category => ({
      id: `cat-${Math.random().toString(36).substring(2, 9)}`,
      name: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      slug: category,
      subcategories: [],
      description: `Produtos da categoria ${category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
      isFeatured: false
    }));
    
    if (newCategories.length > 0) {
      addCategories(newCategories);
      console.log(`Adicionadas ${newCategories.length} novas categorias`);
    }
    
    console.log(`Total de produtos após importação: ${updatedProducts.length}`);
    
    // Set flag to prevent re-import
    hasImportedProducts = true;
    
    return updatedProducts;
  } catch (error) {
    console.error("Erro ao importar produtos:", error);
    return allProducts; // Retorna os produtos existentes em caso de erro
  }
}
