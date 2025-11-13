import { Tabs } from 'expo-router';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import {
  LayoutDashboard,
  ClipboardList,
  Activity,
  Bell,
  MessageSquare,
} from 'lucide-react-native';

export default function PatientTabsLayout() {
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
        name="care-plan"
        options={{
          title: 'Care Plan',
          tabBarIcon: ({ color, size }) => (
            <ClipboardList size={size} color={color} />
          ),
          tabBarAccessibilityLabel: 'Care Plan tab',
        }}
      />
      <Tabs.Screen
        name="symptoms"
        options={{
          title: 'Symptoms',
          tabBarIcon: ({ color, size }) => <Activity size={size} color={color} />,
          tabBarAccessibilityLabel: 'Symptoms tab',
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminders',
          tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
          tabBarAccessibilityLabel: 'Reminders tab',
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
