import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Signin from './auth/Signin';
import Header from './Nav/Header';
import Home from './components/Home';
import History from './components/History';
import Recommendation from './components/Recomandation';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication state on initial load
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const storedName = localStorage.getItem('name');
    setIsAuthenticated(authStatus);
    setName(storedName || '');
    setLoading(false);
  }, []);

  useEffect(() => {
    // Sync state with localStorage whenever authentication changes
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('name', name);
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('name');
    }
  }, [isAuthenticated, name]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setName('');
    localStorage.clear(); // Clear all stored data
  };

  if (loading) {
    return <div>Loading...</div>; // Simple loading screen
  }

  return (
    <Router>
      {isAuthenticated && (
        <Header
          isAuthenticated={isAuthenticated}
          name={name}
          onLogout={handleLogout}
        />
      )}
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} setName={setName} />
            )
          }
        />
        <Route
          path="/signin"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Signin setIsAuthenticated={setIsAuthenticated} setName={setName} />
            )
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="/recommendation"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Recommendation />
            </PrivateRoute>
          }
        />
        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
