import React, { useEffect, useState } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import cogoToast from 'cogo-toast';

import { UserCreatedPostsQuery, UserQuery, UserSavedPostsQuery } from '../Utilities/Data';
import { Client } from '../Utilities/Client';
import { MasonryLayout, Spinner } from "../Components/Index"

const activeBtnStyles = 'bg-black text-white dark:text-black transition-all duration-500 dark:bg-white font-bold py-2 px-4 rounded-full w-22 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black transition-all duration-500 dark:text-white font-bold py-2 px-4 rounded-full w-22 outline-none';

const UserProfile = () => {
  const [user, setUser] = useState();
  const [Posts, setPosts] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('Created');
  const navigate = useNavigate()
  const { UserID } = useParams()

  const userInfo = localStorage.getItem('User') !== 'undefined' ? JSON.parse(localStorage.getItem('User')) : localStorage.clear();

  useEffect(() => {
    const query = UserQuery(UserID);
    Client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      }); 
  }, [UserID]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPostsQuery = UserCreatedPostsQuery(UserID);

      Client.fetch(createdPostsQuery).then((data) => {
        setPosts(data);
      });
    } else {
      const savedPostsQuery = UserSavedPostsQuery(UserID);

      Client.fetch(savedPostsQuery).then((data) => {
        setPosts(data);
      });
    }
  }, [text, UserID]);

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  )

  const handleLogout = () => {
    googleLogout()
    localStorage.clear()
    async function Logout() {
      await delay(3000)
      navigate("/Login")
    }
    cogoToast.success("Logging out successfully, navigating to login page soon", { position: 'top-right', heading: 'Successful' })
    Logout()
  }

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative items-center justify-center h-full pb-2">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col items-center justify-center">
            <img
              className="object-cover w-full shadow-lg  h-370 2xl:h-510"
              src="https://source.unsplash.com/1600x900/?nature,photography,cats,moon"
              alt="user-pic"
            />
            <img
              className="object-cover w-20 h-20 -mt-10 rounded-full shadow-xl"
              src={user.Image}
              alt="user pic"
            />
          </div>
          <h1 className="mt-3 text-3xl font-bold text-center dark:text-white">
            {user.UserName}
          </h1>
          <div className="absolute top-0 right-0 p-2 z-1">
            {UserID === userInfo.sub && (
              <button
                className='p-2 bg-white rounded-full shadow-md outline-none cursor-pointer'
                onClick={handleLogout} >
                < RiLogoutCircleRLine color="black" fontSize={21} />
              </button>
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('Created');
            }}
            className={`${activeBtn === 'Created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn('saved');
            }}
            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>
        <div className="px-2">
          <MasonryLayout Posts={Posts} />
        </div>
        {Posts?.length === 0 && (
          <div className="flex items-center justify-center w-full mt-2 font-bold text-1xl">
            No Posts Found!
          </div>
        )}
      </div>
    </div>
  )
}
export default UserProfile