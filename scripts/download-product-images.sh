#!/bin/bash

# Mudar para o diretório do script
cd "$(dirname "$0")/.."

# Instalar dependências necessárias
echo "Instalando dependências necessárias..."
npm install axios

# Executar o script de download
echo "Iniciando download de imagens de produtos..."
node scripts/download-product-images.js

echo "Processo de download de imagens concluído!" 