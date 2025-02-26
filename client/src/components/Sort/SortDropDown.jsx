import React from 'react';
import { ChevronsUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const SortDropdown = ({ sort, setSort }) => {

  const handleSortChange = (event) => {
    setSort({ sort: event.target.value, order: sort.order });
  };

  const toggleSortOrder = () => {
    setSort({ 
      sort: sort.sort, 
      order: sort.order === "asc" ? "desc" : "asc" 
    });
  };

  return (
    <div className="h-10">
      <h1 className="text-lg font-semibold mb-1 font-mono">Sort By</h1>
      
      <div className="flex items-center">
        <select
          onChange={handleSortChange}
          value={sort.sort}
          className="mr-2 p-3 border-2 border-gray-400 rounded-xl w-44 font-semibold text-gray-700"
        >
          <option value="publishedYear">Year</option>
          <option value="rating">Rating</option>
        </select>
        
        <button 
          onClick={toggleSortOrder}
          className="p-3 rounded-lg border border-black text-black hover:text-white hover:bg-gray-700 transition-colors flex items-center justify-center"
          aria-label={`Sort ${sort.order === 'asc' ? 'descending' : 'ascending'}`}
        >
          {sort.order === 'asc' ? (
            <ArrowUp className="h-5 w-5" />
          ) : (
            <ArrowDown className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SortDropdown;