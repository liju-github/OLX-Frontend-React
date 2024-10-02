// src/contexts/ProductContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isAuthenticated) return; // Wait for authentication before fetching products

      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/getproducts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products); // Initialize filteredProducts
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated]); 

  const filterProductsBySearch = (searchTerm) => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const filterProductsByCategory = (category) => {
    if (category === '') {
      setFilteredProducts(products); 
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <ProductContext.Provider value={{
      products: filteredProducts,
      loading,
      error,
      filterProductsBySearch,
      filterProductsByCategory,
      isAuthenticated, // Optionally provide authentication status
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
