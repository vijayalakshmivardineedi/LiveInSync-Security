import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import DialpadKeypad from '../CustomKeypad/DialpadKeypad';
import BarcodeScanner from './BarcodeScanner';

// Create a stack navigator
const Stack = createStackNavigator();

const Scanner = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Scanner " // Set your initial route here
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Dialpad" component={DialpadKeypad} />
        <Stack.Screen name="Scanner " component={BarcodeScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Scanner;
