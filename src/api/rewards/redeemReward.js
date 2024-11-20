import getInstance from '../../axios/axiosInstance';

const axios = getInstance();

export async function redeemReward(rewardItemId) {
    try {
        const response = await axios.get(`/reward/redeem/${rewardItemId}`);

        const data = await response.data.reward;

        return { rewardRedeemed: data, error: null };
    } catch (error) {
        console.log(error);

        return { rewardRedeemed: null, error: error };
    }
}
