import React from 'react';
import { View, Text, PanResponder, Animated, LayoutChangeEvent } from 'react-native';
import { useTheme } from '@theme/index';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
}

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = false,
}: SliderProps) {
  const { theme } = useTheme();
  const [sliderWidth, setSliderWidth] = React.useState(0);

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: () => {},
        onPanResponderMove: (_, gestureState) => {
          if (sliderWidth === 0) return;

          const position = Math.max(0, Math.min(gestureState.moveX, sliderWidth));
          const percent = position / sliderWidth;
          let newValue = min + percent * (max - min);

          if (step > 0) {
            newValue = Math.round(newValue / step) * step;
          }

          newValue = Math.max(min, Math.min(max, newValue));
          onValueChange(newValue);
        },
        onPanResponderRelease: () => {},
      }),
    [disabled, sliderWidth, min, max, step, onValueChange]
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    setSliderWidth(event.nativeEvent.layout.width);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <View style={{ opacity: disabled ? theme.opacity.disabled : 1 }}>
      {showValue && (
        <Text
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontFamily: theme.typography.fontFamily.medium,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing[2],
            textAlign: 'center',
          }}
        >
          {Math.round(value)}
        </Text>
      )}
      <View
        style={{
          height: 40,
          justifyContent: 'center',
        }}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
      >
        <View
          style={{
            height: 4,
            backgroundColor: theme.colors.surface.border,
            borderRadius: theme.borderRadius.full,
          }}
        />
        <View
          style={{
            height: 4,
            backgroundColor: theme.colors.primary.bg,
            borderRadius: theme.borderRadius.full,
            position: 'absolute',
            width: `${percentage}%`,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: `${percentage}%`,
            marginLeft: -10,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: theme.borderRadius.full,
              backgroundColor: theme.colors.primary.bg,
              borderWidth: 3,
              borderColor: theme.colors.surface.bg,
              ...theme.shadows.sm,
            }}
          />
        </View>
      </View>
    </View>
  );
}
