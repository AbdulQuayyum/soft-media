import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Client } from "../Utilities/Client"
import { FeedQuery, SearchQuery } from "../Utilities/Data"
import { MasonryLayout, Spinner } from "./Index"

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { CategoryId } = useParams();

  useEffect(() => {
    if (CategoryId) {
      setLoading(true);
      const query = SearchQuery(CategoryId);
      Client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    } else {
      setLoading(true);

      Client.fetch(FeedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        });
    }
  }, [CategoryId]);

  const IdeaName = CategoryId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${IdeaName} ideas to your feed!`} />
    );
  }

  return (
    <div>Feed</div>
  )
}

export default Feed