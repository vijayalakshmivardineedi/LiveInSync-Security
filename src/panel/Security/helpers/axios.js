import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = 'http://192.168.29.24:2000/api';

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const Api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getAuthToken = () => {
    const token = AsyncStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
};

axiosInstance.interceptors.request.use(
    config => {
        config.headers.Authorization = getAuthToken();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
export { Api };