import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../api/axios";

interface User {
  id: number;
  name: string;
  email: string;
  user_type_id: number;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  async function login(email: string, password: string): Promise<User | null> {
    try {
      setLoading(true);

      const res = await api.post("/login", { email, password });

      const token = res.data.payload.token;
      const user = res.data.payload.user;

      if (!token || !user) return null;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      return user;
    } catch (err) {
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      setLoading(true);

      const res = await api.post("/register", { name, email, password });

      const token = res.data.payload.token;
      const user = res.data.payload.user;

      if (!token || !user) return null;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      return user;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);

  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
