import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Für Seiten-Navigation
import util from "@/util"; // Utilities (Token-Speicherung, TTL-Handling)
import { useAuth } from "@/components/AuthContext"; // Globale Authentifizierung

const RegisterScreen = () => {
  // States für Eingabefelder und Fehlermeldungen
  const [displayName, setDisplayName] = useState<string>(""); // Anzeigename
  const [email, setEmail] = useState<string>(""); // Email/Username
  const [password, setPassword] = useState<string>(""); // Passwort
  const [error, setError] = useState<string>(""); // Fehlerausgabe

  const router = useRouter(); // Navigation
  const { refreshAuth } = useAuth(); // Auth-Status aktualisieren nach Registrierung

  useEffect(() => {
    checkRoute(); // Beim Mount prüfen ob bereits eingeloggt
  }, []);

  // Weiterleitung, wenn Token vorhanden ist
  const checkRoute = async () => {
    const token = await util.getItemWithTTL("authToken");
    if (token) {
      router.push("/"); // Direkt zur Startseite
    }
  };

  // Registrierung absenden
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: displayName, // Anzeigename
          username: email, // Benutzername ist gleich Email
          password: password, // Passwort
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error); // Fehler weitergeben
      }

      const token = await response.text(); // Rückgabe: JWT-Token
      await util.storeItemWithTTL("authToken", token, 86400); // Token lokal speichern
      await refreshAuth(); // Auth-Kontext aktualisieren

      setError(""); // Fehler zurücksetzen
      router.push("/"); // Weiterleitung zur Startseite
    } catch (error) {
      setError((error as Error).message); // Fehler anzeigen
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Registrieren</Text>

        {/* Eingabefelder für Benutzername, Email, Passwort */}
        <TextInput
          placeholder="Benutzername"
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Passwort"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />

        {/* Fehleranzeige */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Button zum Registrieren */}
        <Button title="Registrieren" onPress={handleSubmit} color="#28a745" />

        {/* Link zurück zur Login-Seite */}
        <Text style={styles.switchText}>
          Bereits ein Konto?{" "}
          <Button
            title="Login"
            onPress={() => router.push("/screens/auth/LoginScreen")}
            color="#007bff"
          />
        </Text>
      </View>
    </View>
  );
};

// Styles für die Darstellung
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
    elevation: 5, // Android-Shadow
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

export default RegisterScreen;
