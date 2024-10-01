import React, { createContext, useContext, useState } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      image: "https://via.placeholder.com/150",
      category: "Electronics",
      price: "$100",
      contact: "info@example.com",
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      category: "Fashion",
      price: "$50",
      contact: "fashion@example.com",
    },{
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      category: "Fashion",
      price: "$50",
      contact: "fashion@example.com",
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      category: "Fashion",
      price: "$50",
      contact: "fashion@example.com",
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      category: "Fashion",
      price: "$50",
      contact: "fashion@example.com",
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      category: "Fashion",
      price: "$50",
      contact: "fashion@example.com",
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      category: "Fashion",
      price: "$50",
      contact: "fashion@example.com",
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      category: "Fashion",
      price: "$50",
      contact: "fashion@example.com",
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      category: "Fashion",
      price: "$50",
      contact: "fashion@example.com",
    },

  ]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <ProductsContext.Provider value={{ products,addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Export the context for direct usage
export const useProductsContext = () => {
  return useContext(ProductsContext);
};

export default ProductsContext;
