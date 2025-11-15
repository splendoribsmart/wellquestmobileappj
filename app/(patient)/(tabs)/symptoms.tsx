import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Input, TextArea, Button, Slider, Card, Badge } from '@components/ui';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

const STATIC_SYMPTOMS = [
  {
    id: 1,
    symptom: 'Headache',
    severity: 6,
    time: 'Today • 08:30',
  },
  {
    id: 2,
    symptom: 'Fatigue',
    severity: 4,
    time: 'Yesterday • 20:10',
  },
  {
    id: 3,
    symptom: 'Nausea',
    severity: 3,
    time: '2 days ago • 14:45',
  },
];

export default function SymptomsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const [symptomText, setSymptomText] = useState('');
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleSaveSymptom = () => {
    console.log('Mock symptom payload:', {
      symptom: symptomText,
      severity,
      notes,
      timestamp: new Date().toISOString(),
    });
  };

  const getSeverityBadge = (severityValue: number) => {
    if (severityValue >= 7) {
      return <Badge variant="danger" size="sm">Severe</Badge>;
    } else if (severityValue >= 4) {
      return <Badge variant="warning" size="sm">Moderate</Badge>;
    } else {
      return <Badge variant="success" size="sm">Mild</Badge>;
    }
  };

  return (
    <View testID="screen-patient-symptoms" style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Symptoms" onMenuPress={handleMenuPress} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.cardWrapper}>
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Log Symptom
            </Text>

          <View style={styles.formField}>
            <Input
              label="Symptom"
              value={symptomText}
              onChangeText={setSymptomText}
              placeholder="Headache, nausea…"
            />
          </View>

          <View style={styles.formField}>
            <Text style={[styles.label, { color: colors.text }]}>
              Severity: {severity}/10
            </Text>
            <Slider
              value={severity}
              onValueChange={setSeverity}
              min={1}
              max={10}
            />
          </View>

          <View style={styles.formField}>
            <TextArea
              label="Notes (optional)"
              value={notes}
              onChangeText={setNotes}
              placeholder="Additional details about the symptom…"
              minHeight={100}
            />
          </View>

          <Text style={[styles.helperText, { color: colors.textSecondary }]}>
            Demo only: symptom entries are not saved yet.
          </Text>

          <Button
            onPress={handleSaveSymptom}
            variant="primary"
            title="Save Symptom"
          />
          </Card>
        </View>

        <View style={styles.cardWrapper}>
          <Card>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Symptoms
          </Text>

          {STATIC_SYMPTOMS.map((entry, index) => (
            <View
              key={entry.id}
              style={[
                styles.symptomEntry,
                {
                  borderBottomWidth: index < STATIC_SYMPTOMS.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <View style={styles.symptomHeader}>
                <Text style={[styles.symptomName, { color: colors.text }]}>
                  {entry.symptom}
                </Text>
                {getSeverityBadge(entry.severity)}
              </View>
              <View style={styles.symptomDetails}>
                <Text style={[styles.severityText, { color: colors.textSecondary }]}>
                  Severity {entry.severity}/10
                </Text>
                <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                  {entry.time}
                </Text>
              </View>
            </View>
          ))}
          </Card>
        </View>
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
  formField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  helperText: {
    fontSize: 13,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  symptomEntry: {
    paddingVertical: 12,
  },
  symptomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  symptomName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  symptomDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  severityText: {
    fontSize: 14,
  },
  timeText: {
    fontSize: 13,
  },
});
