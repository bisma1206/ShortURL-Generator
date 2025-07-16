import React, { useState } from "react";
import axios from "axios";

const UrlShortner = ({ backendUrl }) => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/shorten`, {
        url,
      });

      setShortUrl(`${backendUrl}/${response.data.shortCode}`);
      setError("");
      setCopied(false);
    } catch (err) {
      setError("Failed to create short URL.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          <span>✨ </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-900 via-pink-700 to-purple-900">
            URL Shortener
          </span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="url"
              placeholder=" Enter long URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition bg-white bg-opacity-70"
              required
            />
            <span className="absolute left-3 top-3.5 text-gray-500 text-lg">🔗</span>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300 flex items-center justify-center gap-2"
          >
          🚀 Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-white text-opacity-90 mb-1">Shortened URL:</p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 font-medium hover:underline break-all"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="bg-white bg-opacity-20 text-sm text-white px-3 py-1 rounded-md hover:bg-opacity-40 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
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

export default UrlShortner;

