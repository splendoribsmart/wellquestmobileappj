import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Button, Card, Badge, Input, Avatar, EmptyState } from '@components/ui';
import {
  Users,
  Calendar,
  Search,
  AlertCircle,
  Bell,
  ClipboardList,
} from 'lucide-react-native';

type PriorityLevel = 'high' | 'medium' | 'low';

interface ClinicianStat {
  id: string;
  label: string;
  value: string;
}

interface RecentPatient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: string;
  lastVisit: string;
  priority: PriorityLevel;
}

interface ClinicalInsight {
  id: string;
  title: string;
  message: string;
  priority: PriorityLevel;
  actionLabel: string;
}

const STATS: ClinicianStat[] = [
  {
    id: '1',
    label: 'Total Patients',
    value: '42',
  },
  {
    id: '2',
    label: 'Active Care Plans',
    value: '28',
  },
  {
    id: '3',
    label: 'Upcoming Appointments',
    value: '8',
  },
];

const RECENT_PATIENTS: RecentPatient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 45,
    condition: 'Type 2 Diabetes',
    status: 'Active',
    lastVisit: '2024-01-15',
    priority: 'high',
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 62,
    condition: 'Hypertension',
    status: 'Follow-up',
    lastVisit: '2024-01-12',
    priority: 'medium',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    age: 38,
    condition: 'Asthma',
    status: 'Active',
    lastVisit: '2024-01-10',
    priority: 'low',
  },
  {
    id: '4',
    name: 'James Williams',
    age: 55,
    condition: 'Chronic Heart Disease',
    status: 'Active',
    lastVisit: '2024-01-08',
    priority: 'high',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    age: 41,
    condition: 'Migraine',
    status: 'Follow-up',
    lastVisit: '2024-01-05',
    priority: 'low',
  },
];

const CLINICAL_INSIGHTS: ClinicalInsight[] = [
  {
    id: '1',
    title: 'Frequent High Glucose Readings',
    message: '3 patients showing consistently elevated glucose levels over the past week',
    priority: 'high',
    actionLabel: 'View Data',
  },
  {
    id: '2',
    title: 'Missed Medications',
    message: '5 patients have missed 2+ medication doses in the last 3 days',
    priority: 'medium',
    actionLabel: 'Review',
  },
  {
    id: '3',
    title: 'Overdue Care Plan Tasks',
    message: '7 care plan tasks are overdue across 4 active patients',
    priority: 'high',
    actionLabel: 'View Tasks',
  },
];

