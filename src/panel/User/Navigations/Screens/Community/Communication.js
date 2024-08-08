import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Discussion from './Discussion';
import IndividualChat from './IndividualChat';

const Tab = createMaterialTopTabNavigator();

const Communication = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: '#7d0431' }, // Change 'blue' to your desired color
                tabBarActiveTintColor: '#7d0431', // Change 'blue' to your desired active text color
                tabBarInactiveTintColor: 'gray', // Change 'gray' to your desired inactive text color
            }}
        >
            <Tab.Screen name="Group" component={Discussion} />
            <Tab.Screen name="Individual" component={IndividualChat} />
        </Tab.Navigator>
    );
}

export default Communication;
