// src/components/CartItem.jsx
// Item individual dentro da lista do carrinho

function CartItem({ item, onRemover }) {
  return (
    <li className="cart-item">
      <div className="cart-item-info">
        <span>{item.emoji} {item.nome}</span>
        <small>R$ {item.preco.toFixed(2)}</small>
      </div>

      {/* Botão que remove APENAS este item pelo seu cartId único */}
      <button className="btn-remove" onClick={() => onRemover(item.cartId)}>
        Remover ✕
      </button>
    </li>
  );
}

export default CartItem;
