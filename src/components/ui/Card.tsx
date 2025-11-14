import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@theme/index';

type CardVariant = 'default' | 'bordered' | 'elevated';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ children, variant = 'default', header, footer }: CardProps) {
  const { theme } = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: theme.colors.surface.bg,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[4],
    };

    const variantStyles: Record<CardVariant, ViewStyle> = {
      default: {
        backgroundColor: theme.colors.surface.bg,
      },
      bordered: {
        borderWidth: theme.borderWidth.thin,
        borderColor: theme.colors.surface.border,
      },
      elevated: {
        ...theme.shadows.md,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  return (
    <View style={getCardStyle()}>
      {header && (
        <View
          style={{
            marginBottom: theme.spacing[3],
            paddingBottom: theme.spacing[3],
            borderBottomWidth: theme.borderWidth.hairline,
            borderBottomColor: theme.colors.surface.border,
          }}
        >
          {header}
        </View>
      )}
      <View>{children}</View>
      {footer && (
        <View
          style={{
            marginTop: theme.spacing[3],
            paddingTop: theme.spacing[3],
            borderTopWidth: theme.borderWidth.hairline,
            borderTopColor: theme.colors.surface.border,
          }}
        >
          {footer}
        </View>
      )}
    </View>
  );
}
