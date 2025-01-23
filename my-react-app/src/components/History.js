import React from 'react';

// Sample data array
const videoData = [
  {
    "title": "Big Buck Bunny",
    "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.",
    "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"],
    "subtitle": "By Blender Foundation",
    "thumb": "images/BigBuckBunny.jpg",
    "category": "Movies",
    "genre": "Animation",
    "createdAt": "2025-01-23T00:00:00Z"
  },
  {
    "title": "Elephant Dream",
    "description": "The first Blender Open Movie from 2006",
    "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"],
    "subtitle": "By Blender Foundation",
    "thumb": "images/ElephantsDream.jpg",
    "category": "Movies",
    "genre": "Animation",
    "createdAt": "2025-01-23T00:00:00Z"
  },
  // Add more video data objects here
];

const History = () => {
  return (
    <div className="history">
      <h1>Video History</h1>
      <div className="video-list">
        {videoData.map((video, index) => (
          <div key={index} className="video-item">
            <img src={video.thumb} alt={video.title} />
            <div className="video-info">
              <h2>{video.title}</h2>
              <p>{video.description}</p>
              <p><strong>Category:</strong> {video.category}</p>
              <p><strong>Genre:</strong> {video.genre}</p>
              <p><strong>Uploaded on:</strong> {new Date(video.createdAt).toLocaleDateString()}</p>
              <a href={video.sources[0]} target="_blank" rel="noopener noreferrer">Watch Now</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
