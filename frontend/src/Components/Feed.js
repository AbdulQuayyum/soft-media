import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Client } from "../Utilities/Client"
import { FeedQuery, SearchQuery } from "../Utilities/Data"
import { MasonryLayout, Spinner } from "./Index"

const Feed = () => {
  const [Posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const { CategoryID } = useParams();

  useEffect(() => {
    if (CategoryID) {
      setLoading(true);
      const query = SearchQuery(CategoryID);
      Client.fetch(query)
        .then((data) => {
          setPosts(data);
          // console.log(Client)
          // console.log(query);
          // console.log(CategoryID);
          // console.log(data);
          setLoading(false);
        });
    } else {
      setLoading(true);

      Client.fetch(FeedQuery)
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    }
  }, [CategoryID]);
  // console.log(CategoryID)

  const IdeaName = CategoryID || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${IdeaName} ideas to your feed!`} />
    );
  }

  return (
    <div>
      {Posts && (
        <MasonryLayout Posts={Posts} />
      )}
    </div>
  )
}

export default Feed