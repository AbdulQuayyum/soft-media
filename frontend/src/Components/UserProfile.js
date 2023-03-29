import React, { useEffect, useState } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { UserCreatedPostsQuery, UserQuery, UserSavedPostsQuery } from '../Utilities/Data';
import { Client } from '../Utilities/Client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const activeBtnStyles = 'bg-black text-white dark:text-black dark:bg-white font-bold py-2 px-4 rounded-full w-22 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black dark:text-white font-bold py-2 px-4 rounded-full w-22 outline-none';

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
    Logout()
  }

  if (!user) return <Spinner message="Loading profile" />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,cats,moon"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.Image}
              alt="user pic"
            />
          </div>
          <h1 className="font-bold text-3xl dark:text-white text-center mt-3">
            {user.UserName}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {UserID === userInfo.sub && (
              <button
                className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
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
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Posts Found!
          </div>
        )}
      </div>
    </div>
  )
}
export default UserProfile