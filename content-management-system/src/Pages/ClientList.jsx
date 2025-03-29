import React, { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditClient from "./EditClient"; 

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [editingClient, setEditingClient] = useState(null);

  // Fetch clients from Firestore
  const fetchClients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "clients"));
      const clientData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClients(clientData);
    } catch (error) {
      console.error("Error fetching clients: ", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Function to delete a client
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "clients", id));
      setClients(clients.filter(client => client.id !== id));
    } catch (error) {
      console.error("Error deleting client: ", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-45 my-6 p-8 w-11/12">
        <div className="bg-white p-3 shadow-md">
          <h2 className="text-2xl font-bold text-black mb-4">Client List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-black rounded-md">
              <thead>
                <tr className="bg-white text-black uppercase text-sm">
                  <th className="p-3 border">Client Name</th>
                  <th className="p-3 border">Business Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Contact</th>
                  <th className="p-3 border">Website</th>
                  <th className="p-3 border">Facebook</th>
                  <th className="p-3 border">LinkedIn</th>
                  <th className="p-3 border">Instagram</th>
                  <th className="p-3 border">Budget</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.length > 0 ? (
                  clients.map((client, index) => (
                    <tr key={client.id} className={`border text-black ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                      <td className="p-3 border">{client.client_name}</td>
                      <td className="p-3 border">{client.business_name}</td>
                      <td className="p-3 border">{client.email}</td>
                      <td className="p-3 border">{client.contact}</td>
                      <td className="p-3 border text-blue-500 underline cursor-pointer">
                        {client.website || "N/A"}
                      </td>
                      <td className="p-3 border">{client.facebook}</td>
                      <td className="p-3 border">{client.linkedin}</td>
                      <td className="p-3 border">{client.instagram}</td>
                      <td className="p-3 border font-semibold">{client.budget}</td>
                      <td className="p-3 border flex gap-3">
                        <FaEdit 
                          className="text-blue-500 cursor-pointer hover:text-blue-700"
                          onClick={() => setEditingClient(client)} 
                        />
                        <FaTrash 
                          onClick={() => handleDelete(client.id)} 
                          className="text-red-500 cursor-pointer hover:text-red-700"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="p-4 text-center text-gray-500 bg-gray-50">
                      No clients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Show Edit Client form when a client is selected */}
      {editingClient && (
        <EditClient 
          client={editingClient} 
          onClose={() => setEditingClient(null)} 
          onUpdate={fetchClients} // Refresh client list after update
        />
      )}
    </div>
  );
};

export default ClientList;
