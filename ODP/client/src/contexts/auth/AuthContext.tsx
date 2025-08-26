import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  id: number;
  username: string;
  uloga: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  register: (userData: Omit<User, "id">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const register = (userData: Omit<User, "id">) => {
    setUser({ id: Date.now(), ...userData });
  };

  return <AuthContext.Provider value={{ user, register }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
