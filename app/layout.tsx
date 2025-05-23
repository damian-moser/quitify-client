import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/components/AuthContext";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuth } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText} onPress={() => router.push("/")}>
          Quitify
        </Text>
        <View style={styles.buttonRow}>
          {isAuth ? (
            <View style={styles.credentialsView}>
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

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    flex: 1,
  },
  credentialsView: {
    flexDirection: "row",
    gap: 8,
  },
  header: {
    backgroundColor: "#f8f9fa",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
    flex: 1,
  },
});
