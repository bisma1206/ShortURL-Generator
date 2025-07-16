// UpdateShortUrl.js
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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Update Short URL
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter short code"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="url"
            placeholder="Enter new URL"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Update URL
          </button>
        </form>
        {updatedUrl && (
          <p className="mt-4 text-center">
            Updated URL:{" "}
            <a href={updatedUrl} target="_blank" rel="noopener noreferrer">
              {updatedUrl}
            </a>
          </p>
        )}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default UpdateShortUrl;
