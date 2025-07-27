import bridge from '@vkontakte/vk-bridge';
import { instance } from './instance';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../config';
import handleLog from '../../helpers/handleLog';
import vkBridge from '@vkontakte/vk-bridge';


export const authorize = async () => {
    try {
        handleLog("Sending auth request started")
        const launchParams = await vkBridge.send('VKWebAppGetLaunchParams');
        handleLog("Received launch params", launchParams)
        const base64Params = btoa(JSON.stringify(launchParams));

        const response = await instance.post(
            'user/login/', null,
            {headers: {
                Authorization: `VK ${base64Params}`,
            }}
        );

        const jwt = response;
        handleLog(jwt)
        localStorage.setItem(ACCESS_TOKEN, jwt.access)
        localStorage.setItem(REFRESH_TOKEN, jwt.refresh)
        return jwt;
    } catch (error) {
        console.error("Auth error:", error);
        throw error;
    }
};