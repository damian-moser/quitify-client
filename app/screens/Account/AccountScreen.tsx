import { useAuth } from "@/components/AuthContext";
import { User } from "@/constants/Schemes";
import util from "@/util";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function () {
  const [user, setUser] = useState<User>();

  const router = useRouter();
  const { refreshAuth } = useAuth();

  const loadUser = async () => {
    const token = await util.getItemWithTTL("authToken");

    if (!token) {
      router.push("/");
    }

    try {
      const response = await fetch("http://localhost:8080/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const user: User = await response.json();
      setUser(user);
    } catch (error) {}
  };

  const handleLogout = async () => {
    const token = await util.getItemWithTTL("authToken");

    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      await util.removeTTLitem("authToken");
      await refreshAuth();
      router.push("/");
    } catch (error) {}
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <View style={styles.profileView}>
      <Text style={styles.profileText}>Guten Tag, {user?.displayName}</Text>
      <Text>{user?.username}</Text>
      <br />
      <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
        <Text style={styles.buttonText}>Abmelden</Text>
      </TouchableOpacity>
    </View>
  );
}

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
