const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Configuração do canvas
const width = 300;
const height = 300;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Limpar canvas com fundo transparente
ctx.clearRect(0, 0, width, height);

// Criar um hexágono preto com borda dourada
function drawHexagonPath(x, y, size) {
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    
    if (i === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.closePath();
}

// Desenhar o hexágono preto
ctx.fillStyle = 'black';
ctx.beginPath();
drawHexagonPath(width/2, height/2, 130);
ctx.fill();

// Adicionar borda dourada
ctx.strokeStyle = '#FFD700';
ctx.lineWidth = 8;
ctx.beginPath();
drawHexagonPath(width/2, height/2, 130);
ctx.stroke();

// Retângulo dourado no topo
ctx.fillStyle = '#FFD700';
ctx.fillRect(145, 30, 10, 20);

// Texto "ALI" em branco
ctx.fillStyle = 'white';
ctx.font = 'bold 50px Arial';
ctx.textAlign = 'center';
ctx.fillText('ALI', 95, 95);

// Texto "MAMEDE" em dourado
ctx.fillStyle = '#FFD700';
ctx.font = 'bold 50px Arial';
ctx.textAlign = 'left';
ctx.fillText('MAMEDE', 120, 95);

// Texto "TOOLS.COM" em branco
ctx.fillStyle = 'white';
ctx.font = 'bold 30px Arial';
ctx.textAlign = 'center';
ctx.fillText('TOOLS.COM', width/2, 140);

// Linha divisória
ctx.strokeStyle = 'white';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(70, 160);
ctx.lineTo(230, 160);
ctx.stroke();

// Seção de ferramentas (simplificada)
// Fundo dourado para a seção de ferramentas
ctx.fillStyle = '#FFD700';
ctx.beginPath();
ctx.moveTo(90, 180);
ctx.lineTo(210, 180);
ctx.lineTo(210, 220);
ctx.lineTo(90, 220);
ctx.closePath();
ctx.fill();

// Desenhar algumas ferramentas simples em preto
ctx.fillStyle = 'black';
ctx.beginPath();
// Martelo
ctx.fillRect(110, 190, 30, 10);  // Cabo
ctx.fillRect(140, 185, 15, 20);  // Cabeça
// Chave de fenda
ctx.fillRect(170, 190, 30, 10);  // Cabo
ctx.fillRect(165, 192, 5, 6);    // Ponta

// Salvar o arquivo
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, 'ALIMAMEDETOOLS_medium.png'), buffer);

console.log('Logo criado com sucesso em public/images/content/ALIMAMEDETOOLS_medium.png'); 