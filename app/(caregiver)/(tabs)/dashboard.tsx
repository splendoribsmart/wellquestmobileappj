import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card } from '@components/ui';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

export default function CaregiverDashboard() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View testID="screen-caregiver-dashboard" style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Caregiver Dashboard" onMenuPress={handleMenuPress} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Card>
            <Text style={[styles.title, { color: colors.text }]}>Welcome, Caregiver</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              Your dashboard for managing care activities and staying organized.
            </Text>
          </Card>
        </View>

        <View style={styles.card}>
          <Card>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Quick Actions</Text>
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              • Track medications and care tasks{'\n'}
              • Coordinate with healthcare providers{'\n'}
              • Access caregiver resources{'\n'}
              • Get AI assistance for caregiving questions
            </Text>
          </Card>
        </View>

        <View style={styles.card}>
          <Card>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Get Started</Text>
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              Use the Assistant tab to ask questions about caregiving, medication management,
              communicating with healthcare providers, and self-care tips.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
