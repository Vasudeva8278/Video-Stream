import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import VideoPlayer from "./VideoPlayer"; // Import VideoPlayer component
import "./css/Home.css";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page for fetching more data
  const [selectedVideo, setSelectedVideo] = useState(null); // Store the selected video

  useEffect(() => {
    // Initial fetch on component mount
    fetchItems();
  }, []);

  // Fetch items from the API
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/items?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();
      setItems((prevItems) => [...prevItems, ...data]); // Append new items to the existing list
      setPage((prevPage) => prevPage + 1); // Increment the page number
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle infinite scrolling
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      fetchItems();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle video selection
  const handleVideoClick = (videoData) => {
    setSelectedVideo(videoData); // Set the selected video to be played
  };

  return (
    <div className="home-container">
      <HomePage /> {/* Display the HomePage component */}

      <div className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button onClick={() => handleVideoClick(item)}>Post Video</button>
          </div>
        ))}
      </div>

      {loading && <div className="loading">Loading more items...</div>}

      {selectedVideo && (
        <div>
          <h2>Recommended Videos</h2>
          <div className="recommended-videos">
            <VideoPlayer video={selectedVideo} /> {/* Pass the selected video */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
