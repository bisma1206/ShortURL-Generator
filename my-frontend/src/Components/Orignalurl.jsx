import React, { useState } from "react";
import axios from "axios";

const Originalurl = ({ backendUrl }) => {
  // State to hold user input, response data, and error message
  const [shortCode, setShortCode] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send GET request to fetch the original URL using the short code
      const response = await axios.get(
        `${backendUrl}/api/shorten/${shortCode}`
      );
      setOriginalUrl(response.data.url); // Save original URL in state
      setError(""); // Clear any existing error
    } catch (err) {
      setError("URL not found."); // Display error if request fails
    }
  };

  return (
    // Full screen background with image and centered content
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Blurred card with form content */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl max-w-md w-full border border-white border-opacity-30">
        
        {/* Heading with emoji and gradient text */}
        <h2 className="text-3xl sm:text-3xl font-bold text-center mb-7">
          <span>🔎 </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-900 via-blue-600 to-purple-900">
            Retrieve Original URL
          </span>
        </h2>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="🔗 Enter short code"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white bg-opacity-70"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300"
          >
            🔍 Retrieve URL
          </button>
        </form>

        {/* Display original URL if available */}
        {originalUrl && (
          <div className="mt-6 text-center">
            <p className="text-white text-opacity-90 mb-1">Original URL:</p>
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-300 font-medium hover:underline break-all"
            >
              {originalUrl}
            </a>
          </div>
        )}

        {/* Display error if any */}
        {error && <p className="mt-4 text-center text-red-200">{error}</p>}
      </div>
    </div>
  );
};

export default Originalurl;
