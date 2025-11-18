import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import {
  Card,
  Badge,
  Button,
  Input,
  TextArea,
  Tabs,
  Banner,
  EmptyState,
} from '@components/ui';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import {
  MessageSquare,
  Clock,
  Mail,
  Phone,
  MessageCircle,
  Star,
} from 'lucide-react-native';

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdated: string;
  assignedTo?: string;
  description?: string;
}

const CATEGORIES = [
  'Clinical Tools',
  'Patient Management',
  'Technical Issue',
  'EMR Integration',
  'Billing Support',
  'Feature Request',
];

const PRIORITIES = ['low', 'medium', 'high'] as const;

const FEEDBACK_TYPES = [
  'General Feedback',
  'Feature Suggestion',
  'Clinical Workflow',
  'App Experience',
  'Complaint',
];

const INITIAL_MOCK_TICKETS: SupportTicket[] = [
  {
    id: '1',
    subject: 'Patient dashboard not loading vitals',
    category: 'Clinical Tools',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2025-11-10T10:30:00Z',
    lastUpdated: '2025-11-12T14:20:00Z',
    assignedTo: 'Technical Support',
    description: 'Unable to view patient vital signs in the dashboard for the last 3 days',
  },
  {
    id: '2',
    subject: 'EMR export format issue',
    category: 'EMR Integration',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2025-11-08T09:15:00Z',
    lastUpdated: '2025-11-09T16:45:00Z',
    assignedTo: 'Integration Team',
    description: 'Exported patient records missing medication history section',
  },
  {
    id: '3',
    subject: 'Request for batch patient messaging feature',
    category: 'Feature Request',
    status: 'open',
    priority: 'low',
    createdAt: '2025-11-15T08:00:00Z',
    lastUpdated: '2025-11-15T08:00:00Z',
    description: 'Would like ability to send care reminders to multiple patients at once',
  },
];

