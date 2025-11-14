import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react-native';
import { useTheme } from '@theme/index';

type BannerVariant = 'info' | 'success' | 'warning' | 'danger';

interface BannerProps {
  variant?: BannerVariant;
  title: string;
  description?: string;
  onClose?: () => void;
}

export function Banner({ variant = 'info', title, description, onClose }: BannerProps) {
  const { theme } = useTheme();

  const getVariantStyles = () => {
    const styles: Record<BannerVariant, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
      info: {
        bg: theme.colors.state.selection.bg,
        border: theme.colors.primary.border,
        text: theme.colors.primary.bg,
        icon: <Info size={20} color={theme.colors.primary.bg} />,
      },
      success: {
        bg: `${theme.colors.feedback.success.bg}20`,
        border: theme.colors.feedback.success.border,
        text: theme.colors.feedback.success.bg,
        icon: <CheckCircle size={20} color={theme.colors.feedback.success.bg} />,
      },
      warning: {
        bg: `${theme.colors.feedback.warning.bg}20`,
        border: theme.colors.feedback.warning.border,
        text: theme.colors.feedback.warning.bg,
        icon: <AlertTriangle size={20} color={theme.colors.feedback.warning.bg} />,
      },
      danger: {
        bg: `${theme.colors.feedback.danger.bg}20`,
        border: theme.colors.feedback.danger.border,
        text: theme.colors.feedback.danger.bg,
        icon: <AlertCircle size={20} color={theme.colors.feedback.danger.bg} />,
      },
    };
    return styles[variant];
  };

  const variantStyles = getVariantStyles();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: variantStyles.bg,
        borderLeftWidth: 4,
        borderLeftColor: variantStyles.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing[3],
      }}
    >
      <View style={{ marginRight: theme.spacing[2], marginTop: 2 }}>{variantStyles.icon}</View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: theme.typography.fontSize.base,
            fontFamily: theme.typography.fontFamily.semibold,
            color: variantStyles.text,
            marginBottom: description ? theme.spacing[1] : 0,
          }}
        >
          {title}
        </Text>
        {description && (
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontFamily: theme.typography.fontFamily.normal,
              color: theme.colors.text.primary,
            }}
          >
            {description}
          </Text>
        )}
      </View>
      {onClose && (
        <TouchableOpacity
          onPress={onClose}
          style={{ marginLeft: theme.spacing[2] }}
          accessibilityRole="button"
          accessibilityLabel="Close banner"
        >
          <X size={20} color={theme.colors.text.muted} />
        </TouchableOpacity>
      )}
    </View>
  );
}
