import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Client, UrlFor } from '../Utilities/Client';
import { PinDetailMorePinQuery, PinDetailQuery } from '../Utilities/Data';
import MasonryLayout from "./MasonryLayout"
import Spinner from './Spinner';

const PinDetail = ({ User }) => {
  const { PinID } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPinDetails = () => {
    const query = PinDetailQuery(PinID);
    // console.log(query);

    if (query) {
      Client.fetch(`${query}`)
        .then((data) => {
          setPinDetail(data[0]);
          console.log(data);
          if (data[0]) {
            const query1 = PinDetailMorePinQuery(data[0]);
            Client.fetch(query1)
              .then((res) => {
                setPins(res);
              });
          }
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [PinID]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      Client
        .patch(PinID)
        .setIfMissing({ Comments: [] })
        .insert('after', 'comments[-1]', [{ Comment, _key: uuidv4(), PostedBy: { _type: 'PostedBy', _ref: User._id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) {
    return (
      <Spinner message="Showing pin" />
    );
  }

  return (
    <>
      {pinDetail && (
        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={(pinDetail?.Image && UrlFor(pinDetail?.Image).url())}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${pinDetail.Image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={pinDetail.Destination} target="_blank" rel="noreferrer">
                {pinDetail.Destination?.slice(8)}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.Title}
              </h1>
              <p className="mt-3">{pinDetail.About}</p>
            </div>
            <Link to={`/UserProfile/${pinDetail?.PostedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={pinDetail?.PostedBy.Image} className="w-10 h-10 rounded-full" alt="user profile" />
              <p className="font-bold">{pinDetail?.PostedBy.UserName}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.Comments?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.Comment}>
                  <img
                    src={item.PostedBy?.Image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.PostedBy?.UserName}</p>
                    <p>{item.Comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/UserProfile/${User._id}`}>
                <img src={User.Image} className="w-10 h-10 rounded-full cursor-pointer" alt="user profile" />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Doing...' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout Pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  )
}

export default PinDetail