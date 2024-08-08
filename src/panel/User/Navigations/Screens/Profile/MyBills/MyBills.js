import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Paidbills from "./Paidbills";
import UnpaidBills from "./UnpaidBills";


const Tab = createMaterialTopTabNavigator();
const MyBills = () => {
    return (
            <Tab.Navigator
                screenOptions={{
                    tabBarIndicatorStyle: { backgroundColor: '#7d0431' }, 
                    tabBarActiveTintColor: '#7d0431',
                    tabBarInactiveTintColor: 'gray', 
                }}
            >
                <Tab.Screen name="Paid" component={Paidbills} />
                <Tab.Screen name="Unpaid" component={UnpaidBills} />
            </Tab.Navigator>
    )
}
export default MyBills;