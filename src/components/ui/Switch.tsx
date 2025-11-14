import React from 'react';
import { Switch as RNSwitch, Platform } from 'react-native';
import { useTheme } from '@theme/index';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ checked, onChange, disabled = false }: SwitchProps) {
  const { theme } = useTheme();

  return (
    <RNSwitch
      value={checked}
      onValueChange={onChange}
      disabled={disabled}
      trackColor={{
        false: theme.colors.surface.border,
        true: theme.colors.primary.bg,
      }}
      thumbColor={theme.colors.surface.bg}
      ios_backgroundColor={theme.colors.surface.border}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
    />
  );
}
