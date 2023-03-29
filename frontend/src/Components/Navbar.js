import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { Toggler } from "../Theme/Index"

const Navbar = ({ searchTerm, setSearchTerm, User }) => {
  const navigate = useNavigate();

  if (User) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 mb-7 dark:bg-[#1c1c24] transition-all duration-500">
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white dark:bg-zinc-900 transition-all duration-500 border-none outline-none focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/Search')}
            className="p-2 w-full bg-white dark:bg-zinc-900 transition-all duration-500 outline-none"
          />
        </div>
        <div className="flex gap-3 ">
          <Toggler />
          <Link to={`UserProfile/${User?._id}`} className="hidden md:block">
            <img
              alt="User Pic"
              className="w-14 h-12 rounded-lg "
              referrerPolicy="no-referrer"
              src={User.Image} />
          </Link>
          <Link to="/CreatePost" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAdd />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
