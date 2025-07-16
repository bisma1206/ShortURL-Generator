//Sidebar.jsx

import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking the overlay
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      {/* Overlay (only visible when sidebar is open on mobile) */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-20"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Hamburger Menu Button (only on mobile) */}
      <div
        className="lg:hidden p-4 text-white cursor-pointer absolute top-4 left-4 z-30"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <span className="text-3xl font-bold">×</span> // Close icon
        ) : (
          <span className="text-3xl font-bold">☰</span> // Hamburger icon
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-64 h-screen bg-[#1f2937] text-white p-6 fixed top-0 left-0 z-30 shadow-lg transition-all duration-300`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center tracking-wide border-b border-gray-600 pb-4">
          ShortLinkify
        </h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="block p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-200 text-sm font-medium tracking-wide"
              onClick={closeSidebar}
            >
              URL Shortener
            </Link>
          </li>
          <li>
            <Link
              to="/orignal"
              className="block p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-200 text-sm font-medium tracking-wide"
              onClick={closeSidebar}
            >
              Original URL
            </Link>
          </li>
          <li>
            <Link
              to="/update"
              className="block p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-200 text-sm font-medium tracking-wide"
              onClick={closeSidebar}
            >
              Update Short URL
            </Link>
          </li>
          <li>
            <Link
              to="/delete"
              className="block p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-200 text-sm font-medium tracking-wide"
              onClick={closeSidebar}
            >
              Delete Short URL
            </Link>
          </li>
          <li>
            <Link
              to="/stats"
              className="block p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-200 text-sm font-medium tracking-wide"
              onClick={closeSidebar}
            >
              Statistics
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div
        className={`lg:pl-64 p-4 transition-all duration-300 ${
          isSidebarOpen ? "ml-0" : ""
        }`}
      >
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
