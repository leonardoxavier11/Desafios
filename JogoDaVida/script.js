// Dimensões do tabuleiro
const totalLinhas = 10;
const totalColunas = 10;

// Array bidimensional para representar o estado do tabuleiro
let arrayTabuleiro = [];

// Iniciar o tabuleiro
function inicio() {
  const tabuleiro = document.getElementById("board");

  for (let linha = 0; linha < totalLinhas; linha++) {
    arrayTabuleiro[linha] = [];
    for (let coluna = 0; coluna < totalColunas; coluna++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      cell.addEventListener("click", alterarEstadoDaCelula.bind(null, linha, coluna));
      //Método manipulador e evento no DOM, nesse caso de "click".

      arrayTabuleiro[linha][coluna] = false;
      //Ao executar, o elemento na posição [linha][coluna] do array está sendo definido como false. Indicando que a cell está morta.
      tabuleiro.appendChild(cell);
    }
  }
}

// Atualizar o estado da célula, trocando a cor
function alterarEstadoDaCelula(linha, coluna) {
  const cell = document.getElementsByClassName("cell")[linha * totalColunas + coluna];
  arrayTabuleiro[linha][coluna] = !arrayTabuleiro[linha][coluna];
  cell.classList.toggle("alive");
}

// Função de atualização do tabuleiro
function atualizarTabuleiro() {
  const novoArrayTabuleiro = [];

  for (let linha = 0; linha < totalLinhas; linha++) {
    novoArrayTabuleiro[linha] = [];
    for (let coluna = 0; coluna < totalColunas; coluna++) {
      const isAlive = arrayTabuleiro[linha][coluna];
      const neighbors = countNeighbors(linha, coluna);

      if (isAlive && (neighbors < 2 || neighbors > 3)) {
        novoArrayTabuleiro[linha][coluna] = false;
      } else if (!isAlive && neighbors === 3) {
        novoArrayTabuleiro[linha][coluna] = true;
      } else {
        novoArrayTabuleiro[linha][coluna] = isAlive;
      }
    }
  }

  arrayTabuleiro = novoArrayTabuleiro;

  // Limpar tabuleiro
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    const linha = Math.floor(i / totalColunas);
    const coluna = i % totalColunas;
    cells[i].classList.toggle("alive", arrayTabuleiro[linha][coluna]);
  }
}

// Contar o número de células vizinhas vivas
function countNeighbors(linha, coluna) {
  let contador = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const linhaVizinha = linha + i;
      const colunaVizinha = coluna + j;

      if (linhaVizinha >= 0 && linhaVizinha < totalLinhas && colunaVizinha >= 0 && colunaVizinha < totalColunas) {
        if (!(i === 0 && j === 0) && arrayTabuleiro[linhaVizinha][colunaVizinha]) {
          contador++;
        }
      }
    }
  }

  return contador;
}

// Inicializar o tabuleiro e atualizar a cada 2,8 segundos
inicio();
setInterval(atualizarTabuleiro, 2800);
