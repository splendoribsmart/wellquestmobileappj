import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import {
  HelpCircle,
  Shield,
  Heart,
  Settings,
} from 'lucide-react-native';

export default function CaregiverLayout() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.textSecondary,
          drawerStyle: {
            backgroundColor: colors.surface,
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Dashboard',
            drawerIcon: ({ color, size }) => <Heart size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="support"
          options={{
            drawerLabel: 'Support',
            drawerIcon: ({ color, size }) => (
              <HelpCircle size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            drawerIcon: ({ color, size }) => <Settings size={size} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
