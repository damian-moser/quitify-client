// Importiere grundlegende UI-Komponenten und Navigation
import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router"; // Navigation über expo-router

// Hauptfunktion für den Startbildschirm der App
export default function HomeScreen() {
  const router = useRouter(); // Hook zum Navigieren zwischen Screens

  return (
    <View style={styles.container}>
      {/* Überschrift */}
      <Text style={styles.header}>Willkommen zu Quitify!</Text>

      {/* Beschreibung */}
      <Text style={styles.body}>
        Scanne deine Quittungen, um sie zu speichern und später darauf
        zuzugreifen.
      </Text>

      {/* Navigations-Button zur Scan-Seite */}
      <Button
        title="Quittung Scannen"
        onPress={() => router.push("/screens/scan/ScanScreen")}
      />

      {/* Fußzeile mit zusätzlichem Hinweis */}
      <Text style={styles.footer}>
        Erstelle, speichere und verwalte deine Quittungen.
      </Text>
    </View>
  );
}

// StyleSheet mit einfachen Layout-Definitionen
const styles = StyleSheet.create({
  container: {
    flex: 1, // Nimmt den gesamten verfügbaren Platz ein
    justifyContent: "center", // Zentriert vertikal
    alignItems: "center", // Zentriert horizontal
    padding: 20, // Innenabstand
    backgroundColor: "#fff", // Weißer Hintergrund
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
  },
  body: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#000000",
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: "#000000",
  },
});
