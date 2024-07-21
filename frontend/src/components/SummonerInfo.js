import React, { useState } from 'react';
import getSummonerInfo from '../api/riotApi';
import topThreeChampions from "../utils/topThreeChampions";
//Fetches summoner data based on name and id
const SummonerInfo = () => {
const [summonerName, setSummonerName] = useState('');
const [riotId, setRiotId] = useState('');
const [summonerData, setSummonerData] = useState(null);
const [error, setError] = useState(null);
const [topThree, setTopThree] = useState([]);
const [displayedName, setDisplayedName] = useState('');

const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSummonerData(null);

    try {
        const data = await getSummonerInfo(summonerName, riotId);
        const mastery = data['mastery'];

        if (data.error) {
            setError(data.error);
        } else {
            setSummonerData(data);
            setDisplayedName(summonerName);
            const topThree = await topThreeChampions(mastery);
            setTopThree(topThree);
        }
        } catch (err) {
            setError(err.message);
        }
};

const renderMatchRectangles = () => {
    return summonerData.matches.map((match, index) => (
    <div
        key={index}
        className={`rectangle ${match ? 'green' : 'red'}`}
    />
    ));
  };

return (
  <div>
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Get Summoner Info</button>
    </form>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {summonerData && (
        <div>
            <div className="scrollable-container">
                {renderMatchRectangles}
            </div>
            <h2>Summoner Info</h2>
            <p>Name: {displayedName}</p>
            <p>
                Winrate: {
            summonerData['league'] ?
            `${Math.round((summonerData['league']['wins'] / 
              (summonerData['league']['wins'] + summonerData['league']['losses'])) * 100)} %` :
            'None played'
          }
        </p>
            <p>1: {topThree[0]}</p>
            <p>2: {topThree[1]}</p>
            <p>3: {topThree[2]}</p>
        </div>
    )}
  </div>
);
};

export default SummonerInfo;