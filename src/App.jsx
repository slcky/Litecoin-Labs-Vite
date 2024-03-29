// eslint-disable-next-line no-unused-vars
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Changed to HashRouter
import './App.css';
import Header from './Header';
import Gallery from './Gallery'; // import the Gallery component
import Calendar from './Calendar'; // import the Calendar component
import logo from './assets/litecoinlabs.png';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/calendar" element={<Calendar />} /> {/* Add this line */}
          <Route path="/" element={
            <div className="center-screen">
              <img className="logo" src={logo} alt="Litecoin Labs" />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
