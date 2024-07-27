import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import getSummonerInfo from "../api/riotApi";
import SummonerCard from "./SummonerCard";
import MatchHistory from './MatchHistory';
import './RenderSummoner.css';
const RenderSummoner = () => {
    const [summonerData, setSummonerData] = useState(null);
    const [error, setError] = useState(null);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
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

                if (fetchedData) {
                    // Update state only if data is valid
                    setSummonerData(fetchedData);
                    if (fetchedData.league) {
                        setWins(fetchedData.league.wins);
                        setLosses(fetchedData.league.losses);
                    }
                } else {
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
    <div className="render-summoner-container">
      <div className="match-history-container">
        <MatchHistory matchData={summonerData.matches_details} bools={summonerData.matches}/>
      </div>
      <div className="summoner-card-container">
        <SummonerCard
          champs={summonerData.mastery}
          name={summonerName}
          winrate={winrate}
          level={summonerData.summoner.summonerLevel}
        />
      </div>
    </div>
  );
};

export default RenderSummoner;