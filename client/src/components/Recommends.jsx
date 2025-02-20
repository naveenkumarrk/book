import axios from "axios";
import { SquareDashedMousePointer } from "lucide-react";
import React, { useState, useEffect } from "react";

const base_url = import.meta.env.VITE_RECOMMEND_API_URL;

const Recommends = () => {
  const [genres, setGenres] = useState("");
  const [author, setAuthor] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { data } = await axios.post(`${base_url}`, { genre: genres, author });
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white rounded-[20px] h-[57vh] shadow-lg border border-gray-200 px-5 pb-5 overflow-y-auto pt-10">
          <form onSubmit={handleSubmit}>
            <label htmlFor="author">Enter the Author Name</label>
            <input
              type="text"
              id="author"
              placeholder="e.g: J.K. Rowling"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-5"
            />
            <label htmlFor="genre">Enter a Genre</label>
            <input
              type="text"
              id="genre"
              placeholder="e.g: Fantasy"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="mt-4 p-2 w-[9rem] border-2 font-mono border-gray-400 rounded-xl flex items-center justify-between bg-white shadow-lg hover:bg-black hover:text-white hover:border-black transition-colors duration-200 text-gray-700 font-medium cursor-pointer text-sm"
            >
              <SquareDashedMousePointer className="mr-2" /> Get Books
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-[20px] shadow-lg border border-gray-200 p-5">
          {loading && <p>Loading recommendations...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {recommendations.length > 0 ? (
            <ul>
              {recommendations.map((book, index) => (
                <li key={index} className="p-2 border-b">
                  <strong>{book.title}</strong> by {book.author} - Rating: {book.rating}
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p>No recommendations found. Try different criteria.</p>
          )}
        </div>
      </div>

      <h2 className="mt-6 text-lg font-semibold">About This Recommendation System</h2>
      <p className="mt-2 text-gray-700">
        This book recommendation system leverages MongoDB aggregation pipelines for efficient filtering and improved performance. 
        For more advanced recommendations, collaborative filtering can be implemented using MongoDB's built-in features or machine learning algorithms.
      </p>
      <p className="mt-2 text-gray-700">
        By storing user preferences, we can provide personalized suggestions based on reading history and preferences.
      </p>
    </div>
  );
};

export default Recommends;
