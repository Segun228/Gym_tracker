import bridge from '@vkontakte/vk-bridge';
import { instance } from './instance';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../config';
import handleLog from '../../helpers/handleLog';

export const authorize = async () => {
    try {
        const launchParams = await bridge.send('VKWebAppGetLaunchParams');
        const base64Params = btoa(JSON.stringify(launchParams));

        const response = await instance.post(
            'login/', null,
            {headers: {
                Authorization: `VK ${base64Params}`,
            }}
        );

        const jwt = response.token;
        handleLog(jwt)
        localStorage.setItem(ACCESS_TOKEN, jwt.access)
        localStorage.setItem(REFRESH_TOKEN, jwt.refresh)
        return jwt;
    } catch (error) {
        console.error("Auth error:", error);
        throw error;
    }
};