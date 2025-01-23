import React, { useEffect, useState } from 'react';
import HomePage from './HomePage'; // Import HomePage component
import './css/Home.css'; // Ensure to style the page as needed

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page for fetching more data

  useEffect(() => {
    // Initial fetch on component mount
    fetchMoreItems();
  }, []);

  const fetchMoreItems = async () => {
    setLoading(true);
    try {
      // Simulate fetching new items (replace with your actual API endpoint)
      const response = await fetch(`http://localhost:5000/api/items?page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data = await response.json();
      setItems((prevItems) => [...prevItems, ...data]); // Append new items to the existing list
      setPage((prevPage) => prevPage + 1); // Increment the page number
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    // Check if the user is at the bottom of the page
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      fetchMoreItems();
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      <HomePage /> {/* Display the HomePage component */}
      <div className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      {loading && <div className="loading">Loading more items...</div>}
    </div>
  );
};

export default Home;
