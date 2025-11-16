import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@theme/index';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
  count?: number;
}

export function FilterChip({ label, isSelected, onPress, icon, count }: FilterChipProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        {
          backgroundColor: isSelected
            ? theme.colors.primary.bg
            : theme.colors.surface.alt,
          borderColor: isSelected
            ? theme.colors.primary.bg
            : theme.colors.surface.border,
          paddingHorizontal: theme.spacing[3],
          paddingVertical: theme.spacing[2],
          borderRadius: theme.borderRadius.full,
        },
      ]}
    >
      <View style={styles.chipContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text
          style={[
            styles.chipText,
            {
              color: isSelected ? '#FFFFFF' : theme.colors.text.primary,
              fontSize: theme.typography.fontSize.sm,
              fontFamily: isSelected
                ? theme.typography.fontFamily.semibold
                : theme.typography.fontFamily.medium,
            },
          ]}
        >
          {label}
        </Text>
        {count !== undefined && count > 0 && (
          <View
            style={[
              styles.countBadge,
              {
                backgroundColor: isSelected
                  ? 'rgba(255, 255, 255, 0.2)'
                  : theme.colors.surface.border,
                marginLeft: theme.spacing[1],
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: theme.borderRadius.full,
              },
            ]}
          >
            <Text
              style={[
                styles.countText,
                {
                  color: isSelected ? '#FFFFFF' : theme.colors.text.muted,
                  fontSize: theme.typography.fontSize.xs,
                  fontFamily: theme.typography.fontFamily.semibold,
                },
              ]}
            >
              {count}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconContainer: {
    marginRight: 2,
  },
  chipText: {
    textAlign: 'center',
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
  },
  countText: {
    textAlign: 'center',
  },
});
