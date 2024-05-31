// src/components/HotelDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import hotels from '../hotels';
import "../style3.css";



const HotelDetails = () => {
  const { id } = useParams();
  const hotel = hotels.find(hotel => hotel.id === parseInt(id));

  if (!hotel) {
    return <p>Hotel not found</p>;
  }
  return (
    <div>
      <section className="title">
        <p className="title-large">{hotel.name}</p>
      </section>
      <section id="hero" className="grid hero-section1">
        <article className="hero-details2">
          <div className="hero-image-container" style={{ backgroundImage: `url(${hotel.image})` }}>
            <p className="chip1">Add to favourites<i className={hotel.favorite ? "fas fa-heart gray-heart" : "far fa-heart"}></i></p>
          </div>
        </article>
        <section className="hero-details1">
          <div>
            <p className="text-small"><b>Location:</b> {hotel.location}</p>
            <p className="text-small"><b>Local category:</b> {hotel.rating}</p>
            <p className="text-small"><b>Price:</b> {hotel.price}/night</p>
            <p className="text-small"><b>Description:</b></p>
            <article className="text-small">
              <br />{hotel.description}
            </article>
          </div>
          <button className="button2 primary">Contact<i className="fa-regular fa-envelope"></i></button>
          <section className="grid hero-cards1">
          <article className="hotel-card1">
              <img src={hotel.image} alt="Hotel" />
            </article>
            <article className="hotel-card1">
              <img src={hotel.image} alt="Hotel" />
            </article>
          </section>
        </section>
      </section>
    </div>
  );
};

export default HotelDetails;