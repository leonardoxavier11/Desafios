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
        formulario.classList.add("form-group", "d-flex");

        let label = document.createElement("label");
        label.innerText = "Nome do Produto " + i + ":";
        label.classList.add("mr-2", "font-weight-bold");

        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.classList.add("form-control", "col-2");
        input.id = "produto" + i;

        let labelValor = document.createElement("label");
        labelValor.innerText = "Valor do Produto " + i + ":";
        labelValor.classList.add("ml-2", "mr-2", "font-weight-bold");

        let inputValor = document.createElement("input");
        inputValor.setAttribute("type", "number");
        inputValor.classList.add("form-control", "col-2");
        inputValor.id = "valorProduto" + i;

        let labelQnt = document.createElement("label");
        labelQnt.innerText = "Quantidade Consumida " + i + ":";
        labelQnt.classList.add("ml-2", "mr-2", "font-weight-bold");

        let inputQnt = document.createElement("input");
        inputQnt.setAttribute("type", "number");
        inputQnt.classList.add("form-control", "col-2");
        inputQnt.id = "qntProduto" + i;

        formularios.appendChild(formulario);
        formulario.appendChild(label);
        formulario.appendChild(input);
        formulario.appendChild(labelValor);
        formulario.appendChild(inputValor);
        formulario.appendChild(labelQnt);
        formulario.appendChild(inputQnt);

    }

    // Cria o botão "Salvar"
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("btn", "btn-primary");
    button.innerText = "Salvar Informações";
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
        let idQnt = "qntProduto" + (i + 1);
        Produto.valor = (document.getElementById(idValor).value) * (document.getElementById(idQnt).value);
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
        if (produtos.length > 5) {
            formulario.classList.add("form-group");
        } else {
            formulario.classList.add("form-group", "d-flex");
        }

        let labelCliente = document.createElement("label");
        labelCliente.innerText = "Nome do Cliente " + i + ":";
        labelCliente.classList.add("mr-2", "font-weight-bold");

        let inputCliente = document.createElement("input");
        inputCliente.setAttribute("type", "text");
        inputCliente.classList.add("form-control", "col-4");
        inputCliente.id = "cliente" + i;

        let labelProdutos = document.createElement("label");
        labelProdutos.innerText = "Produtos Consumidos:";
        labelProdutos.classList.add("ml-2", "mr-2", "font-weight-bold");

        formularios.appendChild(formulario);
        formulario.appendChild(labelCliente);
        formulario.appendChild(inputCliente);
        formulario.appendChild(labelProdutos);

        let formularioCheck = document.createElement("div");
        formularioCheck.classList.add("form-group", "form-groupcheck", "d-flex");

        formulario.appendChild(formularioCheck);

        // Cria os checkboxes das opções de produtos
        for (let j = 0; j < produtos.length; j++) {
            let checkboxProduto = document.createElement("input");
            checkboxProduto.classList.add("mr-2", "ml-2");
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
    button.innerText = "Salvar Informações";
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

function criarCalculadora() {
    let formularios = document.getElementById("formularios");

    // Limpa os formularios existentes
    formularios.innerHTML = "";

    // Recupera as opções de produtos do Local Storage
    let produtos = localStorage.getItem("produtos");
    produtos = JSON.parse(produtos); // Converte de string JSON para um array

    let clientes = localStorage.getItem("clientes");
    clientes = JSON.parse(clientes); // Converte de string JSON para um array

    // Obtém a referência do elemento textarea
    let textarea = document.getElementById('myTextarea');

    // Define o conteúdo formatado que deseja exibir
    let result = '';

    // Adiciona o nome de todos os clientes
    result += 'Clientes na Mesa:\n';
    clientes.forEach(cliente => {
        result += cliente.nome + '\n';
    });

    // Adiciona o nome e valor de todos os produtos
    result += '\nValor Total dos Produtos Consumidos:\n';
    produtos.forEach(produto => {
        result += produto.nome + ' - R$ ' + produto.valor + '\n';
    });

    //Divisão dos itens
    let resultado = {};

    clientes.forEach(cliente => {
        let total = 0;

        cliente.produtos.forEach(produto => {
            let produtoEncontrado = produtos.find(item => item.nome === produto);

            if (produtoEncontrado) {
                let quantidadeClientes = clientes.filter(c => c.produtos.includes(produto)).length;
                let produtoEncontradoValue = produtoEncontrado.valor;
                total += Number((produtoEncontradoValue *= 1.1).toFixed(2)) / quantidadeClientes;
            }
        });

        resultado[cliente.nome] = total;
        console.log(clientes)

    });

    let conteudoFormatado = result + "\nResultado da Divisão já Considerando a Taxa de Serviço (10%):\n" + JSON.stringify(resultado, null, 2);

    textarea.innerHTML = conteudoFormatado;
}

function sideBarActive() {
    let sideBar = document.querySelector('#sidebarMenu');
    sideBar.classList.toggle('active');
    sideBar.classList.toggle('bg-white');
    buttonActive();
}

function buttonActive() {
    let btn = document.querySelector('button');
    btn.classList.toggle('ml-5');
}
