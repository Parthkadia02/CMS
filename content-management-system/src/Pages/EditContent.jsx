import React, { useState } from "react";
import { db } from "../firebase"; // Import storage from Firebase config
// import { storage } from "../firebase"; // Import storage from Firebase config
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditContent = ({ blog, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...blog });
  const [newImage, setNewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    let imageURL = formData.blog_image;

    // If a new image is selected, upload it to Firebase Storage
    if (newImage) {
      const imageRef = ref(storage, `blog_images/${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      imageURL = await getDownloadURL(imageRef);
    }

    try {
      await updateDoc(doc(db, "content_writers", blog.id), {
        ...formData,
        blog_image: imageURL, // Update the image URL in Firestore
      });

      alert("Blog updated successfully!");

      // Refresh content list after update
      if (onUpdate) {
        onUpdate();
      }

      onClose(); // Close form after updating
    } catch (error) {
      console.error("Error updating blog: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Blog Name */}
          <div>
            <label className="block font-medium">Blog Name:</label>
            <input
              type="text"
              name="blog_name"
              value={formData.blog_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="block font-medium">Blog Content:</label>
            <textarea
              name="blog_content"
              value={formData.blog_content}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded resize-none"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Blog Image Upload */}
          <div>
            <label className="block font-medium">Blog Image:</label>
            <div className="flex items-center gap-4">
              {formData.blog_image && (
                <img src={formData.blog_image} alt="Current Blog" className="w-20 h-20 object-cover rounded-md" />
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 rounded-md" />
            </div>
          </div>

          {/* Hashtags/Tags */}
          <div>
            <label className="block font-medium">Hashtags/Tags:</label>
            <input
              type="text"
              name="hashtags"
              value={formData.hashtags}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={isUploading}>
              {isUploading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContent;
