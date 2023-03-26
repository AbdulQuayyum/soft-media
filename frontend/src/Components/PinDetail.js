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

    if (query) {
      Client.fetch(`${query}`)
        .then((data) => {
          setPinDetail(data[0]);
          console.log(data);
          if (data[0]) {
            const query1 = PinDetailMorePinQuery(data[0]);
            Client.fetch(query1).then((res) => {
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
    <div>PinDetail</div>
  )
}

export default PinDetail