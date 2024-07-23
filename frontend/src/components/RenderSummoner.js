import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import getSummonerInfo from "../api/riotApi";

const RenderSummoner = () => {
    const [summonerData, setSummonerData] = useState(null);
    const [error, setError] = useState(null);
    const { data } = useParams();

    useEffect(() => {
        const fetchSummonerData = async () => {
            if (!data.includes('-')) {
                setError('Invalid data format');
                return;
            }
            const [summonerName, riotId] = data.split('-');
            try {
                setError(null);
                const data = await getSummonerInfo(summonerName, riotId);
                if (data.error) {
                    setError(data.error);
                } else {
                    setSummonerData(data);
                }
            } catch (err) {
                setError('Failed to fetch summoner data');
            }
        };

        fetchSummonerData();
    }, [data]);

    if (error) {
        return <NotFound />;
    }

    if (!summonerData) {
        return <div>Loading...</div>;
    }

    const [summonerName, riotId] = data.split('-');

    return (
        <>
            <div style={{ marginTop: '60px' }}> {/* Adjust margin based on the height of SearchBar */}
                <p>Summoner: {summonerName} </p>
                <p>ID: {riotId} </p>
                <div>
                    <h3>Top 3 Champions</h3>
                    <p>{summonerData['mastery'][0]}</p>
                    <p>{summonerData['mastery'][1]}</p>
                    <p>{summonerData['mastery'][2]}</p>
                </div>
            </div>
        </>
    );
};

export default RenderSummoner;
