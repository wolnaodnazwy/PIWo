import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import HeroSection from './Components/HeroSection';
import HotelCard from './Components/HotelCard';
import HotelDetails from './Components/HotelDetails';
import Login from './Components/Login';
import ContactModal from './Components/ContactModal';
import Favorites from './Components/Favorites'; 
import { FavoritesProvider } from './Components/FavoritesContext';
import { db, collection, getDocs } from './firebase';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hotels, setHotels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <FavoritesProvider>
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
          <Route path="/favorites" element={<Favorites />} /> {/* Dodanie nowej trasy */}
        </Routes>
        <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </FavoritesProvider>
  );
};

export default App;