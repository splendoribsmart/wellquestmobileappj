import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@theme/index';
import { TopBar } from '@components/layout/TopBar';
import { Button, Card, Badge, Avatar, EmptyState } from '@components/ui';
import { MessageCircle, Calendar, Edit, AlertCircle } from 'lucide-react-native';

type CareIndicator = 'high' | 'medium' | 'low';

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedDate: string;
}

interface VitalSignEntry {
  id: string;
  date: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  weight: string;
}

interface VisitEntry {
  id: string;
  date: string;
  type: string;
  provider: string;
  diagnosis: string;
  notes: string;
}

type CarePlanStatus = 'active' | 'completed' | 'paused';
type CarePlanPriority = 'low' | 'medium' | 'high';

interface CarePlanSummary {
  id: string;
  title: string;
  description: string;
  status: CarePlanStatus;
  priority: CarePlanPriority;
  progress: number;
  startDate: string;
  endDate?: string;
}

interface PatientDetail {
  id: string;
  name: string;
  age: number;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  address: string;
  medicalRecordNumber: string;
  avatarInitials: string;
  careIndicator: CareIndicator;
  lastVisit: string;
  nextAppointment?: string;
  emergencyContact: EmergencyContact;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: Medication[];
  vitals: VitalSignEntry[];
  visits: VisitEntry[];
  carePlan?: CarePlanSummary;
}

const MOCK_PATIENT: PatientDetail = {
  id: '1',
  name: 'John Doe',
  age: 58,
  dateOfBirth: '1967-03-15',
  gender: 'male',
  email: 'john.doe@email.com',
  phone: '(555) 123-4567',
  address: '123 Main St, Apt 4B\nSpringfield, IL 62701',
  medicalRecordNumber: 'MRN-789456',
  avatarInitials: 'JD',
  careIndicator: 'high',
  lastVisit: '2025-01-08',
  nextAppointment: '2025-02-03',
  emergencyContact: {
    name: 'Jane Doe',
    phone: '(555) 987-6543',
    relationship: 'Spouse',
  },
  allergies: ['Penicillin', 'Peanuts', 'Latex', 'Shellfish'],
  chronicConditions: ['Type 2 Diabetes', 'Hypertension', 'Hyperlipidemia'],
  currentMedications: [
    {
      id: 'med1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedDate: '2024-06-15',
    },
    {
      id: 'med2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedDate: '2024-06-15',
    },
    {
      id: 'med3',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      prescribedDate: '2024-08-22',
    },
    {
      id: 'med4',
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      prescribedDate: '2024-06-15',
    },
  ],
  vitals: [
    {
      id: 'v1',
      date: '2025-01-08',
      bloodPressure: '142/88',
      heartRate: '78 bpm',
      temperature: '98.4°F',
      weight: '192 lb',
    },
    {
      id: 'v2',
      date: '2024-12-11',
      bloodPressure: '138/86',
      heartRate: '76 bpm',
      temperature: '98.6°F',
      weight: '194 lb',
    },
    {
      id: 'v3',
      date: '2024-11-06',
      bloodPressure: '145/90',
      heartRate: '80 bpm',
      temperature: '98.3°F',
      weight: '196 lb',
    },
    {
      id: 'v4',
      date: '2024-10-09',
      bloodPressure: '140/88',
      heartRate: '77 bpm',
      temperature: '98.5°F',
      weight: '198 lb',
    },
    {
      id: 'v5',
      date: '2024-09-12',
      bloodPressure: '148/92',
      heartRate: '82 bpm',
      temperature: '98.7°F',
      weight: '199 lb',
    },
  ],
  visits: [
    {
      id: 'vis1',
      date: '2025-01-08',
      type: 'Follow-up',
      provider: 'Dr. Sarah Johnson',
      diagnosis: 'Type 2 Diabetes - Controlled',
      notes: 'Patient reports improved blood sugar control. A1C down to 6.8% from 7.2%. Continue current medication regimen. Discussed importance of diet and exercise.',
    },
    {
      id: 'vis2',
      date: '2024-12-11',
      type: 'Routine Check-up',
      provider: 'Dr. Sarah Johnson',
      diagnosis: 'Hypertension - Monitoring',
      notes: 'Blood pressure slightly elevated. Advised to monitor at home daily. May need to adjust Lisinopril dosage if readings remain high.',
    },
    {
      id: 'vis3',
      date: '2024-11-06',
      type: 'Consultation',
      provider: 'Dr. Michael Chen',
      diagnosis: 'Hyperlipidemia',
      notes: 'Lipid panel shows LDL at 145. Increased Atorvastatin to 20mg. Follow up in 3 months for repeat labs.',
    },
    {
      id: 'vis4',
      date: '2024-09-12',
      type: 'Annual Physical',
      provider: 'Dr. Sarah Johnson',
      diagnosis: 'Multiple chronic conditions - stable',
      notes: 'Annual comprehensive exam completed. All preventive screenings up to date. Patient compliant with medications.',
    },
  ],
  carePlan: {
    id: 'cp1',
    title: 'Diabetes & Hypertension Management',
    description: 'Comprehensive care plan focused on blood sugar control, blood pressure management, and cardiovascular health.',
    status: 'active',
    priority: 'high',
    progress: 65,
    startDate: '2024-06-15',
    endDate: '2025-06-15',
  },
};

