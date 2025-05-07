import { Slot } from "expo-router";
import { AuthProvider } from "@/components/AuthContext";
import Layout from "./layout";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout>
        <Slot />
      </Layout>
    </AuthProvider>
  );
}
