import util from "@/util"; // Token-Utility
import { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; // für sicheres Layout auf iOS/Android

// Email- und Mailbox-Interfaces (Typisierung)
interface Email {
  from: string[];
  to: string[];
  subject: string;
  sentDate: number;
  plainText: string;
  htmlContent: string;
  hasAttachments: boolean;
}

interface Mailbox {
  [email: string]: Email[];
}

export default function App() {
  // State-Definition
  const [mails, setMails] = useState<Mailbox>(); // E-Mails
  const [username, setUsername] = useState<string>(); // Neues Konto
  const [password, setPassword] = useState<string>();

  useEffect(() => {
    fetchAllMails(); // Laden beim Start
  }, []);

  // Holt alle E-Mails vom Server
  const fetchAllMails = async () => {
    const token = await util.getItemWithTTL("authToken");

    try {
      const response = await fetch("http://localhost:8080/api/email", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ein Fehler ist aufgetreten");
      }

      const result = await response.json();
      setMails(result); // Speichern in State
      console.log(result);
    } catch (error) {
      alert(error);
    }
  };

  // Speichert ein neues Postfach (Email+Passwort Kombination)
  const createInbox = async () => {
    if (!username || !password) return;

    const token = await util.getItemWithTTL("authToken");

    const data = { username: username, password: password };

    try {
      const response = await fetch("http://localhost:8080/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Ein Fehler ist aufgetreten");
      }

      const result = await response.json();
      console.log(result); // Erfolgreiche Erstellung
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.headerText}>Alle Mails</Text>

          {/* Eingabe für neues Postfach */}
          <View>
            <TextInput
              placeholder="Email"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Passwort"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            <Button title="Neues Postfach speichern" onPress={createInbox} />
          </View>

          {/* Liste aller geladenen E-Mails */}
          <View style={styles.mailList}>
            {mails ? (
              Object.entries(mails).map(([address, mailList]) =>
                mailList.map((mail, index) => (
                  <View
                    key={`${address}-${index}`}
                    style={styles.mailContainer}
                  >
                    <Text style={styles.subject}>{mail.subject}</Text>

                    <Text>
                      <Text style={styles.label}>Von: </Text>
                      {mail.from.join(", ")}
                    </Text>

                    <Text>
                      <Text style={styles.label}>An: </Text>
                      {mail.to.join(", ")}
                    </Text>

                    <Text>
                      <Text style={styles.label}>Empfangene Adresse: </Text>
                      {address}
                    </Text>

                    <Text>
                      <Text style={styles.label}>Gesendet am: </Text>
                      {new Date(mail.sentDate).toLocaleString()}
                    </Text>

                    <Text>
                      <Text style={styles.label}>Inhalt: </Text>
                      {mail.plainText || "(kein Textinhalt)"}
                    </Text>
                  </View>
                ))
              )
            ) : (
              <Text>Mails werden geladen...</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
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
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
  mailList: {
    marginTop: 16,
  },
  mailContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
});
