import React from 'react';
import './Sidebar.css';

function Sidebar({ selectedItems, onFinish }) {
  return (
    <aside className="sidebar">
      <h2>Itens Selecionados</h2>
      <ul>
        {selectedItems.map(item => (
          <li key={item.id_item} className="sidebar-item">
            <img src={item.image} alt={item.nome} className="sidebar-item-image" />
            <div>
              <h3>{item.nome}</h3>
              <p>R${item.preco}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className="finish-button" onClick={onFinish}>
        Finalizar
      </button>
    </aside>
  );
}

export default Sidebar;