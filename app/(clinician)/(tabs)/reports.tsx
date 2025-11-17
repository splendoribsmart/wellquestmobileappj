import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import {
  Button,
  Card,
  Input,
  Badge,
  EmptyState,
  Modal,
  FilterChip,
} from '@components/ui';
import { Picker } from '@react-native-picker/picker';
import {
  Search,
  FileText,
  BarChart3,
  Activity,
  AlertTriangle,
  Users,
  Download,
  Eye,
  RefreshCw,
  Calendar,
  Heart,
  Pill,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react-native';

type ReportType =
  | 'patient_summary'
  | 'care_plan_progress'
  | 'medication_adherence'
  | 'outcome_analysis'
  | 'quality_metrics';

type ReportStatus = 'completed' | 'generating' | 'failed';

interface Report {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  dateGenerated: string;
  generatedBy: string;
  status: ReportStatus;
  fileSize: string;
  patientCount: number;
  timeRange: string;
}

const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  patient_summary: 'Patient Summary',
  care_plan_progress: 'Care Plan Progress',
  medication_adherence: 'Medication Adherence',
  outcome_analysis: 'Outcome Analysis',
  quality_metrics: 'Quality Metrics',
};

const INITIAL_REPORTS: Report[] = [
  {
    id: '1',
    name: 'Monthly Patient Summary - January 2025',
    type: 'patient_summary',
    description: 'Comprehensive overview of all active patients',
    dateGenerated: '2025-01-15T10:30:00Z',
    generatedBy: 'Dr. Sarah Chen',
    status: 'completed',
    fileSize: '2.4 MB',
    patientCount: 156,
    timeRange: 'Last 30 days',
  },
  {
    id: '2',
    name: 'Q4 Care Plan Progress Report',
    type: 'care_plan_progress',
    description: 'Progress tracking for all active care plans',
    dateGenerated: '2025-01-14T14:20:00Z',
    generatedBy: 'Dr. Michael Torres',
    status: 'completed',
    fileSize: '1.8 MB',
    patientCount: 89,
    timeRange: 'Last 90 days',
  },
  {
    id: '3',
    name: 'Weekly Medication Adherence Analysis',
    type: 'medication_adherence',
    description: 'Medication compliance rates and trends',
    dateGenerated: '2025-01-16T09:00:00Z',
    generatedBy: 'Dr. Sarah Chen',
    status: 'generating',
    fileSize: '',
    patientCount: 124,
    timeRange: 'Last 7 days',
  },
  {
    id: '4',
    name: 'Patient Outcomes - High Risk Group',
    type: 'outcome_analysis',
    description: 'Outcome metrics for high-risk patient cohort',
    dateGenerated: '2025-01-13T16:45:00Z',
    generatedBy: 'Dr. Emily Rodriguez',
    status: 'failed',
    fileSize: '',
    patientCount: 42,
    timeRange: 'Last 60 days',
  },
  {
    id: '5',
    name: 'Quality Metrics Dashboard - December',
    type: 'quality_metrics',
    description: 'Practice-wide quality indicators and benchmarks',
    dateGenerated: '2025-01-10T11:15:00Z',
    generatedBy: 'Dr. Michael Torres',
    status: 'completed',
    fileSize: '3.1 MB',
    patientCount: 203,
    timeRange: 'Last 30 days',
  },
  {
    id: '6',
    name: 'Care Plan Effectiveness Study',
    type: 'care_plan_progress',
    description: 'Analysis of care plan outcomes and effectiveness',
    dateGenerated: '2025-01-08T13:30:00Z',
    generatedBy: 'Dr. Sarah Chen',
    status: 'completed',
    fileSize: '2.7 MB',
    patientCount: 78,
    timeRange: 'Last 180 days',
  },
];

