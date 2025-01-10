import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { createReservation, deleteBooking, toggleRSVP } from '../../api/bookingData';
// import { deletePost } from '../../api/postData';

function BookingCard({ bookingObj, onUpdate }) {
  const { user } = useAuth();
  const [selectRsvp, setSelectRsvp] = useState(false);

  const RSVP = (bookingId) => {
    const userId = user.id;
    createReservation(bookingId, userId);
    setSelectRsvp(true);
  };

  useEffect(() => {
    toggleRSVP(user.id, bookingObj.id).then(setSelectRsvp);
  }, [user, bookingObj]);

  const deleteThisBooking = () => {
    if (window.confirm(`Delete ${bookingObj.facility}, ${bookingObj.sportSpace}?`)) {
      deleteBooking(bookingObj.id).then(() => onUpdate());
    }
  };

  const isOwner = user?.id === bookingObj.ownerId;

  return (
    <Card className="booking-card">
      <div className="picture-container">
        <Card.Img className="picture" variant="top" src={bookingObj.image} alt={bookingObj.facility} />
      </div>
      <Card.Body className="card-body">
        <div className="card-content">
          <Card.Title className="card-title" style={{ color: '#060b3b' }}>
            Facility: {bookingObj.facility}
          </Card.Title>
          <Card.Title className="card-title" style={{ color: '#060b3b' }}>
            {bookingObj.sportSpace}
          </Card.Title>
          <Card.Text className="card-location" style={{ color: '#060b3b' }}>
            Sport: {bookingObj.category.name}
          </Card.Text>
          <Card.Text className="card-location" style={{ color: '#060b3b' }}>
            Location: {bookingObj.location.name}
          </Card.Text>
        </div>
        <div className="button-container">
          <Link href={`/booking/${bookingObj.id}`} passHref>
            <Button variant="primary" className="m-2 btn-lg">
              View Details
            </Button>
          </Link>
          {selectRsvp ? (
            <span style={{ fontWeight: 'bold' }} className="text-success">Booking Reserved</span>
          ) : (
            <Button variant="primary" className="m-2 btn-lg" onClick={() => RSVP(bookingObj.id)}>
              RSVP
            </Button>
          )}
        </div>
        <div className="button-container">
          {isOwner && (
            <Link href={`/booking/edit/${bookingObj.id}`} passHref>
              <Button variant="info" className="m-2 btn-lg">
                EDIT
              </Button>
            </Link>
          )}
          {isOwner && (
            <Button variant="danger" onClick={deleteThisBooking} className="m-2 btn-lg">
              DELETE
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

BookingCard.propTypes = {
  bookingObj: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    facility: PropTypes.string,
    sportSpace: PropTypes.string,
    ownerId: PropTypes.number,
    rsvps: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default BookingCard;
