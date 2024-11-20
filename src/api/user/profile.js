import getInstance from '../../axios/axiosInstance';

const axios = getInstance();

export async function getLoggedInUserData() {
    try {
        const response = await axios.get('/user/profile');

        const data = await response.data.userData;

        return { userDataDoc: data, error: null };
    } catch (error) {
        console.log(error);

        return { userData: null, error: error };
    }
}
