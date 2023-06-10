// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './header';
import Gallery from './Gallery'; // import the Gallery component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={
            <div className="center-screen">
              <img className="logo" src="src/assets/litecoinlabs.png" alt="Litecoin Labs" />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
