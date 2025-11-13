import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { useAppState } from '@state/AppProvider';

export default function LoginScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { setRole } = useAppState();
  const router = useRouter();

  const handleClinicianLogin = () => {
    setRole('clinician');
    router.replace('/(clinician)/(tabs)/dashboard');
  };

  const handlePatientLogin = () => {
    setRole('patient');
    router.replace('/(patient)/(tabs)/dashboard');
  };

  return (
    <View
      testID="screen-login"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Login</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Placeholder screen for authentication login
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleClinicianLogin}
          style={[styles.button, { backgroundColor: colors.primary }]}
          accessibilityLabel="Continue as Clinician"
          accessibilityRole="button"
        >
          <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
            Continue as Clinician
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePatientLogin}
          style={[styles.button, { backgroundColor: colors.primary }]}
          accessibilityLabel="Continue as Patient"
          accessibilityRole="button"
        >
          <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
            Continue as Patient
          </Text>
        </TouchableOpacity>
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
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
