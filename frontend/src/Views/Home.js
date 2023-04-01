import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Client } from '../Utilities/Client';
import { Logo } from '../Assets/Index';
import { Posts, Sidebar } from "../Components/Index"
import UserProfile from './UserProfile';
import { UserQuery } from "../Utilities/Data"

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem('User') !== 'undefined' ? JSON.parse(localStorage.getItem('User')) : localStorage.clear();
  // console.log(userInfo.picture);

  useEffect(() => {
    const query = UserQuery(userInfo?.sub);

    Client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });
  // console.log(user)

  return (
    <div className="flex bg-gray-50 dark:bg-[#1c1c24] transition-all duration-500 md:flex-row flex-col h-screen ease-out">
      <div className="flex-initial hidden h-screen md:flex">
        <Sidebar User={user && user} />
      </div>
      <div className="flex flex-row md:hidden">
        <div className="flex flex-row items-center justify-between w-full p-2 shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={Logo} alt="logo" className="w-16 h-auto" />
          </Link>
          <Link to={`UserProfile/${user?._id}`}>
            <img
              alt="user-pic"
              className="rounded-full w-9 h-9 "
              referrerPolicy="no-referrer"
              src={user?.Image} />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed z-10 w-4/5 h-screen overflow-y-auto bg-white shadow-md animate-slide-in">
            <div className="absolute flex items-center justify-end w-full p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar closeToggle={setToggleSidebar} User={user && user} />
          </div>
        )}
      </div>
      <div className="flex-1 h-screen pb-2 overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/UserProfile/:UserID" element={<UserProfile />} />
          <Route path="/*" element={<Posts User={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home