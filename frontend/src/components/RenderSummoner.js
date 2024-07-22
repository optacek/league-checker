import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';

const RenderSummoner = () => {
    const { data } = useParams();
    if (!data.includes('-')) {
        return <NotFound />;
    }

    const [summonerName, riotId] = data.split('-');

    return (
        <div style={{ marginTop: '60px' }}> {/* Adjust margin based on the height of SearchBar */}
            <p>Summoner: {summonerName} </p>
            <p>ID: {riotId} </p>
        </div>
    );
};

export default RenderSummoner;