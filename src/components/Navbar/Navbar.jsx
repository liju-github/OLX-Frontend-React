import React, { useContext } from 'react';
import './Navbar.css'; 
import olxLogo from '../../assets/olxLogo'
import SearchIcon from '../../assets/searchIcon';
import CategoryContext from '../../context/CategoryContext'; 

const Navbar = () => {
  const { categories } = useContext(CategoryContext);

  return (
    <div className='navbar'>
      {/* Navbar Top */}
      <div className='navbar-top'>
       <div className="top-left">
       {olxLogo()}
        {/* Search Bar */}
        <div className="search">
          <input type="text" className="search-input" placeholder="Find Cars, Mobile Phones and more..." />
          <button className="search-icon">{SearchIcon()}</button>
        </div>
       </div>
        <div className="top-right">
        <div className="profile">
            <p>Profile</p>
        </div>
        <a href="/sell"><div className="sell-icon">
         <button className='form-button'>+ Sell</button>
        </div></a>
        </div>
      </div>

      {/* Navbar Bottom */}
      <div className="navbar-bottom">
        <div className="navbar-bottom-p1">
          <select className="category-dropdown">
            <option>All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="navbar-bottom-p2">
          {categories.slice(0, 8).map((category, index) => (
            <div key={index} className="category-link">
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
