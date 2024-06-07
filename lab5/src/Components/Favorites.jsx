import React, { useContext, useState } from 'react';
import { FavoritesContext } from './FavoritesContext';
import HotelCard from './HotelCard'; // Używamy komponentu HotelCard do wyświetlania hoteli
import "./Favorites.css";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFavorites = favorites.filter((hotel) => {
    return (
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <section id="hero" className="grid hero-section">
        <article className="hero-details">
          <p className="title-large">Favorite offers</p>
        </article>
      </section>
      <div className="browse-section">
        <input
          className="searchbar"
          placeholder="Search by hotel name, place, description etc"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <section className="grid hotel-cards">
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <p>No favorites added.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default Favorites;