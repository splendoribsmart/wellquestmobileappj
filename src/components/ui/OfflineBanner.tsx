import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WifiOff, RefreshCw } from 'lucide-react-native';
import { useTheme } from '@theme/index';

interface OfflineBannerProps {
  onRetry?: () => void;
}

export function OfflineBanner({ onRetry }: OfflineBannerProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.feedback.danger.bg,
        paddingVertical: theme.spacing[2],
        paddingHorizontal: theme.spacing[4],
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <WifiOff size={20} color={theme.colors.feedback.danger.fg} />
        <Text
          style={{
            marginLeft: theme.spacing[2],
            fontSize: theme.typography.fontSize.sm,
            fontFamily: theme.typography.fontFamily.medium,
            color: theme.colors.feedback.danger.fg,
          }}
        >
          You are offline
        </Text>
      </View>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: theme.spacing[1],
            paddingHorizontal: theme.spacing[2],
          }}
          accessibilityRole="button"
          accessibilityLabel="Retry connection"
        >
          <RefreshCw size={16} color={theme.colors.feedback.danger.fg} />
          <Text
            style={{
              marginLeft: theme.spacing[1],
              fontSize: theme.typography.fontSize.sm,
              fontFamily: theme.typography.fontFamily.semibold,
              color: theme.colors.feedback.danger.fg,
            }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
