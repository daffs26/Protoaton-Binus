import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { UserRole } from "../types";

type AppContextValue = {
  role: UserRole | null;
  setRole: (r: UserRole) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  showAiAlert: boolean;
  setShowAiAlert: (v: boolean) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const ROLE_KEY = "idnexus_role";
const AUTH_KEY = "idnexus_auth";

function loadRole(): UserRole | null {
  const v = localStorage.getItem(ROLE_KEY);
  if (v === "operations" || v === "driver" || v === "marketplace") return v;
  return null;
}

function loadAuth(): boolean {
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole | null>(loadRole);
  const [isAuthenticated, setAuth] = useState(loadAuth);
  const [showAiAlert, setShowAiAlert] = useState(false);

  const setRole = useCallback((r: UserRole) => {
    localStorage.setItem(ROLE_KEY, r);
    setRoleState(r);
  }, []);

  const login = useCallback(() => {
    localStorage.setItem(AUTH_KEY, "1");
    setAuth(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ROLE_KEY);
    setAuth(false);
    setRoleState(null);
  }, []);

  const value = useMemo(
    () => ({
      role,
      setRole,
      isAuthenticated,
      login,
      logout,
      showAiAlert,
      setShowAiAlert,
    }),
    [role, setRole, isAuthenticated, login, logout, showAiAlert],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
