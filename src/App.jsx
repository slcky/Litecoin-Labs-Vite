// eslint-disable-next-line no-unused-vars
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Changed to HashRouter
import './App.css';
import Header from './Header';
import Gallery from './Gallery'; // import the Gallery component
import MomentumSlider from './MomentumSlider'; // import the MomentumSlider component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={
            <div className="center-screen">
              <MomentumSlider />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
