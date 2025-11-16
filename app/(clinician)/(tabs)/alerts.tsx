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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Alerts" onMenuPress={handleMenuPress} />
      <ScrollView
        testID="screen-clinician-alerts"
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { padding: theme.spacing[4] }]}
      >
        <View style={{ gap: theme.spacing[4] }}>
          <View>
            <Text
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontFamily: theme.typography.fontFamily.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing[1],
              }}
            >
              Clinical Alerts
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.muted,
              }}
            >
              Review and manage alerts requiring your attention.
            </Text>
          </View>

          <Card variant="bordered">
            <View style={{ gap: theme.spacing[3] }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.text.muted,
                    }}
                  >
                    Active Alerts
                  </Text>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize['2xl'],
                      fontFamily: theme.typography.fontFamily.bold,
                      color: theme.colors.feedback.danger.bg,
                    }}
                  >
                    {activeCount}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.text.muted,
                    }}
                  >
                    High Priority
                  </Text>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize['2xl'],
                      fontFamily: theme.typography.fontFamily.bold,
                      color: theme.colors.feedback.danger.bg,
                    }}
                  >
                    {highPriorityActiveCount}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.text.muted,
                    }}
                  >
                    Acknowledged
                  </Text>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize['2xl'],
                      fontFamily: theme.typography.fontFamily.bold,
                      color: theme.colors.feedback.warning.bg,
                    }}
                  >
                    {acknowledgedCount}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.text.muted,
                    }}
                  >
                    Resolved
                  </Text>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize['2xl'],
                      fontFamily: theme.typography.fontFamily.bold,
                      color: theme.colors.feedback.success.bg,
                    }}
                  >
                    {resolvedCount}
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          <Card variant="bordered">
            <View style={{ gap: theme.spacing[3] }}>
              <Input
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search alerts or patients..."
                leftIcon={<Search size={20} color={theme.colors.text.muted} />}
              />

              <View style={{ gap: theme.spacing[2] }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.text.primary,
                  }}
                >
                  Priority
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing[2] }}>
                  <Button
                    onPress={() => setPriorityFilter('all')}
                    variant={priorityFilter === 'all' ? 'primary' : 'outline'}
                    size="sm"
                    title="All"
                  />
                  <Button
                    onPress={() => setPriorityFilter('high')}
                    variant={priorityFilter === 'high' ? 'primary' : 'outline'}
                    size="sm"
                    title="High"
                  />
                  <Button
                    onPress={() => setPriorityFilter('medium')}
                    variant={priorityFilter === 'medium' ? 'primary' : 'outline'}
                    size="sm"
                    title="Medium"
                  />
                  <Button
                    onPress={() => setPriorityFilter('low')}
                    variant={priorityFilter === 'low' ? 'primary' : 'outline'}
                    size="sm"
                    title="Low"
                  />
                </View>
              </View>

              <View style={{ gap: theme.spacing[2] }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.text.primary,
                  }}
                >
                  Status
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing[2] }}>
                  <Button
                    onPress={() => setStatusFilter('all')}
                    variant={statusFilter === 'all' ? 'primary' : 'outline'}
                    size="sm"
                    title="All"
                  />
                  <Button
                    onPress={() => setStatusFilter('active')}
                    variant={statusFilter === 'active' ? 'primary' : 'outline'}
                    size="sm"
                    title="Active"
                  />
                  <Button
                    onPress={() => setStatusFilter('acknowledged')}
                    variant={statusFilter === 'acknowledged' ? 'primary' : 'outline'}
                    size="sm"
                    title="Ack"
                  />
                  <Button
                    onPress={() => setStatusFilter('resolved')}
                    variant={statusFilter === 'resolved' ? 'primary' : 'outline'}
                    size="sm"
                    title="Resolved"
                  />
                </View>
              </View>

              <View style={{ gap: theme.spacing[2] }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.text.primary,
                  }}
                >
                  Type
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing[2] }}>
                  <Button
                    onPress={() => setTypeFilter('all')}
                    variant={typeFilter === 'all' ? 'primary' : 'outline'}
                    size="sm"
                    title="All"
                  />
                  <Button
                    onPress={() => setTypeFilter('critical')}
                    variant={typeFilter === 'critical' ? 'primary' : 'outline'}
                    size="sm"
                    title="Critical"
                  />
                  <Button
                    onPress={() => setTypeFilter('meds')}
                    variant={typeFilter === 'meds' ? 'primary' : 'outline'}
                    size="sm"
                    title="Meds"
                  />
                  <Button
                    onPress={() => setTypeFilter('labs')}
                    variant={typeFilter === 'labs' ? 'primary' : 'outline'}
                    size="sm"
                    title="Labs"
                  />
                  <Button
                    onPress={() => setTypeFilter('appts')}
                    variant={typeFilter === 'appts' ? 'primary' : 'outline'}
                    size="sm"
                    title="Appts"
                  />
                </View>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <Button
                  onPress={clearFilters}
                  variant="ghost"
                  size="sm"
                  title="Clear Filters"
                />
              </View>
            </View>
          </Card>

          {filteredAlerts.length === 0 ? (
            <EmptyState
              title="No alerts found"
              description="Try adjusting your search or filters."
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          ) : (
            <View style={{ gap: theme.spacing[3] }}>
              {filteredAlerts.map((alert) => (
                <Card key={alert.id} variant="bordered">
                  <View style={{ gap: theme.spacing[3] }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: theme.spacing[3],
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          gap: theme.spacing[3],
                          flex: 1,
                        }}
                      >
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: theme.borderRadius.md,
                            backgroundColor: getAlertIconColor(alert.type, alert.priority),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {getAlertIcon(alert.type)}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: theme.typography.fontSize.base,
                              fontFamily: theme.typography.fontFamily.semibold,
                              color: theme.colors.text.primary,
                            }}
                          >
                            {alert.title}
                          </Text>
                          <Text
                            style={{
                              fontSize: theme.typography.fontSize.xs,
                              color: theme.colors.text.muted,
                              marginTop: theme.spacing[1],
                            }}
                          >
                            {alert.patientName} • Patient
                          </Text>
                        </View>
                      </View>
                      <Badge variant={getPriorityBadgeVariant(alert.priority)} size="sm">
                        {alert.priority.toUpperCase()}
                      </Badge>
                    </View>

                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.muted,
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
                        flexWrap: 'wrap',
                        gap: theme.spacing[2],
                      }}
                    >
                      <View style={{ flexDirection: 'row', gap: theme.spacing[2], alignItems: 'center' }}>
                        <Text
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: theme.colors.text.muted,
                          }}
                        >
                          {formatDateTime(alert.createdAt)}
                        </Text>
                        <Badge variant={getStatusBadgeVariant(alert.status)} size="sm">
                          {alert.status.toUpperCase()}
                        </Badge>
                      </View>
                      {alert.dueBy && (
                        <Text
                          style={{
                            fontSize: theme.typography.fontSize.xs,
                            color: isOverdue(alert.dueBy)
                              ? theme.colors.feedback.danger.bg
                              : theme.colors.text.muted,
                            fontFamily: isOverdue(alert.dueBy)
                              ? theme.typography.fontFamily.semibold
                              : theme.typography.fontFamily.normal,
                          }}
                        >
                          {isOverdue(alert.dueBy) ? '⚠ OVERDUE' : `Due: ${formatDateTime(alert.dueBy)}`}
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        gap: theme.spacing[2],
                        flexWrap: 'wrap',
                      }}
                    >
                      {alert.status === 'active' && (
                        <>
                          <Button
                            onPress={() => console.log('Acknowledge alert', alert.id)}
                            variant="outline"
                            size="sm"
                            title="Acknowledge"
                          />
                          <Button
                            onPress={() => console.log('Resolve alert', alert.id)}
                            variant="primary"
                            size="sm"
                            title="Resolve"
                          />
                        </>
                      )}
                      {alert.status === 'acknowledged' && (
                        <Button
                          onPress={() => console.log('Resolve alert', alert.id)}
                          variant="primary"
                          size="sm"
                          title="Resolve"
                        />
                      )}
                      <Button
                        onPress={() => console.log('Contact patient', alert.patientId)}
                        variant="outline"
                        size="sm"
                        leftIcon={<MessageSquare size={16} color={theme.colors.text.primary} />}
                        title="Contact"
                      />
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
});
