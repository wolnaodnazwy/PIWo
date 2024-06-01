// src/components/HotelDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, doc, getDoc } from '../firebase';
import "../style3.css";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      const hotelDoc = await getDoc(doc(db, "hotels", id));
      if (hotelDoc.exists()) {
        setHotel({ id: hotelDoc.id, ...hotelDoc.data() });
      } else {
        console.log("No such document!");
      }
    };

    fetchHotel();
  }, [id]);

  if (!hotel) {
    return <p>Loading...</p>;
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