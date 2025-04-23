interface RegisterProps {
    setIsRegister: (value: boolean) => void;
  }
  
  export default function RegisterPage({ setIsRegister }: RegisterProps) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Registrieren</h2>
          <input type="text" placeholder="Benutzername" style={styles.input} />
          <input type="email" placeholder="Email" style={styles.input} />
          <input type="password" placeholder="Passwort" style={styles.input} />
          <button style={styles.button}>Registrieren</button>
          <p style={styles.switchText}>
            Bereits ein Konto?{" "}
            <button onClick={() => setIsRegister(false)} style={styles.link}>
              Login
            </button>
          </p>
        </div>
      </div>
    );
  }
  
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
  