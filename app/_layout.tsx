import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/main/MainScreen';
// import ScanScreen from './screens/Scan/ScanScreen';

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      {/* <Stack.Screen name="ScanScreen" component={ScanScreen} /> */}
    </Stack.Navigator>
  );
}
