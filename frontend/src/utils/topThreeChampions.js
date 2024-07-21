import getChampById from "./getChampById";
const topThreeChampions = async (mastery) => {
    const sortedMasteryArray = mastery.sort((a, b) => b.championPoints - a.championPoints);

  // Get the top three champions' ids
    const topThreeChampions = sortedMasteryArray.slice(0, 3).map(log => log.championId);
    for (let i = 0; i < topThreeChampions.length; i++) {
        topThreeChampions[i] = await getChampById(topThreeChampions[i].toString());
    }
    console.log(topThreeChampions);
    return topThreeChampions;
}

export default topThreeChampions;