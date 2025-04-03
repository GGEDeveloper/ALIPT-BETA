#!/bin/bash

# Ensure the target directory exists
mkdir -p /home/pixie/test1/ALIPT_clean/public/images/icons/categories

# Map the SVG files to category slugs and convert them
# Format: convert_icon "source_svg_filename" "target_category_slug"

convert_icon() {
  source_file="/home/pixie/test1/ALIPT_clean/category-icons/$1"
  target_slug="$2"
  target_file="/home/pixie/test1/ALIPT_clean/public/images/icons/categories/${target_slug}.png"
  
  echo "Converting $1 to ${target_slug}.png"
  
  # Use ImageMagick to convert SVG to PNG (64x64)
  convert -background none -size 64x64 "$source_file" "$target_file"
  
  # Check if conversion was successful
  if [ $? -eq 0 ]; then
    echo "✅ Converted to $target_file"
  else
    echo "❌ Failed to convert $source_file"
  fi
}

# Main categories
convert_icon "elektronarzedzia.svg" "ferramentas-eletricas"
convert_icon "budowa-remont.svg" "equipamentos-construcao"
convert_icon "bhp.svg" "seguranca"
convert_icon "ogrod.svg" "jardinagem"
convert_icon "narzedzia-dla-hydraulikow.svg" "sanitarios"
convert_icon "materialy-scierne.svg" "materiais-abrasivos"
convert_icon "budowa-remont.svg" "construcao-renovacao"
convert_icon "narzedzia-tnace.svg" "ferramentas-corte"
convert_icon "elektronarzedzia.svg" "ferramentas-diamantadas"
convert_icon "elektronarzedzia.svg" "ferramentas-mecanicas-gerais"
convert_icon "bhp.svg" "artigos-saude-seguranca"
convert_icon "nagrzewnice.svg" "aquecedores-radiadores"
convert_icon "agd.svg" "artigos-domesticos"
convert_icon "elektronarzedzia.svg" "ferramentas-juncao"
convert_icon "narzedzia-laserowe.svg" "ferramentas-laser"
convert_icon "narzedzia pomiarowe.svg" "ferramentas-medicao"
convert_icon "Pneumatyka.svg" "pneumatica"
convert_icon "odkurzacze.svg" "aspiradores"
convert_icon "sprzet-spawalniczy.svg" "equipamentos-soldadura"
convert_icon "narzedzia-dla-elektrykow.svg" "ferramentas-eletricistas"
convert_icon "narzedzia-dla-hydraulikow.svg" "ferramentas-canalizadores"
convert_icon "narzedzia do warsztatu i garazu.svg" "ferramentas-oficina-garagem"
convert_icon "akcesoria-turystyczne.svg" "equipamento-turistico"
convert_icon "elektronarzedzia.svg" "ferramentas-manuais"
convert_icon "elektronarzedzia.svg" "acessorios"
convert_icon "ogrod.svg" "pintura"

# Subcategories that need specific icons
convert_icon "elektronarzedzia.svg" "martelos"
convert_icon "elektronarzedzia.svg" "alicates"
convert_icon "elektronarzedzia.svg" "chaves"
convert_icon "elektronarzedzia.svg" "furadeiras"
convert_icon "elektronarzedzia.svg" "serras"
convert_icon "elektronarzedzia.svg" "lixadeiras"
convert_icon "bhp.svg" "capacetes"
convert_icon "bhp.svg" "luvas"
convert_icon "bhp.svg" "oculos"
convert_icon "narzedzia-dla-hydraulikow.svg" "torneiras"
convert_icon "narzedzia-dla-hydraulikow.svg" "chuveiros"
convert_icon "ogrod.svg" "tintas"
convert_icon "ogrod.svg" "pinceis"
convert_icon "ogrod.svg" "rolos"
convert_icon "materialy-scierne.svg" "escovas"
convert_icon "elektronarzedzia.svg" "pistolas-cola"
convert_icon "Pneumatyka.svg" "pistolas-pintura"
convert_icon "elektronarzedzia.svg" "talhadeiras-puncoes"
convert_icon "elektronarzedzia.svg" "brocas-diamantadas"
convert_icon "materialy-scierne.svg" "discos-diamantados-concreto"
convert_icon "narzedzia-laserowe.svg" "niveis-laser"
convert_icon "narzedzia-dla-elektrykow.svg" "medidores-eletricos"
convert_icon "narzedzia pomiarowe.svg" "trenas"
convert_icon "Pneumatyka.svg" "compressores"
convert_icon "sprzet-spawalniczy.svg" "mascaras-soldadura"

echo "Conversion complete. Check for any errors above." 