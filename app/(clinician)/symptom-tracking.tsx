import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Badge, Button, Input, EmptyState, Avatar } from '@components/ui';
import { Search } from 'lucide-react-native';

type SymptomSeverityBucket = 'low' | 'medium' | 'high';

interface ClinicianSymptomReport {
  id: string;
  patientId: string;
  patientName: string;
  symptoms: string[];
  severity: number;
  reportedAt: string;
  notes: string;
}

const SYMPTOM_REPORTS: ClinicianSymptomReport[] = [
  {
    id: '1',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    symptoms: ['Fatigue', 'Headache'],
    severity: 8,
    reportedAt: '2025-01-08T09:30:00Z',
    notes: 'Persistent headache for 3 days, affecting daily activities. Fatigue worsening despite rest.',
  },
  {
    id: '2',
    patientId: 'p2',
    patientName: 'Michael Chen',
    symptoms: ['Shortness of breath', 'Dizziness'],
    severity: 7,
    reportedAt: '2025-01-08T08:15:00Z',
    notes: 'Shortness of breath when climbing stairs. Occasional dizziness in the morning.',
  },
  {
    id: '3',
    patientId: 'p3',
    patientName: 'Emma Williams',
    symptoms: ['Nausea', 'Fatigue'],
    severity: 5,
    reportedAt: '2025-01-07T14:20:00Z',
    notes: 'Mild nausea after meals. Energy levels are lower than usual.',
  },
  {
    id: '4',
    patientId: 'p1',
    patientName: 'Sarah Johnson',
    symptoms: ['Headache', 'Dizziness'],
    severity: 9,
    reportedAt: '2025-01-07T10:00:00Z',
    notes: 'Severe migraine-like headache. Light sensitivity and dizziness when standing up.',
  },
  {
    id: '5',
    patientId: 'p4',
    patientName: 'James Rodriguez',
    symptoms: ['Fatigue', 'Muscle pain'],
    severity: 4,
    reportedAt: '2025-01-07T07:45:00Z',
    notes: 'General muscle soreness and tiredness. No fever or other symptoms.',
  },
  {
    id: '6',
    patientId: 'p5',
    patientName: 'Olivia Martinez',
    symptoms: ['Chest pain', 'Shortness of breath'],
    severity: 9,
    reportedAt: '2025-01-06T16:30:00Z',
    notes: 'Sharp chest pain on left side. Difficulty breathing deeply. Very concerning.',
  },
  {
    id: '7',
    patientId: 'p2',
    patientName: 'Michael Chen',
    symptoms: ['Fatigue', 'Cough'],
    severity: 6,
    reportedAt: '2025-01-06T11:00:00Z',
    notes: 'Dry cough for 5 days. Feeling exhausted even with adequate sleep.',
  },
  {
    id: '8',
    patientId: 'p3',
    patientName: 'Emma Williams',
    symptoms: ['Headache'],
    severity: 3,
    reportedAt: '2025-01-05T13:15:00Z',
    notes: 'Mild tension headache. Manageable with over-the-counter medication.',
  },
  {
    id: '9',
    patientId: 'p4',
    patientName: 'James Rodriguez',
    symptoms: ['Dizziness', 'Nausea'],
    severity: 2,
    reportedAt: '2025-01-05T09:00:00Z',
    notes: 'Slight dizziness upon waking. Mild nausea that passed quickly.',
  },
  {
    id: '10',
    patientId: 'p5',
    patientName: 'Olivia Martinez',
    symptoms: ['Fatigue', 'Headache', 'Muscle pain'],
    severity: 7,
    reportedAt: '2025-01-04T15:45:00Z',
    notes: 'Multiple symptoms. Widespread muscle aches and persistent fatigue. Moderate headache.',
  },
];

const getSeverityBucket = (severity: number): SymptomSeverityBucket => {
  if (severity >= 7) return 'high';
  if (severity >= 4) return 'medium';
  return 'low';
};

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('en-US', options).replace(',', ' ·');
};

