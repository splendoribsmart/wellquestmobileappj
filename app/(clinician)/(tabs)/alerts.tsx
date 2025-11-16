import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Button, Card, Badge, Input, EmptyState } from '@components/ui';
import {
  Search,
  AlertTriangle,
  Pill,
  BarChart3,
  Calendar,
  Activity,
  XCircle,
  FileText,
  MessageSquare,
  CheckCircle,
} from 'lucide-react-native';

type AlertPriority = 'high' | 'medium' | 'low';
type AlertStatus = 'active' | 'acknowledged' | 'resolved';
type AlertType =
  | 'critical_value'
  | 'drug_interaction'
  | 'appointment'
  | 'lab_result'
  | 'medication'
  | 'vital_signs'
  | 'adverse_reaction'
  | 'care_plan';

interface ClinicianAlert {
  id: string;
  title: string;
  message: string;
  type: AlertType;
  priority: AlertPriority;
  status: AlertStatus;
  patientId: string;
  patientName: string;
  createdAt: string;
  dueBy?: string;
}

const ALERTS: ClinicianAlert[] = [
  {
    id: '1',
    title: 'Critical Glucose Reading',
    message: 'Patient glucose level at 315 mg/dL, significantly above target range. Immediate review recommended.',
    type: 'critical_value',
    priority: 'high',
    status: 'active',
    patientId: '1',
    patientName: 'Sarah Johnson',
    createdAt: '2025-01-16T08:30:00Z',
    dueBy: '2025-01-16T12:00:00Z',
  },
  {
    id: '2',
    title: 'Drug Interaction Warning',
    message: 'Potential interaction between newly prescribed Warfarin and existing Aspirin regimen.',
    type: 'drug_interaction',
    priority: 'high',
    status: 'active',
    patientId: '2',
    patientName: 'Michael Chen',
    createdAt: '2025-01-16T07:15:00Z',
    dueBy: '2025-01-16T17:00:00Z',
  },
  {
    id: '3',
    title: 'Missed Appointment Follow-up',
    message: 'Patient missed scheduled appointment on Jan 15. Follow-up contact recommended.',
    type: 'appointment',
    priority: 'medium',
    status: 'acknowledged',
    patientId: '3',
    patientName: 'Emily Rodriguez',
    createdAt: '2025-01-15T16:00:00Z',
  },
  {
    id: '4',
    title: 'Abnormal Lab Results',
    message: 'Elevated liver enzymes detected. ALT: 85 U/L (normal: 7-56). Review and assess medication impact.',
    type: 'lab_result',
    priority: 'high',
    status: 'acknowledged',
    patientId: '4',
    patientName: 'James Williams',
    createdAt: '2025-01-15T14:20:00Z',
    dueBy: '2025-01-17T09:00:00Z',
  },
  {
    id: '5',
    title: 'Medication Refill Due',
    message: 'Patient has 3 days remaining on Metformin prescription. Refill authorization needed.',
    type: 'medication',
    priority: 'medium',
    status: 'active',
    patientId: '1',
    patientName: 'Sarah Johnson',
    createdAt: '2025-01-15T10:00:00Z',
    dueBy: '2025-01-18T23:59:00Z',
  },
  {
    id: '6',
    title: 'Blood Pressure Trend Alert',
    message: 'Consistently elevated BP readings over 7 days. Average: 155/95 mmHg.',
    type: 'vital_signs',
    priority: 'medium',
    status: 'resolved',
    patientId: '2',
    patientName: 'Michael Chen',
    createdAt: '2025-01-14T09:00:00Z',
  },
  {
    id: '7',
    title: 'Adverse Reaction Report',
    message: 'Patient reported severe nausea and dizziness after starting new medication. Immediate review required.',
    type: 'adverse_reaction',
    priority: 'high',
    status: 'active',
    patientId: '5',
    patientName: 'Lisa Anderson',
    createdAt: '2025-01-16T06:45:00Z',
    dueBy: '2025-01-16T14:00:00Z',
  },
  {
    id: '8',
    title: 'Care Plan Task Overdue',
    message: 'Weekly symptom log has not been completed for 10 days. Patient engagement needed.',
    type: 'care_plan',
    priority: 'low',
    status: 'active',
    patientId: '3',
    patientName: 'Emily Rodriguez',
    createdAt: '2025-01-14T08:00:00Z',
  },
  {
    id: '9',
    title: 'Low Oxygen Saturation',
    message: 'SpO2 reading at 89% - below safe threshold. Immediate assessment required.',
    type: 'vital_signs',
    priority: 'high',
    status: 'active',
    patientId: '6',
    patientName: 'Robert Martinez',
    createdAt: '2025-01-16T09:20:00Z',
    dueBy: '2025-01-16T11:00:00Z',
  },
  {
    id: '10',
    title: 'Upcoming Procedure Preparation',
    message: 'Patient scheduled for procedure tomorrow. Pre-op checklist and medication review needed.',
    type: 'appointment',
    priority: 'medium',
    status: 'acknowledged',
    patientId: '4',
    patientName: 'James Williams',
    createdAt: '2025-01-15T13:00:00Z',
    dueBy: '2025-01-17T08:00:00Z',
  },
];

