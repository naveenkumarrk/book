import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from './components/HeroSection';
import NavBar from './components/Header/NavBar';
import Recommends from './components/Recommends';

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/recommendations" element={<Recommends />} />
      </Routes>
    </Router>
  )
}

export default App