import axios from "axios";

axios.defaults.headers.common['Authorization'] =`${localStorage.getItem('token')}`;

const $api = axios.create({
    withCredentials: false,
    baseURL: process.env.REACT_APP_SERVER_URL
})


$api.interceptors.request.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.code === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/refresh`, { token: localStorage.getItem('accessToken') })
            .then(response => response.data)
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken)
            })
        return $api.request(originalRequest);
    }
    throw error;
})

export default $api;