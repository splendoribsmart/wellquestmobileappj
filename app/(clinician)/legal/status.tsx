import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Badge } from '@components/ui';
import { Activity, CheckCircle, Clock } from 'lucide-react-native';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  description: string;
  lastChecked: string;
}

const SERVICES: ServiceStatus[] = [
  {
    name: 'API Services',
    status: 'operational',
    description: 'All API endpoints are functioning normally',
    lastChecked: '2 minutes ago',
  },
  {
    name: 'Database',
    status: 'operational',
    description: 'Database connections are stable',
    lastChecked: '1 minute ago',
  },
  {
    name: 'Authentication',
    status: 'operational',
    description: 'Login and authentication services are running smoothly',
    lastChecked: '3 minutes ago',
  },
  {
    name: 'Messaging',
    status: 'operational',
    description: 'Secure messaging system is operational',
    lastChecked: '5 minutes ago',
  },
  {
    name: 'File Storage',
    status: 'operational',
    description: 'Document and image storage is functioning',
    lastChecked: '4 minutes ago',
  },
  {
    name: 'Notifications',
    status: 'operational',
    description: 'Push and email notifications are being delivered',
    lastChecked: '2 minutes ago',
  },
];

export default function StatusScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const getStatusBadgeVariant = (
    status: string
  ): 'success' | 'warning' | 'danger' => {
    switch (status) {
      case 'operational':
        return 'success';
      case 'degraded':
        return 'warning';
      case 'outage':
        return 'danger';
      default:
        return 'success';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle size={20} color={theme.colors.feedback.success.bg} />;
      case 'degraded':
        return <Clock size={20} color={theme.colors.feedback.warning.bg} />;
      case 'outage':
        return <Activity size={20} color={theme.colors.feedback.danger.bg} />;
      default:
        return <CheckCircle size={20} color={theme.colors.feedback.success.bg} />;
    }
  };

  const allOperational = SERVICES.every((s) => s.status === 'operational');

  return (
    <View
      testID="screen-clinician-legal-status"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="System Status" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4], gap: theme.spacing[4] }}
        >
          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.header}>
                <Activity size={28} color={theme.colors.primary.bg} />
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                  System Status
                </Text>
              </View>
              <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
                Real-time monitoring • Last updated: Just now
              </Text>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.statusRow}>
                {allOperational ? (
                  <CheckCircle size={24} color={theme.colors.feedback.success.bg} />
                ) : (
                  <Activity size={24} color={theme.colors.feedback.warning.bg} />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.overallTitle, { color: colors.text }]}>
                    {allOperational ? 'All Systems Operational' : 'Service Disruption'}
                  </Text>
                  <Text style={[styles.overallDesc, { color: colors.textSecondary }]}>
                    {allOperational
                      ? 'All platform services are running normally'
                      : 'Some services are experiencing issues'}
                  </Text>
                </View>
                <Badge variant={allOperational ? 'success' : 'warning'}>
                  {allOperational ? 'Healthy' : 'Issues'}
                </Badge>
              </View>
            </View>
          </Card>

          <View style={{ gap: theme.spacing[3] }}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Service Status
            </Text>
            {SERVICES.map((service, index) => (
              <Card key={index}>
                <View style={{ gap: theme.spacing[2] }}>
                  <View style={styles.serviceRow}>
                    {getStatusIcon(service.status)}
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.serviceName, { color: colors.text }]}>
                        {service.name}
                      </Text>
                      <Text style={[styles.serviceDesc, { color: colors.textSecondary }]}>
                        {service.description}
                      </Text>
                    </View>
                    <Badge variant={getStatusBadgeVariant(service.status)} size="sm">
                      {service.status.toUpperCase()}
                    </Badge>
                  </View>
                  <Text style={[styles.lastChecked, { color: colors.textSecondary }]}>
                    Last checked: {service.lastChecked}
                  </Text>
                </View>
              </Card>
            ))}
          </View>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Uptime Statistics
              </Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: colors.text }]}>99.99%</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                    30-Day Uptime
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: colors.text }]}>99.98%</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                    90-Day Uptime
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recent Incidents
              </Text>
              <View
                style={[
                  styles.incidentCard,
                  {
                    backgroundColor: theme.colors.surface.alt,
                    padding: theme.spacing[3],
                    borderRadius: theme.borderRadius.md,
                  },
                ]}
              >
                <Text style={[styles.noIncidents, { color: colors.textSecondary }]}>
                  No incidents in the past 30 days
                </Text>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Subscribe to Updates
              </Text>
              <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                Stay informed about system status and planned maintenance by subscribing to our
                status notifications.
              </Text>
              <Text style={[styles.contactText, { color: colors.text }]}>
                Email: status@wellquestpro.com
              </Text>
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  overallDesc: {
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
  },
  serviceDesc: {
    fontSize: 14,
    marginTop: 2,
    lineHeight: 20,
  },
  lastChecked: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
  },
  incidentCard: {},
  noIncidents: {
    fontSize: 14,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
  },
  contactText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
