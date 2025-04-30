import React from "react";
import { View, Text, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./MainScreen.styles";
import Header from "../../../components/Header";

type RootStackParamList = {
  MainScreen: undefined;
  ScanScreen: undefined;
  LoginScreen: undefined;
};

type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainScreen"
>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Header navigation={navigation} /> */}
      <Text style={styles.header}>Willkommen zu Quitify!</Text>
      <Text style={styles.body}>
        Scanne deine Quittungen, um sie zu speichern und später darauf
        zuzugreifen.
      </Text>

      <Button
        title="Quittung Scannen"
        onPress={() => navigation.navigate("ScanScreen")}
      />

      <Text style={styles.footer}>
        Erstelle, speichere und verwalte deine Quittungen.
      </Text>
    </View>
  );
};

export default MainScreen;