export default function ReportsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | ReportType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ReportStatus>('all');
  const [showFilters, setShowFilters] = useState(true);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [reportConfig, setReportConfig] = useState({
    name: '',
    type: '' as ReportType | '',
    startDate: '',
    endDate: '',
    patientScope: 'all' as 'all' | 'active' | 'high_risk',
  });

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        !searchTerm ||
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === 'all' || report.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reports, searchTerm, typeFilter, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: filteredReports.length,
      completed: filteredReports.filter((r) => r.status === 'completed').length,
      generating: filteredReports.filter((r) => r.status === 'generating').length,
      failed: filteredReports.filter((r) => r.status === 'failed').length,
    };
  }, [filteredReports]);

  const typeCounts = useMemo(() => {
    return {
      all: reports.length,
      patient_summary: reports.filter((r) => r.type === 'patient_summary').length,
      care_plan_progress: reports.filter((r) => r.type === 'care_plan_progress').length,
      medication_adherence: reports.filter((r) => r.type === 'medication_adherence').length,
      outcome_analysis: reports.filter((r) => r.type === 'outcome_analysis').length,
      quality_metrics: reports.filter((r) => r.type === 'quality_metrics').length,
    };
  }, [reports]);

  const statusCounts = useMemo(() => {
    return {
      all: reports.length,
      completed: reports.filter((r) => r.status === 'completed').length,
      generating: reports.filter((r) => r.status === 'generating').length,
      failed: reports.filter((r) => r.status === 'failed').length,
    };
  }, [reports]);

  const getReportTypeIcon = (type: ReportType | 'all') => {
    switch (type) {
      case 'patient_summary':
        return Heart;
      case 'care_plan_progress':
        return TrendingUp;
      case 'medication_adherence':
        return Pill;
      case 'outcome_analysis':
        return BarChart3;
      case 'quality_metrics':
        return Activity;
      default:
        return FileText;
    }
  };

  const getStatusIcon = (status: ReportStatus | 'all') => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'generating':
        return Clock;
      case 'failed':
        return XCircle;
      default:
        return FileText;
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
  };

  const hasActiveFilters = searchTerm !== '' || typeFilter !== 'all' || statusFilter !== 'all';

  const handleGenerateReport = () => {
    if (
      !reportConfig.name ||
      !reportConfig.type ||
      !reportConfig.startDate ||
      !reportConfig.endDate
    ) {
      console.warn('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const newReport: Report = {
        id: Date.now().toString(),
        name: reportConfig.name,
        type: reportConfig.type as ReportType,
        description: `Generated report for ${reportConfig.patientScope} patients`,
        dateGenerated: new Date().toISOString(),
        generatedBy: 'Dr. Sarah Chen',
        status: 'generating',
        fileSize: '',
        patientCount: reportConfig.patientScope === 'all' ? 156 : reportConfig.patientScope === 'active' ? 120 : 42,
        timeRange: `${reportConfig.startDate} to ${reportConfig.endDate}`,
      };

      setReports([newReport, ...reports]);
      setIsGenerating(false);
      setIsGenerateModalOpen(false);
      setReportConfig({
        name: '',
        type: '',
        startDate: '',
        endDate: '',
        patientScope: 'all',
      });
    }, 1000);
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeVariant = (status: ReportStatus): 'success' | 'warning' | 'danger' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'generating':
        return 'warning';
      case 'failed':
        return 'danger';
    }
  };

  const renderReportItem = ({ item }: { item: Report }) => (
    <TouchableOpacity
      testID={`reports-item-${item.id}`}
      activeOpacity={0.7}
      style={{ marginBottom: theme.spacing[4] }}
    >
      <Card variant="elevated">
        <View style={{ gap: theme.spacing[3] }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: theme.spacing[3],
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.base,
                fontFamily: theme.typography.fontFamily.semibold,
                color: theme.colors.text.primary,
                flex: 1,
                lineHeight: theme.typography.fontSize.base * 1.5,
              }}
            >
              {item.name}
            </Text>
            <Badge variant={getStatusBadgeVariant(item.status)} size="sm">
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
          </View>

          <View style={{ gap: theme.spacing[2] }}>
            <Badge variant="info" size="sm">
              {REPORT_TYPE_LABELS[item.type]}
            </Badge>
            <Text
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.muted,
                lineHeight: theme.typography.fontSize.xs * 1.5,
              }}
            >
              {formatDate(item.dateGenerated)}
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.muted,
                lineHeight: theme.typography.fontSize.xs * 1.5,
              }}
            >
              Generated by {item.generatedBy}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: theme.spacing[4],
              alignItems: 'center',
              paddingTop: theme.spacing[1],
            }}
          >
            <View style={{ flexDirection: 'row', gap: theme.spacing[2], alignItems: 'center' }}>
              <Users size={14} color={theme.colors.text.muted} />
              <Text
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.muted,
                }}
              >
                {item.patientCount} patients
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: theme.spacing[2], alignItems: 'center' }}>
              <Calendar size={14} color={theme.colors.text.muted} />
              <Text
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.muted,
                }}
              >
                {item.timeRange}
              </Text>
            </View>
          </View>

          {item.status === 'completed' && (
            <View style={{ flexDirection: 'row', gap: theme.spacing[3], marginTop: theme.spacing[2] }}>
              <TouchableOpacity
                onPress={() => console.log('view report', item.id)}
                style={{
                  flex: 1,
                  paddingVertical: theme.spacing[3],
                  paddingHorizontal: theme.spacing[4],
                  backgroundColor: theme.colors.primary.bg,
                  borderRadius: theme.borderRadius.md,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing[2],
                }}
              >
                <Eye size={16} color={theme.colors.primary.fg} />
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.primary.fg,
                  }}
                >
                  View
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('download report', item.id)}
                style={{
                  paddingVertical: theme.spacing[3],
                  paddingHorizontal: theme.spacing[4],
                  backgroundColor: theme.colors.surface.bg,
                  borderRadius: theme.borderRadius.md,
                  borderWidth: theme.borderWidth.thin,
                  borderColor: theme.colors.surface.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing[2],
                }}
              >
                <Download size={16} color={theme.colors.text.primary} />
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.text.primary,
                  }}
                >
                  Download
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {item.status === 'failed' && (
            <View style={{ marginTop: theme.spacing[2] }}>
              <TouchableOpacity
                onPress={() => console.log('retry report', item.id)}
                style={{
                  paddingVertical: theme.spacing[3],
                  paddingHorizontal: theme.spacing[4],
                  backgroundColor: theme.colors.surface.bg,
                  borderRadius: theme.borderRadius.md,
                  borderWidth: theme.borderWidth.thin,
                  borderColor: theme.colors.feedback.danger.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing[2],
                }}
              >
                <RefreshCw size={16} color={theme.colors.feedback.danger.bg} />
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.semibold,
                    color: theme.colors.feedback.danger.bg,
                  }}
                >
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {item.status === 'generating' && (
            <View style={{ marginTop: theme.spacing[2] }}>
              <Badge variant="warning" size="sm">
                Processing...
              </Badge>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View testID="screen-clinician-reports" style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Reports" onMenuPress={handleMenuPress} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        <View style={{ paddingHorizontal: theme.spacing[4], paddingTop: theme.spacing[4] }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: theme.spacing[4],
              paddingBottom: theme.spacing[4],
            }}
          >
            <View style={[styles.statCard, { backgroundColor: theme.colors.surface.bg, borderColor: theme.colors.surface.border }]}>
              <FileText size={24} color={theme.colors.primary.bg} style={{ marginBottom: theme.spacing[2] }} />
              <Text style={[styles.statLabel, { color: theme.colors.text.muted, marginBottom: theme.spacing[1] }]}>
                Total Reports
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                {stats.total}
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.colors.surface.bg, borderColor: theme.colors.surface.border }]}>
              <BarChart3
                size={24}
                color={theme.colors.feedback.success.bg}
                style={{ marginBottom: theme.spacing[2] }}
              />
              <Text style={[styles.statLabel, { color: theme.colors.text.muted, marginBottom: theme.spacing[1] }]}>Completed</Text>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                {stats.completed}
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.colors.surface.bg, borderColor: theme.colors.surface.border }]}>
              <Activity
                size={24}
                color={theme.colors.feedback.warning.bg}
                style={{ marginBottom: theme.spacing[2] }}
              />
              <Text style={[styles.statLabel, { color: theme.colors.text.muted, marginBottom: theme.spacing[1] }]}>
                Generating
              </Text>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                {stats.generating}
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.colors.surface.bg, borderColor: theme.colors.surface.border }]}>
              <AlertTriangle
                size={24}
                color={theme.colors.feedback.danger.bg}
                style={{ marginBottom: theme.spacing[2] }}
              />
              <Text style={[styles.statLabel, { color: theme.colors.text.muted, marginBottom: theme.spacing[1] }]}>Failed</Text>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                {stats.failed}
              </Text>
            </View>
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: theme.spacing[4], marginBottom: theme.spacing[5] }}>
          <Button
            onPress={() => setIsGenerateModalOpen(true)}
            variant="primary"
            size="md"
            title="Generate New Report"
          />
        </View>

        <View style={{ paddingHorizontal: theme.spacing[4], marginBottom: theme.spacing[5] }}>
          <View style={{ gap: theme.spacing[4] }}>
            <Input
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search reports by name or creator..."
              leftIcon={<Search size={18} color={theme.colors.text.muted} />}
            />

            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              activeOpacity={0.7}
              style={{ alignSelf: 'flex-start' }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontFamily: theme.typography.fontFamily.semibold,
                  color: theme.colors.primary.bg,
                }}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Text>
            </TouchableOpacity>

            {showFilters && (
              <View style={{ gap: theme.spacing[4] }}>
                <View style={{ gap: theme.spacing[2] }}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.semibold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    Report Type
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      gap: theme.spacing[2],
                      paddingVertical: theme.spacing[1],
                    }}
                  >
                    <FilterChip
                      label="All Types"
                      isSelected={typeFilter === 'all'}
                      onPress={() => setTypeFilter('all')}
                      icon={
                        <FileText
                          size={14}
                          color={typeFilter === 'all' ? '#FFFFFF' : theme.colors.primary.bg}
                        />
                      }
                      count={typeCounts.all}
                    />
                    <FilterChip
                      label="Patient Summary"
                      isSelected={typeFilter === 'patient_summary'}
                      onPress={() => setTypeFilter('patient_summary')}
                      icon={
                        <Heart
                          size={14}
                          color={typeFilter === 'patient_summary' ? '#FFFFFF' : theme.colors.secondary.bg}
                        />
                      }
                      count={typeCounts.patient_summary}
                    />
                    <FilterChip
                      label="Care Plan"
                      isSelected={typeFilter === 'care_plan_progress'}
                      onPress={() => setTypeFilter('care_plan_progress')}
                      icon={
                        <TrendingUp
                          size={14}
                          color={typeFilter === 'care_plan_progress' ? '#FFFFFF' : theme.colors.feedback.success.bg}
                        />
                      }
                      count={typeCounts.care_plan_progress}
                    />
                    <FilterChip
                      label="Medication"
                      isSelected={typeFilter === 'medication_adherence'}
                      onPress={() => setTypeFilter('medication_adherence')}
                      icon={
                        <Pill
                          size={14}
                          color={typeFilter === 'medication_adherence' ? '#FFFFFF' : theme.colors.feedback.warning.bg}
                        />
                      }
                      count={typeCounts.medication_adherence}
                    />
                    <FilterChip
                      label="Outcomes"
                      isSelected={typeFilter === 'outcome_analysis'}
                      onPress={() => setTypeFilter('outcome_analysis')}
                      icon={
                        <BarChart3
                          size={14}
                          color={typeFilter === 'outcome_analysis' ? '#FFFFFF' : theme.colors.primary.bg}
                        />
                      }
                      count={typeCounts.outcome_analysis}
                    />
                    <FilterChip
                      label="Quality Metrics"
                      isSelected={typeFilter === 'quality_metrics'}
                      onPress={() => setTypeFilter('quality_metrics')}
                      icon={
                        <Activity
                          size={14}
                          color={typeFilter === 'quality_metrics' ? '#FFFFFF' : theme.colors.secondary.bg}
                        />
                      }
                      count={typeCounts.quality_metrics}
                    />
                  </ScrollView>
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
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      gap: theme.spacing[2],
                      paddingVertical: theme.spacing[1],
                    }}
                  >
                    <FilterChip
                      label="All Statuses"
                      isSelected={statusFilter === 'all'}
                      onPress={() => setStatusFilter('all')}
                      icon={
                        <FileText
                          size={14}
                          color={statusFilter === 'all' ? '#FFFFFF' : theme.colors.text.primary}
                        />
                      }
                      count={statusCounts.all}
                    />
                    <FilterChip
                      label="Completed"
                      isSelected={statusFilter === 'completed'}
                      onPress={() => setStatusFilter('completed')}
                      icon={
                        <CheckCircle2
                          size={14}
                          color={statusFilter === 'completed' ? '#FFFFFF' : theme.colors.feedback.success.bg}
                        />
                      }
                      count={statusCounts.completed}
                    />
                    <FilterChip
                      label="Generating"
                      isSelected={statusFilter === 'generating'}
                      onPress={() => setStatusFilter('generating')}
                      icon={
                        <Clock
                          size={14}
                          color={statusFilter === 'generating' ? '#FFFFFF' : theme.colors.feedback.warning.bg}
                        />
                      }
                      count={statusCounts.generating}
                    />
                    <FilterChip
                      label="Failed"
                      isSelected={statusFilter === 'failed'}
                      onPress={() => setStatusFilter('failed')}
                      icon={
                        <XCircle
                          size={14}
                          color={statusFilter === 'failed' ? '#FFFFFF' : theme.colors.feedback.danger.bg}
                        />
                      }
                      count={statusCounts.failed}
                    />
                  </ScrollView>
                </View>
              </View>
            )}

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
                {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
              </Text>
              {hasActiveFilters && (
                <TouchableOpacity onPress={clearFilters} activeOpacity={0.7}>
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.semibold,
                      color: theme.colors.primary.bg,
                    }}
                  >
                    Clear Filters
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: theme.spacing[4], paddingBottom: theme.spacing[6] }}>
          {filteredReports.length === 0 ? (
            <EmptyState
              title="No reports found"
              description="Try adjusting your search or filters."
              actionLabel="Clear Filters"
              onAction={clearFilters}
            />
          ) : (
            <FlatList
              testID="reports-list"
              data={filteredReports}
              renderItem={renderReportItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate New Report"
      >
        <View style={{ gap: theme.spacing[5] }}>
          <View style={{ gap: theme.spacing[3] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontFamily: theme.typography.fontFamily.semibold,
                color: theme.colors.text.primary,
              }}
            >
              Report Name *
            </Text>
            <Input
              value={reportConfig.name}
              onChangeText={(text) => setReportConfig({ ...reportConfig, name: text })}
              placeholder="e.g., Monthly Patient Summary"
            />
          </View>

          <View style={{ gap: theme.spacing[3] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontFamily: theme.typography.fontFamily.semibold,
                color: theme.colors.text.primary,
              }}
            >
              Report Type *
            </Text>
            <View
              style={{
                borderWidth: theme.borderWidth.thin,
                borderColor: theme.colors.surface.border,
                borderRadius: theme.borderRadius.md,
                overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={reportConfig.type}
                onValueChange={(value) =>
                  setReportConfig({ ...reportConfig, type: value as ReportType })
                }
                style={{ height: 50 }}
              >
                <Picker.Item label="Select type..." value="" />
                <Picker.Item label="Patient Summary" value="patient_summary" />
                <Picker.Item label="Care Plan Progress" value="care_plan_progress" />
                <Picker.Item label="Medication Adherence" value="medication_adherence" />
                <Picker.Item label="Outcome Analysis" value="outcome_analysis" />
                <Picker.Item label="Quality Metrics" value="quality_metrics" />
              </Picker>
            </View>
          </View>

          <View style={{ gap: theme.spacing[4] }}>
            <View style={{ gap: theme.spacing[3] }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontFamily: theme.typography.fontFamily.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                Start Date *
              </Text>
              <Input
                value={reportConfig.startDate}
                onChangeText={(text) => setReportConfig({ ...reportConfig, startDate: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={{ gap: theme.spacing[3] }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontFamily: theme.typography.fontFamily.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                End Date *
              </Text>
              <Input
                value={reportConfig.endDate}
                onChangeText={(text) => setReportConfig({ ...reportConfig, endDate: text })}
                placeholder="YYYY-MM-DD"
              />
            </View>
          </View>

          <View style={{ gap: theme.spacing[3] }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontFamily: theme.typography.fontFamily.semibold,
                color: theme.colors.text.primary,
              }}
            >
              Include Patients
            </Text>
            <View
              style={{
                borderWidth: theme.borderWidth.thin,
                borderColor: theme.colors.surface.border,
                borderRadius: theme.borderRadius.md,
                overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={reportConfig.patientScope}
                onValueChange={(value) =>
                  setReportConfig({
                    ...reportConfig,
                    patientScope: value as 'all' | 'active' | 'high_risk',
                  })
                }
                style={{ height: 50 }}
              >
                <Picker.Item label="All My Patients" value="all" />
                <Picker.Item label="Active Only" value="active" />
                <Picker.Item label="High Risk" value="high_risk" />
              </Picker>
            </View>
          </View>

          <Card variant="bordered">
            <View style={{ gap: theme.spacing[3] }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontFamily: theme.typography.fontFamily.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                Preview
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.muted,
                  lineHeight: theme.typography.fontSize.sm * 1.6,
                }}
              >
                <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>
                  Report Type:{' '}
                </Text>
                {reportConfig.type ? REPORT_TYPE_LABELS[reportConfig.type] : 'Not selected'}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.muted,
                  lineHeight: theme.typography.fontSize.sm * 1.6,
                }}
              >
                <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>Period: </Text>
                {reportConfig.startDate || 'Start'} – {reportConfig.endDate || 'End'}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.muted,
                  lineHeight: theme.typography.fontSize.sm * 1.6,
                }}
              >
                <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>
                  Patients:{' '}
                </Text>
                {reportConfig.patientScope === 'all'
                  ? 'All My Patients'
                  : reportConfig.patientScope === 'active'
                    ? 'Active Only'
                    : 'High Risk'}
              </Text>
            </View>
          </Card>

          <View style={{ flexDirection: 'row', gap: theme.spacing[3], marginTop: theme.spacing[2] }}>
            <View style={{ flex: 1 }}>
              <Button
                onPress={() => setIsGenerateModalOpen(false)}
                variant="outline"
                size="md"
                title="Cancel"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                onPress={handleGenerateReport}
                variant="primary"
                size="md"
                title="Generate"
                isLoading={isGenerating}
                disabled={
                  !reportConfig.name ||
                  !reportConfig.type ||
                  !reportConfig.startDate ||
                  !reportConfig.endDate
                }
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  statCard: {
    minWidth: 140,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
});
