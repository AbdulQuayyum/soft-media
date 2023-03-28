import React from 'react'
import jwt_decode from "jwt-decode"
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import { Logo, Share } from '../Assets/Index';
import { Client } from '../Utilities/Client';

const Login = () => {
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const CreateOrGetUser = (response) => {
    const decoded = jwt_decode(response.credential)
    localStorage.setItem("User", JSON.stringify(decoded))
    const { name, picture, sub } = decoded

    const User = {
      _id: sub,
      _type: 'User',
      UserName: name,
      Image: picture,
    }
    Client.createIfNotExists(User)
      .then(() => {
        navigate('/', { replace: true });
      });
  }
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="relative w-full h-full ">
        <video
          src={Share}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="object-cover w-full h-full"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-blackOverlay">
          <div className="p-5">
            <img src={Logo} alt="..." width="130px" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={response => { CreateOrGetUser(response) }}
              onError={() => { console.log('Login Failed') }}
              shape="circle"
              size='large'
              text="continue_with"
              theme="filled_black"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login