import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SummonerInfo from './components/SummonerInfo';
import './App.css';
import Home from './components/Home';

const App = () => {

  return (
  <>
    <Router>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/summoner' element={<SummonerInfo />} />
        </Routes>
    </Router>
  </>
  );
};

export default App;