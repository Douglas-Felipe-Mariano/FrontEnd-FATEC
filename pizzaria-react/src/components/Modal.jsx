// src/components/Modal.jsx
// Modal de resumo do pedido — exibido ao clicar em "Finalizar"
// Oculto por padrão; visível apenas quando `visivel` for true

function Modal({ carrinho, onFechar, onConfirmar }) {
  // Calcula a quantidade total de itens e o valor final
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  // Fecha o modal ao clicar no overlay (fora da caixa branca)
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onFechar();
  }

  return (
    // Overlay escurecido que cobre toda a tela (z-index alto)
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <h2>📋 Resumo do Pedido</h2>

        {/* Lista de pizzas preenchida dinamicamente */}
        <ul className="modal-list">
          {carrinho.map((item) => (
            <li key={item.cartId}>
              <span>{item.emoji} {item.nome}</span>
              <span>R$ {item.preco.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        {/* Totalizadores */}
        <div className="modal-totals">
          <span>
            Quantidade: <strong>{carrinho.length}</strong>
          </span>
          <span>
            Total: <strong>R$ {total.toFixed(2)}</strong>
          </span>
        </div>

        {/* Botões de ação do modal */}
        <div className="modal-actions">
          <button className="btn-fechar" onClick={onFechar}>
            Fechar Modal ✕
          </button>
          <button className="btn-confirmar" onClick={onConfirmar}>
            Confirmar Pedido 🍕
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
