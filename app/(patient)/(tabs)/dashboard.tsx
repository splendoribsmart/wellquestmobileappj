import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Button, Card, Checkbox, Badge, Progress } from '@components/ui';
import {
  Activity,
  Heart,
  Pill,
  MessageSquare,
  Calendar,
  Video,
  Clock,
} from 'lucide-react-native';

interface Task {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  type: 'medication' | 'symptom' | 'vital';
}

const STATIC_TASKS: Task[] = [
  {
    id: '1',
    title: 'Take Metformin 500mg',
    subtitle: '8:00 AM • Medication',
    completed: false,
    type: 'medication',
  },
  {
    id: '2',
    title: 'Log today\'s symptoms',
    subtitle: 'Daily check-in',
    completed: false,
    type: 'symptom',
  },
  {
    id: '3',
    title: 'Log blood pressure',
    subtitle: '9:00 AM • Vital signs',
    completed: false,
    type: 'vital',
  },
  {
    id: '4',
    title: 'Take Lisinopril 10mg',
    subtitle: '12:00 PM • Medication',
    completed: false,
    type: 'medication',
  },
  {
    id: '5',
    title: 'Evening medication review',
    subtitle: '8:00 PM • Medication',
    completed: false,
    type: 'medication',
  },
];

const WEEKLY_PROGRESS = {
  completionPercentage: 68,
  medicationsTaken: 4,
  medicationsTotal: 6,
  symptomsLogged: 3,
  vitalsLogged: 2,
};

const UPCOMING_APPOINTMENT = {
  dateTime: 'Tomorrow • 10:00 AM',
  clinicianName: 'Dr. Ade',
  clinicianSpecialty: 'Endocrinologist',
  type: 'Virtual',
  location: 'Video call link will be sent 15 minutes before',
};

export default function PatientDashboardScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>(STATIC_TASKS);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Patient Dashboard" onMenuPress={handleMenuPress} />
      <ScrollView
        testID="screen-patient-dashboard"
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
                Hi, Jane
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.text.muted,
                }}
              >
                Here's what's on your health plan today.
              </Text>
            </View>
          </Card>

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
                  Today's Tasks
                </Text>
                <Badge variant="neutral">
                  {completedTasksCount}/{tasks.length}
                </Badge>
              </View>
            }
          >
            <View style={{ gap: theme.spacing[3] }}>
              {tasks.map((task, index) => (
                <View key={task.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: theme.spacing[3],
                    }}
                  >
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id)}
                    />
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: theme.typography.fontSize.base,
                          color: task.completed
                            ? theme.colors.text.muted
                            : theme.colors.text.primary,
                          textDecorationLine: task.completed
                            ? 'line-through'
                            : 'none',
                        }}
                      >
                        {task.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.text.muted,
                          marginTop: theme.spacing[1],
                        }}
                      >
                        {task.subtitle}
                      </Text>
                    </View>
                  </View>
                  {index < tasks.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: theme.colors.surface.border,
                        marginTop: theme.spacing[3],
                      }}
                    />
                  )}
                </View>
              ))}
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
                This Week
              </Text>
            }
          >
            <View style={{ gap: theme.spacing[4] }}>
              <View>
                <Progress
                  value={WEEKLY_PROGRESS.completionPercentage}
                  variant="success"
                  showLabel
                />
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.muted,
                    marginTop: theme.spacing[2],
                  }}
                >
                  Tasks completed this week
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: theme.spacing[3],
                  flexWrap: 'wrap',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    minWidth: 100,
                    padding: theme.spacing[3],
                    backgroundColor: theme.colors.surface.alt,
                    borderRadius: theme.borderRadius.md,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize['2xl'],
                      fontFamily: theme.typography.fontFamily.bold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    {WEEKLY_PROGRESS.medicationsTaken}/
                    {WEEKLY_PROGRESS.medicationsTotal}
                  </Text>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.muted,
                      marginTop: theme.spacing[1],
                    }}
                  >
                    Medications
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    minWidth: 100,
                    padding: theme.spacing[3],
                    backgroundColor: theme.colors.surface.alt,
                    borderRadius: theme.borderRadius.md,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize['2xl'],
                      fontFamily: theme.typography.fontFamily.bold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    {WEEKLY_PROGRESS.symptomsLogged}
                  </Text>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.muted,
                      marginTop: theme.spacing[1],
                    }}
                  >
                    Symptoms logged
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    minWidth: 100,
                    padding: theme.spacing[3],
                    backgroundColor: theme.colors.surface.alt,
                    borderRadius: theme.borderRadius.md,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize['2xl'],
                      fontFamily: theme.typography.fontFamily.bold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    {WEEKLY_PROGRESS.vitalsLogged}
                  </Text>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.muted,
                      marginTop: theme.spacing[1],
                    }}
                  >
                    Vitals logged
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          <Card
            variant="bordered"
            header={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: theme.spacing[2],
                }}
              >
                <Calendar
                  size={20}
                  color={theme.colors.text.primary}
                />
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.text.primary,
                  }}
                >
                  Upcoming Appointment
                </Text>
              </View>
            }
          >
            <View style={{ gap: theme.spacing[3] }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: theme.spacing[2],
                }}
              >
                <Clock
                  size={16}
                  color={theme.colors.text.muted}
                />
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.base,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.text.primary,
                  }}
                >
                  {UPCOMING_APPOINTMENT.dateTime}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.base,
                    color: theme.colors.text.primary,
                  }}
                >
                  {UPCOMING_APPOINTMENT.clinicianName}
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.muted,
                    marginTop: theme.spacing[1],
                  }}
                >
                  {UPCOMING_APPOINTMENT.clinicianSpecialty}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: theme.spacing[2],
                }}
              >
                <Badge
                  variant="info"
                  icon={<Video size={12} color="#fff" />}
                >
                  {UPCOMING_APPOINTMENT.type}
                </Badge>
              </View>

              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.muted,
                }}
              >
                {UPCOMING_APPOINTMENT.location}
              </Text>

              <Button
                onPress={() => console.log('View appointment details')}
                variant="outline"
                title="View details"
              />
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
                Quick Actions
              </Text>
            }
          >
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.spacing[3],
              }}
            >
              <View style={{ flex: 1, minWidth: 140 }}>
                <Button
                  onPress={() => console.log('Log Symptom')}
                  variant="outline"
                  title="Log Symptom"
                  leftIcon={
                    <Activity
                      size={18}
                      color={theme.colors.text.primary}
                    />
                  }
                />
              </View>
              <View style={{ flex: 1, minWidth: 140 }}>
                <Button
                  onPress={() => console.log('Log Vitals')}
                  variant="outline"
                  title="Log Vitals"
                  leftIcon={
                    <Heart
                      size={18}
                      color={theme.colors.text.primary}
                    />
                  }
                />
              </View>
              <View style={{ flex: 1, minWidth: 140 }}>
                <Button
                  onPress={() => console.log('Medications')}
                  variant="outline"
                  title="Medications"
                  leftIcon={
                    <Pill
                      size={18}
                      color={theme.colors.text.primary}
                    />
                  }
                />
              </View>
              <View style={{ flex: 1, minWidth: 140 }}>
                <Button
                  onPress={() => console.log('Message Care Team')}
                  variant="outline"
                  title="Message Team"
                  leftIcon={
                    <MessageSquare
                      size={18}
                      color={theme.colors.text.primary}
                    />
                  }
                />
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