export default function SupportScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState<'new' | 'tickets' | 'feedback'>('new');
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(INITIAL_MOCK_TICKETS);

  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: CATEGORIES[0],
    priority: 'medium' as 'low' | 'medium' | 'high',
    description: '',
  });

  const [feedbackForm, setFeedbackForm] = useState({
    type: FEEDBACK_TYPES[0],
    rating: 3,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketError, setTicketError] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const clearTicketForm = () => {
    setTicketForm({
      subject: '',
      category: CATEGORIES[0],
      priority: 'medium',
      description: '',
    });
    setTicketError('');
  };

  const clearFeedbackForm = () => {
    setFeedbackForm({
      type: FEEDBACK_TYPES[0],
      rating: 3,
      message: '',
    });
    setFeedbackError('');
    setFeedbackSuccess(false);
  };

  const handleSubmitTicket = () => {
    if (!ticketForm.subject.trim() || !ticketForm.description.trim()) {
      setTicketError('Please provide both a subject and description for your ticket.');
      return;
    }

    setIsSubmitting(true);
    setTicketError('');

    setTimeout(() => {
      const newTicket: SupportTicket = {
        id: Date.now().toString(),
        subject: ticketForm.subject,
        category: ticketForm.category,
        priority: ticketForm.priority,
        status: 'open',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        description: ticketForm.description,
      };

      setSupportTickets([newTicket, ...supportTickets]);
      clearTicketForm();
      setIsSubmitting(false);
      setActiveTab('tickets');
    }, 1000);
  };

  const handleSubmitFeedback = () => {
    if (!feedbackForm.message.trim()) {
      setFeedbackError('Please provide a message with your feedback.');
      return;
    }

    setIsSubmitting(true);
    setFeedbackError('');

    setTimeout(() => {
      setFeedbackSuccess(true);
      clearFeedbackForm();
      setIsSubmitting(false);
    }, 1000);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadgeVariant = (
    status: string
  ): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    switch (status) {
      case 'open':
        return 'info';
      case 'in_progress':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'closed':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  const getPriorityBadgeVariant = (
    priority: string
  ): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'neutral';
    }
  };

  const tabs = [
    { key: 'new', label: 'New Ticket' },
    { key: 'tickets', label: 'My Tickets' },
    { key: 'feedback', label: 'Feedback' },
  ];

  const renderNewTicketTab = () => (
    <Card>
      {ticketError && (
        <View style={{ marginBottom: theme.spacing[4] }}>
          <Banner
            variant="danger"
            title="Error"
            description={ticketError}
            onClose={() => setTicketError('')}
          />
        </View>
      )}

      <View style={{ gap: theme.spacing[4] }}>
        <View>
          <Text style={[styles.label, { color: colors.text }]}>Subject *</Text>
          <Input
            value={ticketForm.subject}
            onChangeText={(text) => setTicketForm({ ...ticketForm, subject: text })}
            placeholder="Brief description of your issue"
          />
        </View>

        <View>
          <Text style={[styles.label, { color: colors.text }]}>Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: theme.spacing[2] }}
            contentContainerStyle={{ gap: theme.spacing[2] }}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setTicketForm({ ...ticketForm, category: cat })}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      ticketForm.category === cat
                        ? theme.colors.primary.bg
                        : theme.colors.surface.alt,
                    borderWidth: 1,
                    borderColor:
                      ticketForm.category === cat
                        ? theme.colors.primary.border
                        : theme.colors.surface.border,
                    paddingVertical: theme.spacing[2],
                    paddingHorizontal: theme.spacing[3],
                    borderRadius: theme.borderRadius.md,
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      ticketForm.category === cat
                        ? theme.colors.surface.bg
                        : theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.medium,
                  }}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={[styles.label, { color: colors.text }]}>Priority</Text>
          <View style={styles.priorityContainer}>
            {PRIORITIES.map((priority) => (
              <TouchableOpacity
                key={priority}
                onPress={() => setTicketForm({ ...ticketForm, priority })}
                style={[
                  styles.priorityButton,
                  {
                    flex: 1,
                    backgroundColor:
                      ticketForm.priority === priority
                        ? theme.colors.primary.bg
                        : theme.colors.surface.alt,
                    borderWidth: 1,
                    borderColor:
                      ticketForm.priority === priority
                        ? theme.colors.primary.border
                        : theme.colors.surface.border,
                    paddingVertical: theme.spacing[3],
                    borderRadius: theme.borderRadius.md,
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      ticketForm.priority === priority
                        ? theme.colors.surface.bg
                        : theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.semibold,
                    textAlign: 'center',
                    textTransform: 'capitalize',
                  }}
                >
                  {priority}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text style={[styles.label, { color: colors.text }]}>Description *</Text>
          <TextArea
            value={ticketForm.description}
            onChangeText={(text) => setTicketForm({ ...ticketForm, description: text })}
            placeholder="Please provide details about your issue..."
            minHeight={120}
          />
        </View>

        <View style={styles.buttonRow}>
          <View style={{ flex: 1 }}>
            <Button variant="secondary" onPress={clearTicketForm} disabled={isSubmitting}>
              Clear
            </Button>
          </View>
          <View style={{ width: theme.spacing[3] }} />
          <View style={{ flex: 1 }}>
            <Button variant="primary" onPress={handleSubmitTicket} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderMyTicketsTab = () => {
    if (supportTickets.length === 0) {
      return (
        <View style={{ paddingVertical: theme.spacing[8] }}>
          <EmptyState
            icon={<MessageSquare size={48} color={colors.textSecondary} />}
            title="No tickets yet"
            description="You haven't created any support tickets."
            actionLabel="Create Ticket"
            onAction={() => setActiveTab('new')}
          />
        </View>
      );
    }

    return (
      <View style={{ gap: theme.spacing[3] }}>
        {supportTickets.map((ticket) => (
          <Card key={ticket.id}>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.ticketHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.ticketSubject, { color: colors.text }]}>
                    {ticket.subject}
                  </Text>
                </View>
                <View style={styles.badgeRow}>
                  <Badge variant={getStatusBadgeVariant(ticket.status)} size="sm">
                    {ticket.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge variant={getPriorityBadgeVariant(ticket.priority)} size="sm">
                    {ticket.priority.toUpperCase()}
                  </Badge>
                </View>
              </View>

              <View style={{ gap: theme.spacing[1] }}>
                <Text style={[styles.ticketMeta, { color: colors.textSecondary }]}>
                  <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>
                    Ticket ID:
                  </Text>{' '}
                  #{ticket.id}
                </Text>
                <Text style={[styles.ticketMeta, { color: colors.textSecondary }]}>
                  <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>
                    Category:
                  </Text>{' '}
                  {ticket.category}
                </Text>
                <Text style={[styles.ticketMeta, { color: colors.textSecondary }]}>
                  <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>
                    Created:
                  </Text>{' '}
                  {formatDate(ticket.createdAt)}
                </Text>
                <Text style={[styles.ticketMeta, { color: colors.textSecondary }]}>
                  <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>
                    Last Updated:
                  </Text>{' '}
                  {formatDate(ticket.lastUpdated)}
                </Text>
                {ticket.assignedTo && (
                  <Text style={[styles.ticketMeta, { color: colors.textSecondary }]}>
                    <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>
                      Assigned To:
                    </Text>{' '}
                    {ticket.assignedTo}
                  </Text>
                )}
              </View>

              {ticket.description && (
                <Text style={[styles.ticketDescription, { color: colors.textSecondary }]}>
                  {ticket.description}
                </Text>
              )}

              <Button variant="secondary" size="sm" onPress={() => {}}>
                View Details
              </Button>
            </View>
          </Card>
        ))}
      </View>
    );
  };

  const renderFeedbackTab = () => (
    <Card>
      {feedbackError && (
        <View style={{ marginBottom: theme.spacing[4] }}>
          <Banner
            variant="danger"
            title="Error"
            description={feedbackError}
            onClose={() => setFeedbackError('')}
          />
        </View>
      )}

      {feedbackSuccess && (
        <View style={{ marginBottom: theme.spacing[4] }}>
          <Banner
            variant="success"
            title="Thank you for your feedback!"
            description="Your feedback helps us improve our clinical tools and services."
            onClose={() => setFeedbackSuccess(false)}
          />
        </View>
      )}

      <View style={{ gap: theme.spacing[4] }}>
        <View>
          <Text style={[styles.label, { color: colors.text }]}>Feedback Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: theme.spacing[2] }}
            contentContainerStyle={{ gap: theme.spacing[2] }}
          >
            {FEEDBACK_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setFeedbackForm({ ...feedbackForm, type })}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      feedbackForm.type === type
                        ? theme.colors.primary.bg
                        : theme.colors.surface.alt,
                    borderWidth: 1,
                    borderColor:
                      feedbackForm.type === type
                        ? theme.colors.primary.border
                        : theme.colors.surface.border,
                    paddingVertical: theme.spacing[2],
                    paddingHorizontal: theme.spacing[3],
                    borderRadius: theme.borderRadius.md,
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      feedbackForm.type === type
                        ? theme.colors.surface.bg
                        : theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.medium,
                  }}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={[styles.label, { color: colors.text }]}>
            Rating: {feedbackForm.rating}/5
          </Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                style={{ padding: theme.spacing[1] }}
              >
                <Star
                  size={32}
                  color={theme.colors.feedback.warning.bg}
                  fill={star <= feedbackForm.rating ? theme.colors.feedback.warning.bg : 'none'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <Text style={[styles.label, { color: colors.text }]}>Message *</Text>
          <TextArea
            value={feedbackForm.message}
            onChangeText={(text) => setFeedbackForm({ ...feedbackForm, message: text })}
            placeholder="Share your thoughts, suggestions, or concerns about clinical tools..."
            minHeight={120}
          />
        </View>

        <View style={styles.buttonRow}>
          <View style={{ flex: 1 }}>
            <Button variant="secondary" onPress={clearFeedbackForm} disabled={isSubmitting}>
              Clear
            </Button>
          </View>
          <View style={{ width: theme.spacing[3] }} />
          <View style={{ flex: 1 }}>
            <Button variant="primary" onPress={handleSubmitFeedback} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View
      testID="screen-clinician-support"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="Support & Feedback" onMenuPress={handleMenuPress} />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4] }}
        >
          <Card>
            <View style={{ gap: theme.spacing[2] }}>
              <View style={styles.headerRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.headerTitle, { color: colors.text }]}>
                    Support & Feedback
                  </Text>
                  <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                    Get help with clinical tools or share your feedback
                  </Text>
                </View>
                <Badge variant="primary" size="sm">
                  Clinician
                </Badge>
              </View>
            </View>
          </Card>

          <View style={{ marginTop: theme.spacing[4], marginBottom: theme.spacing[3] }}>
            <Tabs tabs={tabs} activeKey={activeTab} onChange={(key) => setActiveTab(key as any)} />
          </View>

          <View style={{ marginBottom: theme.spacing[4] }}>
            {activeTab === 'new' && renderNewTicketTab()}
            {activeTab === 'tickets' && renderMyTicketsTab()}
            {activeTab === 'feedback' && renderFeedbackTab()}
          </View>

          <Card>
            <View style={{ gap: theme.spacing[4] }}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Support</Text>

              <View style={{ gap: theme.spacing[2] }}>
                <Button
                  variant="secondary"
                  onPress={() => console.log('Email support')}
                  leftIcon={<Mail size={20} color={colors.primary} />}
                >
                  Email Support
                </Button>
                <Button
                  variant="secondary"
                  onPress={() => console.log('Call support')}
                  leftIcon={<Phone size={20} color={colors.primary} />}
                >
                  Call Support
                </Button>
                <Button
                  variant="secondary"
                  onPress={() => console.log('Live chat')}
                  leftIcon={<MessageCircle size={20} color={colors.primary} />}
                >
                  Live Chat
                </Button>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: theme.colors.surface.border,
                  marginVertical: theme.spacing[2],
                }}
              />

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Support Hours</Text>
                <View style={{ gap: theme.spacing[2], marginTop: theme.spacing[3] }}>
                  <View style={styles.infoRow}>
                    <MessageCircle size={16} color={colors.textSecondary} />
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                      <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>
                        Live Chat:
                      </Text>{' '}
                      24/7
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Mail size={16} color={colors.textSecondary} />
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                      <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>
                        Email:
                      </Text>{' '}
                      24/7
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Phone size={16} color={colors.textSecondary} />
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                      <Text style={{ fontFamily: theme.typography.fontFamily.semibold }}>
                        Phone:
                      </Text>{' '}
                      Mon–Fri, 7 AM – 9 PM
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: theme.colors.surface.border,
                  marginVertical: theme.spacing[2],
                }}
              />

              <View>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Response Times</Text>
                <View style={{ gap: theme.spacing[3], marginTop: theme.spacing[3] }}>
                  <View style={styles.responseRow}>
                    <View style={{ flex: 1 }}>
                      <Badge variant="danger" size="sm">
                        High Priority
                      </Badge>
                    </View>
                    <View style={styles.timeContainer}>
                      <Clock size={14} color={colors.textSecondary} />
                      <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                        Within 2 hours
                      </Text>
                    </View>
                  </View>
                  <View style={styles.responseRow}>
                    <View style={{ flex: 1 }}>
                      <Badge variant="warning" size="sm">
                        Medium Priority
                      </Badge>
                    </View>
                    <View style={styles.timeContainer}>
                      <Clock size={14} color={colors.textSecondary} />
                      <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                        Within 12 hours
                      </Text>
                    </View>
                  </View>
                  <View style={styles.responseRow}>
                    <View style={{ flex: 1 }}>
                      <Badge variant="success" size="sm">
                        Low Priority
                      </Badge>
                    </View>
                    <View style={styles.timeContainer}>
                      <Clock size={14} color={colors.textSecondary} />
                      <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                        Within 24 hours
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryButton: {
    flexShrink: 0,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  priorityButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  ticketSubject: {
    fontSize: 16,
    fontWeight: '700',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  ticketMeta: {
    fontSize: 13,
  },
  ticketDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 14,
  },
  responseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 13,
  },
});
