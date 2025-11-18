import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card } from '@components/ui';
import { Lock } from 'lucide-react-native';

export default function PrivacyScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View
      testID="screen-clinician-legal-privacy"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="Privacy Policy" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4], gap: theme.spacing[4] }}
        >
          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.header}>
                <Lock size={28} color={theme.colors.primary.bg} />
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                  Privacy Policy
                </Text>
              </View>
              <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
                Last Updated: January 8, 2025
              </Text>
              <Text style={[styles.intro, { color: colors.textSecondary }]}>
                WellQuestPRO is committed to protecting your privacy and the privacy of patient
                information. This Privacy Policy explains how we collect, use, and protect your
                information.
              </Text>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[4] }}>
              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  1. Information We Collect
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We collect the following types of information:
                </Text>
                <View style={styles.subsection}>
                  <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                    Professional Information
                  </Text>
                  <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                    Name, credentials, medical license number, specialization, contact information,
                    and employer details.
                  </Text>
                </View>
                <View style={styles.subsection}>
                  <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                    Patient Health Information
                  </Text>
                  <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                    Medical records, treatment plans, clinical notes, vital signs, lab results,
                    and other health-related data entered into the platform.
                  </Text>
                </View>
                <View style={styles.subsection}>
                  <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                    Usage Information
                  </Text>
                  <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                    Device information, IP address, browser type, access times, and pages viewed.
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  2. How We Use Information
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We use collected information to:
                </Text>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Provide and maintain the platform services
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Enable communication between healthcare providers and patients
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Improve platform functionality and user experience
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Comply with legal and regulatory requirements
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Ensure platform security and prevent fraud
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  3. Information Sharing
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We do not sell or rent your personal information. We may share information with:
                </Text>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Other healthcare providers involved in patient care (with appropriate authorization)
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Service providers who assist in platform operations (under strict confidentiality)
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Legal authorities when required by law or to protect rights and safety
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  4. Data Security
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We implement comprehensive security measures including encryption, access controls,
                  secure data centers, regular security audits, and employee training. All data
                  transmissions are encrypted using industry-standard protocols.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  5. Data Retention
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We retain personal and health information for as long as necessary to provide services
                  and comply with legal obligations. Patient health records are retained in accordance
                  with applicable medical record retention laws.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  6. Your Rights
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You have the right to:
                </Text>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Access your personal information
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Request corrections to inaccurate information
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Request deletion of your information (subject to legal requirements)
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Object to certain processing of your information
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  7. Cookies and Tracking
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We use cookies and similar technologies to maintain sessions, remember preferences,
                  and analyze platform usage. You can control cookie settings through your browser.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  8. Changes to Privacy Policy
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We may update this Privacy Policy periodically. We will notify you of significant
                  changes via email or platform notification. Your continued use after changes
                  constitutes acceptance.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  9. Contact Us
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  For privacy-related questions or to exercise your rights:
                </Text>
                <Text style={[styles.contactText, { color: colors.text }]}>
                  Email: privacy@wellquestpro.com
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
  subsection: {
    marginTop: 12,
    paddingLeft: 12,
  },
  subsectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
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
