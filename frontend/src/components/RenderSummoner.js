import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import getSummonerInfo from "../api/riotApi";
import Matches from "./Matches";
import SummonerCard from "./SummonerCard";

const RenderSummoner = () => {
    const [summonerData, setSummonerData] = useState(null);
    const [error, setError] = useState(null);
    const [wins, setWins] = useState(null);
    const [losses, setLosses] = useState(null);
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
                const fetchedData = await getSummonerInfo(summonerName, riotId);

                if (fetchedData && fetchedData.league) {
                    // Update state only if data is valid
                    setSummonerData(fetchedData);
                    setWins(fetchedData.league.wins);
                    setLosses(fetchedData.league.losses);
                } else {
                    // Handle case where data does not have expected structure
                    setError('Invalid data structure');
                }
            } catch (err) {
                console.log(err);
                setError('Failed to fetch summoner data');
            }
        };

        fetchSummonerData();
    }, [data]);

    if (error) {
        return <NotFound />;
    }

    if (!summonerData || wins === null || losses === null) {
        return <div>Loading...</div>;
    }

    const [summonerName] = data.split('-');
    const totalGames = wins + losses;
    const winrate = totalGames > 0 ? (wins / totalGames * 100).toFixed(2) : 0; // Calculate winrate and avoid division by zero

    return (
        <div style={{ marginTop: '60px' }}> {/* Adjust margin based on the height of SearchBar */}
            <SummonerCard
                champs={summonerData.mastery}
                name={summonerName}
                winrate={winrate}
                level={summonerData.summoner.summonerLevel}
            />
            <Matches array={summonerData.matches} />
        </div>
    );
};

export default RenderSummoner;