import React, { useState } from "react";
import { db } from "../firebase"; // Import Firebase Storage
// import { storage } from "../firebase"; // Import Firebase Storage
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Sidebar from "../components/Sidebar";

const AddContent = () => {
  const [formData, setFormData] = useState({
    blog_name: "",
    blog_content: "",
    blog_image: null,
    hashtags: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "blog_image") {
      setFormData({ ...formData, blog_image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Upload image and get URL
  const uploadImage = async (file) => {
    const storageRef = ref(storage, `blog_images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  // Submit data to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (formData.blog_image) {
        imageUrl = await uploadImage(formData.blog_image);
      }

      await addDoc(collection(db, "content_writers"), {
        blog_name: formData.blog_name,
        blog_content: formData.blog_content,
        blog_image: imageUrl, // Store image URL instead of file
        hashtags: formData.hashtags,
        createdAt: Timestamp.now(),
      });

      alert("Blog added successfully!");

      // Reset form fields
      setFormData({
        blog_name: "",
        blog_content: "",
        blog_image: null,
        hashtags: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding blog post");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 my-4 p-8 w-full flex justify-center">
        <div className="bg-white p-10 rounded-lg shadow-md w-full md:w-3/4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Content Writer Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            
            {/* Blog Name */}
            <div className="col-span-2">
              <label htmlFor="blog_name" className="block font-medium">Blog Name:</label>
              <input 
                type="text" 
                id="blog_name" 
                name="blog_name" 
                value={formData.blog_name} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border border-gray-300 rounded-md" 
              />
            </div>

            {/* Blog Content */}
            <div className="col-span-2">
              <label htmlFor="blog_content" className="block font-medium">Blog Content:</label>
              <textarea 
                id="blog_content" 
                name="blog_content" 
                value={formData.blog_content} 
                onChange={handleChange} 
                required 
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-md resize-none" 
              ></textarea>
            </div>

            {/* Blog Image Upload */}
            <div className="col-span-2">
              <label htmlFor="blog_image" className="block font-medium">Upload Blog Image:</label>
              <input 
                type="file" 
                id="blog_image" 
                name="blog_image" 
                accept="image/*"
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded-md" 
              />
            </div>

            {/* Hashtags */}
            <div className="col-span-2">
              <label htmlFor="hashtags" className="block font-medium">Hashtags/Tags:</label>
              <input 
                type="text" 
                id="hashtags" 
                name="hashtags" 
                value={formData.hashtags} 
                onChange={handleChange} 
                required 
                className="w-full p-3 border border-gray-300 rounded-md" 
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