export default function AlertsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'all' | AlertPriority>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | AlertStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'critical' | 'meds' | 'labs' | 'appts'>('all');

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    }
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    if (diffDays === 1) {
      return 'Yesterday';
    }
    if (diffDays < 7) {
      return `${diffDays}d ago`;
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = (dueBy?: string): boolean => {
    if (!dueBy) return false;
    return new Date(dueBy).getTime() < new Date().getTime();
  };

  const getAlertIcon = (type: AlertType) => {
    const iconProps = { size: 20, color: '#fff' };
    switch (type) {
      case 'critical_value':
        return <AlertTriangle {...iconProps} />;
      case 'drug_interaction':
      case 'medication':
        return <Pill {...iconProps} />;
      case 'lab_result':
        return <BarChart3 {...iconProps} />;
      case 'appointment':
        return <Calendar {...iconProps} />;
      case 'vital_signs':
        return <Activity {...iconProps} />;
      case 'adverse_reaction':
        return <XCircle {...iconProps} />;
      case 'care_plan':
        return <FileText {...iconProps} />;
    }
  };

  const getAlertIconColor = (type: AlertType, priority: AlertPriority): string => {
    if (priority === 'high') {
      return theme.colors.feedback.danger.bg;
    }
    if (priority === 'medium') {
      return theme.colors.feedback.warning.bg;
    }
    return theme.colors.feedback.success.bg;
  };

  const getPriorityBadgeVariant = (priority: AlertPriority): 'danger' | 'warning' | 'success' => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
    }
  };

  const getStatusBadgeVariant = (status: AlertStatus): 'danger' | 'warning' | 'success' => {
    switch (status) {
      case 'active':
        return 'danger';
      case 'acknowledged':
        return 'warning';
      case 'resolved':
        return 'success';
    }
  };

  const filteredAlerts = useMemo(() => {
    return ALERTS.filter((alert) => {
      if (priorityFilter !== 'all' && alert.priority !== priorityFilter) {
        return false;
      }

      if (statusFilter !== 'all' && alert.status !== statusFilter) {
        return false;
      }

      if (typeFilter !== 'all') {
        const typeMap = {
          critical: ['critical_value', 'adverse_reaction'],
          meds: ['medication', 'drug_interaction'],
          labs: ['lab_result'],
          appts: ['appointment'],
        };
        if (!typeMap[typeFilter].includes(alert.type)) {
          return false;
        }
      }

      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          alert.title.toLowerCase().includes(search) ||
          alert.message.toLowerCase().includes(search) ||
          alert.patientName.toLowerCase().includes(search)
        );
      }

      return true;
    });
  }, [searchTerm, priorityFilter, statusFilter, typeFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setPriorityFilter('all');
    setStatusFilter('all');
    setTypeFilter('all');
  };

  const activeCount = ALERTS.filter((a) => a.status === 'active').length;
  const highPriorityActiveCount = ALERTS.filter(
    (a) => a.status === 'active' && a.priority === 'high'
  ).length;
  const acknowledgedCount = ALERTS.filter((a) => a.status === 'acknowledged').length;
  const resolvedCount = ALERTS.filter((a) => a.status === 'resolved').length;

  const hasActiveFilters =
    searchTerm !== '' ||
    priorityFilter !== 'all' ||
    statusFilter !== 'all' ||
    typeFilter !== 'all';

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Alerts" onMenuPress={handleMenuPress} />
      <ScrollView
        testID="screen-clinician-alerts"
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ paddingHorizontal: theme.spacing[3], paddingTop: theme.spacing[3] }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: theme.spacing[3],
              paddingBottom: theme.spacing[3],
            }}
          >
            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIndicator,
                  { backgroundColor: theme.colors.feedback.danger.bg },
                ]}
              />
              <Text style={[styles.statLabel, { color: theme.colors.text.muted }]}>Active</Text>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                {activeCount}
              </Text>
            </View>

            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIndicator,
                  { backgroundColor: theme.colors.feedback.danger.bg },
                ]}
              />
              <Text style={[styles.statLabel, { color: theme.colors.text.muted }]}>
                High Priority
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                {highPriorityActiveCount}
              </Text>
            </View>

            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIndicator,
                  { backgroundColor: theme.colors.feedback.warning.bg },
                ]}
              />
              <Text style={[styles.statLabel, { color: theme.colors.text.muted }]}>
                Acknowledged
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                {acknowledgedCount}
              </Text>
            </View>

            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIndicator,
                  { backgroundColor: theme.colors.feedback.success.bg },
                ]}
              />
              <Text style={[styles.statLabel, { color: theme.colors.text.muted }]}>Resolved</Text>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                {resolvedCount}
              </Text>
            </View>
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: theme.spacing[3], marginBottom: theme.spacing[2] }}>
          <Input
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Search alerts..."
            leftIcon={<Search size={18} color={theme.colors.text.muted} />}
          />
        </View>

        <View style={{ paddingHorizontal: theme.spacing[3], marginBottom: theme.spacing[3] }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: theme.spacing[2] }}
          >
            <TouchableOpacity
              onPress={() => setPriorityFilter(priorityFilter === 'high' ? 'all' : 'high')}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    priorityFilter === 'high'
                      ? theme.colors.primary.bg
                      : theme.colors.surface.bg,
                  borderColor:
                    priorityFilter === 'high'
                      ? theme.colors.primary.border
                      : theme.colors.surface.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color:
                      priorityFilter === 'high'
                        ? theme.colors.primary.fg
                        : theme.colors.text.primary,
                  },
                ]}
              >
                High Priority
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setStatusFilter(statusFilter === 'active' ? 'all' : 'active')}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    statusFilter === 'active'
                      ? theme.colors.primary.bg
                      : theme.colors.surface.bg,
                  borderColor:
                    statusFilter === 'active'
                      ? theme.colors.primary.border
                      : theme.colors.surface.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color:
                      statusFilter === 'active'
                        ? theme.colors.primary.fg
                        : theme.colors.text.primary,
                  },
                ]}
              >
                Active
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTypeFilter(typeFilter === 'critical' ? 'all' : 'critical')}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    typeFilter === 'critical'
                      ? theme.colors.primary.bg
                      : theme.colors.surface.bg,
                  borderColor:
                    typeFilter === 'critical'
                      ? theme.colors.primary.border
                      : theme.colors.surface.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color:
                      typeFilter === 'critical'
                        ? theme.colors.primary.fg
                        : theme.colors.text.primary,
                  },
                ]}
              >
                Critical
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTypeFilter(typeFilter === 'meds' ? 'all' : 'meds')}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    typeFilter === 'meds' ? theme.colors.primary.bg : theme.colors.surface.bg,
                  borderColor:
                    typeFilter === 'meds'
                      ? theme.colors.primary.border
                      : theme.colors.surface.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color:
                      typeFilter === 'meds' ? theme.colors.primary.fg : theme.colors.text.primary,
                  },
                ]}
              >
                Medications
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setTypeFilter(typeFilter === 'labs' ? 'all' : 'labs')}
              style={[
                styles.filterChip,
                {
                  backgroundColor:
                    typeFilter === 'labs' ? theme.colors.primary.bg : theme.colors.surface.bg,
                  borderColor:
                    typeFilter === 'labs'
                      ? theme.colors.primary.border
                      : theme.colors.surface.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color:
                      typeFilter === 'labs' ? theme.colors.primary.fg : theme.colors.text.primary,
                  },
                ]}
              >
                Labs
              </Text>
            </TouchableOpacity>

            {hasActiveFilters && (
              <TouchableOpacity
                onPress={clearFilters}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: theme.colors.surface.bg,
                    borderColor: theme.colors.surface.border,
                  },
                ]}
              >
                <Text style={[styles.filterChipText, { color: theme.colors.text.muted }]}>
                  Clear
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {filteredAlerts.length === 0 ? (
          <View style={{ paddingHorizontal: theme.spacing[3] }}>
            <EmptyState
              title="No alerts found"
              description="Try adjusting your search or filters."
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          </View>
        ) : (
          <View style={{ gap: theme.spacing[2], paddingHorizontal: theme.spacing[3], paddingBottom: theme.spacing[3] }}>
            {filteredAlerts.map((alert) => (
              <TouchableOpacity key={alert.id} activeOpacity={0.7}>
                <Card variant="elevated">
                  <View style={{ gap: theme.spacing[2] }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        gap: theme.spacing[2],
                      }}
                    >
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: theme.borderRadius.md,
                          backgroundColor: getAlertIconColor(alert.type, alert.priority),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {getAlertIcon(alert.type)}
                      </View>
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: theme.spacing[1],
                          }}
                        >
                          <Text
                            style={{
                              fontSize: theme.typography.fontSize.base,
                              fontFamily: theme.typography.fontFamily.semibold,
                              color: theme.colors.text.primary,
                              flex: 1,
                              marginRight: theme.spacing[2],
                            }}
                          >
                            {alert.title}
                          </Text>
                          <Badge variant={getPriorityBadgeVariant(alert.priority)} size="sm">
                            {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                          </Badge>
                        </View>
                        <Text
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.text.muted,
                          }}
                        >
                          {alert.patientName}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.muted,
                        lineHeight: theme.typography.lineHeight.sm,
                      }}
                      numberOfLines={2}
                    >
                      {alert.message}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <View
                        style={{ flexDirection: 'row', gap: theme.spacing[2], alignItems: 'center' }}
                      >
                        <Text
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.text.muted,
                          }}
                        >
                          {formatDateTime(alert.createdAt)}
                        </Text>
                        <View
                          style={{
                            width: 3,
                            height: 3,
                            borderRadius: 1.5,
                            backgroundColor: theme.colors.text.muted,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.text.muted,
                          }}
                        >
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </Text>
                      </View>
                      {alert.dueBy && isOverdue(alert.dueBy) && (
                        <Text
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.feedback.danger.bg,
                            fontFamily: theme.typography.fontFamily.semibold,
                          }}
                        >
                          Overdue
                        </Text>
                      )}
                    </View>

                    {alert.status === 'active' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: theme.spacing[2],
                          marginTop: theme.spacing[1],
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => console.log('Resolve alert', alert.id)}
                          style={{
                            flex: 1,
                            paddingVertical: theme.spacing[2],
                            paddingHorizontal: theme.spacing[3],
                            backgroundColor: theme.colors.primary.bg,
                            borderRadius: theme.borderRadius.md,
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              fontFamily: theme.typography.fontFamily.semibold,
                              color: theme.colors.primary.fg,
                            }}
                          >
                            Resolve
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => console.log('Acknowledge alert', alert.id)}
                          style={{
                            paddingVertical: theme.spacing[2],
                            paddingHorizontal: theme.spacing[3],
                            backgroundColor: theme.colors.surface.bg,
                            borderRadius: theme.borderRadius.md,
                            borderWidth: theme.borderWidth.thin,
                            borderColor: theme.colors.surface.border,
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              fontFamily: theme.typography.fontFamily.semibold,
                              color: theme.colors.text.primary,
                            }}
                          >
                            Ack
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  statCard: {
    minWidth: 110,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
