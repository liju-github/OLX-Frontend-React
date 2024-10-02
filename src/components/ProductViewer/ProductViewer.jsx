import React, { useState } from "react";
import "./ProductViewer.css";
import ProductDetailModal from "../ProductDetailModal/ProductDetailModal";

const ProductViewer = ({
  products = [],
  loading = false,
  error = null,
  initialVisible = 20,
  increment = 20,
}) => {
  const [visibleProducts, setVisibleProducts] = useState(initialVisible);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sellerProfile, setSellerProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchingSellerProfile, setFetchingSellerProfile] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const handleViewMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + increment);
  };

  const handleCardClick = (product) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    setFetchingSellerProfile(true);
    setFetchError(null); // Reset fetch error state

    fetch(`http://localhost:8080/sellerprofile?email=${encodeURIComponent(product.email)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // Add Bearer token to Authorization header
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setSellerProfile(data.data);
        setSelectedProduct(product);
        setIsModalOpen(true);
      })
      .catch(error => {
        console.error("Error fetching seller profile:", error);
        setFetchError("Failed to fetch seller profile. Please try again.");
      })
      .finally(() => {
        setFetchingSellerProfile(false);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setSellerProfile(null);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-viewer">
      {(!Array.isArray(products) || products.length === 0) ? (
        <p>No products available</p>
      ) : (
        <>
          <div className="grid-container">
            {products.slice(0, visibleProducts).map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleCardClick(product)}
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>Category: {product.category}</p>
                  <p>
                    Price: ${product.price ? product.price.toFixed(2) : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {visibleProducts < products.length && (
            <button className="view-more" onClick={handleViewMore}>
              View More
            </button>
          )}
          {isModalOpen && selectedProduct && sellerProfile && (
            <ProductDetailModal
              product={selectedProduct}
              sellerProfile={sellerProfile}
              onClose={closeModal}
            />
          )}
          {fetchError && <p className="error">{fetchError}</p>}
          {fetchingSellerProfile && <p>Loading seller profile...</p>}
        </>
      )}
    </div>
  );
};

export default ProductViewer;
