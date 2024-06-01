import React from 'react';
import { Link } from 'react-router-dom';
import "../style3.css";



const HotelCard = ({ hotel }) => {
  return (
    <article className="hotel-card">
      <div className="card-image" style={{ backgroundImage: `url(${hotel.image})` }}>
        <div className="chip-container">
          <p className="chip">{hotel.location}</p>
          <div className="chip-heart"><i className={hotel.favorite ? "fas fa-heart gray-heart" : "far fa-heart"}></i></div>
        </div>
      </div>
      <p className="text-middle">{hotel.name}</p>
      <p className="text-small">{hotel.description}</p>
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