import axios from 'axios';

const getChampions = async () => {
  try {
    const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/champion.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching champion info:', error);
    throw error;
  }
};

export default getChampions;