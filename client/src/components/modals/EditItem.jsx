import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const base_url = import.meta.env.VITE_API_URL;

const EditItem = ({ objId, onClose, setUpdate }) => {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genreInput, setGenreInput] = useState("");
  const [description, setDescription] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [rating, setRating] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

    useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`${base_url}/${objId}`);
        setTitle(data.title);
        setAuthor(data.author);
        setGenreInput(data.genres.join(', '));
        setDescription(data.description);
        setPublishedYear(data.publishedYear);
        setRating(data.rating);
      } catch (err) {
        setError("Failed to load book details");
      }
    };

    fetchBook();
  }, [objId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const genres = genreInput.split(',').map(g => g.trim()).filter(g => g !== "");
    
    if (!title.trim() || !author.trim() || !description.trim() || 
        !publishedYear || !rating || genres.length === 0) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.put(`${base_url}/${objId}`, {
        title: title.trim(),
        author: author.trim(),
        genres,
        description: description.trim(),
        publishedYear: Number(publishedYear),
        rating: Number(rating)
      });
      setUpdate(true)
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[40rem]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-mono">Edit Book</h2>
        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
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

        <div>
          <input
            type="text"
            placeholder="Genres (comma-separated)"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <p className="mt-1 text-sm text-gray-500">Separate genres with commas</p>
        </div>

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
          {isSubmitting ? 'Updating...' : 'Update Book'}
        </button>
      </div>
    </form>
  );
};
  export default EditItem