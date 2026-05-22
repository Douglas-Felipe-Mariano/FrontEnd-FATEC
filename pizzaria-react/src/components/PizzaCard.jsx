// src/components/PizzaCard.jsx
// Card individual de pizza exibido no cardápio

function PizzaCard({ pizza, onAdicionar }) {
  return (
    <div className="pizza-card">
      <div className="pizza-emoji">{pizza.emoji}</div>
      <h3>{pizza.nome}</h3>
      <span className="pizza-preco">R$ {pizza.preco.toFixed(2)}</span>

      {/* Ao clicar, chama a função onAdicionar passando esta pizza */}
      <button className="btn-add" onClick={() => onAdicionar(pizza)}>
        Adicionar 🛒
      </button>
    </div>
  );
}

export default PizzaCard;
