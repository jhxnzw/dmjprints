const produtos = [
  {
    nome: "produto 1",
    categoria: "Decoração",
    preco: "45.00",
    imagem: "https://iili.io/2CBy9JR.png",
  },
  {
    nome: "produto 2",
    categoria: "Cama, Mesa e Banho",
    preco: "50.00",
    imagem: "https://iili.io/2CBy9JR.png",
  },
  {
    nome: "Produto 3",
    categoria: "Perfumaria",
    preco: "100.00",
    imagem: "https://iili.io/2CBy9JR.png",
  },
  // Continue com os produtos restantes...
];

let carrinho = [];

function searchProduct() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const results = document.getElementById("searchResults");
  results.innerHTML = "";

  const produtosEncontrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(input)
  );
  displayProducts(produtosEncontrados);
}

function filterByCategory(category) {
  const results = document.getElementById("searchResults");
  results.innerHTML = "";

  const produtosFiltrados = produtos.filter(
    (produto) => produto.categoria === category
  );
  displayProducts(produtosFiltrados);
}

function displayProducts(produtosArray) {
  const results = document.getElementById("searchResults");
  if (produtosArray.length > 0) {
    produtosArray.forEach((produto) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <h2>${produto.nome}</h2>
                        <p>Preço: R$ ${parseFloat(produto.preco).toFixed(2)}</p>
                        <button onclick="addToCart('${produto.nome}', ${
        produto.preco
      })">Adicionar ao Carrinho</button>
                    `;
      results.appendChild(productDiv);
    });
  } else {
    results.innerHTML = "<p>Nenhum produto encontrado.</p>";
  }
}

function addToCart(nome, preco) {
  carrinho.push({ nome, preco: parseFloat(preco) });
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  let total = 0;
  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(
      2
    )} <button class="remove-btn" onclick="removeFromCart(${index})">Remover</button>`;
    cartItems.appendChild(li);
    total += item.preco;
  });
  document.getElementById("totalPrice").textContent = `R$ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
  carrinho.splice(index, 1);
  updateCart();
}

function checkout() {
  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  if (total > 10) {
    let message =
      "Olá, gostaria de finalizar a compra dos seguintes itens:\n\n";
    carrinho.forEach((item) => {
      message += `- ${item.nome}: R$ ${item.preco.toFixed(2)}\n`;
    });
    message += `\nTotal: R$ ${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);

    // Substitua 'NUMERO' pelo número desejado
    const whatsappNumber = "558898644389"; // Exemplo: (11) 99999-9999
    const whatsappLink = `https://api.whatsapp.com/qr/PGJKMZLVUACEH1?autoload=${whatsappNumber}&text=${encodedMessage}`;

    window.open(whatsappLink, "_blank");
  } else {
    alert(
      "O total da compra deve ser acima de R$ 10,00 para finalizar a compra."
    );
  }
}

window.onload = () => displayProducts(produtos);

function toggleSidebar() {
  var sidebar = document.getElementById("sidebar");
  var content = document.getElementById("content");
  sidebar.classList.toggle("closed");
  content.classList.toggle("closed");
}
