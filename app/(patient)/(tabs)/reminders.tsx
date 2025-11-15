import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Switch, Badge } from '@components/ui';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

export default function RemindersScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const [medicationMorningOn, setMedicationMorningOn] = useState(true);
  const [medicationEveningOn, setMedicationEveningOn] = useState(true);
  const [appointmentReminderOn, setAppointmentReminderOn] = useState(true);
  const [symptomCheckReminderOn, setSymptomCheckReminderOn] = useState(false);
  const [vitalsLogReminderOn, setVitalsLogReminderOn] = useState(false);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const ReminderRow = ({
    label,
    time,
    isOn,
    onChange,
  }: {
    label: string;
    time: string;
    isOn: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <View style={[styles.reminderRow, { borderBottomColor: colors.border }]}>
      <View style={styles.reminderInfo}>
        <Text style={[styles.reminderLabel, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.reminderTime, { color: colors.textSecondary }]}>{time}</Text>
      </View>
      <View style={styles.reminderControl}>
        <Text style={[styles.statusText, { color: isOn ? theme.colors.feedback.success.bg : colors.textSecondary }]}>
          {isOn ? 'On' : 'Off'}
        </Text>
        <Switch checked={isOn} onChange={onChange} />
      </View>
    </View>
  );

  return (
    <View testID="screen-patient-reminders" style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Reminders" onMenuPress={handleMenuPress} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.cardWrapper}>
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Medications
            </Text>
            <ReminderRow
              label="Morning medications"
              time="8:00 AM"
              isOn={medicationMorningOn}
              onChange={setMedicationMorningOn}
            />
            <ReminderRow
              label="Evening medications"
              time="8:00 PM"
              isOn={medicationEveningOn}
              onChange={setMedicationEveningOn}
            />
          </Card>
        </View>

        <View style={styles.cardWrapper}>
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Appointments
            </Text>
            <View style={styles.appointmentRow}>
              <View style={styles.appointmentInfo}>
                <Text style={[styles.appointmentLabel, { color: colors.text }]}>
                  Next appointment
                </Text>
                <View style={styles.appointmentDetails}>
                  <Badge variant="info" size="sm">Tomorrow</Badge>
                  <Text style={[styles.appointmentTime, { color: colors.textSecondary }]}>
                    10:00 AM
                  </Text>
                </View>
              </View>
              <View style={styles.reminderControl}>
                <Text style={[styles.statusText, { color: appointmentReminderOn ? theme.colors.feedback.success.bg : colors.textSecondary }]}>
                  {appointmentReminderOn ? 'On' : 'Off'}
                </Text>
                <Switch checked={appointmentReminderOn} onChange={setAppointmentReminderOn} />
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.cardWrapper}>
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Daily Check-ins
            </Text>
            <ReminderRow
              label="Daily symptom check"
              time="7:00 PM"
              isOn={symptomCheckReminderOn}
              onChange={setSymptomCheckReminderOn}
            />
            <ReminderRow
              label="Daily vitals log"
              time="8:00 PM"
              isOn={vitalsLogReminderOn}
              onChange={setVitalsLogReminderOn}
            />
          </Card>
        </View>

        <Text style={[styles.helperText, { color: colors.textSecondary }]}>
          Reminder settings are not saved yet. Changes are stored in-memory only.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reminderTime: {
    fontSize: 14,
  },
  reminderControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 30,
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  appointmentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appointmentTime: {
    fontSize: 14,
  },
  helperText: {
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
