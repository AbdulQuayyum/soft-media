import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Client, UrlFor } from '../Utilities/Client';
import { PostDetailMorePostQuery, PostDetailQuery } from '../Utilities/Data';
import MasonryLayout from "./MasonryLayout"
import Spinner from './Spinner';

const PostDetail = ({ User }) => {
  const { PostID } = useParams();
  const [Posts, setPosts] = useState(null);
  const [PostDetail, setPostDetail] = useState(null);
  const [Comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  )

  const fetchPostDetails = () => {
    const query = PostDetailQuery(PostID);
    // console.log(query);

    if (query) {
      Client.fetch(query)
        .then((data) => {
          setPostDetail(data[0]);
          // console.log(data);
          if (data[0]) {
            const query1 = PostDetailMorePostQuery(data[0]);
            Client.fetch(query1)
              .then((res) => {
                setPosts(res);
              });
          }
        });
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [PostID]);

  const addComment = () => {
    if (Comment) {
      setAddingComment(true);

      Client
        .patch(PostID)
        .setIfMissing({ Comments: [] })
        .insert('after', 'Comments[-1]', [{ Comment, _key: uuidv4(), PostedBy: { _type: 'PostedBy', _ref: User._id } }])
        .commit()
        .then(() => {
          fetchPostDetails();
          setComment('');
          setAddingComment(false);
          async function reload() {
            await delay(3000)
            window.location.reload(true)
          }
          reload()
        });
    }
  };

  // console.log(PostDetail)

  if (!PostDetail) {
    return (
      <Spinner message="Showing post" />
    );
  }

  return (
    <>
      {PostDetail && (
        <div className="flex xl:flex-row flex-col m-auto bg-white dark:bg-transparent transition-all duration-500" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              alt="user-post"
              className="rounded-t-3xl rounded-b-lg"
              referrerPolicy="no-referrer"
              src={(PostDetail?.Image && UrlFor(PostDetail?.Image).url())} />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${PostDetail.Image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words transition-all duration-500 dark:text-white mt-3">
                {PostDetail.Title}
              </h1>
              <p className="mt-3 transition-all duration-500 dark:text-white">{PostDetail.About}</p>
            </div>
            <Link to={`/UserProfile/${PostDetail?.PostedBy._id}`} className="flex gap-2 mt-5 items-center bg-white dark:bg-zinc-900 w-max px-3 py-1 rounded-lg ">
              <img
                alt="user profile"
                className="w-10 h-10 rounded-full"
                referrerPolicy="no-referrer"
                src={PostDetail?.PostedBy.Image} />
              <p className="font-bold transition-all duration-500 dark:text-white">{PostDetail?.PostedBy.UserName}</p>
            </Link>
            <h2 className="mt-5 text-2xl transition-all duration-500 dark:text-white">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {PostDetail?.Comments?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white dark:bg-transparent transition-all duration-500 rounded-lg" key={item.Comment}>
                  <img
                    alt="user-profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    referrerPolicy="no-referrer"
                    src={item.PostedBy?.Image} />
                  <div className="flex flex-col">
                    <p className="font-bold transition-all duration-500 dark:text-white">{item.PostedBy?.UserName}</p>
                    <p className='transition-all duration-500 dark:text-white'>{item.Comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/UserProfile/${User._id}`}>
                <img
                  alt="user profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  referrerPolicy="no-referrer"
                  src={User.Image} />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a Comment"
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-[#000] text-white dark:text-black dark:bg-white rounded-full px-6 py-2 font-semibold text-base outline-none transition-all duration-500"
                onClick={addComment}
              >
                {addingComment ? 'Commenting...' : 'Comment'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {console.log(Posts)} */}
      {Posts?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {Posts ? (
        <MasonryLayout Posts={Posts} />
      ) : (
        <Spinner message="Loading more Posts" />
      )}
    </>
  )
}

export default PostDetail