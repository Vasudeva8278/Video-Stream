import React from "react";

const Signin = () => {
  const handleGoogleSignin = () => {
    console.log("Sign in with Google clicked");
    // Add Google sign-in logic here
  };

  const handleFacebookSignin = () => {
    console.log("Sign in with Facebook clicked");
    // Add Facebook sign-in logic here
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('https://source.unsplash.com/1600x900/?social')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Sign In</h2>
        <button
          onClick={handleGoogleSignin}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#DB4437",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>
        <button
          onClick={handleFacebookSignin}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4267B2",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

export default Signin;
