// src/components/Cart.jsx
// Painel lateral do carrinho de compras

import CartItem from "./CartItem";

function Cart({ carrinho, onRemover, onLimpar, onAbrirModal }) {
  // Calcula o total somando o preço de cada item
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  return (
    <section className="cart">
      <h2>🛒 Carrinho</h2>

      {/* Aviso de persistência via localStorage */}
      <p className="persist-info">💾 Carrinho salvo automaticamente!</p>

      {carrinho.length === 0 ? (
        // Mensagem exibida quando o carrinho está vazio
        <p className="empty-msg">Seu carrinho está vazio.</p>
      ) : (
        <>
          {/* Lista de itens do carrinho */}
          <ul className="cart-list">
            {carrinho.map((item) => (
              <CartItem key={item.cartId} item={item} onRemover={onRemover} />
            ))}
          </ul>

          {/* Rodapé com total e botões de ação */}
          <div className="cart-footer">
            <span className="cart-total">Total: R$ {total.toFixed(2)}</span>
            <div className="cart-actions">
              <button className="btn-limpar" onClick={onLimpar}>
                Limpar
              </button>
              {/* Abre o modal de resumo do pedido (Atividade 2) */}
              <button className="btn-finalizar" onClick={onAbrirModal}>
                Finalizar ✅
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
