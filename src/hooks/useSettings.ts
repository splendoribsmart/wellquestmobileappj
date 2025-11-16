import { useState } from 'react';
import {
  ProfileForm,
  NotificationPrefs,
  SecurityForm,
  Preferences,
  validateProfile,
  validateSecurityForm,
  simulateSave,
} from '@utils/settingsHelpers';

export function useProfileSettings(initialProfile: ProfileForm) {
  const [profileForm, setProfileForm] = useState<ProfileForm>(initialProfile);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const handleSaveProfile = async () => {
    setProfileError('');
    setProfileSuccess(false);

    const error = validateProfile(profileForm);
    if (error) {
      setProfileError(error);
      return;
    }

    setIsSavingProfile(true);
    try {
      await simulateSave(profileForm);
      setProfileSuccess(true);
    } catch (err) {
      setProfileError('Failed to save profile. Please try again.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleResetProfile = () => {
    setProfileForm(initialProfile);
    setProfileError('');
    setProfileSuccess(false);
  };

  return {
    profileForm,
    setProfileForm,
    profileError,
    profileSuccess,
    setProfileSuccess,
    isSavingProfile,
    handleSaveProfile,
    handleResetProfile,
  };
}

export function useNotificationSettings(initialNotifications: NotificationPrefs) {
  const [notificationPrefs, setNotificationPrefs] =
    useState<NotificationPrefs>(initialNotifications);
  const [notifSuccess, setNotifSuccess] = useState(false);
  const [isSavingNotif, setIsSavingNotif] = useState(false);

  const handleSaveNotifications = async () => {
    setIsSavingNotif(true);
    try {
      await simulateSave(notificationPrefs);
      setNotifSuccess(true);
    } catch (err) {
      console.error('Failed to save notifications:', err);
    } finally {
      setIsSavingNotif(false);
    }
  };

  return {
    notificationPrefs,
    setNotificationPrefs,
    notifSuccess,
    setNotifSuccess,
    isSavingNotif,
    handleSaveNotifications,
  };
}

export function useSecuritySettings() {
  const [securityForm, setSecurityForm] = useState<SecurityForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [securityError, setSecurityError] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState(false);
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);

  const handleUpdatePassword = async () => {
    setSecurityError('');
    setSecuritySuccess(false);

    const error = validateSecurityForm(securityForm);
    if (error) {
      setSecurityError(error);
      return;
    }

    setIsSavingSecurity(true);
    try {
      await simulateSave(securityForm);
      setSecuritySuccess(true);
      setSecurityForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setSecurityError('Failed to update password. Please try again.');
    } finally {
      setIsSavingSecurity(false);
    }
  };

  return {
    securityForm,
    setSecurityForm,
    securityError,
    securitySuccess,
    setSecuritySuccess,
    isSavingSecurity,
    handleUpdatePassword,
  };
}

export function usePreferencesSettings(initialPreferences: Preferences) {
  const [preferences, setPreferences] = useState<Preferences>(initialPreferences);
  const [prefsSuccess, setPrefsSuccess] = useState(false);
  const [isSavingPrefs, setIsSavingPrefs] = useState(false);

  const handleSavePreferences = async () => {
    setIsSavingPrefs(true);
    try {
      await simulateSave(preferences);
      setPrefsSuccess(true);
    } catch (err) {
      console.error('Failed to save preferences:', err);
    } finally {
      setIsSavingPrefs(false);
    }
  };

  return {
    preferences,
    setPreferences,
    prefsSuccess,
    setPrefsSuccess,
    isSavingPrefs,
    handleSavePreferences,
  };
}
