import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MainScreen: undefined;
  ScanScreen: undefined;
};

type HeaderNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

interface HeaderProps {
  navigation: HeaderNavigationProp; 
}

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Quitify</Text>
      <View style={styles.buttonContainer}>
        <Button title="Home" onPress={() => navigation.navigate('MainScreen')} />
        <Button title="Scan" onPress={() => navigation.navigate('ScanScreen')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: '10px',
    width: '100%',
  },
});

export default Header;
