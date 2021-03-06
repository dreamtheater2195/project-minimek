import React from 'react';
import { Menu } from "semantic-ui-react";
import Tab from './Tab';
import ToggleDisplay from 'react-toggle-display';
const TabBar = ({ tabs, currentTab, onTabClick, ...otherProps }) => {
    const tabItems = tabs.map(tabInfo => {
        const { name, label } = tabInfo;
        return (
            <Tab
                key={name}
                name={name}
                label={label}
                active={currentTab === name}
                onClick={onTabClick}
            />
        );
    });

    const tabPanels = tabs.map(tabInfo => {
        const { name, component: TabComponent } = tabInfo;
        return (
            <ToggleDisplay show={name === currentTab} key={name}>
                <TabComponent />
            </ToggleDisplay>
        )
    })
    return (
        <div>
            <Menu tabular attached="top" {...otherProps}>
                {tabItems}
            </Menu>
            {tabPanels}
        </div>
    );
};

export default TabBar;