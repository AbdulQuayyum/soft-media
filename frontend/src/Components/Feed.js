import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Client } from "../Utilities/Client"
import { FeedQuery, SearchQuery } from "../Utilities/Data"
import { MasonryLayout, Spinner } from "./Index"

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { CategoryID } = useParams();

  useEffect(() => {
    if (CategoryID) {
      setLoading(true);
      const query = SearchQuery(CategoryID);
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
  }, [CategoryID]);

  const IdeaName = CategoryID || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${IdeaName} ideas to your feed!`} />
    );
  }

  return (
    <div>
      {pins && (
        <MasonryLayout Pins={pins} />
      )}
    </div>
  )
}

export default Feed