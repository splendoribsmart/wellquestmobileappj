import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '@theme/index';
import { useAppState } from '@state/AppProvider';
import { Button, Input, Card, Banner } from '@components/ui';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen() {
  const { theme } = useTheme();
  const { setRole } = useAppState();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClinicianLogin = () => {
    setRole('clinician');
    router.replace('/(clinician)/(tabs)/dashboard');
  };

  const handlePatientLogin = () => {
    setRole('patient');
    router.replace('/(patient)/(tabs)/dashboard');
  };

  const validateForm = () => {
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
    return true;
  };

  const handleSignIn = async () => {
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setError('For demo purposes, please use the role-specific buttons below to continue.');
    }, 800);
  };

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
          testID="screen-login"
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
              Welcome back
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
              Sign in to your WellQuestPRO account
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

          <View style={{ marginBottom: theme.spacing[4] }}>
            <Card>
            <View style={{ gap: theme.spacing[4] }}>
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
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
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

              <Button
                onPress={handleSignIn}
                variant="primary"
                size="lg"
                title="Sign in"
                isLoading={isLoading}
              />
            </View>
            </Card>
          </View>

          <View
            style={[
              styles.linkRow,
              {
                marginBottom: theme.spacing[6],
              },
            ]}
          >
            <Text
              onPress={() => router.push('/(auth)/reset-password')}
              style={[
                styles.link,
                {
                  color: theme.colors.primary.bg,
                  fontSize: theme.typography.fontSize.sm,
                  fontFamily: theme.typography.fontFamily.semibold,
                },
              ]}
            >
              Forgot password?
            </Text>
            <Text
              onPress={() => router.push('/(auth)/sign-up')}
              style={[
                styles.link,
                {
                  color: theme.colors.primary.bg,
                  fontSize: theme.typography.fontSize.sm,
                  fontFamily: theme.typography.fontFamily.semibold,
                },
              ]}
            >
              Create account
            </Text>
          </View>

          <View
            style={[
              styles.divider,
              {
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: theme.colors.surface.border },
              ]}
            />
            <Text
              style={[
                styles.dividerText,
                {
                  color: theme.colors.text.muted,
                  fontSize: theme.typography.fontSize.sm,
                  fontFamily: theme.typography.fontFamily.normal,
                  backgroundColor: theme.colors.surface.alt,
                  paddingHorizontal: theme.spacing[3],
                },
              ]}
            >
              Quick access for demo
            </Text>
            <View
              style={[
                styles.dividerLine,
                { backgroundColor: theme.colors.surface.border },
              ]}
            />
          </View>

          <View style={styles.roleButtons}>
            <Button
              onPress={handleClinicianLogin}
              variant="outline"
              size="md"
              title="Continue as Clinician"
              accessibilityLabel="Continue as Clinician"
            />
            <Button
              onPress={handlePatientLogin}
              variant="outline"
              size="md"
              title="Continue as Patient"
              accessibilityLabel="Continue as Patient"
            />
          </View>
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
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {},
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {},
  roleButtons: {
    gap: 12,
  },
});
