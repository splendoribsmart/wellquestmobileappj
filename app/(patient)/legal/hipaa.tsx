import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Banner, Button } from '@components/ui';
import { useRouter } from 'expo-router';
import { Lock, FileText, Phone, Mail } from 'lucide-react-native';

export default function HipaaScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const router = useRouter();

  return (
    <View
      testID="screen-patient-legal-hipaa"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="HIPAA Notice" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4], gap: theme.spacing[4] }}
        >
          <Card>
            <View style={{ gap: theme.spacing[4] }}>
              <View style={styles.header}>
                <View style={styles.titleRow}>
                  <Lock size={28} color={theme.colors.primary.bg} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.mainTitle, { color: colors.text }]}>
                      HIPAA Notice of Privacy Practices
                    </Text>
                  </View>
                </View>
                <Text style={[styles.effectiveDate, { color: colors.textSecondary }]}>
                  Effective Date: January 1, 2024
                </Text>
                <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
                  Last updated: January 8, 2025
                </Text>
              </View>

              <Text style={[styles.intro, { color: colors.text }]}>
                This notice describes how medical information about you may be used and disclosed
                and how you can get access to this information. Please review it carefully.
              </Text>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Our Legal Duties</Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                WellQuestPRO is required by law to maintain the privacy of your protected health
                information (PHI) and to provide you with this notice of our legal duties and
                privacy practices.
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                We are required to abide by the terms of this notice currently in effect. We reserve
                the right to change our practices and to make the new provisions effective for all
                PHI we maintain. If we make material changes, we will provide you with a revised
                notice.
              </Text>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                How We May Use and Disclose Your Information
              </Text>

              <View style={styles.subsection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                  For Treatment
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We may use and disclose your health information to provide, coordinate, or manage
                  your healthcare and related services. This includes sharing information with
                  healthcare providers involved in your care.
                </Text>
              </View>

              <View style={styles.subsection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>For Payment</Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We may use and disclose your health information to bill and collect payment for
                  services provided to you. This may include disclosures to insurance companies and
                  health plans.
                </Text>
              </View>

              <View style={styles.subsection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                  For Healthcare Operations
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We may use and disclose your information for healthcare operations, including
                  quality assessment, performance improvement, care coordination, and business
                  management activities.
                </Text>
              </View>

              <View style={styles.subsection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                  As Required by Law
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  We will disclose your health information when required to do so by federal, state,
                  or local law, including reporting to public health authorities and law enforcement
                  when legally required.
                </Text>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Your Rights</Text>

              <Banner
                variant="info"
                title="Patient Rights"
                description="You have important rights regarding your health information under HIPAA."
              />

              <View style={styles.subsection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                  Right to Access and Copy
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You have the right to inspect and obtain a copy of your health information that we
                  maintain. We may charge a reasonable fee for copying and mailing costs.
                </Text>
              </View>

              <View style={styles.subsection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                  Right to Amend
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  If you believe that information in your record is incorrect or incomplete, you may
                  request that we amend it. We may deny your request in certain circumstances, and
                  you have the right to submit a statement of disagreement.
                </Text>
              </View>

              <View style={styles.subsection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                  Right to an Accounting of Disclosures
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You have the right to receive a list of certain disclosures we have made of your
                  health information. This does not include disclosures for treatment, payment, and
                  healthcare operations.
                </Text>
              </View>

              <View style={styles.subsection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                  Right to Request Restrictions
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You have the right to request restrictions on how we use or disclose your
                  information. We are not required to agree to your request, but if we do, we will
                  comply with it except in emergency situations.
                </Text>
              </View>

              <View style={styles.subsection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                  Right to Confidential Communications
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You have the right to request that we communicate with you in a certain way or at
                  a certain location. We will accommodate reasonable requests.
                </Text>
              </View>

              <View style={styles.subsection}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                  Right to a Paper Copy
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  You have the right to obtain a paper copy of this notice at any time, even if you
                  agreed to receive it electronically.
                </Text>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                Questions & Complaints
              </Text>

              <Banner
                variant="warning"
                title="Your Right to File a Complaint"
                description="You have the right to file a complaint without fear of retaliation if you believe your privacy rights have been violated."
              />

              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                If you have questions about this notice or believe your privacy rights have been
                violated, you may contact our Privacy Officer:
              </Text>

              <View style={styles.contactSection}>
                <View style={styles.contactRow}>
                  <Mail size={18} color={colors.primary} />
                  <Text style={[styles.contactText, { color: colors.text }]}>
                    privacy@wellquestpro.com
                  </Text>
                </View>
                <View style={styles.contactRow}>
                  <Phone size={18} color={colors.primary} />
                  <Text style={[styles.contactText, { color: colors.text }]}>1-800-PRIVACY</Text>
                </View>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: theme.colors.surface.border,
                  marginVertical: theme.spacing[2],
                }}
              />

              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                You may also file a complaint with the U.S. Department of Health and Human Services
                Office for Civil Rights:
              </Text>

              <View style={{ gap: theme.spacing[1] }}>
                <Text style={[styles.contactText, { color: colors.text }]}>
                  Online: https://www.hhs.gov/hipaa/filing-a-complaint
                </Text>
                <Text style={[styles.contactText, { color: colors.text }]}>
                  Phone: 1-877-696-6775
                </Text>
                <Text style={[styles.contactText, { color: colors.text }]}>
                  Mail: U.S. Department of HHS, 200 Independence Avenue, S.W., Washington, D.C.
                  20201
                </Text>
              </View>

              <View style={{ marginTop: theme.spacing[2] }}>
                <Button variant="secondary" onPress={() => console.log('Open in browser')}>
                  Open Full Notice in Browser
                </Button>
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
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  effectiveDate: {
    fontSize: 13,
    fontWeight: '600',
  },
  lastUpdated: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  intro: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  subsection: {
    gap: 8,
  },
  subsectionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactSection: {
    gap: 12,
    marginTop: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
