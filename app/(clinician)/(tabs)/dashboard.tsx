import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

export default function ClinicianDashboardScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

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
