import {
    Icon28HomeOutline,
    Icon28ServicesOutline,
    Icon28UserCircleOutline,
    Icon24DumbbellsOutline
} from '@vkontakte/icons';
import {
    Tabbar,
    TabbarItem,
} from "@vkontakte/vkui";
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import React, { useEffect, useState } from 'react';

export const BottomNav = () => {
    const routeNavigator = useRouteNavigator();
    const { view, panel } = useActiveVkuiLocation();

    return (
        <Tabbar>
            <TabbarItem
                onClick={() => routeNavigator.push('/')}
                selected={view === 'home_view'}
                text="Главная"
                aria-label="Главная"
            >
                <Icon28HomeOutline />
            </TabbarItem>

            <TabbarItem
                onClick={() => routeNavigator.push('/workouts')}
                selected={view === 'workouts_view'}
                text="Тренировки"
                aria-label="Тренировки"
            >
                <Icon28ServicesOutline />
            </TabbarItem>

            <TabbarItem
                onClick={() => routeNavigator.push('/exercises')}
                selected={view === 'exercises_view'}
                text="Упражнения"
                aria-label="Упражнения"
            >
                <Icon24DumbbellsOutline style={{width: 28, height: 28}}/>
            </TabbarItem>
        </Tabbar>
    );
};