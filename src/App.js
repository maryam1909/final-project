import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ShowDetails from './components/ShowDetails';
import SeatBooking from './components/SeatBooking';
import Checkout from './components/Checkout';
import Receipt from './components/Receipt';
import Auth from './components/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/book/:id" element={<SeatBooking />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/receipt/:id" element={<Receipt />} />
      </Routes>
    </Router>
  );
}

export default App;
