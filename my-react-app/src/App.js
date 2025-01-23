import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './auth/Login';
import Signin from './auth/Signin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        {/* Display the Login Component */}
        <Login />
        {/* Display the Signin Component */}

       
      </header>
    </div>
  );
}

export default App;
