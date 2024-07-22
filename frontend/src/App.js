import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SummonerInfo from './components/SummonerInfo';
import './App.css';
import Home from './components/Home';
import RenderSummoner from "./components/RenderSummoner";
import SearchBar from "./components/searchBar";
import NotFound from "./components/NotFound";

function App() {
    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <SearchBar />
                <div style={{ marginTop: '60px' }}> {/* Adjust margin-top based on SearchBar height */}
                    <Routes>
                        <Route path="/summoner/:data" element={<RenderSummoner />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;