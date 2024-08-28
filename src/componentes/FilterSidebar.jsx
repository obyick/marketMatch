import React, { useState } from 'react';
import './FilterSidebar.css';

function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [filters, setFilters] = useState({
    freshProduct: false,
    lactoseFree: false,
    organic: false,
    glutenFree: false,
  });

  const handlePriceChange = (e) => {
    setPriceRange([e.target.value, priceRange[1]]);
  };

  const handleCheckboxChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <aside className="filter-sidebar">
      <h2>Filters</h2>

      <div className="filter-section">
        <label htmlFor="price-range">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
        <input
          type="range"
          id="price-range"
          name="price-range"
          min="0"
          max="100"
          value={priceRange[0]}
          onChange={handlePriceChange}
        />
      </div>

      <div className="filter-section">
        <h3>Product Types</h3>
        <div className="filter-checkbox">
          <input
            type="checkbox"
            id="freshProduct"
            name="freshProduct"
            checked={filters.freshProduct}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="freshProduct">Fresh Product</label>
        </div>
        <div className="filter-checkbox">
          <input
            type="checkbox"
            id="lactoseFree"
            name="lactoseFree"
            checked={filters.lactoseFree}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="lactoseFree">Lactose Free</label>
        </div>
        <div className="filter-checkbox">
          <input
            type="checkbox"
            id="organic"
            name="organic"
            checked={filters.organic}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="organic">Organic</label>
        </div>
        <div className="filter-checkbox">
          <input
            type="checkbox"
            id="glutenFree"
            name="glutenFree"
            checked={filters.glutenFree}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="glutenFree">Gluten Free</label>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
