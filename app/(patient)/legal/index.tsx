import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card } from '@components/ui';
import { useRouter } from 'expo-router';
import { Shield, FileText, Lock, Activity, ChevronRight } from 'lucide-react-native';

interface LegalDocument {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  route: string;
  icon: 'shield' | 'fileText' | 'lock' | 'activity';
}

const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Terms and conditions for using WellQuestPRO',
    lastUpdated: 'January 8, 2025',
    route: '/(patient)/legal/terms',
    icon: 'fileText',
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your information',
    lastUpdated: 'January 8, 2025',
    route: '/(patient)/legal/privacy',
    icon: 'lock',
  },
  {
    id: 'hipaa',
    title: 'HIPAA Notice',
    description: 'Notice of privacy practices for protected health information',
    lastUpdated: 'January 8, 2025',
    route: '/(patient)/legal/hipaa',
    icon: 'shield',
  },
  {
    id: 'status',
    title: 'System Status',
    description: 'Current operational status of all platform services',
    lastUpdated: 'Real-time',
    route: '/(patient)/legal/status',
    icon: 'activity',
  },
];

export default function LegalIndexScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const router = useRouter();

  const renderIcon = (iconName: string, color: string) => {
    const iconProps = { size: 28, color };
    switch (iconName) {
      case 'shield':
        return <Shield {...iconProps} />;
      case 'fileText':
        return <FileText {...iconProps} />;
      case 'lock':
        return <Lock {...iconProps} />;
      case 'activity':
        return <Activity {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const handleDocumentPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View
      testID="screen-patient-legal-index"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="Legal & Compliance" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4], gap: theme.spacing[4] }}
        >
          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.header}>
                <Shield size={32} color={theme.colors.primary.bg} />
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                  Legal Documents
                </Text>
              </View>
              <Text style={[styles.headerDescription, { color: colors.textSecondary }]}>
                Access important legal documents, privacy policies, and compliance information
                for WellQuestPRO. These documents describe your rights, our responsibilities, and
                how we protect your health information.
              </Text>
            </View>
          </Card>

          <View style={{ gap: theme.spacing[3] }}>
            {LEGAL_DOCUMENTS.map((document) => (
              <TouchableOpacity
                key={document.id}
                onPress={() => handleDocumentPress(document.route)}
                activeOpacity={0.7}
              >
                <Card>
                  <View style={styles.documentCard}>
                    <View
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor: `${theme.colors.primary.bg}15`,
                        },
                      ]}
                    >
                      {renderIcon(document.icon, theme.colors.primary.bg)}
                    </View>

                    <View style={{ flex: 1, gap: theme.spacing[1] }}>
                      <Text style={[styles.documentTitle, { color: colors.text }]}>
                        {document.title}
                      </Text>
                      <Text style={[styles.documentDescription, { color: colors.textSecondary }]}>
                        {document.description}
                      </Text>
                      <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
                        Last updated: {document.lastUpdated}
                      </Text>
                    </View>

                    <ChevronRight size={24} color={colors.textSecondary} />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Questions or Concerns?
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                If you have questions about these legal documents or concerns about your privacy
                and data protection, please contact our legal team or visit the Support section.
              </Text>
              <View style={{ gap: theme.spacing[1] }}>
                <Text style={[styles.contactInfo, { color: colors.text }]}>
                  Email: legal@wellquestpro.com
                </Text>
                <Text style={[styles.contactInfo, { color: colors.text }]}>
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
  headerDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  documentDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  lastUpdated: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
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
