export interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

export interface NotificationPrefs {
  emailCarePlan: boolean;
  emailAppointments: boolean;
  emailMedications: boolean;
  emailSystem: boolean;
  pushUrgent: boolean;
  pushAppointments: boolean;
  pushMessages: boolean;
}

export interface SecurityForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Preferences {
  language: string;
  timezone: string;
  dateFormat: string;
  showTips: boolean;
  autoSave: boolean;
}

export interface CredentialsForm {
  licenseNumber: string;
  specialty: string;
  institution: string;
  yearsOfExperience: string;
}

export const MOCK_PATIENT_PROFILE: ProfileForm = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@wellquestpro.com',
  phone: '(555) 123-4567',
  bio: 'Managing chronic condition with care team support.',
};

export const MOCK_CLINICIAN_PROFILE: ProfileForm = {
  firstName: 'Dr. Michael',
  lastName: 'Chen',
  email: 'dr.chen@wellquestpro.com',
  phone: '(555) 987-6543',
  bio: 'Board-certified physician specializing in chronic disease management.',
};

export const MOCK_CREDENTIALS: CredentialsForm = {
  licenseNumber: 'MD-123456',
  specialty: 'Internal Medicine',
  institution: 'Metro General Hospital',
  yearsOfExperience: '12',
};

export const MOCK_NOTIFICATIONS: NotificationPrefs = {
  emailCarePlan: true,
  emailAppointments: true,
  emailMedications: true,
  emailSystem: false,
  pushUrgent: true,
  pushAppointments: true,
  pushMessages: false,
};

export const MOCK_PREFERENCES: Preferences = {
  language: 'English',
  timezone: 'ET',
  dateFormat: 'MM/DD/YYYY',
  showTips: true,
  autoSave: true,
};

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return 'Email is required.';
  }
  if (!email.includes('@') || !email.includes('.')) {
    return 'Please enter a valid email address.';
  }
  return null;
}

export function validateProfile(profile: ProfileForm): string | null {
  if (!profile.firstName.trim()) {
    return 'First name is required.';
  }
  if (!profile.lastName.trim()) {
    return 'Last name is required.';
  }
  const emailError = validateEmail(profile.email);
  if (emailError) {
    return emailError;
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password.trim()) {
    return 'Password is required.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  return null;
}

export function validateSecurityForm(form: SecurityForm): string | null {
  if (!form.currentPassword.trim()) {
    return 'Current password is required.';
  }
  const newPasswordError = validatePassword(form.newPassword);
  if (newPasswordError) {
    return newPasswordError;
  }
  if (form.newPassword !== form.confirmPassword) {
    return 'New password and confirmation do not match.';
  }
  return null;
}

export function simulateSave<T>(data: T, delay: number = 1000): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}
