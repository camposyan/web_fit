import axios from "axios";

const API_URL = 'http://localhost:8080/api/';

export const axiosClient = axios.create();

axiosClient.interceptors.request.use(
    function (config) {
        config.baseURL = API_URL
        config.headers['Authorization'] = `Bearer ${''}`
        config.headers['Content-Type'] = 'application/json'

        return config;
    }
)