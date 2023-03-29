import React, { useEffect, useState } from 'react';

import { Client } from '../Utilities/Client';
import { FeedQuery, SearchQuery } from '../Utilities/Data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [Posts, setPosts] = useState()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = SearchQuery(searchTerm.toLowerCase());
      console.log(query);
      Client.fetch(query)
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    } else {
      Client.fetch(FeedQuery)
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    }
  }, [searchTerm]);

  return (
    <div>

      {loading && <Spinner message="Searching Posts" />}
      {Posts?.length !== 0 && <MasonryLayout Posts={Posts} />}
      {Posts?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Posts related Found!</div>
      )}
    </div>
  );
};

export default Search;