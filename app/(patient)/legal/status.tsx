import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Badge, EmptyState } from '@components/ui';
import { useRouter } from 'expo-router';
import { Activity, CheckCircle, Server, Smartphone, Bell, Bot, Monitor } from 'lucide-react-native';

interface ServiceStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'maintenance' | 'outage';
  uptime: string;
  iconName: 'server' | 'smartphone' | 'monitor' | 'bell' | 'bot';
}

const MOCK_SERVICES: ServiceStatus[] = [
  {
    id: '1',
    name: 'Platform',
    status: 'operational',
    uptime: '99.99%',
    iconName: 'server',
  },
  {
    id: '2',
    name: 'Patient App',
    status: 'operational',
    uptime: '99.95%',
    iconName: 'smartphone',
  },
  {
    id: '3',
    name: 'Clinician Dashboard',
    status: 'operational',
    uptime: '99.97%',
    iconName: 'monitor',
  },
  {
    id: '4',
    name: 'Notifications',
    status: 'operational',
    uptime: '99.92%',
    iconName: 'bell',
  },
  {
    id: '5',
    name: 'AI Assistant',
    status: 'operational',
    uptime: '99.89%',
    iconName: 'bot',
  },
];

export default function StatusScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const router = useRouter();

  const getStatusBadgeVariant = (
    status: string
  ): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    switch (status) {
      case 'operational':
        return 'success';
      case 'degraded':
        return 'warning';
      case 'maintenance':
        return 'info';
      case 'outage':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return theme.colors.feedback.success.bg;
      case 'degraded':
        return theme.colors.feedback.warning.bg;
      case 'maintenance':
        return theme.colors.primary.bg;
      case 'outage':
        return theme.colors.feedback.danger.bg;
      default:
        return colors.textSecondary;
    }
  };

  const allOperational = MOCK_SERVICES.every((service) => service.status === 'operational');

  const renderServiceIcon = (iconName: string, color: string) => {
    const iconProps = { size: 20, color };
    switch (iconName) {
      case 'server':
        return <Server {...iconProps} />;
      case 'smartphone':
        return <Smartphone {...iconProps} />;
      case 'monitor':
        return <Monitor {...iconProps} />;
      case 'bell':
        return <Bell {...iconProps} />;
      case 'bot':
        return <Bot {...iconProps} />;
      default:
        return <Server {...iconProps} />;
    }
  };

  return (
    <View
      testID="screen-patient-legal-status"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="System Status" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4], paddingBottom: theme.spacing[6], gap: theme.spacing[4] }}
        >
          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.header}>
                <View style={styles.titleRow}>
                  <Activity size={28} color={theme.colors.primary.bg} />
                  <Text style={[styles.mainTitle, { color: colors.text }]}>System Status</Text>
                </View>
              </View>

              <Text style={[styles.description, { color: colors.textSecondary }]}>
                Check whether WellQuestPRO services are operating normally. This page shows the
                current status of all platform services.
              </Text>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.overallStatusRow}>
                <CheckCircle
                  size={24}
                  color={theme.colors.feedback.success.bg}
                  fill={theme.colors.feedback.success.bg}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.overallStatusText, { color: colors.text }]}>
                    All Systems Operational
                  </Text>
                  <Text style={[styles.overallStatusSubtext, { color: colors.textSecondary }]}>
                    All services are running normally
                  </Text>
                </View>
                <Badge variant="success" size="md">
                  Operational
                </Badge>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Services</Text>

              <View style={{ gap: theme.spacing[3] }}>
                {MOCK_SERVICES.map((service) => (
                  <View key={service.id} style={styles.serviceRow}>
                    <View
                      style={[
                        styles.serviceIcon,
                        {
                          backgroundColor: `${getStatusColor(service.status)}15`,
                        },
                      ]}
                    >
                      {renderServiceIcon(service.iconName, getStatusColor(service.status))}
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={[styles.serviceName, { color: colors.text }]}>
                        {service.name}
                      </Text>
                      <Text style={[styles.serviceUptime, { color: colors.textSecondary }]}>
                        Uptime: {service.uptime}
                      </Text>
                    </View>

                    <Badge variant={getStatusBadgeVariant(service.status)} size="sm">
                      {service.status.toUpperCase()}
                    </Badge>
                  </View>
                ))}
              </View>
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Incidents</Text>

              <EmptyState
                icon={<CheckCircle size={48} color={theme.colors.feedback.success.bg} />}
                title="No recent incidents"
                description="All services have been running smoothly. We'll list any service disruptions here."
              />
            </View>
          </Card>

          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Status Page Information
              </Text>

              <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: theme.colors.feedback.success.bg },
                    ]}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.infoTitle, { color: colors.text }]}>Operational</Text>
                    <Text style={[styles.infoDescription, { color: colors.textSecondary }]}>
                      Service is functioning normally
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: theme.colors.feedback.warning.bg },
                    ]}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.infoTitle, { color: colors.text }]}>Degraded</Text>
                    <Text style={[styles.infoDescription, { color: colors.textSecondary }]}>
                      Service is experiencing performance issues
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View
                    style={[styles.statusDot, { backgroundColor: theme.colors.primary.bg }]}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.infoTitle, { color: colors.text }]}>Maintenance</Text>
                    <Text style={[styles.infoDescription, { color: colors.textSecondary }]}>
                      Service is under scheduled maintenance
                    </Text>
                  </View>
                </View>

                <View style={styles.infoRow}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: theme.colors.feedback.danger.bg },
                    ]}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.infoTitle, { color: colors.text }]}>Outage</Text>
                    <Text style={[styles.infoDescription, { color: colors.textSecondary }]}>
                      Service is currently unavailable
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: theme.colors.surface.border,
                  marginVertical: theme.spacing[2],
                }}
              />

              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                This status page is updated automatically. If you experience issues not reflected
                here, please contact our support team.
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
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  overallStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  overallStatusText: {
    fontSize: 18,
    fontWeight: '700',
  },
  overallStatusSubtext: {
    fontSize: 13,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '600',
  },
  serviceUptime: {
    fontSize: 12,
    marginTop: 2,
  },
  infoSection: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  infoDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
