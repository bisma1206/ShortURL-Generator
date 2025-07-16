//Delete URL
import React, { useState } from "react";
import axios from "axios";

const DeleteShortUrl = ({ backendUrl }) => {
  // State to store user input (short code)
  const [shortCode, setShortCode] = useState("");

  // State to store success or error message
  const [message, setMessage] = useState("");

  // Function to handle form submission and send DELETE request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`${backendUrl}/api/shorten/${shortCode}`);
      setMessage("✅ URL deleted successfully."); // Show success message
    } catch (err) {
      setMessage("❌ Failed to delete URL."); // Show error message
    }
  };

  return (
    // Full-screen background with image and centered content
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Glassmorphism styled card */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl max-w-md w-full border border-white border-opacity-30">
        
        {/* Gradient title with emoji */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          <span>🗑️ </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-800 via-pink-700 to-purple-800">
            Delete Short URL
          </span>
        </h2>

        {/* Input form for short code */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="🔗 Enter short code"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition bg-white bg-opacity-70"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 transition duration-300"
          >
            🗑️ Delete URL
          </button>
        </form>

        {/* Display message after deletion attempt */}
        {message && (
          <div className="mt-6 text-center">
            <p className="text-white text-opacity-90">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteShortUrl;
