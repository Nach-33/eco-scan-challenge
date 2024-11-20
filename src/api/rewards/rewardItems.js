import getInstance from '../../axios/axiosInstance';

const axios = getInstance();

export async function getRewardItems() {
    try {
        const response = await axios.get('/reward/items/all');

        const data = await response.data.rewardItemsList;

        return { rewardItemsList: data, error: null };
    } catch (error) {
        console.log(error);

        return { rewardItemsList: null, error: error };
    }
}
