import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Authentication from "./Authentication";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Arrow for dropdown

const Sidebar = () => {
  const location = useLocation(); // Get current route

  // Dropdown states
  const [clientDropdown, setClientDropdown] = useState(false);
  const [contentDropdown, setContentDropdown] = useState(false);
  const [itManagerDropdown, setItManagerDropdown] = useState(false);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-white text-white py-3 shadow-md fixed top-0 left-64 w-[calc(100%-16rem)] z-50 flex justify-end px-6">
        <Authentication />
      </nav>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-r from-slate-900 to-slate-700 text-white p-5 shadow-[6px_0_10px_rgba(0,0,0,0.3)]">
        <h2 className="text-2xl font-bold mb-6">CMS</h2>
        <ul className="space-y-2">
          {/* Dashboard */}
          <li
            className={`p-2 rounded flex items-center gap-3 ${
              location.pathname === "/dashboard" ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
            }`}
          >
            <HomeIcon />
            <Link to="/dashboard">Dashboard</Link>
          </li>

          {/* Client Dropdown */}
          <li className="relative">
            <button
              onClick={() => setClientDropdown(!clientDropdown)}
              className={`w-full text-left flex justify-between items-center p-2 rounded ${
                location.pathname.startsWith("/client") ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <PersonIcon />
                Client
              </div>
              <ArrowDropDownIcon className={`transition-transform ${clientDropdown ? "rotate-180" : ""}`} />
            </button>

            {clientDropdown && (
              <ul className="ml-8 mt-1 space-y-1">
                <li
                  className={`p-2 rounded flex items-center gap-3 ${
                    location.pathname === "/addclient" ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
                  }`}
                >
                  <AddIcon />
                  <Link to="/addclient">Add Client</Link>
                </li>

                <li
                  className={`p-2 rounded flex items-center gap-3 ${
                    location.pathname === "/clientlist" ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
                  }`}
                >
                  <FormatListBulletedIcon />
                  <Link to="/clientlist">Client List</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Content Writer Dropdown */}
          <li className="relative">
            <button
              onClick={() => setContentDropdown(!contentDropdown)}
              className={`w-full text-left flex justify-between items-center p-2 rounded ${
                location.pathname.startsWith("/contentwriter") ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <AssignmentIcon />
                Content Writer
              </div>
              <ArrowDropDownIcon className={`transition-transform ${contentDropdown ? "rotate-180" : ""}`} />
            </button>

            {contentDropdown && (
              <ul className="ml-8 mt-1 space-y-1">
                <li
                  className={`p-2 rounded flex items-center gap-3 ${
                    location.pathname === "/addcontent" ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
                  }`}
                >
                  <AddIcon />
                  <Link to="/addcontent">Add Content</Link>
                </li>

                <li
                  className={`p-2 rounded flex items-center gap-3 ${
                    location.pathname === "/contentlist" ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
                  }`}
                >
                  <FormatListBulletedIcon />
                  <Link to="/contentlist">Content List</Link>
                </li>
              </ul>
            )}
          </li>

          {/* IT Manager Dropdown */}
          <li className="relative">
            <button
              onClick={() => setItManagerDropdown(!itManagerDropdown)}
              className={`w-full text-left flex justify-between items-center p-2 rounded ${
                location.pathname.startsWith("/itmanager") ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <AssignmentIcon />
                IT Manager
              </div>
              <ArrowDropDownIcon className={`transition-transform ${itManagerDropdown ? "rotate-180" : ""}`} />
            </button>

            {itManagerDropdown && (
              <ul className="ml-8 mt-1 space-y-1">
                <li
                  className={`p-2 rounded flex items-center gap-3 ${
                    location.pathname === "/additmanager" ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
                  }`}
                >
                  <AddIcon />
                  <Link to="/additmanager">Add IT Manager</Link>
                </li>

                <li
                  className={`p-2 rounded flex items-center gap-3 ${
                    location.pathname === "/verifycontent" ? "bg-gray-600 font-bold" : "hover:bg-gray-700"
                  }`}
                >
                  <FormatListBulletedIcon />
                  <Link to="/verifycontent">Verify Content</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
