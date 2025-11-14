import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { useTheme } from '@theme/index';
import { Button } from './Button';

interface ErrorStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onRetry?: () => void;
}

export function ErrorState({ title, description, actionLabel = 'Try Again', onRetry }: ErrorStateProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing[8],
      }}
    >
      <View style={{ marginBottom: theme.spacing[4] }}>
        <AlertCircle size={64} color={theme.colors.feedback.danger.bg} />
      </View>
      <Text
        style={{
          fontSize: theme.typography.fontSize['2xl'],
          fontFamily: theme.typography.fontFamily.semibold,
          color: theme.colors.text.primary,
          textAlign: 'center',
          marginBottom: theme.spacing[2],
        }}
      >
        {title}
      </Text>
      {description && (
        <Text
          style={{
            fontSize: theme.typography.fontSize.base,
            fontFamily: theme.typography.fontFamily.normal,
            color: theme.colors.text.muted,
            textAlign: 'center',
            marginBottom: theme.spacing[4],
            maxWidth: 400,
          }}
        >
          {description}
        </Text>
      )}
      {onRetry && (
        <Button onPress={onRetry} variant="primary">
          {actionLabel}
        </Button>
      )}
    </View>
  );
}
