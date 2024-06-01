// src/Components/Login.jsx
import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import { loginWithGoogle, registerWithEmail, loginWithEmail, auth } from '../firebase';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

Modal.setAppElement('#root');

const Login = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        setUserName(`${user.displayName}`);
        setModalIsOpen(true);
      })
      .catch((error) => {
        console.error("Login error: ", error);
        setError("Błąd logowania.");
      });
  };

  const handleEmailLogin = async () => {
    try {
      await loginWithEmail(email, password);
      const user = auth.currentUser;
      setUserName(`${user.email}`);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Login error: ", error);
      setError("Błąd logowania.");
    }
  };

  const handleRegister = async () => {
    try {
      await registerWithEmail(email, password);
      const user = auth.currentUser;
      setUserName(`${user.email}`);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Register error: ", error);
      setError("Błąd logowania.");
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/');
  };

  const clearError = () => {
    setError('');
  };

  const toggleRegistering = () => {
    setIsRegistering(!isRegistering);
    clearError();
  };

  return (
    <div className="login-page">
      <h2 className="login-title">{isRegistering ? "Create Account" : "Login"}</h2>
      {isRegistering ? (
        <>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError();
            }}
          />
          <button className="button primary login-button" onClick={handleRegister}>Create Account</button>
          <p className="login-toggle">Already have an account? <span className="login-toggle-link" onClick={toggleRegistering}>Login here</span></p>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError();
            }}
          />
          <button className="button primary login-button" onClick={handleEmailLogin}>Login with Email</button>
          <div className="google-login-button-wrapper">
            <GoogleButton className="google-login-button" onClick={handleGoogleLogin} />
          </div>
          <p className="login-toggle">Don't have an account? <span className="login-toggle-link" onClick={toggleRegistering}>Create one here</span></p>
        </>
      )}
      {error && <p className="login-error">{error}</p>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Successful"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Zalogowano się pomyślnie</h2>
        <p>Witaj, {userName}!</p>
        <button className="button primary modal-button" onClick={closeModal}>OK</button>
      </Modal>
    </div>
  );
};

export default Login;