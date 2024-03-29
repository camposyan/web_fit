import axios from "axios";

export const API_URL = 'http://localhost:3001/';
export const API_URL_MOCK = 'http://localhost:5173/api/';

export const axiosClient = axios.create();

axiosClient.interceptors.request.use(
    function (config) {
        config.baseURL = API_URL
        config.headers['Content-Type'] = 'application/json'
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

        return config;
    }
)