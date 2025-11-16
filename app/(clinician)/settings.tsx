import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card, Switch, Input, TextArea, Button, Banner } from '@components/ui';
import {
  ChevronRight,
  User,
  Bell,
  Lock,
  Info,
  LogOut,
  Mail,
  Phone,
  Shield,
  Briefcase,
  Building,
} from 'lucide-react-native';
import {
  useProfileSettings,
  useNotificationSettings,
  useSecuritySettings,
  usePreferencesSettings,
} from '@/src/hooks/useSettings';
import {
  MOCK_CLINICIAN_PROFILE,
  MOCK_CREDENTIALS,
  MOCK_NOTIFICATIONS,
  MOCK_PREFERENCES,
  CredentialsForm,
  simulateSave,
} from '@utils/settingsHelpers';

type SettingScreen =
  | 'main'
  | 'profile'
  | 'credentials'
  | 'security'
  | 'notifications'
  | 'preferences';

export default function ClinicianSettingsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState<SettingScreen>('main');

  const [patientAlerts, setPatientAlerts] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [hipaaMode, setHipaaMode] = useState(true);

  const [credentialsForm, setCredentialsForm] = useState<CredentialsForm>(MOCK_CREDENTIALS);
  const [credentialsSuccess, setCredentialsSuccess] = useState(false);
  const [isSavingCredentials, setIsSavingCredentials] = useState(false);

  const {
    profileForm,
    setProfileForm,
    profileError,
    profileSuccess,
    setProfileSuccess,
    isSavingProfile,
    handleSaveProfile,
    handleResetProfile,
  } = useProfileSettings(MOCK_CLINICIAN_PROFILE);

  const {
    notificationPrefs,
    setNotificationPrefs,
    notifSuccess,
    setNotifSuccess,
    isSavingNotif,
    handleSaveNotifications,
  } = useNotificationSettings(MOCK_NOTIFICATIONS);

  const {
    securityForm,
    setSecurityForm,
    securityError,
    securitySuccess,
    setSecuritySuccess,
    isSavingSecurity,
    handleUpdatePassword,
  } = useSecuritySettings();

  const {
    preferences,
    setPreferences,
    prefsSuccess,
    setPrefsSuccess,
    isSavingPrefs,
    handleSavePreferences,
  } = usePreferencesSettings(MOCK_PREFERENCES);

  const handleSaveCredentials = async () => {
    setIsSavingCredentials(true);
    try {
      await simulateSave(credentialsForm);
      setCredentialsSuccess(true);
    } catch (err) {
      console.error('Failed to save credentials:', err);
    } finally {
      setIsSavingCredentials(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const SettingItem = ({
    icon: Icon,
    label,
    onPress,
    showArrow = true,
    rightElement,
  }: {
    icon: any;
    label: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <Icon size={20} color={colors.primary} />
        <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
      </View>
      {rightElement || (showArrow && <ChevronRight size={20} color={colors.textSecondary} />)}
    </TouchableOpacity>
  );

  const renderMainScreen = () => (
    <ScrollView style={styles.container}>
      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
        <SettingItem
          icon={User}
          label="Profile Information"
          onPress={() => setCurrentScreen('profile')}
        />
        <SettingItem
          icon={Briefcase}
          label="Professional Credentials"
          onPress={() => setCurrentScreen('credentials')}
        />
        <SettingItem
          icon={Lock}
          label="Privacy & Security"
          onPress={() => setCurrentScreen('security')}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Clinical Settings</Text>
        <SettingItem
          icon={Bell}
          label="Patient Alerts"
          showArrow={false}
          rightElement={<Switch checked={patientAlerts} onChange={setPatientAlerts} />}
        />
        <SettingItem
          icon={Bell}
          label="Notification Settings"
          onPress={() => setCurrentScreen('notifications')}
        />
        <SettingItem
          icon={Info}
          label="Auto-Sync Patient Data"
          showArrow={false}
          rightElement={<Switch checked={autoSync} onChange={setAutoSync} />}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Compliance</Text>
        <SettingItem
          icon={Shield}
          label="HIPAA Mode"
          showArrow={false}
          rightElement={<Switch checked={hipaaMode} onChange={setHipaaMode} />}
        />
        <SettingItem
          icon={Info}
          label="Compliance Documentation"
          onPress={() => router.push('/(clinician)/legal/hipaa')}
        />
        <SettingItem
          icon={Lock}
          label="Privacy Policy"
          onPress={() => router.push('/(clinician)/legal/privacy')}
        />
      </Card>

      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
        <SettingItem
          icon={Info}
          label="App Preferences"
          onPress={() => setCurrentScreen('preferences')}
        />
      </Card>

      <Card style={styles.section}>
        <SettingItem icon={LogOut} label="Sign Out" onPress={handleSignOut} showArrow={false} />
      </Card>
    </ScrollView>
  );

  const renderProfileScreen = () => (
    <ScrollView style={styles.container}>
      <Card style={styles.formCard}>
        <Text style={[styles.formTitle, { color: colors.text }]}>Profile Information</Text>

        {profileError && <Banner variant="danger" title="Error" description={profileError} />}
        {profileSuccess && (
          <Banner
            variant="success"
            title="Success"
            description="Profile updated successfully!"
            onClose={() => setProfileSuccess(false)}
          />
        )}

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>First Name *</Text>
          <Input
            value={profileForm.firstName}
            onChangeText={(text) => setProfileForm({ ...profileForm, firstName: text })}
            placeholder="Enter first name"
          />
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Last Name *</Text>
          <Input
            value={profileForm.lastName}
            onChangeText={(text) => setProfileForm({ ...profileForm, lastName: text })}
            placeholder="Enter last name"
          />
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Email Address *</Text>
          <Input
            value={profileForm.email}
            onChangeText={(text) => setProfileForm({ ...profileForm, email: text })}
            placeholder="Enter email"
            keyboardType="email-address"
            leftIcon={<Mail size={20} color={colors.textSecondary} />}
          />
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Phone Number</Text>
          <Input
            value={profileForm.phone}
            onChangeText={(text) => setProfileForm({ ...profileForm, phone: text })}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            leftIcon={<Phone size={20} color={colors.textSecondary} />}
          />
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Professional Bio</Text>
          <TextArea
            value={profileForm.bio}
            onChangeText={(text) => setProfileForm({ ...profileForm, bio: text })}
            placeholder="Tell us about your professional background..."
            minHeight={80}
          />
        </View>

        <View style={styles.buttonRow}>
          <View style={{ flex: 1 }}>
            <Button variant="secondary" onPress={handleResetProfile} disabled={isSavingProfile}>
              Reset
            </Button>
          </View>
          <View style={{ width: 12 }} />
          <View style={{ flex: 1 }}>
            <Button variant="primary" onPress={handleSaveProfile} isLoading={isSavingProfile}>
              Save Changes
            </Button>
          </View>
        </View>
      </Card>
    </ScrollView>
  );

  const renderCredentialsScreen = () => (
    <ScrollView style={styles.container}>
      <Card style={styles.formCard}>
        <Text style={[styles.formTitle, { color: colors.text }]}>Professional Credentials</Text>

        {credentialsSuccess && (
          <Banner
            variant="success"
            title="Success"
            description="Credentials updated successfully!"
            onClose={() => setCredentialsSuccess(false)}
          />
        )}

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>License Number</Text>
          <Input
            value={credentialsForm.licenseNumber}
            onChangeText={(text) =>
              setCredentialsForm({ ...credentialsForm, licenseNumber: text })
            }
            placeholder="Enter license number"
            leftIcon={<Shield size={20} color={colors.textSecondary} />}
          />
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Specialty</Text>
          <Input
            value={credentialsForm.specialty}
            onChangeText={(text) => setCredentialsForm({ ...credentialsForm, specialty: text })}
            placeholder="Enter your specialty"
            leftIcon={<Briefcase size={20} color={colors.textSecondary} />}
          />
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Institution</Text>
          <Input
            value={credentialsForm.institution}
            onChangeText={(text) =>
              setCredentialsForm({ ...credentialsForm, institution: text })
            }
            placeholder="Enter your institution"
            leftIcon={<Building size={20} color={colors.textSecondary} />}
          />
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Years of Experience</Text>
          <Input
            value={credentialsForm.yearsOfExperience}
            onChangeText={(text) =>
              setCredentialsForm({ ...credentialsForm, yearsOfExperience: text })
            }
            placeholder="Enter years of experience"
            keyboardType="numeric"
          />
        </View>

        <Button variant="primary" onPress={handleSaveCredentials} isLoading={isSavingCredentials}>
          Save Credentials
        </Button>
      </Card>
    </ScrollView>
  );

  const renderSecurityScreen = () => (
    <ScrollView style={styles.container}>
      <Card style={styles.formCard}>
        <Text style={[styles.formTitle, { color: colors.text }]}>Change Password</Text>

        {securityError && <Banner variant="danger" title="Error" description={securityError} />}
        {securitySuccess && (
          <Banner
            variant="success"
            title="Success"
            description="Password updated successfully!"
            onClose={() => setSecuritySuccess(false)}
          />
        )}

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Current Password *</Text>
          <Input
            value={securityForm.currentPassword}
            onChangeText={(text) => setSecurityForm({ ...securityForm, currentPassword: text })}
            placeholder="Enter current password"
            secureTextEntry
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
          />
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>New Password *</Text>
          <Input
            value={securityForm.newPassword}
            onChangeText={(text) => setSecurityForm({ ...securityForm, newPassword: text })}
            placeholder="Enter new password"
            secureTextEntry
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
          />
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Confirm New Password *</Text>
          <Input
            value={securityForm.confirmPassword}
            onChangeText={(text) => setSecurityForm({ ...securityForm, confirmPassword: text })}
            placeholder="Confirm new password"
            secureTextEntry
            leftIcon={<Lock size={20} color={colors.textSecondary} />}
          />
        </View>

        <Button variant="primary" onPress={handleUpdatePassword} isLoading={isSavingSecurity}>
          Update Password
        </Button>
      </Card>

      <Card style={styles.formCard}>
        <Text style={[styles.formTitle, { color: colors.text }]}>Two-Factor Authentication</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Add an extra layer of security to your account with two-factor authentication.
        </Text>
        <Button
          variant="secondary"
          onPress={() =>
            Alert.alert('Coming Soon', 'Two-factor authentication will be available soon.')
          }
        >
          Enable 2FA
        </Button>
      </Card>
    </ScrollView>
  );

  const renderNotificationsScreen = () => (
    <ScrollView style={styles.container}>
      <Card style={styles.formCard}>
        <Text style={[styles.formTitle, { color: colors.text }]}>Notification Settings</Text>

        {notifSuccess && (
          <Banner
            variant="success"
            title="Success"
            description="Notification preferences saved!"
            onClose={() => setNotifSuccess(false)}
          />
        )}

        <Text style={[styles.subsectionTitle, { color: colors.text }]}>Email Notifications</Text>

        <View style={styles.switchItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>Patient Updates</Text>
            <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
              Receive updates about patient status changes
            </Text>
          </View>
          <Switch
            checked={notificationPrefs.emailCarePlan}
            onChange={(checked) =>
              setNotificationPrefs({ ...notificationPrefs, emailCarePlan: checked })
            }
          />
        </View>

        <View style={styles.switchItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>
              Appointment Notifications
            </Text>
            <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
              Get notified about upcoming appointments
            </Text>
          </View>
          <Switch
            checked={notificationPrefs.emailAppointments}
            onChange={(checked) =>
              setNotificationPrefs({ ...notificationPrefs, emailAppointments: checked })
            }
          />
        </View>

        <View style={styles.switchItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>Critical Alerts</Text>
            <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
              Urgent patient health alerts
            </Text>
          </View>
          <Switch
            checked={notificationPrefs.emailMedications}
            onChange={(checked) =>
              setNotificationPrefs({ ...notificationPrefs, emailMedications: checked })
            }
          />
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <Text style={[styles.subsectionTitle, { color: colors.text }]}>Push Notifications</Text>

        <View style={styles.switchItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>Urgent Patient Alerts</Text>
            <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
              Critical patient status notifications
            </Text>
          </View>
          <Switch
            checked={notificationPrefs.pushUrgent}
            onChange={(checked) =>
              setNotificationPrefs({ ...notificationPrefs, pushUrgent: checked })
            }
          />
        </View>

        <View style={styles.switchItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>Schedule Changes</Text>
            <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
              Updates to your schedule or appointments
            </Text>
          </View>
          <Switch
            checked={notificationPrefs.pushAppointments}
            onChange={(checked) =>
              setNotificationPrefs({ ...notificationPrefs, pushAppointments: checked })
            }
          />
        </View>

        <View style={styles.switchItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>Team Messages</Text>
            <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
              Messages from other care team members
            </Text>
          </View>
          <Switch
            checked={notificationPrefs.pushMessages}
            onChange={(checked) =>
              setNotificationPrefs({ ...notificationPrefs, pushMessages: checked })
            }
          />
        </View>

        <Button variant="primary" onPress={handleSaveNotifications} isLoading={isSavingNotif}>
          Save Preferences
        </Button>
      </Card>
    </ScrollView>
  );

  const renderPreferencesScreen = () => (
    <ScrollView style={styles.container}>
      <Card style={styles.formCard}>
        <Text style={[styles.formTitle, { color: colors.text }]}>App Preferences</Text>

        {prefsSuccess && (
          <Banner
            variant="success"
            title="Success"
            description="Preferences saved successfully!"
            onClose={() => setPrefsSuccess(false)}
          />
        )}

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Language</Text>
          <View style={styles.optionsRow}>
            {['English', 'Spanish', 'French'].map((lang) => (
              <TouchableOpacity
                key={lang}
                onPress={() => setPreferences({ ...preferences, language: lang })}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      preferences.language === lang ? colors.primary : colors.surface,
                    borderWidth: 1,
                    borderColor: preferences.language === lang ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color: preferences.language === lang ? '#FFFFFF' : colors.text,
                    fontSize: 14,
                    fontWeight: '500',
                  }}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formField}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Time Zone</Text>
          <View style={styles.optionsRow}>
            {['ET', 'CT', 'MT', 'PT'].map((tz) => (
              <TouchableOpacity
                key={tz}
                onPress={() => setPreferences({ ...preferences, timezone: tz })}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor:
                      preferences.timezone === tz ? colors.primary : colors.surface,
                    borderWidth: 1,
                    borderColor: preferences.timezone === tz ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    color: preferences.timezone === tz ? '#FFFFFF' : colors.text,
                    fontSize: 14,
                    fontWeight: '500',
                  }}
                >
                  {tz}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.switchItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>Show Tips and Guidance</Text>
            <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
              Display helpful tips throughout the app
            </Text>
          </View>
          <Switch
            checked={preferences.showTips}
            onChange={(checked) => setPreferences({ ...preferences, showTips: checked })}
          />
        </View>

        <View style={styles.switchItem}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>Auto-Save Drafts</Text>
            <Text style={[styles.switchDesc, { color: colors.textSecondary }]}>
              Automatically save your work in progress
            </Text>
          </View>
          <Switch
            checked={preferences.autoSave}
            onChange={(checked) => setPreferences({ ...preferences, autoSave: checked })}
          />
        </View>

        <Button variant="primary" onPress={handleSavePreferences} isLoading={isSavingPrefs}>
          Save Preferences
        </Button>
      </Card>
    </ScrollView>
  );

  const getTitle = () => {
    switch (currentScreen) {
      case 'profile':
        return 'Profile';
      case 'credentials':
        return 'Credentials';
      case 'security':
        return 'Security';
      case 'notifications':
        return 'Notifications';
      case 'preferences':
        return 'Preferences';
      default:
        return 'Settings';
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar
        title={getTitle()}
        showBack={currentScreen !== 'main'}
        onBackPress={() => setCurrentScreen('main')}
      />
      {currentScreen === 'main' && renderMainScreen()}
      {currentScreen === 'profile' && renderProfileScreen()}
      {currentScreen === 'credentials' && renderCredentialsScreen()}
      {currentScreen === 'security' && renderSecurityScreen()}
      {currentScreen === 'notifications' && renderNotificationsScreen()}
      {currentScreen === 'preferences' && renderPreferencesScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
    padding: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    opacity: 0.7,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  formCard: {
    marginBottom: 16,
    padding: 16,
    gap: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  formField: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  switchDesc: {
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
