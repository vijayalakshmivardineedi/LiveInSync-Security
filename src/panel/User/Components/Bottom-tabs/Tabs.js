import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import HomeScreen from '../../Navigations/Screens/HomeScreen';
import GetHelp from '../../Navigations/Screens/GetHelp';
import QuickActions from '../../Navigations/Screens/QuickActions';
import Services from '../../Navigations/Screens/Services';
import Community from '../../Navigations/Screens/Community';

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? require('../../../../assets/User/gif/bottom-tabv/home1.gif')
                            : require('../../../../assets/User/gif/bottom-tabv/home.png');
                    } else if (route.name === 'GetHelp') {
                        iconName = focused
                            ? require('../../../../assets/User/gif/bottom-tabv/gethelp.gif')
                            : require('../../../../assets/User/gif/bottom-tabv/home.png');
                    } else if (route.name === 'QuickActions') {
                        iconName = focused
                            ? require('../../../../assets/User/gif/bottom-tabv/quickactions.gif')
                            : require('../../../../assets/User/gif/bottom-tabv/home.png');
                    } else if (route.name === 'Services') {
                        iconName = focused
                            ? require('../../../../assets/User/gif/bottom-tabv/services.gif')
                            : require('../../../../assets/User/gif/bottom-tabv/home.png');
                    } else if (route.name === 'Community') {
                        iconName = focused
                            ? require('../../../../assets/User/gif/bottom-tabv/community.gif')
                            : require('../../../../assets/User/gif/bottom-tabv/home.png');
                    }

                    return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
                },
                tabBarActiveTintColor: '#7D0413',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
                tabBarStyle: { padding: 10, height: 65 },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <Tab.Screen name="GetHelp" component={GetHelp} options={{ tabBarLabel: 'Get Help' }} />
            <Tab.Screen name="QuickActions" component={QuickActions} options={{ tabBarLabel: 'Quick Actions' }} />
            <Tab.Screen name="Services" component={Services} options={{ tabBarLabel: 'Services' }} />
            <Tab.Screen name="Community" component={Community} options={{ tabBarLabel: 'Community' }} />
        </Tab.Navigator>
    );
}

export default Tabs;
