import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Badge } from '@components/ui';
import { Shield } from 'lucide-react-native';

export default function HipaaScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View
      testID="screen-clinician-legal-hipaa"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="HIPAA Compliance" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4], gap: theme.spacing[4] }}
        >
          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.header}>
                <Shield size={28} color={theme.colors.primary.bg} />
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                  HIPAA Compliance
                </Text>
              </View>
              <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
                Last Updated: January 8, 2025
              </Text>
              <Text style={[styles.intro, { color: colors.textSecondary }]}>
                This Notice of Privacy Practices describes how WellQuestPRO protects patient health
                information and your obligations as a healthcare provider under HIPAA regulations.
              </Text>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.badgeRow}>
                <Badge variant="success">HIPAA Compliant</Badge>
                <Badge variant="info">SOC 2 Type II</Badge>
              </View>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                WellQuestPRO is fully compliant with the Health Insurance Portability and Accountability
                Act (HIPAA) and has implemented comprehensive safeguards to protect patient health information.
              </Text>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[4] }}>
              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Protected Health Information (PHI)
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  PHI includes any information about health status, healthcare provision, or payment
                  that can be linked to an individual. This includes:
                </Text>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Medical records and clinical notes
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Lab results and diagnostic images
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Treatment plans and prescriptions
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Billing and insurance information
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Clinician Responsibilities
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  As a healthcare provider using WellQuestPRO, you must:
                </Text>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Only access PHI necessary for treatment, payment, or healthcare operations
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Maintain confidentiality of login credentials and authentication tokens
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Report any suspected breaches or unauthorized access immediately
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Complete required HIPAA training and maintain awareness of policies
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Use secure connections and avoid accessing PHI on public networks
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Patient Rights Under HIPAA
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  Patients have the right to:
                </Text>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Access and obtain copies of their health records
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Request amendments to their health information
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Receive an accounting of disclosures of their PHI
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    Request restrictions on certain uses and disclosures
                  </Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={[styles.bullet, { color: colors.textSecondary }]}>•</Text>
                  <Text style={[styles.listText, { color: colors.textSecondary }]}>
                    File complaints about privacy violations
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Security Safeguards
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  WellQuestPRO implements technical, physical, and administrative safeguards:
                </Text>
                <View style={styles.subsection}>
                  <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                    Technical Safeguards
                  </Text>
                  <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                    End-to-end encryption, secure authentication, access controls, audit logs,
                    and automatic session timeouts.
                  </Text>
                </View>
                <View style={styles.subsection}>
                  <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                    Physical Safeguards
                  </Text>
                  <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                    Secure data centers with restricted access, environmental controls, and
                    disaster recovery systems.
                  </Text>
                </View>
                <View style={styles.subsection}>
                  <Text style={[styles.subsectionTitle, { color: colors.text }]}>
                    Administrative Safeguards
                  </Text>
                  <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                    Security policies, workforce training, risk assessments, and incident
                    response procedures.
                  </Text>
                </View>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Breach Notification
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  In the event of a breach affecting unsecured PHI, we will notify affected
                  individuals, the Department of Health and Human Services, and, in some cases,
                  the media, as required by HIPAA breach notification rules.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Business Associate Agreement
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  By using WellQuestPRO, healthcare organizations acknowledge that we serve as a
                  Business Associate under HIPAA. A formal Business Associate Agreement (BAA) is
                  required and can be obtained through our legal team.
                </Text>
              </View>

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Contact for HIPAA Matters
                </Text>
                <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                  For HIPAA-related questions or to report violations:
                </Text>
                <Text style={[styles.contactText, { color: colors.text }]}>
                  Privacy Officer: hipaa@wellquestpro.com
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
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
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
