import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, Menu, ChevronLeft } from 'lucide-react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onMenuPress?: () => void;
}

export function TopBar({ title, showBack = false, onMenuPress }: TopBarProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const router = useRouter();

  const handleNotifications = () => {
    router.push('/(shared)/notifications');
  };


  const handleBack = () => {
    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.iconButton}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
        ) : onMenuPress ? (
          <TouchableOpacity
            onPress={onMenuPress}
            style={styles.iconButton}
            accessibilityLabel="Open menu"
            accessibilityRole="button"
          >
            <Menu size={24} color={colors.text} />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.centerSection}>
        <Text
          style={[styles.title, { color: colors.text }]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          onPress={handleNotifications}
          style={styles.iconButton}
          accessibilityLabel="Notifications"
          accessibilityRole="button"
        >
          <Bell size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 80,
  },
  iconButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
