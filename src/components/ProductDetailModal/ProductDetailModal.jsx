import React from 'react';
import { X } from 'lucide-react';
import './ProductDetailModal.css';

const ProductDetailModal = ({ product, sellerProfile, onClose }) => {
  if (!product || !sellerProfile) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {}
        <button onClick={onClose} className="close-button">
          <X size={22} />
        </button>

        {}
        <div className="modal-body">
          {}
          <div className="image-container">
            <img src={product.image_url} alt={product.name} className="modal-image" />
          </div>

          {}
          <div className="content-container">
            {}
            <div className="product-section">
              <h2 className="modal-title">{product.name}</h2>
              <div className="product-details">
                <h3>Product Details</h3>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Address:</strong> {product.address}</p>
                <p><strong>State:</strong> {product.state}</p>
                <p><strong>Pincode:</strong> {product.pincode}</p>
              </div>
            </div>

            {}
            <div className="seller-section">
              <h3>Seller Profile</h3>
              <div className="seller-details">
                <img src={sellerProfile.image_url} alt={sellerProfile.name} className="seller-image" />
                <div className="seller-info">
                  <p><strong>Name:</strong> {sellerProfile.name}</p>
                  <p><strong>Email:</strong> {sellerProfile.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
