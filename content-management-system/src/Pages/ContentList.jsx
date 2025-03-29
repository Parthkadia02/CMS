import React, { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import EditContent from "./EditContent";
import ViewContent from "./ViewContent"; // Import ViewContent component

const ContentList = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null); // State for viewing a blog

  // Fetch blogs from Firestore
  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "content_writers"));
      const blogData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogData);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Function to delete a blog
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "content_writers", id));
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog: ", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-45 my-6 p-8 w-11/12">
        <div className="bg-white p-3 shadow-md">
          <h2 className="text-2xl font-bold text-black mb-4">Content List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-black rounded-md">
              <thead>
                <tr className="bg-white text-black uppercase text-sm">
                  <th className="p-3 border">Blog Name</th>
                  <th className="p-3 border">Content</th>
                  <th className="p-3 border">Image</th>
                  <th className="p-3 border">Hashtags/Tags</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length > 0 ? (
                  blogs.map((blog, index) => (
                    <tr key={blog.id} className={`border text-black ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                      <td className="p-3 border">{blog.blog_name}</td>
                      <td className="p-3 border truncate max-w-xs">{blog.blog_content}</td>
                      <td className="p-3 border">
                        {blog.blog_image ? (
                          <img src={blog.blog_image} alt="Blog" className="w-20 h-20 object-cover rounded-md" />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td className="p-3 border">{blog.hashtags}</td>
                      <td className="p-3 border flex gap-3">
                        <FaEye 
                          className="text-green-500 cursor-pointer hover:text-green-700"
                          onClick={() => setViewingBlog(blog)} 
                        />
                        <FaEdit 
                          className="text-blue-500 cursor-pointer hover:text-blue-700"
                          onClick={() => setEditingBlog(blog)} 
                        />
                        <FaTrash 
                          onClick={() => handleDelete(blog.id)} 
                          className="text-red-500 cursor-pointer hover:text-red-700"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500 bg-gray-50">
                      No blog posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Show View Content form when a blog is selected */}
      {viewingBlog && (
        <ViewContent 
          blog={viewingBlog} 
          onClose={() => setViewingBlog(null)} 
        />
      )}

      {/* Show Edit Content form when a blog is selected */}
      {editingBlog && (
        <EditContent 
          blog={editingBlog} 
          onClose={() => setEditingBlog(null)} 
          onUpdate={fetchBlogs} // Refresh blog list after update
        />
      )}
    </div>
  );
};

export default ContentList;
