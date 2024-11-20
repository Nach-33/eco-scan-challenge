import getInstance from '../../axios/axiosInstance';

const axios = getInstance();

export async function uploadClothImage(imageFile) {
    try {
        console.log('IMAGEFILE: ', imageFile);
        const form = new FormData();
        form.append('image', imageFile);

        const response = await axios.post('/transaction/upload', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const { url, result } = await response.data;

        return { imageURL: url, result: result, error: null };
    } catch (error) {
        console.log(error);

        return { imageURL: null, result: null, error: error };
    }
}
