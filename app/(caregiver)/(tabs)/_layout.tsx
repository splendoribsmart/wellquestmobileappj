import { Tabs } from 'expo-router';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import {
  LayoutDashboard,
  MessageSquare,
} from 'lucide-react-native';

export default function CaregiverTabsLayout() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Dashboard tab',
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color, size }) => (
            <MessageSquare size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Assistant tab',
        }}
      />
    </Tabs>
  );
}
