import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';

type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';

interface ProgressProps {
  value: number;
  variant?: ProgressVariant;
  showLabel?: boolean;
}

export function Progress({ value, variant = 'default', showLabel = false }: ProgressProps) {
  const { theme } = useTheme();

  const clampedValue = Math.min(Math.max(value, 0), 100);

  const getProgressColor = () => {
    const colors: Record<ProgressVariant, string> = {
      default: theme.colors.primary.bg,
      success: theme.colors.feedback.success.bg,
      warning: theme.colors.feedback.warning.bg,
      danger: theme.colors.feedback.danger.bg,
    };
    return colors[variant];
  };

  return (
    <View style={{ width: '100%' }}>
      {showLabel && (
        <Text
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontFamily: theme.typography.fontFamily.medium,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing[1],
          }}
        >
          {clampedValue}%
        </Text>
      )}
      <View
        style={{
          height: 8,
          backgroundColor: theme.colors.surface.border,
          borderRadius: theme.borderRadius.full,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: '100%',
            width: `${clampedValue}%`,
            backgroundColor: getProgressColor(),
            borderRadius: theme.borderRadius.full,
          }}
        />
      </View>
    </View>
  );
}
