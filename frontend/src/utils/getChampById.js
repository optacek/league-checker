import championApi from "../api/championApi";

/**
 * @param championId
 * @returns Either champions name as a string or null
 */
const getChampById = async (championId) => {
    const data = await championApi();
    for (const champion in data['data']) {
        if (data['data'][champion]['key'] === championId) {
            return data['data'][champion]['name']
        }
    }
    return null;
}

export default getChampById;