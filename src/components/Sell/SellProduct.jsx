import React, { useState, useContext } from 'react';
import useCloudinaryUpload from '../../hooks/useCloudinaryUpload';
import './SellProduct.css'; // Import the CSS file
import CategoryContext from '../../context/CategoryContext'; // Import the CategoryContext
import backicon from '../../assets/back-button.png'; // Import the back button icon

const SellProduct = () => {
  const { categories } = useContext(CategoryContext); // Get categories from context

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Set default category
  const [errors, setErrors] = useState({}); // Error state

  const { uploadImage, loading } = useCloudinaryUpload();

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!productName) newErrors.productName = 'Product name is required.';
    if (!description) newErrors.description = 'Description is required.';
    if (!price) newErrors.price = 'Price is required.';
    if (isNaN(price) || price <= 0) newErrors.price = 'Price must be a positive number.';
    if (!image) newErrors.image = 'Image is required.';
    if (!address) newErrors.address = 'Address is required.';
    if (!state) newErrors.state = 'State is required.';
    if (!/^\d{6}$/.test(pincode)) newErrors.pincode = 'Pincode must be a 6-digit number.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const imageUrl = await uploadImage(image);
    if (imageUrl) {
      const newProduct = {
        name: productName,
        category: selectedCategory,
        image_url: imageUrl,
        price: parseFloat(price),
        address: address,
        state: state,
        pincode: pincode,
      };

      const response = await fetch("http://localhost:8080/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        resetForm();
      } else {
        setErrors({ submit: 'Failed to add product.' });
      }
    } else {
      setErrors({ image: 'Image upload failed.' });
    }
  };

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setPrice('');
    setImage(null);
    setAddress('');
    setState('');
    setPincode('');
    setSelectedCategory(categories[0]);
    setErrors({});
  };

  const handleBackButtonClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="sell-product-container">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackButtonClick}>
        <img src={backicon} alt="Back" />
      </button>

      <div className="sell-product">
        <h2>Post Your Ad</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            {errors.productName && <span className="error-message">{errors.productName}</span>}
          </div>
          <div className="form-group">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>
          <div className="form-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            {errors.state && <span className="error-message">{errors.state}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
            {errors.pincode && <span className="error-message">{errors.pincode}</span>}
          </div>
          {errors.submit && <span className="error-message">{errors.submit}</span>}
          <button className='form-button' type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Sell Product'}
          </button>
        </form>
      </div>

      {/* Image upload section */}
      <div className="image-upload-section">
        <div className="image-preview-container">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Product Preview"
              className="image-preview-square"
            />
          ) : (
            <div className="image-preview-square"></div> // Empty square as a placeholder
          )}
        </div>

        <button
          type="button"
          className="upload-button"
          onClick={() => document.getElementById('image-upload-input').click()}
        >
          Upload Image
        </button>

        <input
          type="file"
          id="image-upload-input"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>
    </div>
  );
};

export default SellProduct;
