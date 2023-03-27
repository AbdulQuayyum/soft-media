import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { UserCreatedPinsQuery, UserQuery, UserSavedPinsQuery } from '../Utilities/Data';
import { Client } from '../Utilities/Client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  const navigate = useNavigate()
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

  return (
    <div>UserProfile</div>
  )
}

export default UserProfile