type TabId = 'overview' | 'history' | 'medications' | 'vitals' | 'care-plan';

export default function PatientDetailScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const patient = MOCK_PATIENT;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getCareIndicatorBadge = (indicator: CareIndicator) => {
    switch (indicator) {
      case 'high':
        return { variant: 'danger' as const, label: 'Priority 1 – High' };
      case 'medium':
        return { variant: 'warning' as const, label: 'Priority 2 – Medium' };
      case 'low':
        return { variant: 'success' as const, label: 'Priority 3 – Low' };
    }
  };

  const getCarePlanStatusBadge = (status: CarePlanStatus) => {
    switch (status) {
      case 'active':
        return 'success' as const;
      case 'completed':
        return 'secondary' as const;
      case 'paused':
        return 'warning' as const;
    }
  };

  const getCarePlanPriorityBadge = (priority: CarePlanPriority) => {
    switch (priority) {
      case 'high':
        return 'danger' as const;
      case 'medium':
        return 'warning' as const;
      case 'low':
        return 'success' as const;
    }
  };

  const careIndicatorBadge = getCareIndicatorBadge(patient.careIndicator);

  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'history', label: 'History' },
    { id: 'medications', label: 'Medications' },
    { id: 'vitals', label: 'Vitals' },
    { id: 'care-plan', label: 'Care Plan' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'history':
        return renderHistoryTab();
      case 'medications':
        return renderMedicationsTab();
      case 'vitals':
        return renderVitalsTab();
      case 'care-plan':
        return renderCarePlanTab();
    }
  };

  const renderOverviewTab = () => (
    <View style={{ gap: theme.spacing[4] }}>
      <Card>
        <Text
          style={[
            styles.cardTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.lg,
              fontFamily: theme.typography.fontFamily.semibold,
              marginBottom: theme.spacing[3],
            },
          ]}
        >
          Demographics & Contact
        </Text>
        <View style={{ gap: theme.spacing[2] }}>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Date of Birth
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
              {formatDate(patient.dateOfBirth)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Email
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
              {patient.email}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Phone
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
              {patient.phone}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Address
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
              {patient.address}
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text
          style={[
            styles.cardTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.lg,
              fontFamily: theme.typography.fontFamily.semibold,
              marginBottom: theme.spacing[3],
            },
          ]}
        >
          Emergency Contact
        </Text>
        <View style={{ gap: theme.spacing[2] }}>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Name
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
              {patient.emergencyContact.name}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Phone
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
              {patient.emergencyContact.phone}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Relationship
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
              {patient.emergencyContact.relationship}
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text
          style={[
            styles.cardTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.lg,
              fontFamily: theme.typography.fontFamily.semibold,
              marginBottom: theme.spacing[3],
            },
          ]}
        >
          Quick Stats
        </Text>
        <View style={{ gap: theme.spacing[2] }}>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Care Priority
            </Text>
            <Badge variant={careIndicatorBadge.variant}>{careIndicatorBadge.label}</Badge>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Last Visit
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
              {formatDate(patient.lastVisit)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Next Appointment
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
              {patient.nextAppointment ? formatDate(patient.nextAppointment) : 'None scheduled'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
              Active Medications
            </Text>
            <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
              {patient.currentMedications.length}
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <Text
          style={[
            styles.cardTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.lg,
              fontFamily: theme.typography.fontFamily.semibold,
              marginBottom: theme.spacing[3],
            },
          ]}
        >
          Allergies
        </Text>
        {patient.allergies.length > 0 ? (
          <View style={styles.badgeContainer}>
            {patient.allergies.map((allergy, index) => (
              <Badge key={index} variant="warning">{allergy}</Badge>
            ))}
          </View>
        ) : (
          <Text style={[styles.emptyText, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.normal }]}>
            No allergies recorded.
          </Text>
        )}
      </Card>

      <Card>
        <Text
          style={[
            styles.cardTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.lg,
              fontFamily: theme.typography.fontFamily.semibold,
              marginBottom: theme.spacing[3],
            },
          ]}
        >
          Chronic Conditions
        </Text>
        {patient.chronicConditions.length > 0 ? (
          <View style={styles.badgeContainer}>
            {patient.chronicConditions.map((condition, index) => (
              <Badge key={index} variant="secondary">{condition}</Badge>
            ))}
          </View>
        ) : (
          <Text style={[styles.emptyText, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.normal }]}>
            No chronic conditions recorded.
          </Text>
        )}
      </Card>
    </View>
  );

  const renderHistoryTab = () => (
    <Card>
      <Text
        style={[
          styles.cardTitle,
          {
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSize.lg,
            fontFamily: theme.typography.fontFamily.semibold,
            marginBottom: theme.spacing[4],
          },
        ]}
      >
        Medical History
      </Text>
      {patient.visits.length > 0 ? (
        <View style={{ gap: theme.spacing[4] }}>
          {patient.visits.map((visit, index) => (
            <View
              key={visit.id}
              style={[
                styles.visitItem,
                {
                  paddingBottom: theme.spacing[4],
                  borderBottomWidth: index < patient.visits.length - 1 ? theme.borderWidth.hairline : 0,
                  borderBottomColor: theme.colors.surface.border,
                },
              ]}
            >
              <View style={[styles.visitHeader, { marginBottom: theme.spacing[2] }]}>
                <Text
                  style={[
                    styles.visitType,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.base,
                      fontFamily: theme.typography.fontFamily.semibold,
                    },
                  ]}
                >
                  {visit.type}
                </Text>
                <Text
                  style={[
                    styles.visitDate,
                    {
                      color: theme.colors.text.muted,
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.normal,
                    },
                  ]}
                >
                  {formatDate(visit.date)}
                </Text>
              </View>
              <Text
                style={[
                  styles.visitProvider,
                  {
                    color: theme.colors.text.muted,
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.normal,
                    marginBottom: theme.spacing[1],
                  },
                ]}
              >
                Provider: {visit.provider}
              </Text>
              <Text
                style={[
                  styles.visitDiagnosis,
                  {
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.medium,
                    marginBottom: theme.spacing[1],
                  },
                ]}
              >
                {visit.diagnosis}
              </Text>
              <Text
                style={[
                  styles.visitNotes,
                  {
                    color: theme.colors.text.muted,
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.normal,
                    lineHeight: 20,
                  },
                ]}
                numberOfLines={3}
              >
                {visit.notes}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <EmptyState
          title="No visit history"
          description="When visits are recorded, they'll appear here."
        />
      )}
    </Card>
  );

  const renderMedicationsTab = () => (
    <Card>
      <Text
        style={[
          styles.cardTitle,
          {
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSize.lg,
            fontFamily: theme.typography.fontFamily.semibold,
            marginBottom: theme.spacing[4],
          },
        ]}
      >
        Current Medications
      </Text>
      {patient.currentMedications.length > 0 ? (
        <View style={{ gap: theme.spacing[4] }}>
          {patient.currentMedications.map((med, index) => (
            <View
              key={med.id}
              style={[
                styles.medItem,
                {
                  paddingBottom: theme.spacing[4],
                  borderBottomWidth: index < patient.currentMedications.length - 1 ? theme.borderWidth.hairline : 0,
                  borderBottomColor: theme.colors.surface.border,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.medName,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.base,
                      fontFamily: theme.typography.fontFamily.semibold,
                      marginBottom: theme.spacing[1],
                    },
                  ]}
                >
                  {med.name}
                </Text>
                <Text
                  style={[
                    styles.medDosage,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.normal,
                      marginBottom: theme.spacing[1],
                    },
                  ]}
                >
                  {med.dosage} • {med.frequency}
                </Text>
                <Text
                  style={[
                    styles.medPrescribed,
                    {
                      color: theme.colors.text.muted,
                      fontSize: theme.typography.fontSize.xs,
                      fontFamily: theme.typography.fontFamily.normal,
                    },
                  ]}
                >
                  Prescribed: {formatDate(med.prescribedDate)}
                </Text>
              </View>
              <Button
                variant="outline"
                size="sm"
                title="Edit"
                onPress={() => console.log('Edit medication:', med.id)}
              />
            </View>
          ))}
        </View>
      ) : (
        <EmptyState
          title="No active medications"
          description="Medications added for this patient will appear here."
        />
      )}
    </Card>
  );

  const renderVitalsTab = () => (
    <Card>
      <Text
        style={[
          styles.cardTitle,
          {
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSize.lg,
            fontFamily: theme.typography.fontFamily.semibold,
            marginBottom: theme.spacing[4],
          },
        ]}
      >
        Recent Vitals
      </Text>
      {patient.vitals.length > 0 ? (
        <View style={{ gap: theme.spacing[3] }}>
          {patient.vitals.map((vital, index) => (
            <View
              key={vital.id}
              style={[
                styles.vitalItem,
                {
                  paddingBottom: theme.spacing[3],
                  borderBottomWidth: index < patient.vitals.length - 1 ? theme.borderWidth.hairline : 0,
                  borderBottomColor: theme.colors.surface.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.vitalDate,
                  {
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.base,
                    fontFamily: theme.typography.fontFamily.semibold,
                    marginBottom: theme.spacing[1],
                  },
                ]}
              >
                {formatDate(vital.date)}
              </Text>
              <View style={styles.vitalRow}>
                <View style={styles.vitalCol}>
                  <Text
                    style={[
                      styles.vitalLabel,
                      {
                        color: theme.colors.text.muted,
                        fontSize: theme.typography.fontSize.xs,
                        fontFamily: theme.typography.fontFamily.normal,
                      },
                    ]}
                  >
                    BP
                  </Text>
                  <Text
                    style={[
                      styles.vitalValue,
                      {
                        color: theme.colors.text.primary,
                        fontSize: theme.typography.fontSize.sm,
                        fontFamily: theme.typography.fontFamily.medium,
                      },
                    ]}
                  >
                    {vital.bloodPressure}
                  </Text>
                </View>
                <View style={styles.vitalCol}>
                  <Text
                    style={[
                      styles.vitalLabel,
                      {
                        color: theme.colors.text.muted,
                        fontSize: theme.typography.fontSize.xs,
                        fontFamily: theme.typography.fontFamily.normal,
                      },
                    ]}
                  >
                    HR
                  </Text>
                  <Text
                    style={[
                      styles.vitalValue,
                      {
                        color: theme.colors.text.primary,
                        fontSize: theme.typography.fontSize.sm,
                        fontFamily: theme.typography.fontFamily.medium,
                      },
                    ]}
                  >
                    {vital.heartRate}
                  </Text>
                </View>
                <View style={styles.vitalCol}>
                  <Text
                    style={[
                      styles.vitalLabel,
                      {
                        color: theme.colors.text.muted,
                        fontSize: theme.typography.fontSize.xs,
                        fontFamily: theme.typography.fontFamily.normal,
                      },
                    ]}
                  >
                    Temp
                  </Text>
                  <Text
                    style={[
                      styles.vitalValue,
                      {
                        color: theme.colors.text.primary,
                        fontSize: theme.typography.fontSize.sm,
                        fontFamily: theme.typography.fontFamily.medium,
                      },
                    ]}
                  >
                    {vital.temperature}
                  </Text>
                </View>
                <View style={styles.vitalCol}>
                  <Text
                    style={[
                      styles.vitalLabel,
                      {
                        color: theme.colors.text.muted,
                        fontSize: theme.typography.fontSize.xs,
                        fontFamily: theme.typography.fontFamily.normal,
                      },
                    ]}
                  >
                    Weight
                  </Text>
                  <Text
                    style={[
                      styles.vitalValue,
                      {
                        color: theme.colors.text.primary,
                        fontSize: theme.typography.fontSize.sm,
                        fontFamily: theme.typography.fontFamily.medium,
                      },
                    ]}
                  >
                    {vital.weight}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <EmptyState
          title="No vitals recorded"
          description="Vitals recorded for this patient will appear here."
        />
      )}
    </Card>
  );

  const renderCarePlanTab = () => {
    if (patient.carePlan) {
      const statusBadge = getCarePlanStatusBadge(patient.carePlan.status);
      const priorityBadge = getCarePlanPriorityBadge(patient.carePlan.priority);

      return (
        <Card>
          <View style={[styles.carePlanHeader, { marginBottom: theme.spacing[3] }]}>
            <Text
              style={[
                styles.carePlanTitle,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize.lg,
                  fontFamily: theme.typography.fontFamily.semibold,
                },
              ]}
            >
              {patient.carePlan.title}
            </Text>
            <View style={styles.carePlanBadges}>
              <Badge variant={statusBadge}>{patient.carePlan.status}</Badge>
              <Badge variant={priorityBadge}>Priority: {patient.carePlan.priority}</Badge>
            </View>
          </View>

          <Text
            style={[
              styles.carePlanDescription,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.base,
                fontFamily: theme.typography.fontFamily.normal,
                marginBottom: theme.spacing[3],
                lineHeight: 22,
              },
            ]}
          >
            {patient.carePlan.description}
          </Text>

          <View style={{ gap: theme.spacing[2], marginBottom: theme.spacing[4] }}>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
                Progress
              </Text>
              <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.semibold }]}>
                {patient.carePlan.progress}%
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
                Start Date
              </Text>
              <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
                {formatDate(patient.carePlan.startDate)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: theme.colors.text.muted, fontFamily: theme.typography.fontFamily.medium }]}>
                End Date
              </Text>
              <Text style={[styles.value, { color: theme.colors.text.primary, fontFamily: theme.typography.fontFamily.normal }]}>
                {patient.carePlan.endDate ? formatDate(patient.carePlan.endDate) : 'Ongoing'}
              </Text>
            </View>
          </View>

          <View style={{ gap: theme.spacing[2] }}>
            <Button
              variant="primary"
              size="md"
              title="View Full Care Plan"
              onPress={() => console.log('View care plan:', patient.carePlan?.id)}
            />
            <Button
              variant="outline"
              size="md"
              title="Create New Care Plan"
              onPress={() => console.log('Create new care plan for patient:', patient.id)}
            />
          </View>
        </Card>
      );
    }

    return (
      <Card>
        <View style={{ alignItems: 'center', paddingVertical: theme.spacing[6] }}>
          <AlertCircle size={48} color={theme.colors.text.muted} strokeWidth={1.5} style={{ marginBottom: theme.spacing[3] }} />
          <Text
            style={[
              styles.noCarePlanText,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.base,
                fontFamily: theme.typography.fontFamily.medium,
                marginBottom: theme.spacing[4],
                textAlign: 'center',
              },
            ]}
          >
            No active care plan for this patient.
          </Text>
          <Button
            variant="primary"
            size="md"
            title="Create Care Plan"
            onPress={() => console.log('Create care plan for patient:', patient.id)}
          />
        </View>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surface.alt }}>
      <TopBar title={patient.name} showBack />
      <ScrollView
        testID="screen-clinician-patient-detail"
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingBottom: theme.spacing[8] }]}
      >
        <View style={[styles.headerCard, { marginBottom: theme.spacing[4] }]}>
          <Card>
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <Avatar size="lg" initials={patient.avatarInitials} />
                <View style={[styles.headerInfo, { marginLeft: theme.spacing[3] }]}>
                  <Text
                    style={[
                      styles.patientName,
                      {
                        color: theme.colors.text.primary,
                        fontSize: theme.typography.fontSize.xl,
                        fontFamily: theme.typography.fontFamily.bold,
                        marginBottom: theme.spacing[1],
                      },
                    ]}
                  >
                    {patient.name}
                  </Text>
                  <Text
                    style={[
                      styles.patientMeta,
                      {
                        color: theme.colors.text.muted,
                        fontSize: theme.typography.fontSize.sm,
                        fontFamily: theme.typography.fontFamily.normal,
                        marginBottom: theme.spacing[1],
                      },
                    ]}
                  >
                    {patient.age} • {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)} • MRN: {patient.medicalRecordNumber}
                  </Text>
                  <Text
                    style={[
                      styles.patientVisits,
                      {
                        color: theme.colors.text.muted,
                        fontSize: theme.typography.fontSize.xs,
                        fontFamily: theme.typography.fontFamily.normal,
                      },
                    ]}
                  >
                    Last visit: {formatDate(patient.lastVisit)}
                    {patient.nextAppointment && ` • Next: ${formatDate(patient.nextAppointment)}`}
                  </Text>
                </View>
              </View>
              <View style={[styles.headerRight, { marginTop: theme.spacing[3] }]}>
                <Badge variant={careIndicatorBadge.variant}>{careIndicatorBadge.label}</Badge>
              </View>
            </View>
            <View style={[styles.headerActions, { marginTop: theme.spacing[4], gap: theme.spacing[2] }]}>
              <Button
                variant="outline"
                size="sm"
                title="Message"
                leftIcon={<MessageCircle size={16} color={theme.colors.text.primary} />}
                onPress={() => console.log('Message patient:', patient.id)}
              />
              <Button
                variant="outline"
                size="sm"
                title="Schedule"
                leftIcon={<Calendar size={16} color={theme.colors.text.primary} />}
                onPress={() => console.log('Schedule appointment for:', patient.id)}
              />
              <Button
                variant="outline"
                size="sm"
                title="Edit"
                leftIcon={<Edit size={16} color={theme.colors.text.primary} />}
                onPress={() => console.log('Edit patient:', patient.id)}
              />
            </View>
          </Card>
        </View>

        <View style={[styles.tabs, { marginBottom: theme.spacing[4] }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing[2] }}>
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                size="sm"
                title={tab.label}
                onPress={() => setActiveTab(tab.id)}
              />
            ))}
          </ScrollView>
        </View>

        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  headerCard: {},
  headerContent: {
    flexDirection: 'column',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerInfo: {
    flex: 1,
  },
  patientName: {},
  patientMeta: {},
  patientVisits: {},
  headerRight: {
    alignItems: 'flex-start',
  },
  headerActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabs: {},
  cardTitle: {},
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    flex: 1,
  },
  value: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
  },
  visitItem: {},
  visitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  visitType: {},
  visitDate: {},
  visitProvider: {},
  visitDiagnosis: {},
  visitNotes: {},
  medItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  medName: {},
  medDosage: {},
  medPrescribed: {},
  vitalItem: {},
  vitalDate: {},
  vitalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vitalCol: {
    flex: 1,
  },
  vitalLabel: {},
  vitalValue: {},
  carePlanHeader: {},
  carePlanTitle: {},
  carePlanBadges: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  carePlanDescription: {},
  noCarePlanText: {},
});
