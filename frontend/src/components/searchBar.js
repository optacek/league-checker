import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [summonerName, setSummonerName] = useState('');
    const [riotId, setRiotId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        // Combine inputs and format them
        const combinedData = `${summonerName}-${riotId}`;

        // Redirect to the desired route
        navigate(`/summoner/${combinedData}`);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div>
                <label htmlFor="summonerName">Summoner Name:</label>
                <input
                    type="text"
                    id="summonerName"
                    value={summonerName}
                    onChange={(e) => setSummonerName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="riotId">Riot ID:</label>
                <input
                    type="text"
                    id="riotId"
                    value={riotId}
                    onChange={(e) => setRiotId(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Search</button>
        </form>
    );
};

const styles = {
    form: {
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: '#fff',
        borderBottom: '1px solid #ccc',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000
    }
};

export default SearchBar;