"use client";

import { SelectedHistory } from "@/app/types/context";
import { createContext, useCallback, useMemo, useState } from "react";

type ContextValue = {
  selected: SelectedHistory;
  setSelected: (history: SelectedHistory) => void;
  clearSelection: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const ReportHistoryContext = createContext<ContextValue | null>(null);

function ReportHistoryProvider({ children }: ProviderProps) {
  const [selected, setSelected] = useState<SelectedHistory>(null);
  const clearSelection = useCallback(() => setSelected(null), []);

  const value = useMemo(
    () => ({ selected, setSelected, clearSelection }),
    [selected, clearSelection],
  );

  return (
    <ReportHistoryContext.Provider value={value}>
      {children}
    </ReportHistoryContext.Provider>
  );
}

export { ReportHistoryProvider, ReportHistoryContext };
