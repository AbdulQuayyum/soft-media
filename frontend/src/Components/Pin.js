import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { Client, UrlFor } from "../Utilities/Client"

const Pin = ({ Pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();
console.log(Pin)

  const { PostedBy, image, _id, destination } = Pin;

  const userInfo = localStorage.getItem('User') !== 'undefined' ? JSON.parse(localStorage.getItem('User')) : localStorage.clear();

  const deletePin = (id) => {
    Client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  let alreadySaved = Pin?.Save?.filter((item) => item?.PostedBy?._id === userInfo?.sub);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  console.log(Image)

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      Client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: userInfo?.sub,
          postedBy: {
            _type: 'PostedBy',
            _ref: userInfo?.sub,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/PinDetail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        {image && (
          <img className="rounded-lg w-full " src={UrlFor(image).width(250).url()} alt="user post" />
        )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${Image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                ><MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  {Pin?.Save?.length}  Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {Pin?.Save?.length}   {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className=" flex justify-between items-center gap-2 w-full">
              {destination?.slice(8).length > 0 ? (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {' '}
                  <BsFillArrowUpRightCircleFill />
                  {destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {
                PostedBy?._id === userInfo?.SUB && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePin(_id);
                    }}
                    className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                  >
                    <AiTwotoneDelete />
                  </button>
                )
              }
            </div>
          </div>
        )}
      </div>
      <Link to={`/UserProfile/${PostedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={PostedBy?.Image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{PostedBy?.UserName}</p>
      </Link>
    </div>
  );
}

export default Pin