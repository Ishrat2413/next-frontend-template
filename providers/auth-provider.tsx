import { createContext, useContext, useState, useEffect } from "react";
import { type Role } from "../constants/roles";
import { DEMO_USERS } from "../constants/demo-users";

interface AuthContextType {
  user: typeof DEMO_USERS[0] | null;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<typeof DEMO_USERS[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("auth-user");
    if (saved) setUser(JSON.parse(saved));
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    const found = DEMO_USERS.find((u) => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem("auth-user", JSON.stringify(found));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
