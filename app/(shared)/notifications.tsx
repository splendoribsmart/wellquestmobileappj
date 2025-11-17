import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useState, useMemo } from 'react';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Badge, Button, Input, EmptyState } from '@components/ui';
import { Bell, Clock, Trash2, CheckCircle } from 'lucide-react-native';

type NotificationType = 'info' | 'success' | 'warning' | 'error';
type NotificationCategory = 'appointment' | 'medication' | 'test_result' | 'care_plan' | 'system';

interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: '1',
    title: 'Upcoming Appointment',
    message: 'You have an appointment with Dr. Smith tomorrow at 2:00 PM',
    type: 'info',
    category: 'appointment',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Medication Reminder',
    message: 'Time to take your blood pressure medication',
    type: 'warning',
    category: 'medication',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Lab Results Available',
    message: 'Your recent blood work results are now available for review',
    type: 'success',
    category: 'test_result',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Care Plan Updated',
    message: 'Your care plan has been updated by your healthcare team',
    type: 'info',
    category: 'care_plan',
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'System Maintenance Scheduled',
    message: 'The platform will undergo maintenance this Sunday from 2-4 AM',
    type: 'warning',
    category: 'system',
    read: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '6',
    title: 'Appointment Confirmed',
    message: 'Your appointment request for next week has been confirmed',
    type: 'success',
    category: 'appointment',
    read: true,
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    title: 'Refill Needed',
    message: 'You have 3 days of medication remaining. Request a refill soon.',
    type: 'error',
    category: 'medication',
    read: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

type FilterType = 'all' | 'unread' | 'appointment' | 'medication' | 'care_plan' | 'system';

