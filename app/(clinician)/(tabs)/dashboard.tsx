import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import { Button } from '@components/ui';

export default function ClinicianDashboardScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();
  const router = useRouter();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Clinician Dashboard" onMenuPress={handleMenuPress} />
      <View
        testID="screen-clinician-dashboard"
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Clinician Dashboard
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Placeholder screen for clinician dashboard
        </Text>
        <View style={{ marginTop: 24, width: '100%', maxWidth: 400 }}>
          <Button
            onPress={() => router.push('/(shared)/ui-demo')}
            variant="primary"
            title="View UI Components"
          />
        </View>
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
