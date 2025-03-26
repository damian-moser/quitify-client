import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MainScreen: undefined;
  ScanScreen: undefined;
};

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Willkommen zur Quittungscanner-App!</Text>
      <Text style={styles.body}>
        Scanne deine Quittungen, um sie zu speichern und später darauf zuzugreifen.
      </Text>

      <Button
        title="Quittung Scannen"
        onPress={() => navigation.navigate('ScanScreen')} 
      />

      <Text style={styles.footer}>Erstelle, speichere und verwalte deine Quittungen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200EE',
  },
  body: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#828282',
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: '#6200EE',
  },
});

export default MainScreen;
