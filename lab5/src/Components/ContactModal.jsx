import React, { useState } from 'react';
import '../ContactModal.css';

const ContactModal = ({ isOpen, onClose, hotelName }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    alert('WYSŁANO');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Contact</h2>
        <p>You're contacting the {hotelName} hotel</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
            <button type="submit" className="send-button">Send <i className="far fa-envelope"></i></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;