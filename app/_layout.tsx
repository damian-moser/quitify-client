import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./screens/main/MainScreen";
import { Button } from "react-native";
import LoginScreen from "./screens/auth/LoginScreen";
import ScanScreen from "./screens/scan/ScanScreen";

type RootStackParamList = {
  MainScreen: undefined;
  LoginScreen: undefined;
  ScanScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

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
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{ title: "Scan" }}
      />
    </Stack.Navigator>
  );
}
