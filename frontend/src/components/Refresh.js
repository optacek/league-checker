import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Refresh = ({summonerName, riotId}) => {
    const navigate = useNavigate();
    const combinedData = `${summonerName}-${riotId}`;
    const deleteObject = async () => {
        try {
            await fetch('http://127.0.0.1:8000/api/set-csrf-token', {
                credentials: 'include',
            });
            const csrfToken = Cookies.get('csrftoken');
            const response = await fetch(`http://127.0.0.1:8000/api/objects/${summonerName}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            });
            console.log(combinedData);
            window.location.reload();
        } catch (error) {
            ///
        }
    };

    return(
        <div>
            <button onClick={deleteObject}>Refresh</button>
        </div>
    )
};

export default Refresh;