import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import type { User } from "./auth";
import { login as loginService, getMe } from "./authService";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token && !user) {
          const me = await getMe(token);

          setUser(me);
          localStorage.setItem("user", JSON.stringify(me));
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const refreshUser = async () => {
    if (!token) return;

    try {
      const me = await getMe(token);

      setUser(me);
      localStorage.setItem("user", JSON.stringify(me));
    } catch {
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    const data = await loginService({
      email,
      password,
    });

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}