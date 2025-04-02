/**
 * Formata um valor numérico para o formato de moeda Euro (€)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Calcula o percentual de desconto entre dois valores
 */
export function calculateDiscountPercentage(originalPrice: number, currentPrice: number): number {
  if (originalPrice <= 0 || currentPrice <= 0 || currentPrice >= originalPrice) {
    return 0;
  }
  
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
}

/**
 * Formata um percentual de desconto
 */
export function formatDiscountPercentage(percentage: number): string {
  return `-${percentage}%`;
}

/**
 * Converte uma string de preço (com € e possíveis pontos/vírgulas) para número
 */
export function parsePrice(priceString: string): number {
  if (!priceString) return 0;
  
  // Remove o símbolo de euro e quaisquer espaços
  const cleanString = priceString.replace(/[€\s]/g, '');
  
  // Substitui vírgula por ponto (formato europeu para decimal)
  const numberString = cleanString.replace(',', '.');
  
  return parseFloat(numberString);
} 