// Lista de produtos
const produtos = [
  {
    id: 1,
    nome: "Produto A",
    preco: 10,
    categoria: "Impressão",
    imagem: "https://iili.io/2CBy9JR.png",
  },
  {
    id: 2,
    nome: "Produto B",
    preco: 15,
    categoria: "Estampas",
    imagem: "https://iili.io/2CBy9JR.png",
  },
  {
    id: 3,
    nome: "Produto C",
    preco: 20,
    categoria: "Design Gráfico",
    imagem: "https://iili.io/2CBy9JR.png",
  },
  {
    id: 4,
    nome: "Produto D",
    preco: 25,
    categoria: "Impressão",
    imagem: "https://iili.io/2CBy9JR.png",
  },
  {
    id: 5,
    nome: "Produto E",
    preco: 30,
    categoria: "Impressão",
    imagem: "https://iili.io/2CBy9JR.png",
  },
];

// Carrinho de compras
let carrinho = [];

// Função para exibir os produtos
function mostrarProdutos(listaProdutos = produtos) {
  const produtosDiv = document.getElementById("produtos");
  produtosDiv.innerHTML = "";
  listaProdutos.forEach((produto) => {
    const produtoDiv = document.createElement("div");
    produtoDiv.className = "produto";
    produtoDiv.innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}" style="width:100px;height:100px;">
          <span>${produto.nome} - R$${produto.preco}</span>
          <button class="bt" onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
    produtosDiv.appendChild(produtoDiv);
  });
}

// Adiciona o produto ao carrinho
function adicionarAoCarrinho(id) {
  const produto = produtos.find((prod) => prod.id === id);
  carrinho.push(produto);
  atualizarCarrinho();
}

// Remove o produto do carrinho
function removerDoCarrinho(id) {
  carrinho = carrinho.filter((produto) => produto.id !== id);
  atualizarCarrinho();
}

// Atualiza a exibição do carrinho na sidebar
function atualizarCarrinho() {
  const carrinhoDiv = document.getElementById("carrinhoProdutos");
  carrinhoDiv.innerHTML = ""; // Limpa o carrinho antes de exibir novamente
  let total = 0;
  carrinho.forEach((produto) => {
    const produtoDiv = document.createElement("div");
    produtoDiv.className = "produto";
    produtoDiv.innerHTML = `
        <span>${produto.nome} - R$${produto.preco}</span>
        <button class="bt" onclick="removerDoCarrinho(${produto.id})">Removerㅤ</button>
      `;
    carrinhoDiv.appendChild(produtoDiv);
    total += produto.preco;
  });
  document.getElementById("total").innerText = `Total: R$${total.toFixed(2)}`;
}

// Envia a lista de produtos do carrinho para o WhatsApp
function enviarParaWhatsApp() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  let mensagem = "Produtos no carrinho:%0A";
  carrinho.forEach((produto) => {
    mensagem += `- ${produto.nome} (R$${produto.preco})%0A`;
  });
  const total = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
  mensagem += `%0ATotal: R$${total.toFixed(2)}`;

  const numeroWhatsApp = "558898644389"; // Insira o número com DDI e DDD
  const url = `https://api.whatsapp.com/qr/PGJKMZLVUACEH1?autoload=${numeroWhatsApp}?text=${mensagem}`;
  window.open(url, "_blank");
}

// Função de pesquisa para filtrar produtos pelo nome
function pesquisarProdutos() {
  const termo = document.getElementById("barraPesquisa").value.toLowerCase();
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(termo)
  );
  mostrarProdutos(produtosFiltrados);
}

// Filtra produtos por categoria
function filtrarCategoria(categoria) {
  const produtosFiltrados = categoria
    ? produtos.filter((produto) => produto.categoria === categoria)
    : produtos;
  mostrarProdutos(produtosFiltrados);
}

// Inicializa a lista de produtos na página
mostrarProdutos();
atualizarCarrinho();
