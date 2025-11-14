import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@theme/index';

interface RadioProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Radio({ label, checked, onChange, disabled = false }: RadioProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? theme.opacity.disabled : 1,
      }}
      activeOpacity={theme.opacity.pressed}
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: theme.borderRadius.full,
          borderWidth: theme.borderWidth.thick,
          borderColor: checked ? theme.colors.primary.bg : theme.colors.surface.border,
          backgroundColor: theme.colors.surface.bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: theme.borderRadius.full,
              backgroundColor: theme.colors.primary.bg,
            }}
          />
        )}
      </View>
      {label && (
        <Text
          style={{
            marginLeft: theme.spacing[2],
            fontSize: theme.typography.fontSize.base,
            fontFamily: theme.typography.fontFamily.normal,
            color: theme.colors.text.primary,
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
