// src/App.js
// Componente raiz da aplicação — gerencia estado global e navegação entre páginas

import { useState, useEffect } from "react";

import Header      from "./components/Header";
import PizzaCard   from "./components/PizzaCard";
import Cart        from "./components/Cart";
import Modal       from "./components/Modal";
import ContactForm from "./components/ContactForm";
import pizzas      from "./data/pizzas";
import "./App.css";

// Chave usada para persistência do carrinho no localStorage
const STORAGE_KEY = "pizzaria_carrinho";

function App() {
  // ── Página atual: "cardapio" ou "contato" ──
  const [pagina, setPagina] = useState("cardapio");

  // ── Estado do carrinho ──
  // Inicializa lendo o localStorage; se vazio, começa com array vazio
  const [carrinho, setCarrinho] = useState(() => {
    const salvo = localStorage.getItem(STORAGE_KEY);
    return salvo ? JSON.parse(salvo) : [];
  });

  // ── Contador de IDs únicos para cada entrada no carrinho ──
  const [proximoId, setProximoId] = useState(() => {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (!salvo) return 1;
    const itens = JSON.parse(salvo);
    if (itens.length === 0) return 1;
    return Math.max(...itens.map((i) => i.cartId)) + 1;
  });

  // ── Controle de visibilidade do modal ──
  const [modalAberto, setModalAberto] = useState(false);

  // ── Persiste o carrinho no localStorage toda vez que ele mudar ──
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
  }, [carrinho]);

  // ── Adiciona pizza ao carrinho com cartId único ──
  function adicionarAoCarrinho(pizza) {
    const novoItem = {
      cartId: proximoId,
      id: pizza.id,
      nome: pizza.nome,
      preco: pizza.preco,
      emoji: pizza.emoji,
    };
    setCarrinho((prev) => [...prev, novoItem]);
    setProximoId((prev) => prev + 1);
  }

  // ── Remove apenas o item com o cartId correspondente ──
  function removerDoCarrinho(cartId) {
    setCarrinho((prev) => prev.filter((item) => item.cartId !== cartId));
  }

  // ── Limpa todo o carrinho e remove do localStorage ──
  function limparCarrinho() {
    setCarrinho([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  // ── Confirma o pedido: avisa, limpa carrinho e fecha modal ──
  function confirmarPedido() {
    alert("✅ Pedido confirmado! Obrigado pela preferência 🍕");
    limparCarrinho();
    setModalAberto(false);
  }

  return (
    <div className="app">
      {/* Cabeçalho com navegação */}
      <Header paginaAtual={pagina} setPagina={setPagina} />

      <main className="main-content">
        {/* ── Página Cardápio ── */}
        {pagina === "cardapio" && (
          <div className="cardapio-layout">
            {/* Grade de pizzas */}
            <section className="menu">
              <h2>Cardápio</h2>
              <div className="pizza-grid">
                {pizzas.map((pizza) => (
                  <PizzaCard
                    key={pizza.id}
                    pizza={pizza}
                    onAdicionar={adicionarAoCarrinho}
                  />
                ))}
              </div>
            </section>

            {/* Painel do carrinho */}
            <Cart
              carrinho={carrinho}
              onRemover={removerDoCarrinho}
              onLimpar={limparCarrinho}
              onAbrirModal={() => setModalAberto(true)}
            />
          </div>
        )}

        {/* ── Página Contato ── */}
        {pagina === "contato" && <ContactForm />}
      </main>

      {/* Modal de resumo do pedido — renderizado apenas quando aberto */}
      {modalAberto && (
        <Modal
          carrinho={carrinho}
          onFechar={() => setModalAberto(false)}
          onConfirmar={confirmarPedido}
        />
      )}
    </div>
  );
}

export default App;
