import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { useTheme } from '@theme/index';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
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
      <View
        style={{
          marginBottom: theme.spacing[4],
          opacity: 0.5,
        }}
      >
        {icon || <Inbox size={64} color={theme.colors.text.muted} />}
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
      {actionLabel && onAction && (
        <Button onPress={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </View>
  );
}
