import axios from 'axios';

const getSummonerInfo = async (summonerName, riotId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/summoner/${summonerName}/${riotId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summoner info:', error);
    throw error;
  }
};

export default getSummonerInfo;