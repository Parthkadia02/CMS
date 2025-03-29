import React, { useState } from "react";
import { db } from "../firebase"; // Import Firebase
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Sidebar from "../components/Sidebar";

const AddClient = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    client_name: "",
    business_name: "",
    email: "",
    contact: "",
    website: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    budget: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit data to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "clients"), {
        ...formData,
        createdAt: Timestamp.now(), // Store timestamp
      });
      alert("Data added successfully!");

      // Reset form fields
      setFormData({
        client_name: "",
        business_name: "",
        email: "",
        contact: "",
        website: "",
        facebook: "",
        linkedin: "",
        instagram: "",
        budget: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding data");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 my-4 p-8 w-full flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Client Information Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            
            {/* Loop through form fields dynamically */}
            {Object.keys(formData).map((key) => (
              <div key={key} className={key === "budget" ? "col-span-2" : ""}>
                <label htmlFor={key} className="block font-medium capitalize">
                  {key.replace("_", " ")}:
                </label>
                <input
                  type={key === "email" ? "email" : key === "contact" || key === "budget" ? "number" : "text"}
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}

            <div className="col-span-2">
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-green-600">
                Submit
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
