import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
// import { deletePost } from '../../api/postData';

function BookingCard({ bookingObj }) {
  const { user } = useAuth();

  // const deleteThisBooking = () => {
  //   if (window.confirm(`Delete ${bookingObj.facility}, ${bookingObj.sportSpace}?`)) {
  //     deletePost(postObj.id).then(() => onUpdate());
  //   }
  // };

  const isOwner = user?.uid === bookingObj.ownerId;

  return (
    <Card className="booking-card">
      <div className="picture-container">
        <Card.Img className="picture" variant="top" src={bookingObj.image} alt={bookingObj.facility} />
      </div>
      <Card.Body className="card-body">
        <div>
          <Card.Title className="card-title">{bookingObj.facility}</Card.Title>
          <Card.Title className="card-title">{bookingObj.sportSpace}</Card.Title>
          <Card.Text className="card-location">Sport: {bookingObj.category.name}</Card.Text>
          <Card.Text className="card-location">Location: {bookingObj.location.name}</Card.Text>
          <Card.Text className="text-muted">{bookingObj.description}</Card.Text>
        </div>
        <div className="button-container">
          <Link href={`/booking/${bookingObj.id}`} passHref>
            <Button variant="primary" className="m-2 btn-lg">
              VIEW
            </Button>
          </Link>
          {isOwner && (
            <Link href={`/booking/edit/${bookingObj.id}`} passHref>
              <Button variant="info" className="m-2 btn-lg">
                EDIT
              </Button>
            </Link>
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
    image: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  category: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};
export default BookingCard;
