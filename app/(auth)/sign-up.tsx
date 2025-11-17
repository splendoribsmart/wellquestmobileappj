import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '@theme/index';
import { Button, Input, Card, Banner, Checkbox } from '@components/ui';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react-native';

export default function SignUpScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'patient' | 'clinician'>('patient');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { label: '', color: '' };
    if (pwd.length < 6) return { label: 'Weak', color: theme.colors.feedback.danger.bg };
    if (pwd.length < 10) return { label: 'Medium', color: theme.colors.feedback.warning.bg };
    return { label: 'Strong', color: theme.colors.feedback.success.bg };
  };

  const validateForm = () => {
    if (!fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!password.trim()) {
      setError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!agreeToTerms) {
      setError('You must agree to the Terms and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleCreateAccount = async () => {
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess('Account created successfully! You can now log in.');
      setTimeout(() => {
        router.push('/(auth)/login');
      }, 1500);
    }, 1000);
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.surface.alt }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View
          testID="screen-sign-up"
          style={styles.content}
        >
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize['3xl'],
                  fontFamily: theme.typography.fontFamily.bold,
                  marginBottom: theme.spacing[2],
                },
              ]}
            >
              Create account
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.text.muted,
                  fontSize: theme.typography.fontSize.base,
                  fontFamily: theme.typography.fontFamily.normal,
                  marginBottom: theme.spacing[6],
                },
              ]}
            >
              Create a secure account to access your WellQuestPRO workspace
            </Text>
          </View>

          {error && (
            <View style={{ marginBottom: theme.spacing[4] }}>
              <Banner
                variant="danger"
                title={error}
                onClose={() => setError('')}
              />
            </View>
          )}

          {success && (
            <View style={{ marginBottom: theme.spacing[4] }}>
              <Banner
                variant="success"
                title={success}
              />
            </View>
          )}

          <View style={{ marginBottom: theme.spacing[4] }}>
            <Card>
            <View style={{ gap: theme.spacing[4] }}>
              <Input
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                placeholder="John Doe"
                autoCapitalize="words"
                leftIcon={<User size={20} color={theme.colors.text.muted} />}
              />

              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={<Mail size={20} color={theme.colors.text.muted} />}
              />

              <View>
                <Input
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a strong password"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  leftIcon={<Lock size={20} color={theme.colors.text.muted} />}
                  rightIcon={
                    <Text onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff size={20} color={theme.colors.text.muted} />
                      ) : (
                        <Eye size={20} color={theme.colors.text.muted} />
                      )}
                    </Text>
                  }
                />
                {password.length > 0 && (
                  <View style={[styles.strengthBar, { marginTop: theme.spacing[1] }]}>
                    <Text
                      style={[
                        styles.strengthText,
                        {
                          color: passwordStrength.color,
                          fontSize: theme.typography.fontSize.xs,
                          fontFamily: theme.typography.fontFamily.medium,
                        },
                      ]}
                    >
                      Password strength: {passwordStrength.label}
                    </Text>
                  </View>
                )}
              </View>

              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter your password"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                leftIcon={<Lock size={20} color={theme.colors.text.muted} />}
                rightIcon={
                  <Text onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? (
                      <EyeOff size={20} color={theme.colors.text.muted} />
                    ) : (
                      <Eye size={20} color={theme.colors.text.muted} />
                    )}
                  </Text>
                }
              />

              <View>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.medium,
                      marginBottom: theme.spacing[2],
                    },
                  ]}
                >
                  I am a:
                </Text>
                <View style={styles.roleButtons}>
                  <Button
                    onPress={() => setSelectedRole('patient')}
                    variant={selectedRole === 'patient' ? 'primary' : 'outline'}
                    size="sm"
                    title="Patient"
                  />
                  <Button
                    onPress={() => setSelectedRole('clinician')}
                    variant={selectedRole === 'clinician' ? 'primary' : 'outline'}
                    size="sm"
                    title="Clinician"
                  />
                </View>
                <Text
                  style={[
                    styles.helperText,
                    {
                      color: theme.colors.text.muted,
                      fontSize: theme.typography.fontSize.xs,
                      fontFamily: theme.typography.fontFamily.normal,
                      marginTop: theme.spacing[1],
                    },
                  ]}
                >
                  You can change this later in Settings
                </Text>
              </View>

              <View style={styles.checkboxRow}>
                <Checkbox
                  checked={agreeToTerms}
                  onChange={setAgreeToTerms}
                  label=""
                />
                <Text
                  style={[
                    styles.checkboxLabel,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.normal,
                      flex: 1,
                      marginLeft: theme.spacing[2],
                    },
                  ]}
                >
                  I agree to the{' '}
                  <Text
                    style={[
                      styles.link,
                      {
                        color: theme.colors.primary.bg,
                        fontFamily: theme.typography.fontFamily.semibold,
                      },
                    ]}
                    onPress={() => console.log('Navigate to Terms')}
                  >
                    Terms of Service
                  </Text>
                  {' '}and{' '}
                  <Text
                    style={[
                      styles.link,
                      {
                        color: theme.colors.primary.bg,
                        fontFamily: theme.typography.fontFamily.semibold,
                      },
                    ]}
                    onPress={() => console.log('Navigate to Privacy')}
                  >
                    Privacy Policy
                  </Text>
                </Text>
              </View>

              <Button
                onPress={handleCreateAccount}
                variant="primary"
                size="lg"
                title="Create Account"
                isLoading={isLoading}
              />
            </View>
            </Card>
          </View>

          <Text
            style={[
              styles.footerText,
              {
                color: theme.colors.text.muted,
                fontSize: theme.typography.fontSize.sm,
                fontFamily: theme.typography.fontFamily.normal,
              },
            ]}
          >
            Already have an account?{' '}
            <Text
              onPress={() => router.push('/(auth)/login')}
              style={[
                styles.link,
                {
                  color: theme.colors.primary.bg,
                  fontFamily: theme.typography.fontFamily.semibold,
                },
              ]}
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  label: {},
  roleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  helperText: {},
  strengthBar: {},
  strengthText: {},
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxLabel: {},
  link: {},
  footerText: {
    textAlign: 'center',
    marginTop: 16,
  },
});
