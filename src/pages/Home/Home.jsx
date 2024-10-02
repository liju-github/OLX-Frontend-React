import React, { useContext, useEffect } from 'react';
import NavbarTop from '../../components/Navbar/NavbarTop';
import NavbarBottom from '../../components/Navbar/NavbarBottom';
import banner from "../../assets/banner.png";
import ProductViewer from '../../components/ProductViewer/ProductViewer';
import { ProductContext } from '../../context/ProductContext';
import { useToast } from '../../context/ToastContext'; // Ensure the path is correct
import './Home.css';

const Home = () => {
  const { products, loading, error } = useContext(ProductContext); 
  const { checkAndShowToasts } = useToast();

  useEffect(() => {
    checkAndShowToasts(); // Check and show any toasts from local storage
  }, [checkAndShowToasts]);

  return (
    <div className='home'>
      <NavbarTop showHomeButton={false} showSearch={true} showSellButton={true} showProfile={true} />
      <NavbarBottom />
      <div className="banner">
        <img src={banner} alt="Banner" />
      </div>
      <div className="product-section">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ProductViewer products={products} />
        )}
      </div>
    </div>
  );
};

export default Home;
