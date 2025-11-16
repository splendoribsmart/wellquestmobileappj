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
  Switch,
  Banner,
} from '@components/ui';
import {
  MapPin,
  Trash2,
} from 'lucide-react-native';

type TabKey = 'profile' | 'notifications' | 'security' | 'privacy' | 'preferences';

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

interface NotificationPrefs {
  emailCarePlan: boolean;
  emailAppointments: boolean;
  emailMedications: boolean;
  emailSystem: boolean;
  pushUrgent: boolean;
  pushAppointments: boolean;
  pushMessages: boolean;
}

interface SecurityForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

interface Preferences {
  language: string;
  timezone: string;
  dateFormat: string;
  showTips: boolean;
  autoSave: boolean;
  keyboardShortcuts: boolean;
}

const INITIAL_PROFILE: ProfileForm = {
  firstName: 'Demo',
  lastName: 'Patient',
  email: 'patient@wellquestpro.com',
  phone: '(555) 123-4567',
  bio: 'Managing my health journey with WellQuestPRO.',
};

const INITIAL_NOTIFICATIONS: NotificationPrefs = {
  emailCarePlan: true,
  emailAppointments: true,
  emailMedications: true,
  emailSystem: false,
  pushUrgent: true,
  pushAppointments: true,
  pushMessages: false,
};

const INITIAL_SESSIONS: Session[] = [
  {
    id: '1',
    device: 'iPhone 14 Pro',
    location: 'New York, NY',
    lastActive: 'Active now',
    isCurrent: true,
  },
  {
    id: '2',
    device: 'MacBook Pro',
    location: 'New York, NY',
    lastActive: '2 hours ago',
    isCurrent: false,
  },
];

const INITIAL_PREFERENCES: Preferences = {
  language: 'English',
  timezone: 'ET',
  dateFormat: 'MM/DD/YYYY',
  showTips: true,
  autoSave: true,
  keyboardShortcuts: false,
};

