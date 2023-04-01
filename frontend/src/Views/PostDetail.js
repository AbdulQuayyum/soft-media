import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import cogoToast from 'cogo-toast';

import { Client, UrlFor } from '../Utilities/Client';
import { PostDetailMorePostQuery, PostDetailQuery } from '../Utilities/Data';
import MasonryLayout from "../Components/MasonryLayout"
import Spinner from '../Components/Spinner';

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
          cogoToast.success("Comment added successfully", { position: 'top-right', heading: 'Successful' })
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
        <div className="flex flex-col m-auto transition-all duration-500 bg-white xl:flex-row dark:bg-transparent" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex items-center justify-center flex-initial md:items-start">
            <img
              alt="user-post"
              className="rounded-b-lg rounded-t-3xl"
              referrerPolicy="no-referrer"
              src={(PostDetail?.Image && UrlFor(PostDetail?.Image).url())} />
          </div>
          <div className="flex-1 w-full p-5 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={`${PostDetail.Image.asset.url}?dl=`}
                  download
                  className="flex items-center justify-center p-2 text-xl rounded-full opacity-75 bg-secondaryColor text-dark hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
            </div>
            <div>
              <h1 className="mt-3 text-4xl font-bold break-words transition-all duration-500 dark:text-white">
                {PostDetail.Title}
              </h1>
              <p className="mt-3 transition-all duration-500 dark:text-white">{PostDetail.About}</p>
            </div>
            <Link to={`/UserProfile/${PostDetail?.PostedBy._id}`} className="flex items-center gap-2 px-3 py-1 mt-5 bg-white rounded-lg dark:bg-zinc-900 w-max ">
              <img
                alt="user profile"
                className="w-10 h-10 rounded-full"
                referrerPolicy="no-referrer"
                src={PostDetail?.PostedBy.Image} />
              <p className="font-bold transition-all duration-500 dark:text-white">{PostDetail?.PostedBy.UserName}</p>
            </Link>
            <h2 className="mt-5 text-2xl transition-all duration-500 dark:text-white">Comments</h2>
            <div className="overflow-y-auto max-h-370">
              {PostDetail?.Comments?.map((item) => (
                <div className="flex items-center gap-2 mt-5 transition-all duration-500 bg-white rounded-lg dark:bg-transparent" key={item.Comment}>
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
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to={`/UserProfile/${User._id}`}>
                <img
                  alt="user profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  referrerPolicy="no-referrer"
                  src={User.Image} />
              </Link>
              <input
                className="flex-1 p-2 border-2 border-gray-100 outline-none rounded-2xl focus:border-gray-300"
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
        <h2 className="mt-8 mb-4 text-2xl font-bold text-center">
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