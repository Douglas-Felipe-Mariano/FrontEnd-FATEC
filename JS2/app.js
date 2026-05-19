// =============================================
// Dados do Cardápio
// =============================================

// Array com as pizzas disponíveis para pedido
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

// Array que armazena os itens adicionados ao carrinho
let carrinho = [];

// Contador para gerar um ID único para cada entrada no carrinho
// (permite adicionar a mesma pizza mais de uma vez)
let proximoCartId = 1;

// =============================================
// Renderização do Cardápio
// =============================================

/**
 * Cria os cards de pizza no DOM a partir do array `pizzas`.
 */
function renderizarCardapio() {
  const grid = document.getElementById("pizzaGrid");

  pizzas.forEach(pizza => {
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
 * Adiciona uma pizza ao carrinho com cartId único.
 * @param {number} pizzaId - ID da pizza no cardápio
 */
function adicionarAoCarrinho(pizzaId) {
  const pizza = pizzas.find(p => p.id === pizzaId);
  if (!pizza) return;

  // Monta o objeto do item com ID exclusivo desta entrada
  const item = {
    cartId: proximoCartId++,
    id: pizza.id,
    nome: pizza.nome,
    preco: pizza.preco,
    emoji: pizza.emoji,
  };

  carrinho.push(item);
  renderizarCarrinho();
}

/**
 * Remove um item específico do carrinho pelo cartId.
 * @param {number} cartId - ID único do item no carrinho
 */
function removerDoCarrinho(cartId) {
  // Mantém todos os itens EXCETO o que tem o cartId informado
  carrinho = carrinho.filter(item => item.cartId !== cartId);
  renderizarCarrinho();
}

/**
 * Remove todos os itens do carrinho.
 */
function limparCarrinho() {
  carrinho = [];
  renderizarCarrinho();
}

// =============================================
// Renderização do Carrinho
// =============================================

/**
 * Atualiza o DOM do carrinho: lista de itens, total e visibilidade do rodapé.
 */
function renderizarCarrinho() {
  const lista      = document.getElementById("cartList");
  const emptyMsg   = document.getElementById("emptyMsg");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal  = document.getElementById("cartTotal");

  // Limpa a lista antes de re-renderizar
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    emptyMsg.style.display = "block";
    cartFooter.classList.add("hidden");
    return;
  }

  emptyMsg.style.display = "none";
  cartFooter.classList.remove("hidden");

  // Soma o total e renderiza cada item
  let total = 0;

  carrinho.forEach(item => {
    total += item.preco;

    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <div class="cart-item-info">
        <span>${item.emoji} ${item.nome}</span>
        <small>R$ ${item.preco.toFixed(2)}</small>
      </div>
      <button class="btn-remove" onclick="removerDoCarrinho(${item.cartId})">
        Remover ✕
      </button>
    `;

    lista.appendChild(li);
  });

  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// =============================================
// Funções do Modal
// =============================================

/**
 * Abre o modal e preenche dinamicamente o resumo do pedido.
 */
function abrirModal() {
  // Não abre o modal se o carrinho estiver vazio
  if (carrinho.length === 0) return;

  const overlay   = document.getElementById("modalOverlay");
  const modalList = document.getElementById("modalList");
  const modalQtd  = document.getElementById("modalQtd");
  const modalTot  = document.getElementById("modalTotal");

  // Limpa o conteúdo anterior do modal
  modalList.innerHTML = "";

  let total = 0;

  // Preenche a lista de pizzas do pedido
  carrinho.forEach(item => {
    total += item.preco;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.emoji} ${item.nome}</span>
      <span>R$ ${item.preco.toFixed(2)}</span>
    `;
    modalList.appendChild(li);
  });

  // Atualiza quantidade total e valor final
  modalQtd.textContent  = carrinho.length;
  modalTot.textContent  = `R$ ${total.toFixed(2)}`;

  // Exibe o overlay (remove a classe .hidden)
  overlay.classList.remove("hidden");
}

/**
 * Fecha o modal sem confirmar o pedido.
 */
function fecharModal() {
  const overlay = document.getElementById("modalOverlay");
  // Esconde o overlay adicionando a classe .hidden
  overlay.classList.add("hidden");
}

/**
 * Confirma o pedido: exibe mensagem, limpa o carrinho e fecha o modal.
 */
function confirmarPedido() {
  alert("✅ Pedido confirmado! Obrigado pela preferência 🍕");

  // Limpa o carrinho após confirmação
  limparCarrinho();

  // Fecha o modal
  fecharModal();
}

// =============================================
// Fechar modal clicando fora (no overlay)
// =============================================

document.getElementById("modalOverlay").addEventListener("click", function (e) {
  // Só fecha se o clique foi diretamente no overlay, não dentro da .modal
  if (e.target === this) {
    fecharModal();
  }
});

// =============================================
// Inicialização
// =============================================

renderizarCardapio();
renderizarCarrinho();
