import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { Logo, Share } from '../Assets/Index';

const Login = () => {
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
        </div>
      </div>
    </div>
  )
}

export default Login