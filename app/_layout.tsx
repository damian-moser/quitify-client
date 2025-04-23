import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/main/MainScreen';
// import LoginScreen from './screens/auth/LoginScreen';
// import AccountScreen from './screens/Account/AccountScreen';
// import ScanScreen from './screens/scan/ScanScreen';

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainScreen" 
        component={MainScreen}
        options={{ title: 'Quitify Übersicht' }}
      />
      {/* <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen 
        name="AccountScreen" 
        component={AccountScreen}
        options={{ title: 'Mein Account' }}
      /> */}
    </Stack.Navigator>
  );
}