export default function PatientSettingsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const [activeTab, setActiveTab] = useState<TabKey>('profile');

  const [profileForm, setProfileForm] = useState<ProfileForm>(INITIAL_PROFILE);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [notificationPrefs, setNotificationPrefs] =
    useState<NotificationPrefs>(INITIAL_NOTIFICATIONS);
  const [notifSuccess, setNotifSuccess] = useState(false);
  const [isSavingNotif, setIsSavingNotif] = useState(false);

  const [securityForm, setSecurityForm] = useState<SecurityForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [securityError, setSecurityError] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);

  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);

  const [preferences, setPreferences] = useState<Preferences>(INITIAL_PREFERENCES);
  const [prefsSuccess, setPrefsSuccess] = useState(false);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  const [exportSuccess, setExportSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleSaveProfile = () => {
    setProfileError('');
    setProfileSuccess(false);

    if (
      !profileForm.firstName.trim() ||
      !profileForm.lastName.trim() ||
      !profileForm.email.trim()
    ) {
      setProfileError('First name, last name, and email are required.');
      return;
    }

    if (!profileForm.email.includes('@')) {
      setProfileError('Please enter a valid email address.');
      return;
    }

    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      setProfileSuccess(true);
    }, 1000);
  };

  const handleResetProfile = () => {
    setProfileForm(INITIAL_PROFILE);
    setProfileError('');
    setProfileSuccess(false);
  };

  const handleSaveNotifications = () => {
    setIsSavingNotif(true);
    setTimeout(() => {
      setIsSavingNotif(false);
      setNotifSuccess(true);
    }, 1000);
  };

  const handleUpdatePassword = () => {
    setSecurityError('');
    setSecuritySuccess(false);

    if (
      !securityForm.currentPassword.trim() ||
      !securityForm.newPassword.trim() ||
      !securityForm.confirmPassword.trim()
    ) {
      setSecurityError('All password fields are required.');
      return;
    }

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityError('New password and confirmation do not match.');
      return;
    }

    if (securityForm.newPassword.length < 8) {
      setSecurityError('New password must be at least 8 characters.');
      return;
    }

    setIsSavingSecurity(true);
    setTimeout(() => {
      setIsSavingSecurity(false);
      setSecuritySuccess(true);
      setSecurityForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1000);
  };

  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSavePreferences = () => {
    setIsSavingPrefs(true);
    setTimeout(() => {
      setIsSavingPrefs(false);
      setPrefsSuccess(true);
    }, 1000);
  };

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
    }, 1000);
  };

  const tabs = [
    { key: 'profile' as TabKey, label: 'Profile' },
    { key: 'notifications' as TabKey, label: 'Notifications' },
    { key: 'security' as TabKey, label: 'Security' },
    { key: 'privacy' as TabKey, label: 'Privacy & Data' },
    { key: 'preferences' as TabKey, label: 'Preferences' },
  ];

  const renderProfileTab = () => (
    <View style={{ gap: theme.spacing[4] }}>
      <Card>
        <View style={{ gap: theme.spacing[4] }}>
          {profileError && (
            <Banner variant="danger" title="Error" description={profileError} />
          )}
          {profileSuccess && (
            <Banner
              variant="success"
              title="Success"
              description="Profile updated successfully!"
              onClose={() => setProfileSuccess(false)}
            />
          )}

          <View>
            <Text style={[styles.label, { color: colors.text }]}>First Name *</Text>
            <Input
              value={profileForm.firstName}
              onChangeText={(text) => setProfileForm({ ...profileForm, firstName: text })}
              placeholder="Enter first name"
            />
          </View>

          <View>
            <Text style={[styles.label, { color: colors.text }]}>Last Name *</Text>
            <Input
              value={profileForm.lastName}
              onChangeText={(text) => setProfileForm({ ...profileForm, lastName: text })}
              placeholder="Enter last name"
            />
          </View>

          <View>
            <Text style={[styles.label, { color: colors.text }]}>Email Address *</Text>
            <Input
              value={profileForm.email}
              onChangeText={(text) => setProfileForm({ ...profileForm, email: text })}
              placeholder="Enter email"
              keyboardType="email-address"
            />
          </View>

          <View>
            <Text style={[styles.label, { color: colors.text }]}>Phone Number</Text>
            <Input
              value={profileForm.phone}
              onChangeText={(text) => setProfileForm({ ...profileForm, phone: text })}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View>
            <Text style={[styles.label, { color: colors.text }]}>About Me</Text>
            <TextArea
              value={profileForm.bio}
              onChangeText={(text) => setProfileForm({ ...profileForm, bio: text })}
              placeholder="Tell us about yourself..."
              minHeight={100}
            />
          </View>

          <View style={styles.buttonRow}>
            <View style={{ flex: 1 }}>
              <Button variant="secondary" onPress={handleResetProfile} disabled={isSavingProfile}>
                Reset
              </Button>
            </View>
            <View style={{ width: theme.spacing[3] }} />
            <View style={{ flex: 1 }}>
              <Button variant="primary" onPress={handleSaveProfile} isLoading={isSavingProfile}>
                Save Changes
              </Button>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderNotificationsTab = () => (
    <View style={{ gap: theme.spacing[4] }}>
      <Card>
        <View style={{ gap: theme.spacing[4] }}>
          {notifSuccess && (
            <Banner
              variant="success"
              title="Success"
              description="Notification preferences saved!"
              onClose={() => setNotifSuccess(false)}
            />
          )}

          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Email Notifications
            </Text>
            <View style={{ gap: theme.spacing[3], marginTop: theme.spacing[3] }}>
              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>
                    Care Plan Updates
                  </Text>
                  <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
                    Receive updates when your care plan changes
                  </Text>
                </View>
                <Switch
                  checked={notificationPrefs.emailCarePlan}
                  onChange={(checked) =>
                    setNotificationPrefs({ ...notificationPrefs, emailCarePlan: checked })
                  }
                />
              </View>

              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>
                    Appointment Reminders
                  </Text>
                  <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
                    Get reminders about upcoming appointments
                  </Text>
                </View>
                <Switch
                  checked={notificationPrefs.emailAppointments}
                  onChange={(checked) =>
                    setNotificationPrefs({ ...notificationPrefs, emailAppointments: checked })
                  }
                />
              </View>

              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>
                    Medication Alerts
                  </Text>
                  <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
                    Reminders for medication schedules
                  </Text>
                </View>
                <Switch
                  checked={notificationPrefs.emailMedications}
                  onChange={(checked) =>
                    setNotificationPrefs({ ...notificationPrefs, emailMedications: checked })
                  }
                />
              </View>

              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>System Updates</Text>
                  <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
                    Platform announcements and updates
                  </Text>
                </View>
                <Switch
                  checked={notificationPrefs.emailSystem}
                  onChange={(checked) =>
                    setNotificationPrefs({ ...notificationPrefs, emailSystem: checked })
                  }
                />
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
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Push Notifications
            </Text>
            <View style={{ gap: theme.spacing[3], marginTop: theme.spacing[3] }}>
              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>
                    Urgent Medical Alerts
                  </Text>
                  <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
                    Critical health notifications
                  </Text>
                </View>
                <Switch
                  checked={notificationPrefs.pushUrgent}
                  onChange={(checked) =>
                    setNotificationPrefs({ ...notificationPrefs, pushUrgent: checked })
                  }
                />
              </View>

              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>
                    Appointment Changes
                  </Text>
                  <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
                    Updates to scheduled appointments
                  </Text>
                </View>
                <Switch
                  checked={notificationPrefs.pushAppointments}
                  onChange={(checked) =>
                    setNotificationPrefs({ ...notificationPrefs, pushAppointments: checked })
                  }
                />
              </View>

              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>New Messages</Text>
                  <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
                    Messages from your care team
                  </Text>
                </View>
                <Switch
                  checked={notificationPrefs.pushMessages}
                  onChange={(checked) =>
                    setNotificationPrefs({ ...notificationPrefs, pushMessages: checked })
                  }
                />
              </View>
            </View>
          </View>

          <Button
            variant="primary"
            onPress={handleSaveNotifications}
            isLoading={isSavingNotif}
          >
            Save Notification Preferences
          </Button>
        </View>
      </Card>
    </View>
  );

  const renderSecurityTab = () => (
    <View style={{ gap: theme.spacing[4] }}>
      <Card>
        <View style={{ gap: theme.spacing[4] }}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Change Password</Text>

          {securityError && (
            <Banner variant="danger" title="Error" description={securityError} />
          )}
          {securitySuccess && (
            <Banner
              variant="success"
              title="Success"
              description="Password updated successfully!"
              onClose={() => setSecuritySuccess(false)}
            />
          )}

          <View>
            <Text style={[styles.label, { color: colors.text }]}>Current Password *</Text>
            <Input
              value={securityForm.currentPassword}
              onChangeText={(text) =>
                setSecurityForm({ ...securityForm, currentPassword: text })
              }
              placeholder="Enter current password"
              secureTextEntry
            />
          </View>

          <View>
            <Text style={[styles.label, { color: colors.text }]}>New Password *</Text>
            <Input
              value={securityForm.newPassword}
              onChangeText={(text) => setSecurityForm({ ...securityForm, newPassword: text })}
              placeholder="Enter new password"
              secureTextEntry
            />
          </View>

          <View>
            <Text style={[styles.label, { color: colors.text }]}>Confirm New Password *</Text>
            <Input
              value={securityForm.confirmPassword}
              onChangeText={(text) =>
                setSecurityForm({ ...securityForm, confirmPassword: text })
              }
              placeholder="Confirm new password"
              secureTextEntry
            />
          </View>

          <Button variant="primary" onPress={handleUpdatePassword} isLoading={isSavingSecurity}>
            Update Password
          </Button>
        </View>
      </Card>

      <Card>
        <View style={{ gap: theme.spacing[4] }}>
          <View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Two-Factor Authentication
            </Text>
            <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
              Two-factor authentication is not enabled.
            </Text>
          </View>

          <Button variant="secondary" onPress={() => console.log('Enable 2FA')}>
            Enable 2FA
          </Button>
        </View>
      </Card>

      <Card>
        <View style={{ gap: theme.spacing[4] }}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Active Sessions</Text>

          <View style={{ gap: theme.spacing[3] }}>
            {sessions.map((session) => (
              <View
                key={session.id}
                style={[
                  styles.sessionRow,
                  {
                    backgroundColor: theme.colors.surface.alt,
                    padding: theme.spacing[3],
                    borderRadius: theme.borderRadius.md,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <View style={styles.sessionHeader}>
                    <Text style={[styles.sessionDevice, { color: colors.text }]}>
                      {session.device}
                    </Text>
                    {session.isCurrent && (
                      <Badge variant="success" size="sm">
                        Current
                      </Badge>
                    )}
                  </View>
                  <View style={styles.sessionMeta}>
                    <MapPin size={12} color={colors.textSecondary} />
                    <Text style={[styles.sessionText, { color: colors.textSecondary }]}>
                      {session.location}
                    </Text>
                  </View>
                  <Text style={[styles.sessionText, { color: colors.textSecondary }]}>
                    {session.lastActive}
                  </Text>
                </View>
                {!session.isCurrent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => handleRevokeSession(session.id)}
                    leftIcon={<Trash2 size={16} color={colors.textSecondary} />}
                  >
                    Revoke
                  </Button>
                )}
              </View>
            ))}
          </View>
        </View>
      </Card>
    </View>
  );

  const renderPrivacyTab = () => (
    <View style={{ gap: theme.spacing[4] }}>
      <Card>
        <View style={{ gap: theme.spacing[4] }}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Data Sharing</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
            WellQuestPRO shares your health information with authorized parties to provide care
            and services.
          </Text>

          <View style={{ gap: theme.spacing[3] }}>
            <View style={styles.partnerRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.partnerName, { color: colors.text }]}>Care Team</Text>
                <Text style={[styles.partnerDesc, { color: colors.textSecondary }]}>
                  Healthcare providers managing your care
                </Text>
              </View>
              <Badge variant="success" size="sm">
                Full Access
              </Badge>
            </View>

            <View style={styles.partnerRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.partnerName, { color: colors.text }]}>Insurance Provider</Text>
                <Text style={[styles.partnerDesc, { color: colors.textSecondary }]}>
                  For billing and claims processing
                </Text>
              </View>
              <Badge variant="warning" size="sm">
                Limited
              </Badge>
            </View>

            <View style={styles.partnerRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.partnerName, { color: colors.text }]}>Research Programs</Text>
                <Text style={[styles.partnerDesc, { color: colors.textSecondary }]}>
                  De-identified data for medical research
                </Text>
              </View>
              <Badge variant="info" size="sm">
                View Only
              </Badge>
            </View>
          </View>

          <Button variant="secondary" onPress={() => console.log('Manage sharing')}>
            Manage Sharing
          </Button>
        </View>
      </Card>

      <Card>
        <View style={{ gap: theme.spacing[4] }}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Your Consents & Rights</Text>

          <View style={{ gap: theme.spacing[2] }}>
            <View style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
              <Text style={[styles.bulletText, { color: colors.textSecondary }]}>
                You can revoke optional consents at any time
              </Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
              <Text style={[styles.bulletText, { color: colors.textSecondary }]}>
                You can request access to your complete health data
              </Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
              <Text style={[styles.bulletText, { color: colors.textSecondary }]}>
                You can request corrections to inaccurate information
              </Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
              <Text style={[styles.bulletText, { color: colors.textSecondary }]}>
                You can request an export of all your data
              </Text>
            </View>
          </View>

          {exportSuccess && (
            <Banner
              variant="success"
              title="Export Requested"
              description="Your data export request has been submitted. You'll receive an email when it's ready."
              onClose={() => setExportSuccess(false)}
            />
          )}

          <Button variant="primary" onPress={handleExportData} isLoading={isExporting}>
            Request Data Export
          </Button>
        </View>
      </Card>

      <Card>
        <View style={{ gap: theme.spacing[4] }}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Data Protection</Text>

          <View style={{ gap: theme.spacing[2] }}>
            <View style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
              <Text style={[styles.bulletText, { color: colors.textSecondary }]}>
                HIPAA-aligned security standards
              </Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
              <Text style={[styles.bulletText, { color: colors.textSecondary }]}>
                End-to-end encryption for data in transit and at rest
              </Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
              <Text style={[styles.bulletText, { color: colors.textSecondary }]}>
                Comprehensive access logging and security auditing
              </Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
              <Text style={[styles.bulletText, { color: colors.textSecondary }]}>
                Regular security assessments and penetration testing
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );

  const renderPreferencesTab = () => (
    <View style={{ gap: theme.spacing[4] }}>
      <Card>
        <View style={{ gap: theme.spacing[4] }}>
          {prefsSuccess && (
            <Banner
              variant="success"
              title="Success"
              description="Preferences saved successfully!"
              onClose={() => setPrefsSuccess(false)}
            />
          )}

          <View>
            <Text style={[styles.label, { color: colors.text }]}>Language</Text>
            <View style={styles.optionsRow}>
              {['English', 'Spanish', 'French'].map((lang) => (
                <TouchableOpacity
                  key={lang}
                  onPress={() => setPreferences({ ...preferences, language: lang })}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor:
                        preferences.language === lang
                          ? theme.colors.primary.bg
                          : theme.colors.surface.alt,
                      borderWidth: 1,
                      borderColor:
                        preferences.language === lang
                          ? theme.colors.primary.border
                          : theme.colors.surface.border,
                      paddingVertical: theme.spacing[2],
                      paddingHorizontal: theme.spacing[4],
                      borderRadius: theme.borderRadius.md,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        preferences.language === lang
                          ? theme.colors.surface.bg
                          : theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.medium,
                    }}
                  >
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View>
            <Text style={[styles.label, { color: colors.text }]}>Time Zone</Text>
            <View style={styles.optionsRow}>
              {['ET', 'CT', 'MT', 'PT'].map((tz) => (
                <TouchableOpacity
                  key={tz}
                  onPress={() => setPreferences({ ...preferences, timezone: tz })}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor:
                        preferences.timezone === tz
                          ? theme.colors.primary.bg
                          : theme.colors.surface.alt,
                      borderWidth: 1,
                      borderColor:
                        preferences.timezone === tz
                          ? theme.colors.primary.border
                          : theme.colors.surface.border,
                      paddingVertical: theme.spacing[2],
                      paddingHorizontal: theme.spacing[4],
                      borderRadius: theme.borderRadius.md,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        preferences.timezone === tz
                          ? theme.colors.surface.bg
                          : theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.medium,
                    }}
                  >
                    {tz}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View>
            <Text style={[styles.label, { color: colors.text }]}>Date Format</Text>
            <View style={styles.optionsRow}>
              {['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].map((fmt) => (
                <TouchableOpacity
                  key={fmt}
                  onPress={() => setPreferences({ ...preferences, dateFormat: fmt })}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor:
                        preferences.dateFormat === fmt
                          ? theme.colors.primary.bg
                          : theme.colors.surface.alt,
                      borderWidth: 1,
                      borderColor:
                        preferences.dateFormat === fmt
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
                        preferences.dateFormat === fmt
                          ? theme.colors.surface.bg
                          : theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.medium,
                    }}
                  >
                    {fmt}
                  </Text>
                </TouchableOpacity>
              ))}
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
            <Text style={[styles.sectionTitle, { color: colors.text }]}>App Behavior</Text>
            <View style={{ gap: theme.spacing[3], marginTop: theme.spacing[3] }}>
              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>
                    Show Tips and Guidance
                  </Text>
                  <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
                    Display helpful tips throughout the app
                  </Text>
                </View>
                <Switch
                  checked={preferences.showTips}
                  onChange={(checked) =>
                    setPreferences({ ...preferences, showTips: checked })
                  }
                />
              </View>

              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>Auto-Save Drafts</Text>
                  <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
                    Automatically save your work in progress
                  </Text>
                </View>
                <Switch
                  checked={preferences.autoSave}
                  onChange={(checked) =>
                    setPreferences({ ...preferences, autoSave: checked })
                  }
                />
              </View>

              <View style={styles.switchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.switchLabel, { color: colors.text }]}>
                    Enable Keyboard Shortcuts
                  </Text>
                  <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
                    Use keyboard shortcuts for faster navigation
                  </Text>
                </View>
                <Switch
                  checked={preferences.keyboardShortcuts}
                  onChange={(checked) =>
                    setPreferences({ ...preferences, keyboardShortcuts: checked })
                  }
                />
              </View>
            </View>
          </View>

          <Button variant="primary" onPress={handleSavePreferences} isLoading={isSavingPrefs}>
            Save Preferences
          </Button>
        </View>
      </Card>
    </View>
  );

  return (
    <View
      testID="screen-patient-settings"
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TopBar title="Settings" showBack />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ padding: theme.spacing[4] }}
        >
          <View style={{ gap: theme.spacing[4] }}>
            <Card>
              <View style={styles.headerRow}>
                <View
                  style={[
                    styles.avatarContainer,
                    {
                      backgroundColor: theme.colors.primary.bg,
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: theme.colors.surface.bg,
                      fontSize: 20,
                      fontWeight: '700',
                    }}
                  >
                    DP
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.userName, { color: colors.text }]}>Demo Patient</Text>
                  <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                    patient@wellquestpro.com
                  </Text>
                </View>
              </View>
              <Text style={[styles.headerDesc, { color: colors.textSecondary }]}>
                Manage your profile, notifications, security, and privacy settings.
              </Text>
            </Card>

            <Tabs tabs={tabs} activeKey={activeTab} onChange={(key) => setActiveTab(key as TabKey)} />

            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'security' && renderSecurityTab()}
            {activeTab === 'privacy' && renderPrivacyTab()}
            {activeTab === 'preferences' && renderPreferencesTab()}
          </View>
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
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatarContainer: {},
  userName: {
    fontSize: 18,
    fontWeight: '700',
  },
  userEmail: {
    fontSize: 14,
    marginTop: 2,
  },
  headerDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  switchDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  sessionRow: {
    gap: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sessionDevice: {
    fontSize: 15,
    fontWeight: '600',
  },
  sessionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  sessionText: {
    fontSize: 13,
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  partnerName: {
    fontSize: 15,
    fontWeight: '600',
  },
  partnerDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bullet: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
  },
  bulletText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  optionButton: {},
});
