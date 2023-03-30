import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import Select from 'react-select'

import { Categories } from '../Utilities/Data';
import { Client } from '../Utilities/Client';
import Spinner from "./Spinner"

const CreatePost = ({ User }) => {
  const [Title, setTitle] = useState('');
  const [About, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState();
  const [Category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const [creatingPost, setCreatingPost] = useState(false);
  const navigate = useNavigate();
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  )

  const customStyles = {
    control: (provided) => ({
      ...provided,
      cursor: "pointer",
      background: '#F7F7F7',
      borderColor: "transparent",
      borderRadius: "12px",
      minHeight: '48px',
      padding: "0px 10px"
    })
  };

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/jfif') {
      setWrongImageType(false);
      setLoading(true);
      Client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePost = () => {
    setCreatingPost(true);
    if (Title && About && imageAsset?._id && Category) {
      const doc = {
        _type: 'Post',
        Title,
        About,
        Image: {
          _type: 'Image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        UserID: User._id,
        PostedBy: {
          _type: 'PostedBy',
          _ref: User._id,
        },
        Category,
      };
      Client.create(doc)
        .then(() => {
          setCreatingPost(false)
          async function reload() {
            await delay(2000)
            navigate('/');
          }
          reload()
        });
    } else {
      setFields(true);

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white transition-all duration-500 dark:bg-transparent lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-secondaryColor dark:bg-transparent transition-all duration-500 p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && (
              <Spinner />
            )}
            {
              wrongImageType && (
                <p>It&apos;s wrong file type.</p>
              )
            }
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex cursor-pointer flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-5xl dark:text-white transition-all duration-500">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg dark:text-white transition-all duration-500">Click to upload</p>
                  </div>

                  <p className=" mt-28 text-gray-400">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or JIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  alt="uploaded pic"
                  className="h-full w-full"
                  referrerPolicy="no-referrer"
                  src={imageAsset?.url} />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a Title"
            className="outline-none text-xl sm:text-2xl font-bold border-b-2 border-gray-200 p-2 dark:bg-transparent dark:border-2 dark:rounded-lg transition-all duration-500 dark:border-white"
          />
          {User && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white dark:bg-transparent transition-all duration-500 rounded-lg ">
              <img
                alt="user profile"
                className="w-10 h-10 rounded-full"
                referrerPolicy="no-referrer"
                src={User.Image} />
              <p className="font-bold transition-all duration-500 dark:text-white">{User.UserName}</p>
            </div>
          )}
          <input
            type="text"
            value={About}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell everyone what your Post is About"
            className="outline-none text-base border-b-2 dark:bg-transparent dark:border-2 dark:rounded-lg dark:border-white transition-all duration-500 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:base sm:text-lg transition-all duration-500 dark:text-white">Choose Image Category</p>
              <Select
                className='py-2'
                styles={customStyles}
                placeholder="Select Category"
                options={Categories}
                value={Category?.name}
                getOptionLabel={(Categories) => Categories.name}
                getOptionValue={(Categories) => Categories.name}
                onChange={(e) => { setCategory(e?.name) }}
              />
              {/* {console.log(Categories)} */}
              {/* {console.log(Category)} */}
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePost}
                className="bg-[#000] text-white dark:text-black transition-all duration-500 dark:bg-white font-bold p-2 rounded-full w-28 outline-none"
              >
                {creatingPost ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost