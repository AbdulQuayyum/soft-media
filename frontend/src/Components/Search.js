import React, { useEffect, useState } from 'react';

import { Client } from '../Utilities/Client';
import { FeedQuery, SearchQuery } from '../Utilities/Data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [ posts, setPosts ] = useState()

  
  return (
    <div>Search</div>
  )
}

export default Search