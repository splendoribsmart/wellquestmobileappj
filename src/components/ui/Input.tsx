import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@theme/index';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDisabled?: boolean;
}

export function Input({
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  isDisabled = false,
  value,
  onChangeText,
  placeholder,
  ...rest
}: InputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!errorText;

  const getContainerStyle = (): ViewStyle => {
    let borderColor = theme.colors.surface.border;

    if (hasError) {
      borderColor = theme.colors.feedback.danger.bg;
    } else if (isFocused) {
      borderColor = theme.colors.outline.focus;
    }

    return {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDisabled ? theme.colors.state.hover.bg : theme.colors.surface.bg,
      borderColor,
      borderWidth: theme.borderWidth.thin,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[2],
      opacity: isDisabled ? theme.opacity.disabled : 1,
    };
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.sm,
              fontFamily: theme.typography.fontFamily.medium,
              marginBottom: theme.spacing[1],
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View style={getContainerStyle()}>
        {leftIcon && <View style={{ marginRight: theme.spacing[2] }}>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.muted}
          editable={!isDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            flex: 1,
            fontSize: theme.typography.fontSize.base,
            fontFamily: theme.typography.fontFamily.normal,
            color: theme.colors.text.primary,
            paddingVertical: theme.spacing[1],
          }}
          {...rest}
        />
        {rightIcon && <View style={{ marginLeft: theme.spacing[2] }}>{rightIcon}</View>}
      </View>
      {errorText && (
        <Text
          style={{
            color: theme.colors.feedback.danger.bg,
            fontSize: theme.typography.fontSize.sm,
            fontFamily: theme.typography.fontFamily.normal,
            marginTop: theme.spacing[1],
          }}
        >
          {errorText}
        </Text>
      )}
      {helperText && !errorText && (
        <Text
          style={{
            color: theme.colors.text.muted,
            fontSize: theme.typography.fontSize.sm,
            fontFamily: theme.typography.fontFamily.normal,
            marginTop: theme.spacing[1],
          }}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {},
});
