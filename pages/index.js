import { useEffect, useState } from 'react';
import { getAllBookings } from '../api/bookingData';
import BookingCard from '../components/cards/BookingCard';

function Home() {
  const [bookings, setBookings] = useState([]);

  const showBookings = () => {
    getAllBookings()?.then(setBookings);
  };

  useEffect(() => {
    showBookings();
  }, []);

  return (

    <div className="card-row">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} bookingObj={booking} onUpdate={showBookings} />
      ))}
    </div>

  );
}

export default Home;
