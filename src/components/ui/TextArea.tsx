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

interface TextAreaProps extends Omit<TextInputProps, 'style' | 'multiline'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  isDisabled?: boolean;
  minHeight?: number;
}

export function TextArea({
  label,
  helperText,
  errorText,
  isDisabled = false,
  minHeight = 100,
  value,
  onChangeText,
  placeholder,
  ...rest
}: TextAreaProps) {
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
      backgroundColor: isDisabled ? theme.colors.state.hover.bg : theme.colors.surface.bg,
      borderColor,
      borderWidth: theme.borderWidth.thin,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[2],
      minHeight,
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
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.muted}
          editable={!isDisabled}
          multiline
          textAlignVertical="top"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            flex: 1,
            fontSize: theme.typography.fontSize.base,
            fontFamily: theme.typography.fontFamily.normal,
            color: theme.colors.text.primary,
            minHeight: minHeight - theme.spacing[4],
          }}
          {...rest}
        />
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
