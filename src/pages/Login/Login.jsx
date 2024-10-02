import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const { checkAndShowToasts } = useToast();

  // Check and show any toasts from local storage on component mount
  useEffect(() => {
    checkAndShowToasts();
  }, [checkAndShowToasts]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log("token isss", data);
      
      // Store token and user ID in local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.ID);
      localStorage.setItem('loginSuccess', 'true'); // Set key for login success in local storage

      // Call the login function from useAuth
      login(data.token);
      
      // Navigate to home after a successful login
      setTimeout(() => {
        console.log('Navigating to home...');
        navigate('/');
        window.location.reload();
      }, 100);
    } catch (err) {
      setError(err.message);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='form-button' type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
