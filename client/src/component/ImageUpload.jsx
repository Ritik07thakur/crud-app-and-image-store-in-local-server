import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file input
  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submit
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image', image); // must match multer.single('image')

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedUrl(res.data.url);
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Image to Cloudinary</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {uploadedUrl && (
        <div className="mt-6">
          <p className="text-green-600 font-semibold">Uploaded Image:</p>
          <img src={uploadedUrl} alt="Uploaded" className="mt-2 w-full rounded" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
