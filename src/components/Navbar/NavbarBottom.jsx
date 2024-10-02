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

    
    if (selected === '') {
      setSelectedCategory('');
      filterProductsByCategory(''); 
    } else if (selected === selectedCategory) {
      
      setSelectedCategory('');
      filterProductsByCategory(''); 
    } else {
      setSelectedCategory(selected);
      filterProductsByCategory(selected); 
    }
  };

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(''); 
      filterProductsByCategory(''); 
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
