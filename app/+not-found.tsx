// Importiere benötigte Module und Komponenten
import { Link, Stack } from 'expo-router'; // Stack für Header-Konfiguration, Link für Navigation
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText'; // Eigene Komponente für text mit Theme-Support
import { ThemedView } from '@/components/ThemedView'; // Eigene View-Komponente mit Theme-Support

// Standard-Export der NotFoundScreen-Komponente
export default function NotFoundScreen() {
  return (
    <>
      {/* Setzt den Titel der Navigationsleiste auf "Oops!" */}
      <Stack.Screen options={{ title: 'Oops!' }} />

      {/* Container-View mit zentriertem Layout */}
      <ThemedView style={styles.container}>
        {/* Zeigt eine Nachricht an, dass die Seite nicht existiert */}
        <ThemedText type="title">This screen doesn't exist.</ThemedText>

        {/* Link zurück zur Startseite */}
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

// StyleSheet mit einfachen Styles für Container und Link
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Zentriert horizontal
    justifyContent: 'center', // Zentriert vertikal
    padding: 20, // Innenabstand
  },
  link: {
    marginTop: 15, // Abstand zum Text darüber
    paddingVertical: 15, // Vertikaler Innenabstand für bessere Touch-Fläche
  },
});
