//Stats

import React, { useState } from "react";
import axios from "axios";

const GetStatistics = ({ backendUrl }) => {
  // State variables to store user input, API response, and error
  const [shortCode, setShortCode] = useState("");
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState("");

  // Handle form submission and fetch stats from the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${backendUrl}/api/shorten/${shortCode}/stats`
      );
      setStatistics(response.data); // Save fetched statistics
      setError(""); // Clear any previous error
    } catch (err) {
      setError("❌ Failed to fetch statistics."); // Show error if request fails
    }
  };

  return (
    // Page background with an image and centered form card
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Glassmorphism-styled card container */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl max-w-md w-full border border-white border-opacity-30">
        
        {/* Heading with emoji and gradient title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          <span>📊 </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-blue-700 to-purple-800">
            URL Statistics
          </span>
        </h2>

        {/* Form to enter the short code */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="🔗 Enter short code"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white bg-opacity-70"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition duration-300"
          >
            📈 Get Stats
          </button>
        </form>

        {/* Display statistics if available */}
        {statistics && (
          <div className="mt-6 text-center text-white text-opacity-90 space-y-2">
            <p>
              <strong>Short Code:</strong> {statistics.shortCode}
            </p>
            <p className="break-all">
              <strong>Original URL:</strong> {statistics.url}
            </p>
            <p>
              <strong>Access Count:</strong> {statistics.accessCount}
            </p>
          </div>
        )}

        {/* Display error message if any */}
        {error && (
          <div className="mt-4 text-center text-red-200">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStatistics;
