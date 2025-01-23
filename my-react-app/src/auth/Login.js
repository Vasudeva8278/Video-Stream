import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for routing
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import for decoding JWT

const Login = ({ setIsAuthenticated, setEmail }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // For error handling
  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request
      const response = await axios.post('http://localhost:5000/auth/login', formData);
      console.log('Login Response:', response.data);

      // Decode the JWT token to get user details
      const decodedToken = jwtDecode(response.data.token);

      // Store the token and email in localStorage
      localStorage.setItem('email', decodedToken.email);
      localStorage.setItem('jwtToken', response.data.token);

      // Update authentication state and email
      if (setIsAuthenticated) setIsAuthenticated(true);
      if (setEmail) setEmail(decodedToken.email);

      // Navigate to the home/dashboard page
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid email or password. Please try again.'); // Display error message
    }
  };

  // Redirect to the sign-in page
  const handleSignInRedirect = () => {
    navigate('/signin'); // Navigate to the sign-in route
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: `url('https://www.futureanthem.com/hubfs/0425_Netflix_Netflix_3x2.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          padding: '20px',
          maxWidth: '400px',
          background: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
          backdropFilter: 'blur(10px)', // Apply blur effect
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)', // Optional shadow for depth
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2 style={{ color: 'white' }}>Login</h2>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light input background
              border: '1px solid #ccc',
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light input background
              border: '1px solid #ccc',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
        <button
          style={{
            marginTop: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'blue',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={handleSignInRedirect}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
