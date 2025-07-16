import React, { useState } from "react";
import axios from "axios";

const UrlShortner = ({ backendUrl }) => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/shorten`, {
        url,
      });

      setShortUrl(`${backendUrl}/${response.data.shortCode}`);
      setError("");
    } catch (err) {
      setError("Failed to create short URL.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          URL Shortener
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter long URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="text-gray-600">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="mt-4 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortner;
