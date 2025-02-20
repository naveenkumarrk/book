import React, {  useEffect, useState } from 'react';
import { X } from 'lucide-react';
import  axios  from 'axios';

const base_url = import.meta.env.VITE_API_URL;

const DeleteItem = ({ onClose, objId, setUpdate}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState("");
    const [book, setBook] = useState(null);
  
    useEffect(() => {
      const fetchBook = async () => {
        try {
          const { data } = await axios.get(`${base_url}/${objId}`);
          setBook(data);
        } catch (err) {
          setError("Failed to load book details");
        }
      };
      fetchBook();
      
    }, [objId]);

  
    const handleDelete = async () => {
      try {
        setIsDeleting(true);
        await axios.delete(`${base_url}/${objId}`);
        setUpdate(true)
        onClose();
        
      } catch (err) {
        setError("Failed to delete book");
        setIsDeleting(false);
      }
    };
  
    if (!book && !error) return <div className="text-center">Loading...</div>;
  
    return (
      <div className="w-[30rem]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-mono">Delete Book</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
  
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}
  
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete <strong> "{book?.title}" </strong>? This action cannot be undone.
          </p>
  
          <div className="flex gap-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`
                flex-1 p-3 rounded-lg text-white transition-colors
                ${isDeleting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'}
              `}
            >
              {isDeleting ? 'Deleting...' : 'Delete Book'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default DeleteItem