import axios from "axios";

// const API_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8080/api/' : 'https://t1xos6znii.execute-api.us-east-1.amazonaws.com/dev/api/';
// const API_URL = 'http://127.0.0.1:8080/api/';
const API_URL = 'http://localhost:8080/api/';

export const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Origin': '*',
    },
});

export const getAxiosConfig = () => {
    const token = typeof window !== 'undefined' ? window.localStorage.getItem('LOGIN-TOKEN') : null;

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}