export default function ClinicianDashboardScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const filteredPatients = RECENT_PATIENTS.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getPriorityBadgeVariant = (
    priority: PriorityLevel
  ): 'danger' | 'warning' | 'success' => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
    }
  };

  const getStatusBadgeVariant = (
    status: string
  ): 'primary' | 'secondary' | 'info' | 'neutral' => {
    switch (status) {
      case 'Active':
        return 'primary';
      case 'Follow-up':
        return 'info';
      default:
        return 'neutral';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Dashboard" onMenuPress={handleMenuPress} />
      <ScrollView
        testID="screen-clinician-dashboard"
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { padding: theme.spacing[4] },
        ]}
      >
        <View style={{ gap: theme.spacing[4] }}>
          <Card variant="default">
            <View style={{ gap: theme.spacing[2] }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontFamily: theme.typography.fontFamily.bold,
                  color: theme.colors.text.primary,
                }}
              >
                Welcome back, Dr. Smith
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.text.muted,
                }}
              >
                Here's what's happening with your patients today.
              </Text>
            </View>
          </Card>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.spacing[3],
            }}
          >
            {STATS.map((stat) => (
              <View
                key={stat.id}
                style={{
                  flex: 1,
                  minWidth: 150,
                }}
              >
                <Card variant="bordered">
                  <View style={{ gap: theme.spacing[2] }}>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize['3xl'],
                        fontFamily: theme.typography.fontFamily.bold,
                        color: theme.colors.text.primary,
                      }}
                    >
                      {stat.value}
                    </Text>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.muted,
                      }}
                    >
                      {stat.label}
                    </Text>
                  </View>
                </Card>
              </View>
            ))}
          </View>

          <Card
            variant="bordered"
            header={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.text.primary,
                  }}
                >
                  Recent Patients
                </Text>
                <Button
                  onPress={() => console.log('View all patients')}
                  variant="outline"
                  size="sm"
                  title="View All"
                />
              </View>
            }
          >
            <View style={{ gap: theme.spacing[3] }}>
              <Input
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search patients..."
                leftIcon={
                  <Search size={20} color={theme.colors.text.muted} />
                }
              />

              {filteredPatients.length === 0 ? (
                <EmptyState
                  title="No patients found"
                  description="Try adjusting your search."
                />
              ) : (
                <View style={{ gap: theme.spacing[3] }}>
                  {filteredPatients.map((patient, index) => (
                    <TouchableOpacity
                      key={patient.id}
                      onPress={() =>
                        console.log(`Open patient ${patient.id}`)
                      }
                      activeOpacity={0.7}
                    >
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: theme.spacing[3],
                          }}
                        >
                          <Avatar
                            size="md"
                            initials={getInitials(patient.name)}
                          />
                          <View style={{ flex: 1, gap: theme.spacing[1] }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: theme.typography.fontSize.base,
                                  fontFamily:
                                    theme.typography.fontFamily.semibold,
                                  color: theme.colors.text.primary,
                                }}
                              >
                                {patient.name}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  gap: theme.spacing[2],
                                }}
                              >
                                <Badge
                                  variant={getPriorityBadgeVariant(
                                    patient.priority
                                  )}
                                  size="sm"
                                >
                                  {patient.priority}
                                </Badge>
                                <Badge
                                  variant={getStatusBadgeVariant(
                                    patient.status
                                  )}
                                  size="sm"
                                >
                                  {patient.status}
                                </Badge>
                              </View>
                            </View>
                            <Text
                              style={{
                                fontSize: theme.typography.fontSize.sm,
                                color: theme.colors.text.muted,
                              }}
                            >
                              {patient.age} years • {patient.condition}
                            </Text>
                            <Text
                              style={{
                                fontSize: theme.typography.fontSize.xs,
                                color: theme.colors.text.muted,
                              }}
                            >
                              Last visit:{' '}
                              {new Date(
                                patient.lastVisit
                              ).toLocaleDateString()}
                            </Text>
                          </View>
                        </View>
                        {index < filteredPatients.length - 1 && (
                          <View
                            style={{
                              height: 1,
                              backgroundColor: theme.colors.surface.border,
                              marginTop: theme.spacing[3],
                            }}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </Card>

          <Card
            variant="bordered"
            header={
              <Text
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontFamily: theme.typography.fontFamily.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                Recent Alerts
              </Text>
            }
          >
            {CLINICAL_INSIGHTS.length === 0 ? (
              <EmptyState
                title="No flagged insights"
                description="New insights will appear here when patterns are detected."
              />
            ) : (
              <View style={{ gap: theme.spacing[4] }}>
                {CLINICAL_INSIGHTS.map((insight, index) => (
                  <View key={insight.id}>
                    <View style={{ gap: theme.spacing[2] }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          gap: theme.spacing[2],
                        }}
                      >
                        <View style={{ flex: 1, gap: theme.spacing[1] }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: theme.spacing[2],
                            }}
                          >
                            <AlertCircle
                              size={18}
                              color={
                                insight.priority === 'high'
                                  ? theme.colors.feedback.danger.bg
                                  : insight.priority === 'medium'
                                  ? theme.colors.feedback.warning.bg
                                  : theme.colors.feedback.success.bg
                              }
                            />
                            <Text
                              style={{
                                fontSize: theme.typography.fontSize.base,
                                fontFamily:
                                  theme.typography.fontFamily.semibold,
                                color: theme.colors.text.primary,
                                flex: 1,
                              }}
                            >
                              {insight.title}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: theme.typography.fontSize.sm,
                              color: theme.colors.text.muted,
                            }}
                          >
                            {insight.message}
                          </Text>
                        </View>
                        <Badge
                          variant={getPriorityBadgeVariant(insight.priority)}
                          size="sm"
                        >
                          {insight.priority}
                        </Badge>
                      </View>
                      <Button
                        onPress={() =>
                          console.log(`Action: ${insight.actionLabel}`)
                        }
                        variant="outline"
                        size="sm"
                        title={insight.actionLabel}
                      />
                    </View>
                    {index < CLINICAL_INSIGHTS.length - 1 && (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: theme.colors.surface.border,
                          marginTop: theme.spacing[4],
                        }}
                      />
                    )}
                  </View>
                ))}
              </View>
            )}
          </Card>

          <Card
            variant="bordered"
            header={
              <Text
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontFamily: theme.typography.fontFamily.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                Quick Actions
              </Text>
            }
          >
            <View style={{ gap: theme.spacing[3] }}>
              <Button
                onPress={() => console.log('View Patients')}
                variant="outline"
                title="View Patients"
                leftIcon={
                  <Users size={18} color={theme.colors.text.primary} />
                }
              />
              <Button
                onPress={() => console.log('Go to Alerts')}
                variant="outline"
                title="Go to Alerts"
                leftIcon={<Bell size={18} color={theme.colors.text.primary} />}
              />
              <Button
                onPress={() => console.log('Open Information Search')}
                variant="outline"
                title="Open Information Search"
                leftIcon={
                  <Search size={18} color={theme.colors.text.primary} />
                }
              />
              <Button
                onPress={() => console.log('New Care Plan')}
                variant="outline"
                title="New Care Plan"
                leftIcon={
                  <ClipboardList size={18} color={theme.colors.text.primary} />
                }
              />
            </View>
          </Card>
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
