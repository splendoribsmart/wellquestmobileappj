import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Card, Badge, Checkbox, Progress } from '@components/ui';
import { Target, CheckCircle } from 'lucide-react-native';

interface Goal {
  id: string;
  title: string;
  target: string;
  current: string;
  progress: number;
}

interface Task {
  id: string;
  title: string;
  subtitle?: string;
  completed: boolean;
}

const CARE_PLAN_SUMMARY = {
  title: 'Diabetes Care Plan',
  status: 'Active',
  description:
    'This personalized care plan helps you manage your Type 2 diabetes through medication adherence, lifestyle modifications, and regular monitoring.',
};

const GOALS: Goal[] = [
  {
    id: '1',
    title: 'Maintain fasting blood sugar between 80–130 mg/dL',
    target: '80-130 mg/dL',
    current: '115 mg/dL',
    progress: 75,
  },
  {
    id: '2',
    title: 'Achieve HbA1c level below 7%',
    target: 'Below 7%',
    current: '7.2%',
    progress: 65,
  },
  {
    id: '3',
    title: 'Exercise at least 150 minutes per week',
    target: '150 min/week',
    current: '120 min/week',
    progress: 80,
  },
];

const DAILY_TASKS_INITIAL: Task[] = [
  {
    id: '1',
    title: 'Take morning medication',
    subtitle: 'Metformin 500mg',
    completed: false,
  },
  {
    id: '2',
    title: 'Log breakfast blood sugar',
    subtitle: 'Target: 80-130 mg/dL',
    completed: false,
  },
  {
    id: '3',
    title: 'Walk 30 minutes',
    subtitle: 'Moderate intensity',
    completed: false,
  },
  {
    id: '4',
    title: 'Log lunch blood sugar',
    subtitle: 'Before meal',
    completed: false,
  },
  {
    id: '5',
    title: 'Take evening medication',
    subtitle: 'Metformin 500mg',
    completed: false,
  },
];

const NEXT_STEPS = [
  'Review progress with your clinician next week.',
  'Aim for at least 5 days of activity this week.',
  'Continue logging blood sugar readings twice daily.',
];

export default function CarePlanScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();
  const [tasks, setTasks] = useState<Task[]>(DAILY_TASKS_INITIAL);

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
      <TopBar title="My Care Plan" onMenuPress={handleMenuPress} />
      <ScrollView
        testID="screen-patient-care-plan"
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scrollContent,
          { padding: theme.spacing[4] },
        ]}
      >
        <View style={{ gap: theme.spacing[4] }}>
          <Card variant="default">
            <View style={{ gap: theme.spacing[2] }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize['2xl'],
                    fontFamily: theme.typography.fontFamily.bold,
                    color: theme.colors.text.primary,
                  }}
                >
                  {CARE_PLAN_SUMMARY.title}
                </Text>
                <Badge variant="success">{CARE_PLAN_SUMMARY.status}</Badge>
              </View>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.text.muted,
                  lineHeight: 22,
                }}
              >
                {CARE_PLAN_SUMMARY.description}
              </Text>
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
                <Target size={20} color={theme.colors.text.primary} />
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.text.primary,
                  }}
                >
                  Goals
                </Text>
              </View>
            }
          >
            <View style={{ gap: theme.spacing[4] }}>
              {GOALS.map((goal, index) => (
                <View key={goal.id}>
                  <View style={{ gap: theme.spacing[2] }}>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.base,
                        fontFamily: theme.typography.fontFamily.medium,
                        color: theme.colors.text.primary,
                      }}
                    >
                      {goal.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.text.muted,
                      }}
                    >
                      Target: {goal.target} | Current: {goal.current}
                    </Text>
                    <Progress
                      value={goal.progress}
                      variant={goal.progress >= 70 ? 'success' : 'warning'}
                      showLabel
                    />
                  </View>
                  {index < GOALS.length - 1 && (
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: theme.spacing[2],
                  }}
                >
                  <CheckCircle size={20} color={theme.colors.text.primary} />
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontFamily: theme.typography.fontFamily.semibold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    Daily Tasks
                  </Text>
                </View>
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
                      {task.subtitle && (
                        <Text
                          style={{
                            fontSize: theme.typography.fontSize.sm,
                            color: theme.colors.text.muted,
                            marginTop: theme.spacing[1],
                          }}
                        >
                          {task.subtitle}
                        </Text>
                      )}
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
                Next Steps
              </Text>
            }
          >
            <View style={{ gap: theme.spacing[3] }}>
              {NEXT_STEPS.map((step, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    gap: theme.spacing[2],
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                    }}
                  >
                    •
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.primary,
                      lineHeight: 22,
                    }}
                  >
                    {step}
                  </Text>
                </View>
              ))}
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
