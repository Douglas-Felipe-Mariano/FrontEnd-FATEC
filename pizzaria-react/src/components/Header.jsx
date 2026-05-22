// src/components/Header.jsx
// Cabeçalho exibido em todas as páginas da aplicação

function Header({ paginaAtual, setPagina }) {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1>🍕 Pizzaria FATEC</h1>
          <p>Cardápio & Pedidos Online</p>
        </div>

        {/* Navegação entre Cardápio e Contato */}
        <nav className="nav">
          <button
            className={paginaAtual === "cardapio" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPagina("cardapio")}
          >
            🍕 Cardápio
          </button>
          <button
            className={paginaAtual === "contato" ? "nav-btn active" : "nav-btn"}
            onClick={() => setPagina("contato")}
          >
            📬 Contato
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
