import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface HouseholdContextType {
  householdId: number | null;
  setHouseholdId: (id: number | null) => void;
  loading: boolean;
}

const HouseholdContext = createContext<HouseholdContextType | null>(null);

export function HouseholdProvider({ children }: { children: React.ReactNode }) {
  const [householdId, setHouseholdId] = useState<number | null>(null);
  const loading = false;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/JoinHousehold") return;

    if (!householdId) {
      navigate("/JoinHousehold", { replace: true });
    }

  }, [householdId, location.pathname]);

  return (
    <HouseholdContext.Provider value={{ householdId, setHouseholdId, loading }}>
      {children}
    </HouseholdContext.Provider>
  );
}

export const useHousehold = () => {
  const ctx = useContext(HouseholdContext);
  if (!ctx) throw new Error("useHousehold must be used inside HouseholdProvider");
  return ctx;
};
