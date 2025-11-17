import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Button, Card, Badge, Input, Avatar, EmptyState } from '@components/ui';
import { Search, Calendar, Plus } from 'lucide-react-native';

type PatientStatus = 'Active' | 'Follow-up' | 'Inactive';
type PriorityLevel = 'high' | 'medium' | 'low';

interface ClinicianPatient {
  id: string;
  name: string;
  age: number;
  primaryCondition: string;
  status: PatientStatus;
  priority: PriorityLevel;
  lastVisit: string;
  nextAppointment?: string;
}

const PATIENTS: ClinicianPatient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 45,
    primaryCondition: 'Type 2 Diabetes',
    status: 'Active',
    priority: 'high',
    lastVisit: '2025-01-15',
    nextAppointment: '2025-01-22',
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 62,
    primaryCondition: 'Hypertension',
    status: 'Follow-up',
    priority: 'medium',
    lastVisit: '2025-01-12',
    nextAppointment: '2025-01-20',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    age: 38,
    primaryCondition: 'Asthma',
    status: 'Active',
    priority: 'low',
    lastVisit: '2025-01-10',
  },
  {
    id: '4',
    name: 'James Williams',
    age: 55,
    primaryCondition: 'Chronic Heart Disease',
    status: 'Active',
    priority: 'high',
    lastVisit: '2025-01-08',
    nextAppointment: '2025-01-18',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    age: 41,
    primaryCondition: 'Migraine',
    status: 'Follow-up',
    priority: 'low',
    lastVisit: '2025-01-05',
  },
  {
    id: '6',
    name: 'Robert Martinez',
    age: 58,
    primaryCondition: 'COPD',
    status: 'Active',
    priority: 'medium',
    lastVisit: '2025-01-14',
    nextAppointment: '2025-01-25',
  },
  {
    id: '7',
    name: 'Patricia Taylor',
    age: 67,
    primaryCondition: 'Osteoarthritis',
    status: 'Inactive',
    priority: 'low',
    lastVisit: '2024-12-20',
  },
  {
    id: '8',
    name: 'David Brown',
    age: 52,
    primaryCondition: 'Depression',
    status: 'Follow-up',
    priority: 'medium',
    lastVisit: '2025-01-11',
    nextAppointment: '2025-01-19',
  },
];

