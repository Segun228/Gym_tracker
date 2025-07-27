import axios from 'axios';
import handleLog from "../../helpers/handleLog"
import bridge from '@vkontakte/vk-bridge';

export const getParams = async () => {
    try{
        await bridge.send('VKWebAppGetLaunchParams').then(data => {
            handleLog(data);
            return data
        }).catch(error => {
            console.error(error);
        });
    }
    catch(error){
        console.error(error)
    }
}



export const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response?.data || error.message)
);