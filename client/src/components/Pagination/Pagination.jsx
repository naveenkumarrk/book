import React from 'react'

const Pagination = ({ page, total, limit, setPage }) => {
    const totalPages = Math.ceil(total / limit);

	const onClick = (newPage) => {
		setPage(newPage + 1);
	};

  return (
   <div className="flex items-center justify-center gap-2 mt-4">
      {totalPages > 0 &&
        [...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onClick(index)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors
              ${page === index + 1
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {index + 1}
          </button>
        ))}
    </div>
  )
}

export default Pagination