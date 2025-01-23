import React, { useEffect, useState } from 'react';

const Recomandation = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Fetch video data from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/videoCategories')
      .then((response) => response.json())
      .then((data) => {
        setVideos(data || []);
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="home-page">
      <h1 className="page-title">Your Recomandations</h1>

      <div className="video-grid">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="video-item" onClick={() => handleVideoClick(video)}>
              <div className="video-thumbnail-container">
                <img
                  src={video.thumb}
                  alt={video.subtitle}
                  className="video-thumbnail"
                />
                <div className="play-button-overlay">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Play_icon_%28Noun_Project%29.svg/1024px-Play_icon_%28Noun_Project%29.svg.png" 
                    alt="Play Icon"
                    className="play-icon"
                  />
                </div>
                <br></br>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
          
          
          
          
                <p className="video-channel">Channel Name</p>

              </div>
            </div>
          ))
        ) : (
          <p>No videos available.</p>
        )}
      </div>

      {selectedVideo && (
        <div className="video-player">
          <button onClick={handleClosePlayer} className="close-btn">Close</button>
          <h2>{selectedVideo.title}</h2>
          <video controls autoPlay>
            <source src={selectedVideo.sources[0]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>Subtitle: {selectedVideo.subtitle}</p>
        </div>
      )}
    </div>
  );
};

export default Recomandation;
