import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '@theme/index';
import { Button, Input, Card, Banner } from '@components/ui';
import { Mail, KeyRound } from 'lucide-react-native';

export default function ResetPasswordScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSendResetLink = async () => {
    setError('');
    setSuccess(false);

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      console.log('Password reset link sent to:', email);
    }, 1000);
  };

  if (success) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.surface.alt }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View
            testID="screen-reset-password"
            style={styles.content}
          >
            <View style={styles.header}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: theme.colors.feedback.success.bg,
                    marginBottom: theme.spacing[4],
                  },
                ]}
              >
                <Mail
                  size={32}
                  color={theme.colors.feedback.success.fg}
                  strokeWidth={2}
                />
              </View>
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
                Check your email
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
                If an account exists for {email}, a password reset link has been sent.
              </Text>
            </View>

            <View style={{ marginBottom: theme.spacing[4] }}>
              <Card>
              <View
                style={[
                  styles.infoBox,
                  {
                    backgroundColor: theme.colors.state.selection.bg,
                    padding: theme.spacing[4],
                    borderRadius: theme.borderRadius.md,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.infoTitle,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.base,
                      fontFamily: theme.typography.fontFamily.semibold,
                      marginBottom: theme.spacing[2],
                    },
                  ]}
                >
                  What's next?
                </Text>
                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.normal,
                      lineHeight: 20,
                      marginBottom: theme.spacing[2],
                    },
                  ]}
                >
                  1. Check your email inbox for a reset link
                </Text>
                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.normal,
                      lineHeight: 20,
                      marginBottom: theme.spacing[2],
                    },
                  ]}
                >
                  2. Click the link to create a new password
                </Text>
                <Text
                  style={[
                    styles.infoText,
                    {
                      color: theme.colors.text.primary,
                      fontSize: theme.typography.fontSize.sm,
                      fontFamily: theme.typography.fontFamily.normal,
                      lineHeight: 20,
                    },
                  ]}
                >
                  3. Log in with your new password
                </Text>
              </View>
              </Card>
            </View>

            <View style={{ marginBottom: theme.spacing[4] }}>
              <Banner
                variant="info"
                title="For security, reset links expire after a short time. If you don't see the email, check your spam folder."
              />
            </View>

            <Button
              onPress={() => router.push('/(auth)/login')}
              variant="primary"
              size="lg"
              title="Back to Login"
            />

            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.text.muted,
                  fontSize: theme.typography.fontSize.sm,
                  fontFamily: theme.typography.fontFamily.normal,
                  marginTop: theme.spacing[4],
                },
              ]}
            >
              Didn't receive an email?{' '}
              <Text
                onPress={() => setSuccess(false)}
                style={[
                  styles.link,
                  {
                    color: theme.colors.primary.bg,
                    fontFamily: theme.typography.fontFamily.semibold,
                  },
                ]}
              >
                Try again
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

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
          testID="screen-reset-password"
          style={styles.content}
        >
          <View style={styles.header}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: theme.colors.state.selection.bg,
                  marginBottom: theme.spacing[4],
                },
              ]}
            >
              <KeyRound
                size={32}
                color={theme.colors.primary.bg}
                strokeWidth={2}
              />
            </View>
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
              Reset Password
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
              Enter your email and we'll send you a link to reset your password
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
                helperText="We'll send a password reset link to this email"
              />

              <Button
                onPress={handleSendResetLink}
                variant="primary"
                size="lg"
                title="Send Reset Link"
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
            Remember your password?{' '}
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
              Back to login
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
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  infoBox: {},
  infoTitle: {},
  infoText: {},
  link: {},
  footerText: {
    textAlign: 'center',
  },
});
