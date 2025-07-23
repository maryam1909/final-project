import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      const docRef = doc(db, 'shows', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setShow(docSnap.data());
      }
    };
    fetchShow();
  }, [id]);

  return show ? (
    <div>
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <p>Timing: {show.time}</p>
      <Link to={`/book/${id}`}>Book Now</Link>
    </div>
  ) : <p>Loading...</p>;
}
