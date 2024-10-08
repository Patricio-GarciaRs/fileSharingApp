import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URI}`;

export const uploadFile = async (data) => {
    try {
        let response = await axios.post(`${API_URL}/upload`, data);
        return response.data;
    } catch (error) {
        console.error('Error while calling API ', error.message);
        return { path: ''};
    }
}
