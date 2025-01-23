import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store JWT token and user ID in local storage
        localStorage.setItem("token", result.token); // Assuming the token is returned in result.token
        localStorage.setItem("userId", result.userId); // Assuming the user ID is returned in result.userId

        alert("Login successful!");
        console.log("User data:", result);

        // Set authentication status to true
        setIsAuthenticated(true);

        // Redirect to the home page or dashboard
        navigate("/"); // Adjust to the path of your home page
      } else {
        alert("Error logging in: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const navigateToSignUp = () => {
    console.log("Navigating to Sign-Up page");
    navigate("/signup"); // Use navigate instead of window.location.href
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/video-game-is-set-be-released-year-june_605423-136442.jpg?w=1060')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                fontSize: "16px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007BFF",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
        <button
          onClick={navigateToSignUp}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#28a745",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
