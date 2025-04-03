#!/bin/bash

cd "$(dirname "$0")/.."

# Install required dependencies
echo "Installing required dependencies..."
npm install --save axios canvas

# Create directory for product images if it doesn't exist
mkdir -p public/images/products-new

# Run the product generator
echo "Generating products..."
node scripts/generate-products.js

# Import the generated products by adding a temporary import to app/page.tsx
echo "Updating app/page.tsx to import generated products..."
node -e '
const fs = require("fs");
const path = require("path");
const filePath = path.join(process.cwd(), "app", "page.tsx");

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, "utf8");

  // Check if import already exists
  if (!content.includes("import_generated_products")) {
    // Find the first import statement
    const importIndex = content.indexOf("import");
    
    // Add the import statement after the first import
    const newImportStatement = `import "../lib/import_generated_products";
// Automatically import generated products
import { importGeneratedProducts } from "../lib/import_generated_products";
// Call the import function to add the products
importGeneratedProducts();
`;
    
    // Insert after the last import
    const lastImportEndIndex = content.lastIndexOf("import") + content.substring(content.lastIndexOf("import")).indexOf(";") + 1;
    const newContent = content.slice(0, lastImportEndIndex) + "\n" + newImportStatement + content.slice(lastImportEndIndex);
    
    fs.writeFileSync(filePath, newContent);
    console.log("Added import to app/page.tsx");
  } else {
    console.log("Import already exists in app/page.tsx");
  }
} else {
  console.error("Could not find app/page.tsx file");
}
'

echo "Product generation complete!"
echo "Total products generated: $(grep -o 'id:' lib/data_generated_products.ts | wc -l)"
echo "Remember to restart the Next.js server to see the changes" 