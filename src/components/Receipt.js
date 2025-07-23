import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Receipt() {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      const snap = await getDoc(doc(db, 'receipts', id));
      if (snap.exists()) setReceipt(snap.data());
    };
    fetchReceipt();
  }, [id]);

  return receipt ? (
    <div>
      <h2>Receipt</h2>
      <p>Show ID: {receipt.showId}</p>
      <p>Seats Booked: {receipt.seats.join(', ')}</p>
      <p>Amount Paid: ₹{receipt.amount}</p>
      <p>Date: {receipt.createdAt?.toDate().toString()}</p>
    </div>
  ) : <p>Loading receipt...</p>;
}
