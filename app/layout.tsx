// Importiere benötigte Komponenten und Hooks
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Navigation
import { useAuth } from "@/components/AuthContext"; // Authentifizierungs-Context
import { ReactNode } from "react";

// Layout-Komponente, die ein gemeinsames Header-Menü und Content-Wrapper bereitstellt
export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuth } = useAuth(); // Zugriff auf den Authentifizierungsstatus

  return (
    <View style={styles.container}>
      {/* Kopfzeile mit App-Namen und Navigation */}
      <View style={styles.header}>
        {/* App-Titel, klickbar zur Startseite */}
        <Text style={styles.headerText} onPress={() => router.push("/")}>
          Quitify
        </Text>

        {/* Bedingte Darstellung je nach Authentifizierungsstatus */}
        <View style={styles.buttonRow}>
          {isAuth ? (
            <View style={styles.credentialsView}>
              {/* Authentifizierter Benutzer: Zugriff auf Mailbox und Profil */}
              <Button
                title="Meine Mailboxen"
                onPress={() => router.push("/screens/mail/MailScreen")}
              />
              <Button
                title="Mein Profil"
                onPress={() => router.push("/screens/Account/AccountScreen")}
              />
            </View>
          ) : (
            <View style={styles.credentialsView}>
              {/* Nicht authentifiziert: Login und Registrierung */}
              <Button
                title="Login"
                onPress={() => router.push("/screens/auth/LoginScreen")}
              />
              <Button
                title="Registrieren"
                onPress={() => router.push("/screens/auth/RegisterScreen")}
              />
            </View>
          )}
        </View>
      </View>

      {/* Bereich für eingebettete Seiteninhalte */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

// Stile für das Layout
const styles = StyleSheet.create({
  container: {
    flex: 1, // Gesamter Platz wird eingenommen
  },
  credentialsView: {
    flexDirection: "row", // Buttons nebeneinander
    gap: 8, // Abstand zwischen Buttons
  },
  header: {
    backgroundColor: "#f8f9fa", // Helles Grau
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between", // Titel links, Buttons rechts
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  content: {
    flex: 1, // Restlicher Platz für Seiteninhalt
  },
});
