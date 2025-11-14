import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import {
  Stethoscope,
  Activity,
  Calculator,
  Bookmark,
  HelpCircle,
  Shield,
  FileText,
  Heart,
  Radio,
  Settings,
} from 'lucide-react-native';

export default function ClinicianLayout() {
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
            drawerIcon: ({ color, size }) => (
              <Stethoscope size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="ai-query"
          options={{
            drawerLabel: 'AI Query',
            drawerIcon: ({ color, size }) => <Radio size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="symptom-tracking"
          options={{
            drawerLabel: 'Symptom Tracking',
            drawerIcon: ({ color, size }) => <Activity size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="risk-calculators"
          options={{
            drawerLabel: 'Risk Calculators',
            drawerIcon: ({ color, size }) => (
              <Calculator size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="bookmarks"
          options={{
            drawerLabel: 'Bookmarks',
            drawerIcon: ({ color, size }) => <Bookmark size={size} color={color} />,
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
          name="legal"
          options={{
            drawerLabel: 'Legal',
            drawerIcon: ({ color, size }) => <Shield size={size} color={color} />,
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
