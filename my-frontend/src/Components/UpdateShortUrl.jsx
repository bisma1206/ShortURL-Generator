//Update url
import React, { useState } from "react";
import axios from "axios";

const UpdateShortUrl = ({ backendUrl }) => {
  const [shortCode, setShortCode] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [updatedUrl, setUpdatedUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${backendUrl}/api/shorten/${shortCode}`,
        { url: newUrl }
      );
      setUpdatedUrl(response.data.url);
      setError("");
    } catch (err) {
      setError("Failed to update URL.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl max-w-md w-full border border-white border-opacity-30">
        <h2 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-900 via-blue-700 to-purple-800 mb-6">
          Update Short URL
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="🔗 Enter short code"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white bg-opacity-70"
            required
          />
          <input
            type="url"
            placeholder="🌐 Enter new long URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white bg-opacity-70"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300"
          >
            ✏️ Update URL
          </button>
        </form>

        {updatedUrl && (
          <div className="mt-6 text-center">
            <p className="text-white text-opacity-90 mb-1">Updated URL:</p>
            <a
              href={updatedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 font-medium hover:underline break-all"
            >
              {updatedUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="mt-4 text-center text-red-200">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateShortUrl;

