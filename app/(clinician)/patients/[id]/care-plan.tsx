import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@/src/components/layout/TopBar';

export default function PatientCarePlanScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Care Plan" showBack />
      <View
        testID="screen-patient-care-plan"
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Care Plan</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Placeholder screen for patient {id} care plan
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
