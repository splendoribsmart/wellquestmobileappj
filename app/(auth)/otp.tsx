import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from '@theme/index';
import { Button, Input, Card, Banner } from '@components/ui';
import { Shield } from 'lucide-react-native';

export default function OtpScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const validateCode = () => {
    if (!code.trim()) {
      setError('Verification code is required');
      return false;
    }
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return false;
    }
    if (!/^\d+$/.test(code)) {
      setError('Code must contain only numbers');
      return false;
    }
    return true;
  };

  const handleVerifyCode = async () => {
    setError('');

    if (!validateCode()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log('OTP verified:', code);
      router.replace('/(auth)/login');
    }, 1000);
  };

  const handleResendCode = () => {
    if (!canResend) return;

    console.log('Resend OTP requested');
    setCanResend(false);
    setCountdown(60);
    setCode('');
    setError('');
  };

  const maskedEmail = 'john***@mail.com';

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
          testID="screen-otp"
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
              <Shield
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
              Verify Code
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
              We've sent a 6-digit code to {maskedEmail}. Enter it below to continue.
            </Text>
          </View>

          <View style={{ marginBottom: theme.spacing[4] }}>
            <Banner
              variant="info"
              title="For demo purposes, any 6-digit code will be accepted."
            />
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
                label="Verification Code"
                value={code}
                onChangeText={setCode}
                placeholder="000000"
                keyboardType="number-pad"
                maxLength={6}
                autoCapitalize="none"
                helperText="Enter the 6-digit code sent to your email"
              />

              <Button
                onPress={handleVerifyCode}
                variant="primary"
                size="lg"
                title="Verify Code"
                isLoading={isLoading}
                disabled={code.length !== 6}
              />
            </View>
            </Card>
          </View>

          <View style={styles.resendSection}>
            {!canResend ? (
              <Text
                style={[
                  styles.resendText,
                  {
                    color: theme.colors.text.muted,
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.normal,
                  },
                ]}
              >
                Resend code in {countdown}s
              </Text>
            ) : (
              <Text
                style={[
                  styles.resendText,
                  {
                    color: theme.colors.text.muted,
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.normal,
                  },
                ]}
              >
                Didn't receive a code?{' '}
                <Text
                  onPress={handleResendCode}
                  style={[
                    styles.link,
                    {
                      color: theme.colors.primary.bg,
                      fontFamily: theme.typography.fontFamily.semibold,
                    },
                  ]}
                >
                  Resend
                </Text>
              </Text>
            )}
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
  resendSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resendText: {
    textAlign: 'center',
  },
  link: {},
  footerText: {
    textAlign: 'center',
  },
});
