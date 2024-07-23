import React from "react";

const Matches = ({array}) => {
    return (
        <div style={{display: 'flex',gap: '10px'}}>
            {array.map((bool, index) =>
            <div
              key={index}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: bool ? 'green' : 'red',
                border: '1px solid black',
              }}
            />
            )}
        </div>
    );
}
export default Matches