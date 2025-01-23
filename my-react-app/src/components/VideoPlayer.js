import React from "react";
import Recomandation from "./Recomandation";

const VideoPlayer = ({ video }) => {
  return (
    <>
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "black",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "white" }}>Now Playing: {video.title}</h2>
        <video
          controls
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <source src={video.source} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Recomandation /> {/* Recommendation section below the video */}
      </div>
    </>
  );
};

export default VideoPlayer;
