import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '@theme/index';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
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
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: theme.borderRadius.sm,
          borderWidth: theme.borderWidth.thick,
          borderColor: checked ? theme.colors.primary.bg : theme.colors.surface.border,
          backgroundColor: checked ? theme.colors.primary.bg : theme.colors.surface.bg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && <Check size={14} color={theme.colors.primary.fg} strokeWidth={3} />}
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
