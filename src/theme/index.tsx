import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { Theme, ThemeMode, themes } from './tokens';

SplashScreen.preventAutoHideAsync();

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isSystemMode: boolean;
  setSystemMode: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [manualMode, setManualMode] = useState<ThemeMode | null>(null);
  const [isSystemMode, setIsSystemMode] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const effectiveMode: ThemeMode = isSystemMode
    ? systemColorScheme === 'dark'
      ? 'dark'
      : 'light'
    : manualMode || 'light';

  const theme = themes[effectiveMode];

  const setMode = (mode: ThemeMode) => {
    setManualMode(mode);
    setIsSystemMode(false);
  };

  const setSystemModeEnabled = (enabled: boolean) => {
    setIsSystemMode(enabled);
    if (enabled) {
      setManualMode(null);
    }
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode: effectiveMode,
        setMode,
        isSystemMode,
        setSystemMode: setSystemModeEnabled,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export { themes, type Theme, type ThemeMode } from './tokens';
export * from './tokens';
