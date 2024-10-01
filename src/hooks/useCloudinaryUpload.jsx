import { useState } from 'react';

const useCloudinaryUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET); 

    try {
      const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;

      if (!cloudinaryUrl) {
        throw new Error('Cloudinary URL is not defined in environment variables');
      }

      console.log('Cloudinary URL:', cloudinaryUrl);

      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Upload failed');
      }

      const data = await response.json();
      console.log(data.secure_url)
      return data.secure_url;
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error };
};

export default useCloudinaryUpload;
