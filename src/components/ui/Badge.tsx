import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@theme/index';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

export function Badge({ children, variant = 'neutral', size = 'md', icon }: BadgeProps) {
  const { theme } = useTheme();

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.borderRadius.full,
      borderWidth: theme.borderWidth.thin,
    };

    const sizeStyles: Record<BadgeSize, ViewStyle> = {
      sm: {
        paddingVertical: theme.spacing[1] / 2,
        paddingHorizontal: theme.spacing[2],
      },
      md: {
        paddingVertical: theme.spacing[1],
        paddingHorizontal: theme.spacing[3],
      },
    };

    const variantStyles: Record<BadgeVariant, ViewStyle> = {
      primary: {
        backgroundColor: theme.colors.primary.bg,
        borderColor: theme.colors.primary.border,
      },
      secondary: {
        backgroundColor: theme.colors.secondary.bg,
        borderColor: theme.colors.secondary.border,
      },
      success: {
        backgroundColor: theme.colors.feedback.success.bg,
        borderColor: theme.colors.feedback.success.border,
      },
      warning: {
        backgroundColor: theme.colors.feedback.warning.bg,
        borderColor: theme.colors.feedback.warning.border,
      },
      danger: {
        backgroundColor: theme.colors.feedback.danger.bg,
        borderColor: theme.colors.feedback.danger.border,
      },
      info: {
        backgroundColor: theme.colors.state.selection.bg,
        borderColor: theme.colors.primary.border,
      },
      neutral: {
        backgroundColor: theme.colors.state.hover.bg,
        borderColor: theme.colors.surface.border,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles: Record<BadgeSize, TextStyle> = {
      sm: {
        fontSize: theme.typography.fontSize.xs,
      },
      md: {
        fontSize: theme.typography.fontSize.sm,
      },
    };

    const variantStyles: Record<BadgeVariant, TextStyle> = {
      primary: {
        color: theme.colors.primary.fg,
      },
      secondary: {
        color: theme.colors.secondary.fg,
      },
      success: {
        color: theme.colors.feedback.success.fg,
      },
      warning: {
        color: theme.colors.feedback.warning.fg,
      },
      danger: {
        color: theme.colors.feedback.danger.fg,
      },
      info: {
        color: theme.colors.primary.bg,
      },
      neutral: {
        color: theme.colors.text.primary,
      },
    };

    return {
      fontFamily: theme.typography.fontFamily.medium,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const iconSize = size === 'sm' ? 12 : 16;

  return (
    <View style={getContainerStyle()}>
      {icon && <View style={{ marginRight: theme.spacing[1] }}>{icon}</View>}
      <Text style={getTextStyle()}>{children}</Text>
    </View>
  );
}
