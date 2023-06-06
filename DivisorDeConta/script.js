//Var Globais
let produtos = [];
let quantidadeProdutos = 0;

let clientes = [];
let quantidadeClientes = 0;

function criarFormulariosProdutos() {
    quantidadeProdutos = document.getElementById("quantidadeProdutos").value;
    let formularios = document.getElementById("formularios");

    // Limpa os formularios existentes
    formularios.innerHTML = "";

    // Cria os novos formularios
    for (let i = 1; i <= quantidadeProdutos; i++) {
        let formulario = document.createElement("div");
        formulario.classList.add("form-group");

        let label = document.createElement("label");
        label.innerText = "Nome do Produto " + i;

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.classList.add("form-control");
        input.id = "produto" + i;

        let labelValor = document.createElement("label");
        labelValor.innerText = "Valor do Produto " + i;

        let inputValor = document.createElement("input");
        inputValor.setAttribute("type", "number");
        inputValor.classList.add("form-control");
        inputValor.id = "valorProduto" + i;

        formularios.appendChild(formulario);
        formulario.appendChild(label);
        formulario.appendChild(input);
        formulario.appendChild(labelValor);
        formulario.appendChild(inputValor);

    }

    // Cria o botão "Salvar"
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("btn", "btn-primary");
    button.innerText = "Salvar Produtos";
    button.onclick = salvarProdutosCriados; // Define a função a ser chamada no evento "onclick"

    formularios.appendChild(button);
}

function salvarProdutosCriados() {
    for (let i = 0; i < quantidadeProdutos; i++) {
        let Produto = {};
        let id = "produto" + (i + 1);
        Produto.id = id;
        Produto.nome = document.getElementById(id).value;
        let idValor = "valorProduto" + (i + 1);
        Produto.valor = document.getElementById(idValor).value;;
        produtos.push(Produto);
    }
    localStorage.setItem("produtos", JSON.stringify(produtos));
    alert("Produtos cadastrados!")
}

function criarFormulariosClientes() {
    quantidadeClientes = document.getElementById("quantidadeClientes").value;
    let formularios = document.getElementById("formularios");

    // Limpa os formularios existentes
    formularios.innerHTML = "";

    // Recupera as opções de produtos do Local Storage
    let produtos = localStorage.getItem("produtos");
    produtos = JSON.parse(produtos); // Converte de string JSON para um array

    // Cria os novos formularios
    for (let i = 1; i <= quantidadeClientes; i++) {
        let formulario = document.createElement("div");
        formulario.classList.add("form-group");

        let labelCliente = document.createElement("label");
        labelCliente.innerText = "Nome do Cliente " + i;

        let inputCliente = document.createElement("input");
        inputCliente.setAttribute("type", "text");
        inputCliente.classList.add("form-control");
        inputCliente.id = "cliente" + i;

        let labelProdutos = document.createElement("label");
        labelProdutos.innerText = "Produtos:";

        formularios.appendChild(formulario);
        formulario.appendChild(labelCliente);
        formulario.appendChild(inputCliente);
        formulario.appendChild(labelProdutos);

        let formularioCheck = document.createElement("div");
        formularioCheck.classList.add("form-group", "form-groupcheck");

        formulario.appendChild(formularioCheck);

        // Cria os checkboxes das opções de produtos
        for (let j = 0; j < produtos.length; j++) {
            let checkboxProduto = document.createElement("input");
            checkboxProduto.setAttribute("type", "checkbox");
            checkboxProduto.name = "produtos";
            checkboxProduto.value = produtos[j].nome;
            checkboxProduto.id = "cliente" + i;

            let labelCheckboxProduto = document.createElement("label");
            labelCheckboxProduto.appendChild(document.createTextNode(produtos[j].nome));

            let checkboxContainer = document.createElement("div");
            checkboxContainer.appendChild(checkboxProduto);
            checkboxContainer.appendChild(labelCheckboxProduto);

            formularioCheck.appendChild(checkboxContainer);
        }
    }
    // Cria o botão "Salvar"
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("btn", "btn-primary");
    button.innerText = "Salvar Clientes";
    button.onclick = salvarClientesCriados; // Define a função a ser chamada no evento "onclick"

    formularios.appendChild(button);
}

// function salvarOpcoesMarcadas() {
//     let opcoesMarcadas = [];
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     for (let i = 0; i < checkboxes.length; i++) {
//         if (checkboxes[i].checked) {
//             opcoesMarcadas.push(checkboxes[i].value);
//         }
//     }
//     return opcoesMarcadas;
// }

function salvarOpcoesMarcadas(clienteId) {
    let opcoesMarcadas = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"][id="' + clienteId + '"]:checked');
    for (let i = 0; i < checkboxes.length; i++) {
        opcoesMarcadas.push(checkboxes[i].value);
    }
    return opcoesMarcadas;
}

function salvarClientesCriados() {
    for (let i = 0; i < quantidadeClientes; i++) {
        let Cliente = {};
        let id = "cliente" + (i + 1);
        Cliente.id = id;
        Cliente.nome = document.getElementById(id).value;
        Cliente.produtos = salvarOpcoesMarcadas(id);
        clientes.push(Cliente);
    }
    localStorage.setItem("clientes", JSON.stringify(clientes));
    alert("Clientes cadastrados!");
}

function criarFormularioCalculadora() {
    // Recupera as opções de produtos do Local Storage
    let produtos = localStorage.getItem("produtos");
    produtos = JSON.parse(produtos); // Converte de string JSON para um array

    let clientes = localStorage.getItem("clientes");
    clientes = JSON.parse(clientes); // Converte de string JSON para um array

    console.log(produtos);
    console.log(clientes);
}

