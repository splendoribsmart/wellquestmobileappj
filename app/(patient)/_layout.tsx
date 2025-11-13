import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import {
  BookOpen,
  HelpCircle,
  Shield,
  FileText,
  Heart,
  Radio,
} from 'lucide-react-native';

export default function PatientLayout() {
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
          name="health-library"
          options={{
            drawerLabel: 'Health Library',
            drawerIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
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
      </Drawer>
    </GestureHandlerRootView>
  );
}
