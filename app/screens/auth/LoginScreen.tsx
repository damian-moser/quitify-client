import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Navigation innerhalb der App
import util from "@/util"; // Hilfsfunktionen wie Token-Handling
import { useAuth } from "@/components/AuthContext"; // Zugriff auf Authentifizierungskontext

const LoginScreen = () => {
  // Zustand für Benutzereingaben und Fehlernachricht
  const [email, setEmail] = useState<string>(""); // Eingabe: Email/Username
  const [password, setPassword] = useState<string>(""); // Eingabe: Passwort
  const [error, setError] = useState<string>(""); // Anzeige von Fehlermeldungen

  const router = useRouter(); // Navigation
  const { refreshAuth } = useAuth(); // Kontextfunktion zur Aktualisierung der Authentifizierung

  useEffect(() => {
    checkRoute(); // Wird einmal beim Laden der Komponente aufgerufen
  }, []);

  // Überprüfung, ob der User bereits eingeloggt ist
  const checkRoute = async () => {
    const token = await util.getItemWithTTL("authToken");
    if (token) {
      router.push("/"); // Wenn Token vorhanden ist: Weiterleitung zur Startseite
    }
  };

  // Login-Funktion: Senden der Zugangsdaten an das Backend
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error); // Fehlertext anzeigen, z.B. "Ungültige Anmeldedaten"
      }

      const token = await response.text(); // Auth-Token auslesen
      await util.storeItemWithTTL("authToken", token, 86400); // Token für 24h lokal speichern
      await refreshAuth(); // Authentifizierungsstatus im Kontext aktualisieren

      setError(""); // Vorherige Fehlermeldung löschen
      router.push("/"); // Zur Hauptseite navigieren
    } catch (error) {
      // Anzeige der Fehlermeldung an den Nutzer
      setError((error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        {/* Eingabefeld für Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        {/* Eingabefeld für Passwort */}
        <TextInput
          placeholder="Passwort"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        {/* Fehlermeldung */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Button zum Absenden der Login-Daten */}
        <Button title="Anmelden" onPress={handleSubmit} color="#007bff" />

        {/* Navigation zur Registrierungsseite */}
        <Text style={styles.switchText}>
          Noch kein Konto?{" "}
          <Button
            title="Registrieren"
            onPress={() => router.push("/screens/auth/RegisterScreen")}
            color="#007bff"
          />
        </Text>
      </View>
    </View>
  );
};

// Styles für die Login-Komponente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    fontSize: 16,
  },
  error: {
    color: "#ff0000",
    fontWeight: "bold",
  },
  switchText: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default LoginScreen;
