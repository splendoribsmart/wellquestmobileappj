import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Badge } from '@components/ui';
import { useRouter } from 'expo-router';
import { Shield } from 'lucide-react-native';

export default function PrivacyScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const router = useRouter();

  return (
    <View
      testID="screen-patient-legal-privacy"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="Privacy Policy" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4], paddingBottom: theme.spacing[6] }}
        >
          <Card>
            <View style={{ gap: theme.spacing[5] }}>
              <View style={styles.header}>
                <View style={styles.titleRow}>
                  <Shield size={28} color={theme.colors.primary.bg} />
                  <Text style={[styles.mainTitle, { color: colors.text }]}>Privacy Policy</Text>
                </View>
                <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
                  Last updated: January 8, 2025
                </Text>
              </View>

              <Text style={[styles.intro, { color: colors.text }]}>
                At WellQuestPRO, we are committed to protecting your privacy and ensuring the
                security of your personal health information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information.
              </Text>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Information We Collect
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We collect information that you provide directly to us, including your name,
                  email address, phone number, date of birth, and health-related information
                  necessary to provide our services.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We also automatically collect certain information about your device and usage
                  patterns, including IP address, browser type, operating system, and pages viewed
                  within our platform.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  How We Use Your Information
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  Your information is used to provide, maintain, and improve our healthcare
                  services, communicate with you about your health and our services, and comply with
                  legal obligations.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We use your health information to coordinate your care with healthcare providers,
                  process insurance claims, conduct quality assessments, and support population
                  health management initiatives.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  How We Share Your Information
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We may share your information with healthcare providers involved in your care,
                  insurance companies for payment purposes, business associates who help us provide
                  services, and as required by law.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We never sell your personal health information. Any sharing is done in accordance
                  with HIPAA regulations and only with entities that agree to protect your privacy.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Security</Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We implement industry-standard security measures to protect your information,
                  including encryption, secure data centers, access controls, and regular security
                  assessments.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  While we strive to protect your information, no electronic transmission or storage
                  is completely secure. We continuously work to improve our security practices.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  HIPAA & Healthcare Privacy
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  As a healthcare platform, we comply with the Health Insurance Portability and
                  Accountability Act (HIPAA) and its Privacy Rule. Your protected health information
                  (PHI) is handled in accordance with federal regulations.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You have rights regarding your health information, including the right to access,
                  amend, and receive an accounting of disclosures. See our HIPAA Notice for complete
                  details.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Us</Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  If you have questions about this Privacy Policy or our privacy practices, please
                  contact our Privacy Office:
                </Text>
                <View style={{ marginTop: theme.spacing[2], gap: theme.spacing[1] }}>
                  <Text style={[styles.contactInfo, { color: colors.text }]}>
                    Email: privacy@wellquestpro.com
                  </Text>
                  <Text style={[styles.contactInfo, { color: colors.text }]}>
                    Phone: 1-800-PRIVACY
                  </Text>
                  <Text style={[styles.contactInfo, { color: colors.text }]}>
                    Mail: WellQuestPRO Privacy Office, 123 Healthcare Blvd, Suite 100
                  </Text>
                </View>
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
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mainTitle: {
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
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 23,
  },
  contactInfo: {
    fontSize: 14,
    fontWeight: '500',
  },
});
