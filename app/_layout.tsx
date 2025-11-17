import { useEffect, useCallback } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@theme/index';
import { AppProvider, useAppState } from '@state/AppProvider';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { role } = useAppState();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!role && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (role && inAuthGroup) {
      if (role === 'clinician') {
        router.replace('/(clinician)/(tabs)/dashboard');
      } else if (role === 'patient') {
        router.replace('/(patient)/(tabs)/dashboard');
      }
    }
  }, [role, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(clinician)" />
      <Stack.Screen name="(patient)" />
      <Stack.Screen name="(shared)" />
      <Stack.Screen name="index" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  const onLayoutReady = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    onLayoutReady();
  }, [onLayoutReady]);

  return (
    <ThemeProvider>
      <AppProvider>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </AppProvider>
    </ThemeProvider>
  );
}
