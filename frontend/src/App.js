import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import RenderSummoner from "./components/RenderSummoner";
import SearchBar from "./components/searchBar";
import NotFound from "./components/NotFound";

function App() {
    return (
        <Router>
            <div>
                <SearchBar />
                <div style={{ marginTop: '60px'}}>
                    <div>
                        <Routes>
                            <Route path="/summoner/:data" element={<RenderSummoner />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}
export default App;