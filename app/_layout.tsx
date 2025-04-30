import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./screens/main/MainScreen";
import { Button } from "react-native";
import LoginScreen from "./screens/auth/LoginScreen";
// import AccountScreen from './screens/Account/AccountScreen';
// import ScanScreen from './screens/scan/ScanScreen';

const Stack = createStackNavigator();

export default function Layout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={({ navigation }) => ({
          title: "Quitify Übersicht",
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate("LoginScreen")}
              title="Login"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
