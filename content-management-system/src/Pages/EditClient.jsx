import React, { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const EditClient = ({ client, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...client });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "clients", client.id), formData);
      alert("Client updated successfully!");

      // Call onUpdate to refresh the client list
      if (onUpdate) {
        onUpdate();
      }

      onClose(); // Close the form after saving
    } catch (error) {
      console.error("Error updating client: ", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Client</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Left Column */}
            <div className="space-y-4">
              {/* Client Name */}
              <div>
                <label className="block font-medium">Client Name:</label>
                <input type="text" name="client_name" value={formData.client_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
              </div>

              {/* Business Name */}
              <div>
                <label className="block font-medium">Business Name:</label>
                <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
              </div>

              {/* Contact */}
              <div>
                <label className="block font-medium">Contact:</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Website */}
              <div>
                <label className="block font-medium">Website:</label>
                <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>

              {/* Social Media Links */}
              <div>
                <label className="block font-medium">Facebook:</label>
                <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              
              <div>
                <label className="block font-medium">LinkedIn:</label>
                <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>

              <div>
                <label className="block font-medium">Instagram:</label>
                <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              
              {/* Budget */}
              <div>
                <label className="block font-medium">Budget:</label>
                <input type="text" name="budget" value={formData.budget} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClient;
