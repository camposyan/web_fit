import axios from "axios";

export const API_URL = 'http://localhost:8080/api/';

export const axiosClient = axios.create();

axiosClient.interceptors.request.use(
    function (config) {
        config.baseURL = API_URL
        config.headers['Content-Type'] = 'application/json'

        return config;
    }
)