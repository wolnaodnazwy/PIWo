// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import HeroSection from './Components/HeroSection';
import HotelCard from './Components/HotelCard';
import HotelDetails from './Components/HotelDetails';
import Login from './Components/Login';
import { db, collection, getDocs } from './firebase';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const querySnapshot = await getDocs(collection(db, "hotels"));
      const hotelsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHotels(hotelsList);
    };

    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    return (
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <section id="browse" className="browse-section">
              <p className="title-middle">Explore the hotels</p>
              <input
                className="searchbar"
                placeholder="Search by hotel name, place, description etc"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <section className="grid hotel-cards">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </section>
            </section>
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
      </Routes>
    </div>
  );
};

export default App;