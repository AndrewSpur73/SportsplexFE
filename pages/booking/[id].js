/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentCard from '../../components/cards/CommentCard';
import { useAuth } from '../../utils/context/authContext';
import CommentForm from '../../components/forms/CommentForm';
import { deleteComment, editComment } from '../../api/commentData';
import { getSingleBooking } from '../../api/bookingData';

export default function ViewBooking() {
  const { user } = useAuth();
  const [bookingDetails, setBookingDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getBookingDetails = () => {
    getSingleBooking(id).then(setBookingDetails);
  };

  useEffect(() => {
    getBookingDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addComment = (newComment) => {
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      comments: [...prevDetails.comments, newComment],
    }));
    getBookingDetails();
  };

  const handleDelete = (commentId) => {
    if (window.confirm('Delete review?')) {
      deleteComment(commentId)
        .then(() => {
          getBookingDetails();
        });
    }
  };

  const updateComment = (commentId, newContent) => {
    const payload = { id: commentId, content: newContent };
    editComment(payload).then(() => getBookingDetails());
  };
  console.warn(bookingDetails);
  return (
    <div className="mt-5 d-flex flex-column">
      <div className="d-flex">
        {/* Image on the left */}
        <div className="me-3">
          <img src={bookingDetails?.image} alt={bookingDetails?.facility} style={{ width: '300px', height: 'auto', borderRadius: '8px' }} />
        </div>
        {/* Title, tags, and content on the right */}
        <div style={{ color: 'black', flex: 1 }}>
          <h1 style={{ marginBottom: '10px', color: '#060b3b' }}>{bookingDetails?.facility} - {bookingDetails?.sportSpace}</h1>
          <h4 style={{ marginBottom: '10px', color: '#060b3b' }}>Category: {bookingDetails?.category?.name}</h4>
          <h4 style={{ marginBottom: '10px', color: '#060b3b' }}>Location: {bookingDetails?.location?.name}</h4>
          <h4 style={{ marginBottom: '10px', color: '#060b3b' }}>Number of times booked: {bookingDetails?.rsvps}</h4>
          <p style={{ marginBottom: '10px', color: '#060b3b' }}>{bookingDetails?.description || ''}</p>
        </div>
      </div>
      <hr />
      {/* Comments section */}
      <div>
        <CommentForm bookingId={id} onCommentAdded={addComment} />
        {bookingDetails.comments?.map((c) => (
          <CommentCard
            key={c.id}
            commentObj={c}
            user={user}
            consumeComment={handleDelete}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
}
