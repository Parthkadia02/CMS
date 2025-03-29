import React from "react";

const ModifyContent = ({ blog, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4 text-center">Verify Blog Details</h2>

        {/* Blog Name */}
        <div>
          <label className="block font-medium">Blog Name:</label>
          <p className="p-2 border border-gray-300 rounded bg-gray-100">{blog.blog_name}</p>
        </div>

        {/* Blog Content */}
        <div className="mt-3">
          <label className="block font-medium">Content:</label>
          <p className="p-2 border border-gray-300 rounded bg-gray-100">{blog.blog_content}</p>
        </div>

        {/* Blog Image */}
        <div className="mt-3">
          <label className="block font-medium">Image:</label>
          {blog.blog_image ? (
            <img src={blog.blog_image} alt="Blog" className="w-full h-48 object-cover rounded-md border border-gray-300" />
          ) : (
            <p className="p-2 border border-gray-300 rounded bg-gray-100">No Image</p>
          )}
        </div>

        {/* Hashtags/Tags */}
        <div className="mt-3">
          <label className="block font-medium">Hashtags/Tags:</label>
          <p className="p-2 border border-gray-300 rounded bg-gray-100">{blog.hashtags}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyContent;
