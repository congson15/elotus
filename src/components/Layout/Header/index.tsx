import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = React.useState('');


  const handleSearchSubmit = () => {
    navigate('search',{
      state:{
        keyword: keyword
      }
  })
  }
  return (
    <nav className="hidden lg:flex items-center justify-between flex-wrap fixed backdrop-blur right-0 left-0 z-50 py-4 lg:px-20 shadow">
      <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 border-solid border-b-2 border-gray-300">
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
          <Link to="/">
            <span className="font-semibold text-3xl tracking-tight uppercase text-transparent cursor-pointer bg-clip-text bg-gradient-to-r from-[#e50914] to-red-500 md:text-center">
              SAGO
            </span>
          </Link>
        </div>
      </div>

      <div className="w-auto flex-grow flex items-center justify-between">
        <div className="relative self-end text-white">
          <input
            className="border-b w-72 border-b-white h-10 bg-transparent text-sm text-white placeholder:text-white focus:outline-none"
            name="search"
            placeholder="Search...."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <img
            onClick={() => handleSearchSubmit()}
            src="/svg/search.svg"
            className="absolute right-0 top-0 mt-4 mr-2 hover:cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
