import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import util from "@/util";
import { useAuth } from "@/components/AuthContext";
import { EXPO_API_URL } from "@env";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

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
      const response = await fetch(EXPO_API_URL + "auth/sign-in", {
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

      setErrors({});
      router.push("/");
    } catch (error) {
      try {
        setErrors(JSON.parse((error as Error).message));
        setError("");
      } catch (e) {
        setError((error as Error).message);
        setErrors({});
      }
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
        {Object.entries(errors).map(([field, msg]) => (
          <Text key={field} style={styles.error}>
            {field}: {msg}
          </Text>
        ))}

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
