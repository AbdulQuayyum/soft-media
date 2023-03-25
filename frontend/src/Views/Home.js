import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Client } from '../Utilities/Client';
import { Logo } from '../Assets/Index';
import { Pins } from './Index';
import { Sidebar, UserProfile } from "../Components/Index"
import { UserQuery } from "../Utilities/Data"

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = localStorage.getItem('User') !== 'undefined' ? JSON.parse(localStorage.getItem('User')) : localStorage.clear();
  // console.log(userInfo.picture);

  useEffect(() => {
    const query = UserQuery(userInfo?.sub);

    // console.log(query);

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
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar User={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={Logo} alt="logo" className="w-16 h-auto" />
          </Link>
          <Link to={`UserProfile/${user?._id}`}>
            <img src={user?.Image} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/UserProfile/:UserID" element={<UserProfile />} />
          <Route path="/*" element={<Pins User={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home