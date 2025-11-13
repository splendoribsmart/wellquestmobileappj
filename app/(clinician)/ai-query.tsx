import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';

export default function AiQueryScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View
      testID="screen-clinician-ai-query"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>AI Query</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Placeholder screen for clinician AI query
      </Text>
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
