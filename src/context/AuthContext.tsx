import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../api/axios";

interface AuthContextType {
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  async function login(email: string, password: string): Promise<boolean> {
    try {
      setLoading(true);
      const res = await api.post("/login", { email, password });
      const token = res.data?.payload?.token;

      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
        return true;
      }

      return false;
    } catch (err: any) {
      return err.response?.status === 401 ? false : false;
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string): Promise<boolean> {
    try {
      setLoading(true);
      const res = await api.post("/register", { name, email, password });
      const token = res.data?.payload?.token;

      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
        return true;
      }

      return false;
    } catch (err: any) {
      return err.response?.status === 422 ? false : false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
