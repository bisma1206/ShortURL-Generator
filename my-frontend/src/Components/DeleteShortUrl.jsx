// DeleteShortUrl.js
import React, { useState } from "react";
import axios from "axios";

const DeleteShortUrl = ({ backendUrl }) => {
  const [shortCode, setShortCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`${backendUrl}/api/shorten/${shortCode}`);
      setMessage("URL deleted successfully.");
    } catch (err) {
      setMessage("Failed to delete URL.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Delete Short URL
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Delete URL
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default DeleteShortUrl;
