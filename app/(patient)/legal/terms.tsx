import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card } from '@components/ui';
import { useRouter } from 'expo-router';
import { FileText } from 'lucide-react-native';

export default function TermsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const router = useRouter();

  return (
    <View
      testID="screen-patient-legal-terms"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="Terms of Service" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4] }}
        >
          <Card>
            <View style={{ gap: theme.spacing[4] }}>
              <View style={styles.header}>
                <View style={styles.titleRow}>
                  <FileText size={28} color={theme.colors.primary.bg} />
                  <Text style={[styles.mainTitle, { color: colors.text }]}>Terms of Service</Text>
                </View>
                <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
                  Last updated: January 8, 2025
                </Text>
              </View>

              <Text style={[styles.intro, { color: colors.text }]}>
                Please read these Terms of Service carefully before using WellQuestPRO. By accessing
                or using our platform, you agree to be bound by these terms.
              </Text>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Acceptance of Terms
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  By creating an account or using WellQuestPRO services, you acknowledge that you
                  have read, understood, and agree to be bound by these Terms of Service and our
                  Privacy Policy.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  If you do not agree with any part of these terms, you may not access or use our
                  services. We reserve the right to modify these terms at any time, with notice
                  provided through the platform.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Use of the Service
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  WellQuestPRO provides a platform for managing your health information,
                  communicating with healthcare providers, and accessing health-related resources.
                  You may use our services only for lawful purposes and in accordance with these
                  terms.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You are responsible for maintaining the confidentiality of your account
                  credentials and for all activities that occur under your account. You must notify
                  us immediately of any unauthorized use.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>User Accounts</Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  To access certain features, you must create an account with accurate and complete
                  information. You must be at least 18 years old or have parental consent to use our
                  services.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  Each account is for individual use only. You may not share your account with
                  others or create multiple accounts. We reserve the right to suspend or terminate
                  accounts that violate these terms.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Prohibited Uses</Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You agree not to use WellQuestPRO to: violate any laws or regulations; infringe on
                  intellectual property rights; transmit harmful code or malware; harass or harm
                  others; impersonate any person or entity; or interfere with the platform's
                  operation.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You may not use automated systems to access our services without permission, nor
                  may you attempt to gain unauthorized access to any part of the platform or related
                  systems.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Medical Disclaimer
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  WellQuestPRO is a health management platform and does not provide medical advice,
                  diagnosis, or treatment. The content on our platform is for informational purposes
                  only and should not replace professional medical advice.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  Always seek the advice of your physician or qualified healthcare provider with any
                  questions about a medical condition. Never disregard professional medical advice
                  or delay seeking it because of something you have read on our platform.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  In case of a medical emergency, call 911 or your local emergency number
                  immediately. Do not rely on our platform for urgent medical needs.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Limitation of Liability
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  To the fullest extent permitted by law, WellQuestPRO shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages, including loss
                  of profits, data, or goodwill.
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  Our total liability for any claims arising from your use of the service shall not
                  exceed the amount you paid us in the twelve months preceding the claim, or $100 if
                  you have not made any payments.
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Contact Information
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  If you have questions about these Terms of Service, please contact us:
                </Text>
                <View style={{ marginTop: theme.spacing[2], gap: theme.spacing[1] }}>
                  <Text style={[styles.contactInfo, { color: colors.text }]}>
                    Email: legal@wellquestpro.com
                  </Text>
                  <Text style={[styles.contactInfo, { color: colors.text }]}>
                    Phone: 1-800-555-0123
                  </Text>
                  <Text style={[styles.contactInfo, { color: colors.text }]}>
                    Mail: WellQuestPRO Legal Department, 123 Healthcare Blvd, Suite 200
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
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactInfo: {
    fontSize: 14,
    fontWeight: '500',
  },
});
