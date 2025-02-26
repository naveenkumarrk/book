import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const base_url = import.meta.env.VITE_API_URL;

const AddItem = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState("");
  const [description, setDescription] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [rating, setRating] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate form
    if (!title.trim() || !author.trim() || !description.trim() || 
        !publishedYear || !rating || !genres.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Validate rating
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      setError("Rating must be between 0 and 5");
      return;
    }

    // Validate year
    const yearNum = Number(publishedYear);
    if (isNaN(yearNum) || yearNum < 1000 || yearNum > new Date().getFullYear()) {
      setError("Please enter a valid year");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${base_url}/`, {
        title,
        author,
        genres: genres.split(',').map(g => g.trim()), 
        description,
        publishedYear: Number(publishedYear),
        rating: Number(rating)
      });

      if (response.data) {
        onAdd?.(response.data);
        onClose();
        toast.success('Successfully toasted!')
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<>
    <Toaster/>
    <form onSubmit={handleSubmit} className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-mono">Add New Book</h2>
        <button 
          type="button" 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Genres (comma-separated)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />

        <textarea
          placeholder="Book Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none h-32"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Published Year"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

          <input
            type="number"
            placeholder="Rating (0-5)"
            value={rating}
            min="0"
            max="5"
            step="0.1"
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`
            w-full p-4 rounded-lg font-mono text-lg transition-colors duration-200
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'}
          `}
        >
          {isSubmitting ? 'Adding Book...' : 'Add Book'}
        </button>
      </div>
    </form>
    </>
  );
};

export default AddItem;