// =============================================
// Dados do Cardápio
// =============================================

// Array com as pizzas disponíveis no cardápio
const pizzas = [
  { id: 1, nome: "Margherita",         preco: 35.00, emoji: "🍕" },
  { id: 2, nome: "Calabresa",          preco: 38.00, emoji: "🌶️" },
  { id: 3, nome: "Portuguesa",         preco: 40.00, emoji: "🍳" },
  { id: 4, nome: "Frango c/ Catupiry", preco: 42.00, emoji: "🐔" },
  { id: 5, nome: "4 Queijos",          preco: 45.00, emoji: "🧀" },
  { id: 6, nome: "Pepperoni",          preco: 46.00, emoji: "🔴" },
];

// =============================================
// Estado do Carrinho
// =============================================

// Array que guarda os itens adicionados ao carrinho
// Cada item: { cartId, id, nome, preco, emoji }
let carrinho = [];

// Contador para gerar IDs únicos por entrada no carrinho
// (permite adicionar a mesma pizza mais de uma vez)
let proximoCartId = 1;

// =============================================
// Renderização do Cardápio
// =============================================

/**
 * Gera os cards de pizza no HTML a partir do array `pizzas`.
 */
function renderizarCardapio() {
  const grid = document.getElementById("pizzaGrid");

  pizzas.forEach(pizza => {
    // Cria o card
    const card = document.createElement("div");
    card.classList.add("pizza-card");

    card.innerHTML = `
      <div class="emoji">${pizza.emoji}</div>
      <h3>${pizza.nome}</h3>
      <span class="price">R$ ${pizza.preco.toFixed(2)}</span>
      <button class="btn-add" onclick="adicionarAoCarrinho(${pizza.id})">
        Adicionar 🛒
      </button>
    `;

    grid.appendChild(card);
  });
}

// =============================================
// Funções do Carrinho
// =============================================

/**
 * Adiciona uma pizza ao carrinho com um ID de entrada único.
 * @param {number} pizzaId - ID da pizza no cardápio
 */
function adicionarAoCarrinho(pizzaId) {
  // Busca a pizza no cardápio
  const pizza = pizzas.find(p => p.id === pizzaId);
  if (!pizza) return;

  // Cria um objeto de item do carrinho com ID único
  const item = {
    cartId: proximoCartId++, // ID exclusivo desta entrada
    id: pizza.id,
    nome: pizza.nome,
    preco: pizza.preco,
    emoji: pizza.emoji,
  };

  // Adiciona ao array do carrinho
  carrinho.push(item);

  // Atualiza a interface
  renderizarCarrinho();
}

/**
 * Remove um item do carrinho pelo seu cartId único.
 * @param {number} cartId - ID único do item no carrinho
 */
function removerDoCarrinho(cartId) {
  // Filtra o array removendo apenas o item com o cartId correspondente
  carrinho = carrinho.filter(item => item.cartId !== cartId);

  // Atualiza a interface imediatamente
  renderizarCarrinho();
}

/**
 * Remove todos os itens do carrinho de uma vez.
 */
function clearCart() {
  carrinho = [];
  renderizarCarrinho();
}

// =============================================
// Renderização do Carrinho
// =============================================

/**
 * Atualiza o DOM do carrinho: lista de itens, total e visibilidade dos elementos.
 */
function renderizarCarrinho() {
  const lista      = document.getElementById("cartList");
  const emptyMsg   = document.getElementById("emptyMsg");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal  = document.getElementById("cartTotal");

  // Limpa a lista atual antes de re-renderizar
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    // Mostra mensagem de carrinho vazio e esconde o rodapé
    emptyMsg.style.display = "block";
    cartFooter.classList.add("hidden");
    return;
  }

  // Há itens: esconde a mensagem vazia e mostra o rodapé
  emptyMsg.style.display = "none";
  cartFooter.classList.remove("hidden");

  // Calcula o total somando o preço de cada item
  let total = 0;

  carrinho.forEach(item => {
    total += item.preco;

    // Cria o elemento <li> do item
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.setAttribute("data-cart-id", item.cartId); // facilita identificação no DOM

    li.innerHTML = `
      <div class="cart-item-info">
        <span>${item.emoji} ${item.nome}</span>
        <small>R$ ${item.preco.toFixed(2)}</small>
      </div>
      <!-- Botão Remover: chama removerDoCarrinho com o cartId deste item -->
      <button class="btn-remove" onclick="removerDoCarrinho(${item.cartId})">
        Remover ✕
      </button>
    `;

    lista.appendChild(li);
  });

  // Atualiza o total exibido
  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// =============================================
// Inicialização
// =============================================

// Renderiza o cardápio assim que o script é carregado
renderizarCardapio();

// Renderiza o carrinho (vazio) para configurar o estado inicial
renderizarCarrinho();
