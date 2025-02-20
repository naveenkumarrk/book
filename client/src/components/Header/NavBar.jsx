import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div className="app">
      <nav className="flex justify-center items-center w-full">
        <div className="relative max-w-[30rem] w-full mx-5 md:mx-10 lg:mx-20 border border-black bg-white mt-4 rounded-[50px] shadow-lg transition-all duration-300">
          <div className="absolute max-w-[10rem] h-[4rem] w-full bg-black rounded-[50px] flex justify-center items-center">
            <h1 className="text-white font-bold text-xl">BookWise</h1>
          </div>
          <div className="flex justify-center items-center py-2 ">
            <div className="flex gap-5 font-bold">
              <span className="mr-35"></span>
              <Link
                to="/"
                className={`px-4 py-3 rounded-[50px] transition ${
                  activeLink === "books"
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleLinkClick("books")}
              >
                BooksList
              </Link>
              <Link
                to="/recommendations"
                className={`px-4 py-3 transition rounded-[50px] ${
                  activeLink === "preferences"
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleLinkClick("preferences")}
              >
                Recommendations
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
