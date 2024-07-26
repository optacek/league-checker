import React from "react";

const Matches = ({ array }) => {
    if (!array || !Array.isArray(array) || array.length === 0) {
        return (<div
            style={{display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'}}>
        No data available
        </div>
        );
    }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',  // Center items horizontally
      }}
    >
      {array.map((bool, index) => (
        <div
          key={index}
          style={{
            width: '500px',
            height: '80px',
            backgroundColor: bool ? 'green' : 'red',
            border: '1px solid black',
          }}
        />
      ))}
    </div>
  );
};

export default Matches;
