import axios from 'axios';
import queryString from 'query-string';

const apiConfig = {
    baseUrl: process.env.REACT_APP_BASE_URL,
    apiKey: process.env.REACT_APP_API_KEY,
}

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apiKey})
});
axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    alert(error.response.data.status_message);
    throw error;
});

export default axiosClient;