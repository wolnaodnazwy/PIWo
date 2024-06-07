import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from './FavoritesContext';
import "../style3.css";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength);
};

const HotelCard = ({ hotel }) => {
  const { favorites, dispatch } = useContext(FavoritesContext);

  const isFavorite = favorites.some(favorite => favorite.id === hotel.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: hotel });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: hotel });
    }
  };

  return (
    <article className="hotel-card">
      <div className="card-image" style={{ backgroundImage: `url(${hotel.image})` }}>
        <div className="chip-container">
          <p className="chip">{hotel.location}</p>
          <div className="chip-heart" onClick={toggleFavorite}>
            <i className={isFavorite ? "fas fa-heart gray-heart" : "far fa-heart"}></i>
          </div>
        </div>
      </div>
      <p className="text-middle">{hotel.name}</p>
      <p className="text-small">{truncateText(hotel.description, 117)}</p>
      <div className="hotel-card-footer">
        <p className="text-middle">{hotel.rating}</p>
        <p className="text-middle">{hotel.price}</p>
      </div>
      <Link to={`/hotel/${hotel.id}`}>
        <button className="button primary w">View offer</button>
      </Link>
    </article>
  );
};

export default HotelCard;