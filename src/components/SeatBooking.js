import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SeatBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seats = Array.from({ length: 30 }, (_, i) => i + 1);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const proceedToCheckout = () => {
    localStorage.setItem('booking', JSON.stringify({ showId: id, seats: selectedSeats }));
    navigate('/checkout');
  };

  return (
    <div>
      <h2>Select Seats</h2>
      <div>
        {seats.map(seat => (
          <button
            key={seat}
            style={{ backgroundColor: selectedSeats.includes(seat) ? 'green' : 'lightgray', margin: '4px' }}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
      <button onClick={proceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
}
