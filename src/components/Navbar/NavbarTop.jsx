import React, { useEffect, useState, useContext } from 'react';
import './Navbar.css';
import olxLogo from '../../assets/olxLogo';
import defaultProfileImage from '../../assets/profileimage.png';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

const NavbarTop = ({ showSearch = true, showSellButton = true, showProfile = true, showHomeButton = true }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { filterProductsBySearch } = useContext(ProductContext); // Access filter function and clear function

  useEffect(() => {
    const token = localStorage.getItem('token');
    const profileImageUrl = localStorage.getItem('image_url');

    if (token) {
      setIsAuthenticated(true);
      setProfileImage(profileImageUrl ? profileImageUrl : defaultProfileImage);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleHomeClick = () => {
    {window.location.replace("/"); }
  };

  const handleLogout = () => {
    // Clear local storage and state
    localStorage.removeItem('token');
    localStorage.removeItem('image_url');
    localStorage.removeItem('userId'); // Remove userId or any other relevant items
    localStorage.setItem("logoutSuccess","true")


    // Update authentication state
    setIsAuthenticated(false);

    window.location.reload();
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterProductsBySearch(term); // Call filter function on input change
  };

  return (
    <div className="navbar-top">
      <div className="top-left">
        {olxLogo()}
        {showSearch && (
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Find Cars, Mobile Phones and more..."
              value={searchTerm} // Controlled input
              onChange={handleSearchChange} // Update state on change
            />
          </div>
        )}
      </div>
      <div className="top-right">
        {showHomeButton && (
          <button className="home-button" onClick={handleHomeClick}>
            Home
          </button>
        )}
        {showProfile && (
          <button className="profile-button" onClick={handleProfileClick}>
            {isAuthenticated ? (
              <>
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
                <span style={{ color: 'white', fontSize: '16px', marginLeft: '8px' }}>Profile</span>
              </>
            ) : (
              <span style={{ color: 'white', fontSize: '16px' }}>Profile</span>
            )}
          </button>
        )}
        {showSellButton && (
          <div className="sell-icon">
            <button onClick={() => {navigate('/sell')} }>+ Sell</button>
          </div>
        )}
        {/* Logout button */}
        {isAuthenticated && (
          <button className="home-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarTop;
