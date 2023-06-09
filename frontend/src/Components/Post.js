import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import cogoToast from 'cogo-toast';

import { Client, UrlFor } from "../Utilities/Client"

const Post = ({ Post }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  )

  const { PostedBy, Image, _id } = Post;
  // console.log(Post)

  const userInfo = localStorage.getItem('User') !== 'undefined' ? JSON.parse(localStorage.getItem('User')) : localStorage.clear();

  const deletePost = (id) => {
    Client
      .delete(id)
      .then(() => {
        // console.log('deleted', id)
        async function reload() {
          await delay(3000)
          window.location.reload(true)
        }
        cogoToast.success("Post deleted successfully", { position: 'top-right', heading: 'Successful' })
        reload()
      });
  };

  let alreadySaved = Post?.Save?.filter((item) => item?.PostedBy?._id === userInfo?.sub);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  // console.log(alreadySaved)
  // console.log(Image)

  const savePost = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      Client
        .patch(id)
        .setIfMissing({ Save: [] })
        .insert('after', 'Save[-1]', [{
          _key: uuidv4(),
          UserID: userInfo?.sub,
          PostedBy: {
            _type: 'PostedBy',
            _ref: userInfo?.sub,
          },
        }])
        .commit()
        .then(() => {
          async function reload() {
            await delay(3000)
            window.location.reload(true)
          }
          cogoToast.success("Post saved successfully", { position: 'top-right', heading: 'Successful' })
          reload()
          setSavingPost(false);
        });
    }
  };

  // console.log(alreadySaved)

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/PostDetail/${_id}`)}
        className="relative w-auto overflow-hidden transition-all duration-500 ease-in-out rounded-lg cursor-zoom-in hover:shadow-lg"
      >
        {Image && (
          <img
            alt="user post"
            className="w-full rounded-lg "
            referrerPolicy="no-referrer"
            src={UrlFor(Image).width(250).url()} />
        )}
        {postHovered && (
          <div
            className="absolute top-0 z-50 flex flex-col justify-between w-full h-full p-1 pt-2 pb-2 pr-2"
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
                  className="flex items-center justify-center p-2 text-xl bg-white rounded-full outline-none opacity-75 w-9 h-9 text-dark hover:opacity-100 hover:shadow-md"
                ><MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button type="button" className="px-5 py-1 text-base font-bold text-white bg-[#000] outline-none opacity-70 hover:opacity-100 rounded-3xl hover:shadow-md">
                  {Post?.Save?.length}  Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePost(_id);
                  }}
                  type="button"
                  className="px-5 py-1 text-base font-bold text-white bg-[#000] outline-none opacity-70 hover:opacity-100 rounded-3xl hover:shadow-md"
                >
                  {Post?.Save?.length}   {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className="flex items-center justify-between w-full gap-2 ">
              {
                PostedBy?._id === userInfo?.sub && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePost(_id);
                    }}
                    className="flex items-center justify-center w-8 h-8 p-2 bg-white rounded-full outline-none opacity-75 text-dark hover:opacity-100"
                  >
                    <AiTwotoneDelete />
                  </button>
                )
              }
            </div>
          </div>
        )}
      </div>
      <Link to={`/UserProfile/${PostedBy?._id}`} className="flex items-center gap-2 mt-2">
        <img
          alt="user profile"
          className="object-cover w-8 h-8 rounded-full"
          referrerPolicy="no-referrer"
          src={PostedBy?.Image} />
        <p className="font-semibold capitalize transition-all duration-500 dark:text-white">{PostedBy?.UserName}</p>
      </Link>
    </div>
  );
}

export default Post