import React, { useEffect, useState } from 'react';
import axios from 'axios';


const History = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // To handle the video preview

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log('JWT Token:', token);
    if (!token) {
      setError('Please log in to view your video history.');
      setLoading(false);
      return;
    }

    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/history/videos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Videos retrieved successfully:', response.data);
        setVideos(response.data.historyVideos);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch video history. Please try again later.');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-orders-container" style={{marginLeft:"-20px"}}>
      <h2>Your Video History</h2>
      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="videos-list">
          {videos.map((video) => (
            <div key={video._id} className="video-card" style={{display:"flex"}}>
              <img style={{width:"400px"}}
                src={video.thumbnail}
                alt={video.title}
                className="video-thumbnail"
              />
              <div className="video-details" style={{marginLeft:"80px"}}>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <p>Date: {new Date(video.createdAt).toLocaleDateString()}</p>
                <div className="video-actions">
                  <button
                    className="play-video"
                    onClick={() => setSelectedVideo(video.source)}
                  >
                    Play Video
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedVideo && (
        <div className="video-preview">
          <div className="preview-overlay" onClick={() => setSelectedVideo(null)}></div>
          <div className="preview-container">
            <button className="close-preview" onClick={() => setSelectedVideo(null)}>
              Close
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              style={{ width: '400px', height: '300px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default History;