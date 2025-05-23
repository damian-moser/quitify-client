import { useAuth } from "@/components/AuthContext"; // Zugriff auf globalen Authentifizierungsstatus
import { User } from "@/constants/Schemes"; // Definition des User-Typs
import util from "@/util"; // Hilfsfunktionen, u.a. zum Arbeiten mit Tokens im Speicher
import { useRouter } from "expo-router"; // Navigation (Routing) in einer Expo-App
import { useEffect, useState } from "react"; // React Hooks
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // React Native Komponenten

export default function () {
  const [user, setUser] = useState<User>(); // Zustand zur Speicherung des eingeloggten Users

  const router = useRouter(); // Router für Seitenwechsel
  const { refreshAuth } = useAuth(); // Methode zum Aktualisieren des Auth-Zustands aus dem Kontext

  // Funktion zum Laden der Benutzerdaten aus dem Backend
  const loadUser = async () => {
    const token = await util.getItemWithTTL("authToken"); // Token aus dem Speicher lesen

    if (!token) {
      // Kein Token vorhanden – zurück zur Startseite
      router.push("/");
    }

    try {
      // Benutzerinfo vom Backend abrufen
      const response = await fetch("http://localhost:8080/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token im Header mitsenden
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const user: User = await response.json(); // JSON-Antwort in User-Objekt umwandeln
      setUser(user); // User im Zustand speichern
    } catch (error) {
      // Fehler werden momentan ignoriert – Verbesserung: Logging oder Anzeige
    }
  };

  // Funktion zum Abmelden
  const handleLogout = async () => {
    const token = await util.getItemWithTTL("authToken"); // Token aus dem Speicher lesen

    try {
      // Logout-Request an das Backend
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Authentifizierung
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      await util.removeTTLitem("authToken"); // Token aus lokalem Speicher löschen
      await refreshAuth(); // Auth-Status aktualisieren
      router.push("/"); // Zurück zur Startseite navigieren
    } catch (error) {
      // Fehlerbehandlung fehlt – könnte ergänzt werden
    }
  };

  useEffect(() => {
    loadUser(); // Wird beim Laden der Komponente aufgerufen
  }, []);

  return (
    <View style={styles.profileView}>
      <Text style={styles.profileText}>Guten Tag, {user?.displayName}</Text>
      <Text>{user?.username}</Text>
      <br /> {/* <br /> ist HTML und funktioniert in React Native nicht – entfernen */}
      <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
        <Text style={styles.buttonText}>Abmelden</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styling der Komponenten
const styles = StyleSheet.create({
  profileView: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
  },
  profileText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ff0000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: 124,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
