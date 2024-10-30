const products = [
  {
    id: 1,
    name: "Produto 1",
    price: 50.0,
    category: "impressao",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Produto 2",
    price: 30.0,
    category: "estampa",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Produto 3",
    price: 70.0,
    category: "design",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Produto 4",
    price: 40.0,
    category: "impressao",
    image: "https://via.placeholder.com/150",
  },
];

let cart = [];

// Função para exibir produtos
function displayProducts(filter = "todos") {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";
  const filteredProducts =
    filter === "todos"
      ? products
      : products.filter((product) => product.category === filter);

  filteredProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>R$ ${product.price.toFixed(2)}</p>
          <button class="bt2" onclick="addToCart(${
            product.id
          })">Adicionar ao Carrinho</button>
      `;
    productList.appendChild(productDiv);
  });
}

// Função para filtrar produtos
function filterProducts(category) {
  displayProducts(category);
}

// Função para adicionar ao carrinho
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  updateCart();
}

// Função para remover do carrinho
function removeFromCart(productId) {
  cart = cart.filter((p) => p.id !== productId);
  updateCart();
}

// Função para atualizar o carrinho
function updateCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((product) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
          ${product.name} - R$ ${product.price.toFixed(2)} 
          <button class="bt2" onclick="removeFromCart(${
            product.id
          })">Remover</button>
      `;
    cartItemsDiv.appendChild(itemDiv);
    total += product.price;
  });

  document.getElementById("total-price").innerText = `Total: R$ ${total.toFixed(
    2
  )}`;
}

// Defina aqui o número do WhatsApp (inclua o código do país, sem espaços ou caracteres especiais)
const whatsappNumber = "5588998644389"; // Exemplo: 55 para Brasil e 31 para Belo Horizonte

// Função para enviar a mensagem via WhatsApp
document.getElementById("whatsapp-button").onclick = function () {
  const message = cart
    .map((product) => `${product.name}: R$ ${product.price.toFixed(2)}`)
    .join("%0A");
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  const whatsappLink = `https://api.whatsapp.com/send/?phone=5588998644389&text&type=phone_number&app_absent=0${whatsappNumber}&text=${message}%0ATotal: R$ ${total.toFixed(
    2
  )}`;
  window.open(whatsappLink, "_blank");
};

// Inicializa os produtos na página
displayProducts();
