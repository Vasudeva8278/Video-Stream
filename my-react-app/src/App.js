import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Nav/Header';
import HomePage from './components/HomePage';
import Login from './auth/Login';
import Signin from './auth/Signin';
import History from './components/History';
import Recomandation from './components/Recomandation';
import Home from './components/Home';

function App() {
  // Add state to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (example with localStorage or sessionStorage)
    const token = localStorage.getItem("token"); // Check if a valid token exists
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        {/* Conditionally render Header based on authentication */}
        {isAuthenticated && <Header />} {/* Display Header only if authenticated */}

        <main>
          <Routes> {/* Use Routes for routing */}
            {/* Define routes for different pages */}
            <Route path="/" element={<PrivateRoute element={<Home />} />} />  {/* HomePage route */}
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> {/* Login route */}
            <Route path="/signup" element={<Signin />} />   {/* Signin route */}
            <Route path="/history" element={<PrivateRoute element={<History />} />} /> {/* History route */}
            <Route path="/recommendations" element={<PrivateRoute element={<Recomandation />} />} /> {/* Recommendations route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
