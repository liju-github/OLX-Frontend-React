import React, { useEffect, useState, useRef } from "react";
import { FaEdit } from "react-icons/fa"; 
import ProductViewer from "../../components/ProductViewer/ProductViewer";
import "./Profile.css";
import profileImage from "../../assets/profileimage.png";
import NavbarTop from "../../components/Navbar/NavbarTop";
import useCloudinaryUpload from "../../hooks/useCloudinaryUpload";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const { uploadImage, loading: uploading, error: uploadError } = useCloudinaryUpload();
  const fileInputRef = useRef(null); 


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfile(data.profile);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleEditIconClick = () => {
    fileInputRef.current.click(); 
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image to upload.");
      return;
    }

    const imageUrl = await uploadImage(imageFile);

    if (imageUrl) {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/uploadprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image_url: imageUrl }),
      });

      if (response.ok) {
        profile.image_url = imageUrl;
        toast.success("Profile image updated successfully!");
        setImageFile(null); // Reset the image file after upload
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to update profile image");
      }
    } else {
      toast.error(uploadError || "Image upload failed");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <NavbarTop showProfile={false} showSearch={false} />
      <div className="profile-container">
        {profile ? (
          <>
            <div className="profile-info">
              <div className="image-wrapper">
                <img
                  src={profile.image_url || profileImage}
                  alt="Profile"
                  className="profile-image"
                />
                {/* Edit icon near the image */}
                <FaEdit className="edit-icon" onClick={handleEditIconClick} />
              </div>

              {/* Hidden file input for selecting an image */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef} // Reference to trigger file input click
                style={{ display: "none" }} // Hide the file input
                onChange={handleImageChange}
              />

              <div className="user-info">
                <h2>{profile.name}</h2>
                <p>Email: {profile.email}</p>
                <p>
                  Total Products for Sale:{" "}
                  {profile.products ? profile.products.length : 0}
                </p>
              </div>
            </div>

            {/* Show the save button only if an image has been selected */}
            {imageFile && (
              <button onClick={handleImageUpload} className="profilebutton" disabled={uploading}>
                {uploading ? "Uploading..." : "Save Image"}
              </button>
            )}

            <div className="profile-products">
              <h3>Products for Sale:</h3>
              {profile && Array.isArray(profile.products) && profile.products.length > 0 ? (
                <ProductViewer products={profile.products} />
              ) : (
                <p>No products listed yet.</p>
              )}
            </div>
          </>
        ) : (
          <p>No profile data available</p>
        )}
      </div>
    </>
  );
};

export default Profile;
