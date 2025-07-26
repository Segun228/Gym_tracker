import axios from 'axios';

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `VK ${btoa(window.location.search.slice(1))}`,
    },
});

instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response?.data || error.message)
);