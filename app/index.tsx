import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@theme/index';
import { Button } from '@components/ui';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.surface.alt }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.card, { backgroundColor: theme.colors.surface.bg }]}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize['3xl'],
              fontFamily: theme.typography.fontFamily.bold,
            },
          ]}
        >
          WellQuestPRO
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: theme.colors.text.muted,
              fontSize: theme.typography.fontSize.base,
              fontFamily: theme.typography.fontFamily.normal,
            },
          ]}
        >
          Healthcare Management Platform
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => router.push('/(shared)/ui-demo')}
            variant="primary"
            title="View UI Components"
          />
          <Button
            onPress={() => router.push('/(auth)/login')}
            variant="secondary"
            title="Go to Login"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  card: {
    padding: 32,
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
});
