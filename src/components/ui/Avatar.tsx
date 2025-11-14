import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@theme/index';

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarStatus = 'online' | 'offline' | 'away';

interface AvatarProps {
  initials?: string;
  imageUrl?: string;
  status?: AvatarStatus;
  size?: AvatarSize;
}

export function Avatar({ initials, imageUrl, status, size = 'md' }: AvatarProps) {
  const { theme } = useTheme();

  const sizeMap: Record<AvatarSize, number> = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  const fontSizeMap: Record<AvatarSize, number> = {
    sm: theme.typography.fontSize.sm,
    md: theme.typography.fontSize.lg,
    lg: theme.typography.fontSize['2xl'],
  };

  const statusSizeMap: Record<AvatarSize, number> = {
    sm: 8,
    md: 12,
    lg: 16,
  };

  const avatarSize = sizeMap[size];
  const fontSize = fontSizeMap[size];
  const statusSize = statusSizeMap[size];

  const getStatusColor = () => {
    if (!status) return null;
    const colors: Record<AvatarStatus, string> = {
      online: theme.colors.feedback.success.bg,
      offline: theme.colors.text.muted,
      away: theme.colors.feedback.warning.bg,
    };
    return colors[status];
  };

  return (
    <View style={{ position: 'relative' }}>
      <View
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.primary.bg,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: avatarSize, height: avatarSize }}
            resizeMode="cover"
          />
        ) : (
          <Text
            style={{
              fontSize,
              fontFamily: theme.typography.fontFamily.semibold,
              color: theme.colors.primary.fg,
            }}
          >
            {initials || '?'}
          </Text>
        )}
      </View>
      {status && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: statusSize,
            height: statusSize,
            borderRadius: theme.borderRadius.full,
            backgroundColor: getStatusColor()!,
            borderWidth: 2,
            borderColor: theme.colors.surface.bg,
          }}
        />
      )}
    </View>
  );
}
