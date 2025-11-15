import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card } from '@components/ui';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

export default function CaregiverSettings() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View testID="screen-caregiver-settings" style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Settings" onMenuPress={handleMenuPress} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Card>
            <Text style={[styles.title, { color: colors.text }]}>Caregiver Settings</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              Manage your caregiver account preferences and settings.
            </Text>
          </Card>
        </View>

        <View style={styles.card}>
          <Card>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Account Settings</Text>
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              Profile information, notifications, and preferences coming soon.
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
