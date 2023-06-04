// eslint-disable-next-line no-unused-vars
import React from 'react';
import './App.css';
import Header from './header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="center-screen">
        <img className="logo" src="src/assets/litecoinlabs.png" alt="Litecoin Labs" />
      </div>
    </div>
  );
}

export default App;
