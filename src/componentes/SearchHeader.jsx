import React, { useState } from 'react';
import './SearchHeader.css';

function SearchHeader() {
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterClick = (filter) => {
    setActiveFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter) // Remove o filtro se já estiver ativo
        : [...prevFilters, filter] // Adiciona o filtro se não estiver ativo
    );
  };

  const renderFilterButton = (filter, label) => (
    <button
      key={filter}
      className={`filter-button ${activeFilters.includes(filter) ? 'active' : ''}`}
      onClick={() => handleFilterClick(filter)}
    >
      {activeFilters.includes(filter) && <i className="fa fa-check"></i>}
      {label}
    </button>
  );

  return (
    <header className="search-header">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for items..."
          className="search-input"
        />
        <button className="search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="filter-buttons">
        {renderFilterButton('new', 'New')}
        {renderFilterButton('priceAsc', 'Price ascending')}
        {renderFilterButton('priceDesc', 'Price descending')}
        {renderFilterButton('rating', 'Rating')}
      </div>
    </header>
  );
}

export default SearchHeader;
