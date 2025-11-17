import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@theme/index';
import { Button, Card } from '@components/ui';
import { Stethoscope, Heart, ClipboardCheck, Bell } from 'lucide-react-native';

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const features = [
    {
      icon: Stethoscope,
      title: 'For Clinicians',
      description: 'Track patients, monitor alerts, and generate comprehensive reports.',
    },
    {
      icon: Heart,
      title: 'For Patients',
      description: 'Track symptoms, follow care plans, and stay on top of medications.',
    },
    {
      icon: ClipboardCheck,
      title: 'Collaborative Care',
      description: 'Seamless communication between clinicians and patients for better outcomes.',
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Never miss medications, appointments, or important health checks.',
    },
  ];

  return (
    <View
      testID="screen-onboarding"
      style={[styles.container, { backgroundColor: theme.colors.surface.alt }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View
            style={[
              styles.logoContainer,
              {
                backgroundColor: theme.colors.primary.bg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            <Heart
              size={32}
              color={theme.colors.primary.fg}
              strokeWidth={2.5}
            />
          </View>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize['3xl'],
                fontFamily: theme.typography.fontFamily.bold,
                marginBottom: theme.spacing[2],
              },
            ]}
          >
            Welcome to WellQuestPRO
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.text.muted,
                fontSize: theme.typography.fontSize.base,
                fontFamily: theme.typography.fontFamily.normal,
                marginBottom: theme.spacing[6],
              },
            ]}
          >
            Support for clinicians and patients to manage care together
          </Text>
        </View>

        <View style={{ marginBottom: theme.spacing[6] }}>
          <Card>
            {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <View
                key={index}
                style={[
                  styles.featureRow,
                  {
                    paddingVertical: theme.spacing[3],
                    borderBottomWidth:
                      index < features.length - 1 ? theme.borderWidth.hairline : 0,
                    borderBottomColor: theme.colors.surface.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: theme.colors.state.selection.bg,
                      marginRight: theme.spacing[3],
                    },
                  ]}
                >
                  <Icon
                    size={20}
                    color={theme.colors.primary.bg}
                    strokeWidth={2}
                  />
                </View>
                <View style={styles.featureContent}>
                  <Text
                    style={[
                      styles.featureTitle,
                      {
                        color: theme.colors.text.primary,
                        fontSize: theme.typography.fontSize.base,
                        fontFamily: theme.typography.fontFamily.semibold,
                        marginBottom: theme.spacing[1],
                      },
                    ]}
                  >
                    {feature.title}
                  </Text>
                  <Text
                    style={[
                      styles.featureDescription,
                      {
                        color: theme.colors.text.muted,
                        fontSize: theme.typography.fontSize.sm,
                        fontFamily: theme.typography.fontFamily.normal,
                      },
                    ]}
                  >
                    {feature.description}
                  </Text>
                </View>
              </View>
            );
          })}
          </Card>
        </View>

        <View style={styles.actions}>
          <Button
            onPress={() => router.push('/(auth)/login')}
            variant="primary"
            size="lg"
            title="Get Started"
          />
          <Text
            style={[
              styles.linkText,
              {
                color: theme.colors.text.muted,
                fontSize: theme.typography.fontSize.sm,
                fontFamily: theme.typography.fontFamily.normal,
                marginTop: theme.spacing[4],
              },
            ]}
          >
            Already have an account?{' '}
            <Text
              onPress={() => router.push('/(auth)/login')}
              style={[
                styles.link,
                {
                  color: theme.colors.primary.bg,
                  fontFamily: theme.typography.fontFamily.semibold,
                },
              ]}
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {},
  featureDescription: {
    lineHeight: 20,
  },
  actions: {
    marginTop: 8,
  },
  linkText: {
    textAlign: 'center',
  },
  link: {},
});
