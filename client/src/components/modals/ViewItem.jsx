import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const base_url = import.meta.env.VITE_API_URL;

const ViewItem = ({ onClose, objId }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`${base_url}/${objId}`);
        setBook(data);
      } catch (err) {
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [objId]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!book) return null;

  return (
    <div className="w-[40rem]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-mono">Book Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Title</h3>
          <p className="mt-1">{book.title}</p>
        </div>
        <div>
          <h3 className="font-semibold">Author</h3>
          <p className="mt-1">{book.author}</p>
        </div>
        <div>
          <h3 className="font-semibold">Genres</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {book.genres.map((genre, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Description</h3>
          <p className="mt-1">{book.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Published Year</h3>
            <p className="mt-1">{book.publishedYear}</p>
          </div>
          <div>
            <h3 className="font-semibold">Rating</h3>
            <p className="mt-1">{book.rating} / 5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItem