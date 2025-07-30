import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { Panel, PanelHeader, Group, FixedLayout, IconButton } from '@vkontakte/vkui';
import React from 'react';
import { FaDumbbell } from "react-icons/fa";
import {Icon12FireAlt} from "@vkontakte/icons"
const Header = () => {
    const routeNavigator = useRouteNavigator();
    const handleClick = () => {
        routeNavigator.push("/")
    }
    return (
        <>
            <FixedLayout vertical="top" style={{
                paddingBlock:20,
            }}
            >
                <PanelHeader 
                    style={{
                        paddingBlock:20
                    }}
                    before={
                    <IconButton style={{ marginLeft: 16,}} hoverMode="none" activeMode="none" onClick={()=>handleClick()}>
                        <Icon12FireAlt style={{ width: 24, height: 24 }} />
                    </IconButton>
                }>
                    <span style={{cursor:"pointer"}} onClick={()=>handleClick()}>Gym Tracker</span>
                </PanelHeader>
            </FixedLayout>
        </>
    );
};

export default Header;