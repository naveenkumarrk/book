import React from "react";
import { X } from "lucide-react";

const Genre = ({ genres, filterGenre, setFilterGenre, setPage }) => {
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    
    if (selectedValue === "") {
      setFilterGenre([]);
    } else if (!filterGenre.includes(selectedValue)) {
      setFilterGenre([...filterGenre, selectedValue]);
    }
    setPage(1);
    event.target.value = ""; 
  };

  const removeGenre = (genreToRemove) => {
    setFilterGenre(filterGenre.filter(genre => genre !== genreToRemove));
    setPage(1);
  };

  return (
    <div className="min-h-10">
      <h1 className="text-lg font-semibold mb-1 font-mono">Genres</h1>
      
      <div className="space-y-3">
        <select
          onChange={handleSelectChange}
          value=""
          className="mr-2 p-2 sm:p-3 border-2 border-gray-400 rounded-xl w-25 md:w-44 font-semibold text-gray-700"
        >
          <option value="">Select Genres</option>
          {genres
            .filter(category => !filterGenre.includes(category))
            .map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>

        <div className="flex flex-wrap gap-2">
          {filterGenre.length > 0 ? (
            <button
              onClick={() => {
                setFilterGenre([]);
                setPage(1);
              }}
              className="px-3 py-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-sm rounded-full text-gray-700 transition-colors"
            >
              Clear All
            </button>
          ) : (
            <div
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 sm:text-sm text-[15px] rounded-full text-gray-700 transition-colors"
            >
            No genres
            </div>
          )}
          {filterGenre.map((genre) => (
            <div
              key={genre}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full text-blue-800"
            >
              <span className="text-sm">{genre}</span>
              <button
                onClick={() => removeGenre(genre)}
                className="hover:text-blue-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genre;