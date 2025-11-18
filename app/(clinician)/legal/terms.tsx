import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card } from '@components/ui';
import { FileText } from 'lucide-react-native';

export default function TermsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View
      testID="screen-clinician-legal-terms"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="Terms of Service" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4], gap: theme.spacing[4] }}
        >
          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.header}>
                <FileText size={28} color={theme.colors.primary.bg} />
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                  Terms of Service
                </Text>
              </View>
              <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
                Last Updated: January 8, 2025
              </Text>
              <Text style={[styles.intro, { color: colors.textSecondary }]}>
                Please read these Terms of Service carefully before using WellQuestPRO. By accessing
                or using our platform, you agree to be bound by these terms.
              </Text>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[4] }}>
              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  1. Acceptance of Terms
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  By accessing and using WellQuestPRO, you accept and agree to be bound by these Terms
                  of Service and our Privacy Policy. If you do not agree to these terms, you may not
                  access or use the platform.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  2. Platform Description
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  WellQuestPRO is a healthcare management platform designed to facilitate communication
                  and care coordination between healthcare providers and patients. The platform provides
                  tools for clinical documentation, patient monitoring, and secure messaging.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  3. User Obligations
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  As a clinician user, you agree to:
                </Text>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Maintain the confidentiality of your account credentials
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Use the platform in compliance with all applicable laws and regulations
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Ensure all patient information is handled in accordance with HIPAA requirements
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Not share access credentials with unauthorized individuals
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Immediately report any security breaches or unauthorized access
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  4. Professional Responsibility
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You acknowledge that WellQuestPRO is a tool to support clinical practice but does not
                  replace professional medical judgment. You remain solely responsible for all clinical
                  decisions, diagnoses, and treatment plans.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  5. Data Security and Privacy
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We implement industry-standard security measures to protect patient health information.
                  However, you acknowledge that no electronic transmission or storage is completely secure.
                  You agree to take appropriate precautions when accessing the platform.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  6. Limitation of Liability
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  WellQuestPRO and its affiliates shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from your use or inability to
                  use the platform. This includes, but is not limited to, damages for loss of data,
                  business interruption, or system failures.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  7. Termination
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We reserve the right to suspend or terminate your access to the platform at any time
                  for violation of these terms, illegal activity, or behavior that threatens the security
                  or integrity of the platform.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  8. Changes to Terms
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We may modify these Terms of Service at any time. We will notify you of significant
                  changes via email or platform notification. Your continued use of the platform after
                  such modifications constitutes acceptance of the updated terms.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  9. Governing Law
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  These terms shall be governed by and construed in accordance with the laws of the
                  United States and the state in which our principal office is located, without regard
                  to conflict of law principles.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  10. Contact Information
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  For questions about these Terms of Service, please contact:
                </Text>
                <Text style={[styles.contactText, { color: colors.text }]}>
                  Email: legal@wellquestpro.com
                </Text>
                <Text style={[styles.contactText, { color: colors.text }]}>
                  Phone: 1-800-555-0123
                </Text>
              </View>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  lastUpdated: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  intro: {
    fontSize: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    marginTop: 8,
    paddingLeft: 12,
  },
  bullet: {
    fontSize: 15,
    marginRight: 8,
    lineHeight: 22,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
  },
});
