import bridge from '@vkontakte/vk-bridge';
import { instance } from './instance';

export const authorize = async () => {
    try {
        const launchParams = await bridge.send('VKWebAppGetLaunchParams');
        const base64Params = btoa(JSON.stringify(launchParams));

        const response = await instance.post(
            '/auth/vk/', null,
            {headers: {
                Authorization: `VK ${base64Params}`,
            }}
        );

        const jwt = response.token;

        return jwt;
    } catch (error) {
        console.error("Auth error:", error);
        throw error;
    }
};