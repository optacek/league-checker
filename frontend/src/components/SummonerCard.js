import React from 'react';
const SummonerCard = ({ champs, name, winrate, level }) => {
    return (
    <div className='card'>
      <p>{name}</p>
      <p>{winrate}</p>
      <p>{level}</p>
      <p>{champs[0]} {champs[1]} {champs[2]}</p>
    </div>
    );
}

export default SummonerCard;