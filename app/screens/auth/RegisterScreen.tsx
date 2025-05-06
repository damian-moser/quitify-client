import { useState } from "react";
import { Button } from "react-native";

const RegisterScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: displayName,
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registrierung fehlgeschlagen");
      }
      navigation.navigate("MainScreen");
    } catch (error) {
      console.error("Fehler beim Register:", error);
      alert("Registrieren fehlgeschlagen. Bitte überprüfe deine Eingaben.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Registrieren</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Benutzername"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Registrieren
          </button>
        </form>
        <p style={styles.switchText}>
          Bereits ein Konto?{" "}
          <Button
            title="Login"
            onPress={() => navigation.navigate("LoginScreen")}
          />
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f3f4f6",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    width: "300px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  switchText: {
    marginTop: "10px",
    fontSize: "14px",
  },
  link: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};
