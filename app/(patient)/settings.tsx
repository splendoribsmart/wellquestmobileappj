import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@theme/index';
import { getThemeColors } from '@utils/themeHelpers';
import { TopBar } from '@components/layout/TopBar';
import { Card } from '@components/ui/Card';
import { Switch } from '@components/ui/Switch';
import { ChevronRight, User, Bell, Lock, Info, LogOut } from 'lucide-react-native';
import { useState } from 'react';

export default function PatientSettingsScreen() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const SettingItem = ({
    icon: Icon,
    label,
    onPress,
    showArrow = true,
    rightElement
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Settings" showBack />
      <ScrollView style={styles.container}>
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          <SettingItem
            icon={User}
            label="Profile Information"
            onPress={() => {}}
          />
          <SettingItem
            icon={Lock}
            label="Privacy & Security"
            onPress={() => {}}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
          <SettingItem
            icon={Bell}
            label="Push Notifications"
            showArrow={false}
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            }
          />
          <SettingItem
            icon={Bell}
            label="Medication Reminders"
            showArrow={false}
            rightElement={
              <Switch
                value={remindersEnabled}
                onValueChange={setRemindersEnabled}
              />
            }
          />
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy</Text>
          <SettingItem
            icon={Lock}
            label="Data Sharing with Care Team"
            showArrow={false}
            rightElement={
              <Switch
                value={dataSharing}
                onValueChange={setDataSharing}
              />
            }
          />
          <SettingItem
            icon={Info}
            label="Privacy Policy"
            onPress={() => {}}
          />
        </Card>

        <Card style={styles.section}>
          <SettingItem
            icon={LogOut}
            label="Sign Out"
            onPress={() => {}}
            showArrow={false}
          />
        </Card>
      </ScrollView>
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
});
