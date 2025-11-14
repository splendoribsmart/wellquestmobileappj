import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@theme/index';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  accessibilityLabel?: string;
}

export function Button({
  title,
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  accessibilityLabel,
}: ButtonProps) {
  const { theme } = useTheme();

  const isDisabled = disabled || isLoading;

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      borderWidth: theme.borderWidth.thin,
    };

    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      sm: {
        paddingVertical: theme.spacing[1],
        paddingHorizontal: theme.spacing[3],
      },
      md: {
        paddingVertical: theme.spacing[2],
        paddingHorizontal: theme.spacing[4],
      },
      lg: {
        paddingVertical: theme.spacing[3],
        paddingHorizontal: theme.spacing[6],
      },
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: theme.colors.primary.bg,
        borderColor: theme.colors.primary.border,
      },
      secondary: {
        backgroundColor: theme.colors.secondary.bg,
        borderColor: theme.colors.secondary.border,
      },
      danger: {
        backgroundColor: theme.colors.feedback.danger.bg,
        borderColor: theme.colors.feedback.danger.border,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: theme.colors.surface.border,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: isDisabled ? theme.opacity.disabled : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles: Record<ButtonSize, TextStyle> = {
      sm: {
        fontSize: theme.typography.fontSize.sm,
      },
      md: {
        fontSize: theme.typography.fontSize.base,
      },
      lg: {
        fontSize: theme.typography.fontSize.lg,
      },
    };

    const variantStyles: Record<ButtonVariant, TextStyle> = {
      primary: {
        color: theme.colors.primary.fg,
      },
      secondary: {
        color: theme.colors.secondary.fg,
      },
      danger: {
        color: theme.colors.feedback.danger.fg,
      },
      ghost: {
        color: theme.colors.primary.bg,
      },
      outline: {
        color: theme.colors.text.primary,
      },
    };

    return {
      fontFamily: theme.typography.fontFamily.semibold,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={getButtonStyle()}
      activeOpacity={theme.opacity.pressed}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: isDisabled }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary.bg : theme.colors.primary.fg}
        />
      ) : (
        <>
          {leftIcon && <View style={{ marginRight: theme.spacing[2] }}>{leftIcon}</View>}
          <Text style={getTextStyle()}>{children || title}</Text>
          {rightIcon && <View style={{ marginLeft: theme.spacing[2] }}>{rightIcon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
}
