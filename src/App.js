import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import HeroSection from './Components/HeroSection';
import HotelCard from './Components/HotelCard';
import HotelDetails from './Components/HotelDetails';
import hotels from './hotels';
import './App.css';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <section id="browse" className="browse-section">
              <p className="title-middle">Explore the hotels</p>
              <input className="searchbar" placeholder="Search by hotel name, place, description etc" />
              <section className="grid hotel-cards">
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </section>
            </section>
          </>
        } />
        <Route path="/hotel/:id" element={<HotelDetails />} />
      </Routes>
    </div>
  );
};

export default App;