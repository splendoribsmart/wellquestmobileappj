import { ReactNode, createContext, useContext, useState } from 'react';

export type UserRole = 'clinician' | 'patient' | null;

interface AppState {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [role, setRole] = useState<UserRole>(null);

  return (
    <AppContext.Provider value={{ role, setRole }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState(): AppState {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}
