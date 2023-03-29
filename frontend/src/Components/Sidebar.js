import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { googleLogout } from '@react-oauth/google';
import { Categories } from "../Utilities/Data"
import { Logo } from "../Assets/Index"

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, User }) => {
  const navigate = useNavigate()
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  )

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const handleLogout = () => {
    googleLogout()
    localStorage.clear()
    async function Logout() {
      await delay(3000)
      navigate("/Login")
    }
    Logout()
  }

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={Logo} alt="logo" className="w-12 h-auto" />
        </Link>
        <div className="flex flex-col gap-5">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
            onClick={handleCloseSidebar}
          >
            <RxDashboard />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
          {Categories.slice(0, Categories.length).map((Category) => (
            <NavLink
              to={`/Category/${Category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={handleCloseSidebar}
              key={Category.name}
            >
              <img
                alt="..."
                className="w-8 h-8 rounded-full shadow-sm"
                referrerPolicy="no-referrer"
                src={Category.image} />
              {Category.name}
            </NavLink>
          ))}
          <button
            className='flex items-center pt-3 px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize text-lg border-t-2'
            onClick={handleLogout} >
            Logout
            < RiLogoutCircleRLine />
          </button>
        </div>
      </div>
      {User && (
        <Link
          to={`UserProfile/${User._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            alt="User profile"
            className="w-10 h-10 rounded-full"
            referrerPolicy="no-referrer"
            src={User?.Image} />
          <p>{User.UserName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};


export default Sidebar