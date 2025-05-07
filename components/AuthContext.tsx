import React, { createContext, useContext, useState, useEffect } from "react";
import util from "@/util";

type AuthContextType = {
  isAuth: boolean;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  refreshAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  const refreshAuth = async () => {
    const token = await util.getItemWithTTL("authToken");
    setIsAuth(!!token);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
