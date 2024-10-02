import React, { useContext, useState } from 'react';
import './Navbar.css';
import { ProductContext } from '../../context/ProductContext';
import CategoryContext from '../../context/CategoryContext';

const NavbarBottom = () => {
  const { categories } = useContext(CategoryContext);
  const { filterProductsByCategory } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    const selected = e.target.value;

    // If "All Categories" is selected, reset to original products
    if (selected === '') {
      setSelectedCategory('');
      filterProductsByCategory(''); // Reset to show all products
    } else if (selected === selectedCategory) {
      // If the same category is selected, reset to original products
      setSelectedCategory('');
      filterProductsByCategory(''); // Reset to show all products
    } else {
      setSelectedCategory(selected);
      filterProductsByCategory(selected); // Call filter function on category change
    }
  };

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(''); // Clear selection
      filterProductsByCategory(''); // Reset to show all products
    } else {
      setSelectedCategory(category);
      filterProductsByCategory(category);
    }
  };

  return (
    <div className="navbar-bottom">
      <div className="navbar-bottom-p1">
        <select className="category-dropdown" onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="navbar-bottom-p2">
        {categories.slice(0, 8).map((category, index) => (
          <div
            key={index}
            className={`category-link ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarBottom;
