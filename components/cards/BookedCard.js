import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getUserBookings, removeReservation } from '../../api/bookingData';

function WatchCard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  // const [selectRsvp, setSelectRsvp] = useState(false);

  const unRSVP = (rsvpObj) => {
    if (window.confirm(`Remove the booking for ${rsvpObj.facility}?`)) {
      removeReservation(user.id, rsvpObj.id)
        .then(() => getUserBookings(user.id))
        .then((data) => setBookings(data))
        .catch((error) => console.error('Error fetching bookings:', error));
    }
  };

  useEffect(() => {
    getUserBookings(user.id)
      .then((data) => setBookings(data))
      .catch((error) => console.error('Error fetching bookings:', error));
  }, [bookings]);

  return (
    <Container style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      <Card style={{
        width: '100%', maxWidth: '800px', backgroundColor: '#f8f9fa', border: '1px solid #ced4da', borderRadius: '8px',
      }}
      >
        <Card.Body>
          <Card.Title style={{
            textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#060b3b',
          }}
          >
            My Upcoming Bookings
          </Card.Title>
          <ul style={{ paddingLeft: '0', listStyleType: 'none', margin: '0' }}>
            {bookings.map((booking) => (
              <li key={booking.id} style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                <Card style={{
                  border: '1px solid #ced4da', width: '100%', maxWidth: '700px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px',
                }}
                >
                  <Card.Body style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px',
                  }}
                  >
                    <span style={{ flexGrow: 1, fontSize: '16px', color: '#495057' }}>{booking.facility}</span>
                    <Button variant="outline-danger" onClick={() => unRSVP(booking)}>
                      Remove Booking
                    </Button>
                    <Link href={`/booking/${booking.id}`} passHref>
                      <Button variant="outline-primary" className="m-2">
                        View Details
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default WatchCard;
