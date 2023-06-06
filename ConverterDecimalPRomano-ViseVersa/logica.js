function copiarTexto() {
  navigator.clipboard.writeText(novaPalavra).then(() => {
    console.log(novaPalavra);
  }, () => {
    console.error("Falhou em tentar copiar");
  });
}

function sumirImg() {
  document.getElementById("img").style.display = "none"
}

function aparecerContainer() {
  document.getElementById("container-descriptografia").style.display = "flex"
}

function existeTexto() {
  //Se faz necessário esse "if" para que a imagem não suma, mesmo quando não tiver nada escrito no "text area"
  if (textInput.value.length > 0 & textInput.value.trim() !== "") {
    sumirImg();
    aparecerContainer();
  }
}

function romanoNumber() {
  let texto = textInput.value;

  if (isNaN(parseInt(texto)) && textInput.value.length > 0 & textInput.value.trim() !== "") {
    alert("A entrada já é um numero romano");

  } else {

    existeTexto();

    novaPalavra = "";

    let i = 0;

    while (i == 0) {

      if (texto == 0) break;

      while (texto > 0) {
        if (texto >= array01[i]) {
          novaPalavra += array02[i];
          texto -= array01[i];

        } else {
          i++;
        }
        document.getElementById("output-text").innerHTML = novaPalavra
      }
    }
  }

}

function revertNumber() {
  let texto = textInput.value;

  if (isNaN(parseInt(texto))) {
    existeTexto();

    novaPalavra = "";

    const romanToArabic = new Map([
      ["M", 1000],
      ["CM", 900],
      ["D", 500],
      ["CD", 400],
      ["C", 100],
      ["XC", 90],
      ["L", 50],
      ["XL", 40],
      ["X", 10],
      ["IX", 9],
      ["V", 5],
      ["IV", 4],
      ["I", 1]
    ]);

    let result = 0;

    for (const [key, value] of romanToArabic) {
      while (texto.startsWith(key)) {
        result += value;
        texto = texto.substring(key.length);
      }
    }

    document.getElementById("output-text").innerHTML = result.toString();
    novaPalavra = result.toString();
  } else {
    alert("A entrada já é um numero decimal");
  }


}


//Arrays
const array01 = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const array02 = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]


//Variáveis
let novaPalavra = "";

let romanoButton = document.querySelector(".btn01")
let revertButton = document.querySelector(".btn02")
let copyButton = document.querySelector(".btn04");

let textInput = document.querySelector("textarea");


//Buttons
romanoButton.onclick = romanoNumber;
revertButton.onclick = revertNumber;
copyButton.onclick = copiarTexto;