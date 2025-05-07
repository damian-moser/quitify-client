import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import util from "@/util";
import { useAuth } from "@/components/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  const { refreshAuth } = useAuth();

  useEffect(() => {
    checkRoute();
  }, []);

  const checkRoute = async () => {
    const token = await util.getItemWithTTL("authToken");
    if (token) {
      router.push("/");
    }
  };

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
        throw new Error(error);
      }

      const token = await response.text();
      await util.storeItemWithTTL("authToken", token, 86400);
      await refreshAuth();

      setError("");
      router.push("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button title="Anmelden" onPress={handleSubmit} color="#007bff" />

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
