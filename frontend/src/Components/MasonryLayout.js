import React from 'react';
import Masonry from 'react-masonry-css';
import Post from './Post';

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ Posts }) => (
  <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
    {Posts?.map((pin) => <Post key={pin._id} Post={pin} className="w-max" />)}
  </Masonry>
);

export default MasonryLayout;