export default function PatientsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PatientStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'P1' | 'P2' | 'P3'>('all');

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
    if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getPriorityLabel = (priority: PriorityLevel): string => {
    switch (priority) {
      case 'high':
        return 'Priority 1';
      case 'medium':
        return 'Priority 2';
      case 'low':
        return 'Priority 3';
    }
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
    status: PatientStatus
  ): 'success' | 'warning' | 'neutral' => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Follow-up':
        return 'warning';
      case 'Inactive':
        return 'neutral';
    }
  };

  const filteredPatients = useMemo(() => {
    return PATIENTS.filter((patient) => {
      if (statusFilter !== 'all' && patient.status !== statusFilter) {
        return false;
      }

      if (priorityFilter !== 'all') {
        const priorityMap = { P1: 'high', P2: 'medium', P3: 'low' };
        if (patient.priority !== priorityMap[priorityFilter]) {
          return false;
        }
      }

      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          patient.name.toLowerCase().includes(search) ||
          patient.primaryCondition.toLowerCase().includes(search)
        );
      }

      return true;
    });
  }, [searchTerm, statusFilter, priorityFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const activeCount = PATIENTS.filter((p) => p.status === 'Active').length;
  const followUpCount = PATIENTS.filter((p) => p.status === 'Follow-up').length;
  const priority1Count = PATIENTS.filter((p) => p.priority === 'high').length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Patients" onMenuPress={handleMenuPress} />
      <ScrollView
        testID="screen-clinician-patients"
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { padding: theme.spacing[4] },
        ]}
      >
        <View style={{ gap: theme.spacing[4] }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: theme.spacing[3],
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontFamily: theme.typography.fontFamily.bold,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing[1],
                }}
              >
                My Patients
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.muted,
                }}
              >
                Manage your patient roster and access detailed information.
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.muted,
                  marginTop: theme.spacing[2],
                }}
              >
                Showing {filteredPatients.length} patient
                {filteredPatients.length !== 1 ? 's' : ''}
              </Text>
            </View>
            <Button
              onPress={() => console.log('Add patient tapped')}
              variant="primary"
              size="sm"
              title="Add"
              leftIcon={<Plus size={16} color="#fff" />}
            />
          </View>

          <Card variant="bordered">
            <View style={{ gap: theme.spacing[3] }}>
              <Input
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search by name, condition, or MRN..."
                leftIcon={
                  <Search size={20} color={theme.colors.text.muted} />
                }
              />

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
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: theme.spacing[2],
                  }}
                >
                  <Button
                    onPress={() => setStatusFilter('all')}
                    variant={statusFilter === 'all' ? 'primary' : 'outline'}
                    size="sm"
                    title="All"
                  />
                  <Button
                    onPress={() => setStatusFilter('Active')}
                    variant={statusFilter === 'Active' ? 'primary' : 'outline'}
                    size="sm"
                    title="Active"
                  />
                  <Button
                    onPress={() => setStatusFilter('Follow-up')}
                    variant={
                      statusFilter === 'Follow-up' ? 'primary' : 'outline'
                    }
                    size="sm"
                    title="Follow-up"
                  />
                  <Button
                    onPress={() => setStatusFilter('Inactive')}
                    variant={
                      statusFilter === 'Inactive' ? 'primary' : 'outline'
                    }
                    size="sm"
                    title="Inactive"
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
                  Priority
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: theme.spacing[2],
                  }}
                >
                  <Button
                    onPress={() => setPriorityFilter('all')}
                    variant={priorityFilter === 'all' ? 'primary' : 'outline'}
                    size="sm"
                    title="All"
                  />
                  <Button
                    onPress={() => setPriorityFilter('P1')}
                    variant={priorityFilter === 'P1' ? 'primary' : 'outline'}
                    size="sm"
                    title="P1"
                  />
                  <Button
                    onPress={() => setPriorityFilter('P2')}
                    variant={priorityFilter === 'P2' ? 'primary' : 'outline'}
                    size="sm"
                    title="P2"
                  />
                  <Button
                    onPress={() => setPriorityFilter('P3')}
                    variant={priorityFilter === 'P3' ? 'primary' : 'outline'}
                    size="sm"
                    title="P3"
                  />
                </View>
              </View>
            </View>
          </Card>

          {filteredPatients.length === 0 ? (
            <EmptyState
              title="No patients found"
              description="Try adjusting your search or filters."
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          ) : (
            <View style={{ gap: theme.spacing[3] }}>
              {filteredPatients.map((patient) => (
                <TouchableOpacity
                  key={patient.id}
                  onPress={() => console.log('Open patient', patient.id)}
                  activeOpacity={0.7}
                >
                  <Card variant="bordered">
                    <View style={{ gap: theme.spacing[3] }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: theme.spacing[3],
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: theme.spacing[3],
                            flex: 1,
                          }}
                        >
                          <Avatar
                            size="md"
                            initials={getInitials(patient.name)}
                          />
                          <View style={{ flex: 1 }}>
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
                            <Text
                              style={{
                                fontSize: theme.typography.fontSize.sm,
                                color: theme.colors.text.muted,
                                marginTop: theme.spacing[1],
                              }}
                            >
                              {patient.age} years • {patient.primaryCondition}
                            </Text>
                          </View>
                        </View>
                        <Button
                          onPress={() =>
                            console.log('View patient', patient.id)
                          }
                          variant="outline"
                          size="sm"
                          title="View"
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: theme.spacing[2],
                        }}
                      >
                        <Badge
                          variant={getPriorityBadgeVariant(patient.priority)}
                          size="sm"
                        >
                          {getPriorityLabel(patient.priority)}
                        </Badge>
                        <Badge
                          variant={getStatusBadgeVariant(patient.status)}
                          size="sm"
                        >
                          {patient.status}
                        </Badge>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: theme.spacing[2],
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: theme.spacing[1],
                          }}
                        >
                          <Calendar
                            size={14}
                            color={theme.colors.text.muted}
                          />
                          <Text
                            style={{
                              fontSize: theme.typography.fontSize.xs,
                              color: theme.colors.text.muted,
                            }}
                          >
                            Last visit: {formatDate(patient.lastVisit)}
                          </Text>
                        </View>
                        {patient.nextAppointment && (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: theme.spacing[1],
                            }}
                          >
                            <Calendar
                              size={14}
                              color={theme.colors.primary.bg}
                            />
                            <Text
                              style={{
                                fontSize: theme.typography.fontSize.xs,
                                color: theme.colors.primary.bg,
                                fontFamily:
                                  theme.typography.fontFamily.semibold,
                              }}
                            >
                              Next: {formatDate(patient.nextAppointment)}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          )}

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
                Summary
              </Text>
            }
          >
            <View style={{ gap: theme.spacing[3] }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.muted,
                  }}
                >
                  Total Patients
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontFamily: theme.typography.fontFamily.bold,
                    color: theme.colors.text.primary,
                  }}
                >
                  {PATIENTS.length}
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: theme.colors.surface.border,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.muted,
                  }}
                >
                  Active Patients
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontFamily: theme.typography.fontFamily.bold,
                    color: theme.colors.feedback.success.bg,
                  }}
                >
                  {activeCount}
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: theme.colors.surface.border,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.muted,
                  }}
                >
                  Priority 1
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontFamily: theme.typography.fontFamily.bold,
                    color: theme.colors.feedback.danger.bg,
                  }}
                >
                  {priority1Count}
                </Text>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: theme.colors.surface.border,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.muted,
                  }}
                >
                  Follow-ups
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontFamily: theme.typography.fontFamily.bold,
                    color: theme.colors.feedback.warning.bg,
                  }}
                >
                  {followUpCount}
                </Text>
              </View>
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
