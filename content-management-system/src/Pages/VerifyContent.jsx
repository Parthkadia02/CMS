import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ModifyContent from "./ModifyContent";

const VerifyContent = () => {
  const [contentList, setContentList] = useState([]);
  const [viewingBlog, setViewingBlog] = useState(null);
  
  // Load content from localStorage
  useEffect(() => {
    const storedContent = JSON.parse(localStorage.getItem("contentList")) || [];
    setContentList(storedContent);
  }, []);

  // Function to delete a blog
  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    const updatedList = contentList.filter((_, i) => i !== index);
    setContentList(updatedList);
    localStorage.setItem("contentList", JSON.stringify(updatedList));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-6 w-full">
        <div className="overflow-x-auto bg-white p-4 my-8 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Verify Blog List</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Blog Name</th>
                <th className="border p-2">Content</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Hashtags</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {contentList.length > 0 ? (
                contentList.map((blog, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{blog.blog_name}</td>
                    <td className="border p-2 truncate max-w-xs">{blog.blog_content}</td>
                    <td className="border p-2">
                      {blog.blog_image ? (
                        <img src={blog.blog_image} alt="Blog" className="w-20 h-20 object-cover mx-auto" />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="border p-2">{blog.hashtags}</td>
                    <td className="border p-2 flex gap-3 justify-center">
                      <FaEye
                        className="text-green-500 cursor-pointer hover:text-green-700"
                        onClick={() => setViewingBlog(blog)}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDelete(index)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">No content available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Content Modal */}
      {viewingBlog && (
        <ModifyContent 
          blog={viewingBlog} 
          onClose={() => setViewingBlog(null)} 
        />
      )}
    </div>
  );
};

export default VerifyContent;
