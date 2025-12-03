import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../api/me";

interface HouseholdContextType {
  householdId: number | null;
  setHouseholdId: (id: number | null) => void;
  loading: boolean;
  refreshHousehold: () => Promise<void>;
}

const HouseholdContext = createContext<HouseholdContextType | null>(null);

export function HouseholdProvider({ children }: { children: React.ReactNode }) {
  const [householdId, setHouseholdId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshHousehold() {
    try {
      setLoading(true);
      const user = await getMe();

      const serverHousehold = user?.households?.[0] ?? null;

      setHouseholdId(serverHousehold);
    } catch (err) {
      console.error("Failed to refresh household:", err);
      setHouseholdId(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshHousehold();
  }, []);

  return (
    <HouseholdContext.Provider
      value={{ householdId, setHouseholdId, loading, refreshHousehold }}
    >
      {children}
    </HouseholdContext.Provider>
  );
}

export const useHousehold = () => {
  const ctx = useContext(HouseholdContext);
  if (!ctx) throw new Error("useHousehold must be used inside HouseholdProvider");
  return ctx;
};
