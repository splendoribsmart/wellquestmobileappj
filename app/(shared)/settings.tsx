import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@/src/components/layout/TopBar';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Settings" showBack />
      <View
        testID="screen-settings"
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Placeholder screen for settings
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
