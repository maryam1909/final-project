import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function Checkout() {
  const navigate = useNavigate();
  const booking = JSON.parse(localStorage.getItem('booking'));

  const handlePayment = async () => {
    const receiptRef = await addDoc(collection(db, 'receipts'), {
      showId: booking.showId,
      seats: booking.seats,
      createdAt: serverTimestamp(),
      amount: booking.seats.length * 150
    });

    const options = {
      key: 'YOUR_RAZORPAY_KEY',
      amount: booking.seats.length * 150 * 100,
      currency: 'INR',
      name: 'Ticket Booking',
      description: 'Show Ticket Payment',
      handler: function () {
        navigate(`/receipt/${receiptRef.id}`);
      },
      prefill: {
        email: 'user@example.com'
      },
      theme: {
        color: '#3399cc'
      }
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  useEffect(() => {
    if (booking) handlePayment();
  }, []);

  return <p>Processing Payment...</p>;
}