export default function SymptomTrackingScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | SymptomSeverityBucket>('all');

  const filteredReports = useMemo(() => {
    return SYMPTOM_REPORTS.filter((report) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        report.patientName.toLowerCase().includes(searchLower) ||
        report.symptoms.some((s) => s.toLowerCase().includes(searchLower)) ||
        report.notes.toLowerCase().includes(searchLower);

      const matchesSeverity =
        severityFilter === 'all' || getSeverityBucket(report.severity) === severityFilter;

      return matchesSearch && matchesSeverity;
    });
  }, [searchTerm, severityFilter]);

  const stats = useMemo(() => {
    const totalReports = filteredReports.length;
    const highSeverity = filteredReports.filter((r) => r.severity >= 7).length;

    return { totalReports, highSeverity };
  }, [filteredReports]);

  const clearFilters = () => {
    setSearchTerm('');
    setSeverityFilter('all');
  };

  const renderHeader = () => (
    <View style={{ gap: theme.spacing[4] }}>
      <View style={{ gap: theme.spacing[2] }}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Symptom Tracking Overview
        </Text>
        <Text style={[styles.headerDescription, { color: colors.textSecondary }]}>
          Monitor patient-reported symptoms and identify who may need follow-up.
        </Text>
      </View>

      <Card>
        <View style={{ gap: theme.spacing[3] }}>
          <Text style={[styles.statsTitle, { color: colors.text }]}>Summary</Text>

          <View style={{ flexDirection: 'row', gap: theme.spacing[3], flexWrap: 'wrap' }}>
            <View style={{ flex: 1, minWidth: 100 }}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {stats.totalReports}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Total
              </Text>
            </View>

            <View style={{ flex: 1, minWidth: 100 }}>
              <Text style={[styles.statValue, { color: theme.colors.feedback.danger.fg }]}>
                {stats.highSeverity}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                High Priority
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <Card>
        <View style={{ gap: theme.spacing[4] }}>
          <Input
            placeholder="Search by patient, symptom, or notes..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            leftIcon={<Search size={20} color={colors.textSecondary} />}
          />

          <View style={{ gap: theme.spacing[3] }}>
            <Text style={[styles.filterLabel, { color: colors.text }]}>Filter by Severity</Text>
            <View style={styles.filterRow}>
              <Button
                size="sm"
                variant={severityFilter === 'all' ? 'primary' : 'outline'}
                onPress={() => setSeverityFilter('all')}
                title="All"
              />
              <Button
                size="sm"
                variant={severityFilter === 'low' ? 'primary' : 'outline'}
                onPress={() => setSeverityFilter('low')}
                title="Low"
              />
              <Button
                size="sm"
                variant={severityFilter === 'medium' ? 'primary' : 'outline'}
                onPress={() => setSeverityFilter('medium')}
                title="Medium"
              />
              <Button
                size="sm"
                variant={severityFilter === 'high' ? 'primary' : 'outline'}
                onPress={() => setSeverityFilter('high')}
                title="High"
              />
            </View>
          </View>
        </View>
      </Card>

      <Text style={[styles.listTitle, { color: colors.text }]}>
        Symptom Reports ({filteredReports.length})
      </Text>
    </View>
  );

  const renderReportCard = ({ item }: { item: ClinicianSymptomReport }) => {
    const bucket = getSeverityBucket(item.severity);
    const severityVariant = bucket === 'high' ? 'danger' : bucket === 'medium' ? 'warning' : 'success';
    const severityLabel = bucket.toUpperCase();

    return (
      <View style={{ marginBottom: theme.spacing[3] }}>
        <Card>
          <View style={{ gap: theme.spacing[3] }}>
          <View style={styles.topRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
              <Avatar initials={getInitials(item.patientName)} size="sm" />
              <View style={{ flex: 1 }}>
                <Text style={[styles.patientName, { color: colors.text }]}>
                  {item.patientName}
                </Text>
                <Text style={[styles.symptomPreview, { color: colors.textSecondary }]}>
                  Reported symptoms
                </Text>
              </View>
            </View>
            <Badge variant={severityVariant} size="sm">
              {severityLabel} ({item.severity}/10)
            </Badge>
          </View>

          <View style={{ gap: theme.spacing[2] }}>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Symptoms:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing[2] }}>
              {item.symptoms.map((symptom) => (
                <Badge key={symptom} variant="neutral" size="sm">
                  {symptom}
                </Badge>
              ))}
            </View>
          </View>

          {item.notes && (
            <View style={{ gap: theme.spacing[1] }}>
              <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Notes:</Text>
              <Text
                style={[styles.notesText, { color: colors.text }]}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {item.notes}
              </Text>
            </View>
          )}

          <View style={styles.bottomRow}>
            <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
              Reported: {formatDate(item.reportedAt)}
            </Text>
            <Button
              size="sm"
              variant="outline"
              onPress={() => console.log('view patient', item.patientId)}
              title="View Patient"
            />
          </View>
        </View>
        </Card>
      </View>
    );
  };

  return (
    <View
      testID="screen-clinician-symptom-tracking"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="Symptom Tracking" />

      {filteredReports.length === 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={[]}
            renderItem={() => null}
            ListHeaderComponent={renderHeader()}
            contentContainerStyle={{ padding: theme.spacing[4] }}
          />
          <EmptyState
            title="No symptom reports"
            description="Try adjusting your search or filters to see more results."
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        </View>
      ) : (
        <FlatList
          data={filteredReports}
          renderItem={renderReportCard}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader()}
          contentContainerStyle={{ padding: theme.spacing[4], paddingBottom: theme.spacing[6] }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  patientName: {
    fontSize: 16,
    fontWeight: '700',
  },
  symptomPreview: {
    fontSize: 13,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  timestamp: {
    fontSize: 12,
  },
});
