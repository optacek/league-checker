import React from 'react';
import './MatchHistory.css'; // Ensure this file contains the relevant styles

const MatchHistory = ({ matchData, bools }) => {
  if (!matchData || matchData.length === 0) return <div>No match data available</div>;

  return (
    <div className="match-history-container">
      {matchData.map((match, index) => {
        // Determine background color based on bools[index]
        const backgroundColor = bools[index] ? 'lightblue' : 'lightcoral';

        return (
          <div
            key={index}
            className="match"
            style={{ backgroundColor }} // Apply conditional background color
          >
            <div className="team blue-team">
              <h3>Blue Team</h3>
              <ul>
                {Object.keys(match.blue).map((role) => (
                  <li key={role}>
                    {Object.keys(match.blue[role]).map((champion) => (
                      <div key={champion} className="champion-name">{champion}</div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
            <div className="team red-team">
              <h3>Red Team</h3>
              <ul>
                {Object.keys(match.red).map((role) => (
                  <li key={role}>
                    {Object.keys(match.red[role]).map((champion) => (
                      <div key={champion} className="champion-name">{champion}</div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchHistory;
