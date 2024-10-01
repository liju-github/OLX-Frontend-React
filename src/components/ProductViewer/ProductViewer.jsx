import React, { useState, useEffect } from "react";
import "./ProductViewer.css";

const ProductViewer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(20); // Number of products to show initially

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token is ", token);

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
        console.log(data);
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error("Products data is not in expected format");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 20); 
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-viewer">
      {Array.isArray(products) && products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <>
          <div className="grid-container">
            {Array.isArray(products) &&
              products.slice(0, visibleProducts).map((product) => (
                <div key={product.ID} className="product-card">
                  <img
                    src={product.image_url}
                    alt={product.Name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3>{product.Name}</h3>
                    <p>Category: {product.Category}</p>
                    <p>Price: ${product.Price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
          </div>
          {visibleProducts < products.length && (
            <button className="view-more" onClick={handleViewMore}>
              View More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProductViewer;