export default function NotificationsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = useMemo(() => {
    let result = [...notifications];

    if (filter === 'unread') {
      result = result.filter((n) => !n.read);
    } else if (filter !== 'all') {
      result = result.filter((n) => n.category === filter);
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(searchLower) ||
          n.message.toLowerCase().includes(searchLower)
      );
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [notifications, filter, searchTerm]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return diffMins <= 1 ? 'Just now' : `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getTypeBadgeVariant = (
    type: NotificationType
  ): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'danger';
      case 'info':
      default:
        return 'info';
    }
  };

  const getCategoryLabel = (category: NotificationCategory) => {
    switch (category) {
      case 'appointment':
        return 'Appointment';
      case 'medication':
        return 'Medication';
      case 'test_result':
        return 'Test Result';
      case 'care_plan':
        return 'Care Plan';
      case 'system':
        return 'System';
    }
  };

  const filters: Array<{ key: FilterType; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread' },
    { key: 'appointment', label: 'Appointments' },
    { key: 'medication', label: 'Medications' },
    { key: 'care_plan', label: 'Care Plans' },
    { key: 'system', label: 'System' },
  ];

  const renderNotificationCard = ({ item }: { item: AppNotification }) => {
    const isUnread = !item.read;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isUnread) {
            markAsRead(item.id);
          }
        }}
        activeOpacity={0.7}
      >
        <View
          style={[
            isUnread && {
              backgroundColor: `${theme.colors.primary.bg}08`,
              borderLeftWidth: 3,
              borderLeftColor: theme.colors.primary.bg,
              borderRadius: theme.borderRadius.lg,
            },
          ]}
        >
          <Card>
            <View style={{ gap: theme.spacing[3] }}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text
                      style={[
                        styles.notificationTitle,
                        { color: colors.text },
                        isUnread && { fontFamily: theme.typography.fontFamily.bold },
                      ]}
                    >
                      {item.title}
                    </Text>
                    {isUnread && (
                      <Badge variant="primary" size="sm">
                        New
                      </Badge>
                    )}
                  </View>
                  <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>
                    {item.message}
                  </Text>
                </View>
              </View>

              <View style={styles.metadataRow}>
                <View style={styles.timeContainer}>
                  <Clock size={14} color={colors.textSecondary} />
                  <Text style={[styles.timeText, { color: colors.textSecondary }]}>
                    {getRelativeTime(item.createdAt)}
                  </Text>
                </View>
                <Badge variant={getTypeBadgeVariant(item.type)} size="sm">
                  {item.type.toUpperCase()}
                </Badge>
                <Badge variant="neutral" size="sm">
                  {getCategoryLabel(item.category)}
                </Badge>
              </View>

              <View style={styles.actionsRow}>
                {isUnread && (
                  <View style={{ flex: 1 }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onPress={() => markAsRead(item.id)}
                      leftIcon={<CheckCircle size={16} color={colors.primary} />}
                    >
                      Mark as Read
                    </Button>
                  </View>
                )}
                <View style={{ flex: 1, marginLeft: isUnread ? theme.spacing[2] : 0 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => deleteNotification(item.id)}
                    leftIcon={<Trash2 size={16} color={colors.textSecondary} />}
                  >
                    Delete
                  </Button>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      testID="screen-notifications"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="Notifications" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={{ padding: theme.spacing[4], gap: theme.spacing[4] }}>
            <Card>
              <View style={{ gap: theme.spacing[2] }}>
                <View style={styles.headerRow}>
                  <Bell size={24} color={theme.colors.primary.bg} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>
                      Notifications
                    </Text>
                    <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                      View reminders, alerts, and updates related to your care.
                    </Text>
                  </View>
                  {unreadCount > 0 && (
                    <Badge variant="danger" size="md">
                      {unreadCount} unread
                    </Badge>
                  )}
                </View>
              </View>
            </Card>

            <Card>
              <View style={{ gap: theme.spacing[3] }}>
                <Input
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  placeholder="Search notifications..."
                />

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: theme.spacing[2] }}
                >
                  {filters.map((f) => (
                    <TouchableOpacity
                      key={f.key}
                      onPress={() => setFilter(f.key)}
                      style={[
                        styles.filterButton,
                        {
                          backgroundColor:
                            filter === f.key ? theme.colors.primary.bg : theme.colors.surface.alt,
                          borderWidth: 1,
                          borderColor:
                            filter === f.key
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
                            filter === f.key ? theme.colors.surface.bg : theme.colors.text.primary,
                          fontSize: theme.typography.fontSize.sm,
                          fontFamily: theme.typography.fontFamily.semibold,
                        }}
                      >
                        {f.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Card>
          </View>

          {filteredNotifications.length === 0 ? (
            <View style={{ padding: theme.spacing[4] }}>
              <EmptyState
                icon={<Bell size={48} color={colors.textSecondary} />}
                title="No notifications"
                description="Try adjusting your filters or check back later."
              />
            </View>
          ) : (
            <FlatList
              data={filteredNotifications}
              renderItem={renderNotificationCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingHorizontal: theme.spacing[4],
                paddingBottom: theme.spacing[4],
                gap: theme.spacing[3],
              }}
            />
          )}

          {notifications.length > 0 && (
            <View style={{ padding: theme.spacing[4] }}>
              <Card>
                <View style={{ gap: theme.spacing[3] }}>
                  <Text style={[styles.bulkActionsText, { color: colors.textSecondary }]}>
                    {notifications.length} total • {unreadCount} unread
                  </Text>
                  <View style={styles.bulkActionsRow}>
                    <View style={{ flex: 1 }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onPress={markAllAsRead}
                        disabled={unreadCount === 0}
                      >
                        Mark All as Read
                      </Button>
                    </View>
                    <View style={{ width: theme.spacing[2] }} />
                    <View style={{ flex: 1 }}>
                      <Button variant="danger" size="sm" onPress={clearAll}>
                        Clear All
                      </Button>
                    </View>
                  </View>
                </View>
              </Card>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  filterButton: {
    flexShrink: 0,
  },
  notificationCard: {
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 4,
  },
  timeText: {
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  bulkActionsText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  bulkActionsRow: {
    flexDirection: 'row',
  },
});
