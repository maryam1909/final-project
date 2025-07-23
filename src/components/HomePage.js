import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const snap = await getDocs(collection(db, 'shows'));
      setShows(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchShows();
  }, []);

  return (
    <div>
      <h1>Available Shows</h1>
      {shows.map(show => (
        <div key={show.id}>
          <h3>{show.title}</h3>
          <p>{show.description}</p>
          <Link to={`/show/${show.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}
