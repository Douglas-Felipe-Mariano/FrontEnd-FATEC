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
// Chave usada no localStorage
// =============================================

// Centralizar a chave evita erros de digitação em outros pontos do código
const STORAGE_KEY = "pizzaria_carrinho";

// =============================================
// Estado do Carrinho
// =============================================

// O carrinho é inicializado carregando os dados salvos no localStorage.
// Se não houver dados salvos, começa como um array vazio.
let carrinho = carregarCarrinho();

// Contador de IDs: parte do maior cartId salvo + 1 para não repetir IDs
// após recarregar a página
let proximoCartId = calcularProximoId();

// =============================================
// Funções de Persistência (localStorage)
// =============================================

/**
 * Salva o array `carrinho` no localStorage.
 * Converte o array para string JSON com JSON.stringify() antes de salvar,
 * pois o localStorage só armazena strings.
 */
function salvarCarrinho() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
}

/**
 * Carrega o carrinho salvo no localStorage.
 * Usa JSON.parse() para converter a string JSON de volta para um array.
 * Retorna um array vazio se não houver nada salvo ainda.
 * @returns {Array} Array de itens do carrinho
 */
function carregarCarrinho() {
  const dados = localStorage.getItem(STORAGE_KEY);

  // Se não existir nada salvo, getItem retorna null; retornamos array vazio
  if (dados === null) return [];

  // Converte a string JSON de volta para array de objetos
  return JSON.parse(dados);
}

/**
 * Calcula o próximo cartId com base nos itens já salvos,
 * evitando duplicidade de IDs ao recarregar a página.
 * @returns {number} Próximo ID disponível
 */
function calcularProximoId() {
  if (carrinho.length === 0) return 1;

  // Pega o maior cartId existente e soma 1
  const maiorId = Math.max(...carrinho.map(item => item.cartId));
  return maiorId + 1;
}

// =============================================
// Renderização do Cardápio
// =============================================

/**
 * Gera os cards de pizza no DOM a partir do array `pizzas`.
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
 * Adiciona uma pizza ao carrinho, salva no localStorage e atualiza o DOM.
 * @param {number} pizzaId - ID da pizza no cardápio
 */
function adicionarAoCarrinho(pizzaId) {
  const pizza = pizzas.find(p => p.id === pizzaId);
  if (!pizza) return;

  // Cria objeto do item com ID único desta entrada
  const item = {
    cartId: proximoCartId++,
    id: pizza.id,
    nome: pizza.nome,
    preco: pizza.preco,
    emoji: pizza.emoji,
  };

  // Adiciona ao array em memória
  carrinho.push(item);

  // Persiste o novo estado no localStorage
  salvarCarrinho();

  // Atualiza a interface
  renderizarCarrinho();
}

/**
 * Remove um item do carrinho pelo cartId, salva no localStorage e atualiza o DOM.
 * @param {number} cartId - ID único do item no carrinho
 */
function removerDoCarrinho(cartId) {
  // Filtra mantendo todos os itens exceto o de cartId informado
  carrinho = carrinho.filter(item => item.cartId !== cartId);

  // Persiste o estado atualizado no localStorage
  salvarCarrinho();

  // Atualiza a interface
  renderizarCarrinho();
}

/**
 * Remove todos os itens do carrinho, limpa o localStorage e atualiza o DOM.
 */
function limparCarrinho() {
  carrinho = [];

  // Remove a chave do localStorage completamente
  localStorage.removeItem(STORAGE_KEY);

  renderizarCarrinho();
}

// =============================================
// Renderização do Carrinho
// =============================================

/**
 * Atualiza o DOM do carrinho recalculando o total a partir do array `carrinho`.
 * O total é sempre calculado com base nos dados em memória (que vieram do localStorage).
 */
function renderizarCarrinho() {
  const lista      = document.getElementById("cartList");
  const emptyMsg   = document.getElementById("emptyMsg");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal  = document.getElementById("cartTotal");

  // Limpa o DOM atual antes de re-renderizar
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    emptyMsg.style.display = "block";
    cartFooter.classList.add("hidden");
    return;
  }

  emptyMsg.style.display = "none";
  cartFooter.classList.remove("hidden");

  // Recalcula o total somando os preços do array carregado
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
      <!-- Botão remove apenas o item com este cartId -->
      <button class="btn-remove" onclick="removerDoCarrinho(${item.cartId})">
        Remover ✕
      </button>
    `;

    lista.appendChild(li);
  });

  // Exibe o total recalculado
  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// =============================================
// Inicialização
// =============================================

// Renderiza o cardápio com as pizzas disponíveis
renderizarCardapio();

// Renderiza o carrinho reconstruído a partir do localStorage
// (se a página foi recarregada, os itens são restaurados aqui)
renderizarCarrinho();
