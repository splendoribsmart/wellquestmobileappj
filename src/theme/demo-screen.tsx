import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from './index';
import { checkContrast } from '@utils/contrastCheck';

export default function ThemeDemoScreen() {
  const { theme, mode, setMode } = useTheme();

  const colorSwatches = [
    { name: 'Primary', token: theme.colors.primary },
    { name: 'Secondary', token: theme.colors.secondary },
    { name: 'Surface', token: theme.colors.surface },
    { name: 'Success', token: theme.colors.feedback.success },
    { name: 'Warning', token: theme.colors.feedback.warning },
    { name: 'Danger', token: theme.colors.feedback.danger },
  ];

  const typographySamples = [
    { name: '5xl / Bold', size: theme.typography.fontSize['5xl'], weight: theme.typography.fontFamily.bold },
    { name: '4xl / Bold', size: theme.typography.fontSize['4xl'], weight: theme.typography.fontFamily.bold },
    { name: '3xl / SemiBold', size: theme.typography.fontSize['3xl'], weight: theme.typography.fontFamily.semibold },
    { name: '2xl / SemiBold', size: theme.typography.fontSize['2xl'], weight: theme.typography.fontFamily.semibold },
    { name: 'xl / Medium', size: theme.typography.fontSize.xl, weight: theme.typography.fontFamily.medium },
    { name: 'lg / Medium', size: theme.typography.fontSize.lg, weight: theme.typography.fontFamily.medium },
    { name: 'base / Normal', size: theme.typography.fontSize.base, weight: theme.typography.fontFamily.normal },
    { name: 'sm / Normal', size: theme.typography.fontSize.sm, weight: theme.typography.fontFamily.normal },
    { name: 'xs / Normal', size: theme.typography.fontSize.xs, weight: theme.typography.fontFamily.normal },
  ];

  const spacingSamples = [
    { name: '0', value: theme.spacing[0] },
    { name: '1 (4dp)', value: theme.spacing[1] },
    { name: '2 (8dp)', value: theme.spacing[2] },
    { name: '3 (12dp)', value: theme.spacing[3] },
    { name: '4 (16dp)', value: theme.spacing[4] },
    { name: '5 (20dp)', value: theme.spacing[5] },
    { name: '6 (24dp)', value: theme.spacing[6] },
    { name: '8 (32dp)', value: theme.spacing[8] },
    { name: '10 (40dp)', value: theme.spacing[10] },
  ];

  const borderRadiusSamples = [
    { name: 'sm (6)', value: theme.borderRadius.sm },
    { name: 'md (10)', value: theme.borderRadius.md },
    { name: 'lg (14)', value: theme.borderRadius.lg },
    { name: 'xl (18)', value: theme.borderRadius.xl },
    { name: '2xl (24)', value: theme.borderRadius['2xl'] },
    { name: 'full', value: theme.borderRadius.full },
  ];

  const contrastCheck = checkContrast(
    theme.colors.text.primary,
    theme.colors.surface.bg
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.surface.alt }]}
      contentContainerStyle={styles.content}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.surface.bg }]}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize['3xl'],
              fontFamily: theme.typography.fontFamily.bold,
            },
          ]}
        >
          WellQuestPRO Theme Demo
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: theme.colors.text.muted,
              fontSize: theme.typography.fontSize.base,
              fontFamily: theme.typography.fontFamily.normal,
            },
          ]}
        >
          Current Mode: {mode}
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface.bg }]}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.xl,
              fontFamily: theme.typography.fontFamily.semibold,
            },
          ]}
        >
          Theme Switcher
        </Text>
        <View style={styles.buttonGroup}>
          {(['light', 'dark', 'high-contrast'] as const).map((themeMode) => (
            <TouchableOpacity
              key={themeMode}
              style={[
                styles.button,
                {
                  backgroundColor:
                    mode === themeMode
                      ? theme.colors.primary.bg
                      : theme.colors.surface.alt,
                  borderColor: theme.colors.surface.border,
                  borderRadius: theme.borderRadius.md,
                  paddingVertical: theme.spacing[2],
                  paddingHorizontal: theme.spacing[4],
                },
              ]}
              onPress={() => setMode(themeMode)}
            >
              <Text
                style={[
                  {
                    color:
                      mode === themeMode
                        ? theme.colors.primary.fg
                        : theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.sm,
                    fontFamily: theme.typography.fontFamily.medium,
                  },
                ]}
              >
                {themeMode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface.bg }]}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.xl,
              fontFamily: theme.typography.fontFamily.semibold,
            },
          ]}
        >
          Color Palette
        </Text>
        <View style={styles.swatchGrid}>
          {colorSwatches.map((swatch) => (
            <View key={swatch.name} style={styles.swatchContainer}>
              <View
                style={[
                  styles.swatch,
                  {
                    backgroundColor: swatch.token.bg,
                    borderColor: theme.colors.surface.border,
                    borderRadius: theme.borderRadius.md,
                  },
                ]}
              />
              <Text
                style={[
                  styles.swatchLabel,
                  {
                    color: theme.colors.text.muted,
                    fontSize: theme.typography.fontSize.xs,
                    fontFamily: theme.typography.fontFamily.normal,
                  },
                ]}
              >
                {swatch.name}
              </Text>
              <Text
                style={[
                  styles.swatchValue,
                  {
                    color: theme.colors.text.muted,
                    fontSize: theme.typography.fontSize.xs,
                    fontFamily: theme.typography.fontFamily.normal,
                  },
                ]}
              >
                {swatch.token.bg}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface.bg }]}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.xl,
              fontFamily: theme.typography.fontFamily.semibold,
            },
          ]}
        >
          Typography
        </Text>
        {typographySamples.map((sample) => (
          <View key={sample.name} style={styles.typographyRow}>
            <Text
              style={{
                color: theme.colors.text.primary,
                fontSize: sample.size,
                fontFamily: sample.weight,
                marginBottom: theme.spacing[1],
              }}
            >
              The quick brown fox
            </Text>
            <Text
              style={{
                color: theme.colors.text.muted,
                fontSize: theme.typography.fontSize.xs,
                fontFamily: theme.typography.fontFamily.normal,
              }}
            >
              {sample.name}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface.bg }]}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.xl,
              fontFamily: theme.typography.fontFamily.semibold,
            },
          ]}
        >
          Spacing Scale
        </Text>
        {spacingSamples.map((sample) => (
          <View key={sample.name} style={styles.spacingRow}>
            <View
              style={[
                styles.spacingBar,
                {
                  width: sample.value,
                  height: theme.spacing[4],
                  backgroundColor: theme.colors.primary.bg,
                  borderRadius: theme.borderRadius.sm,
                },
              ]}
            />
            <Text
              style={{
                color: theme.colors.text.muted,
                fontSize: theme.typography.fontSize.sm,
                fontFamily: theme.typography.fontFamily.normal,
                marginLeft: theme.spacing[2],
              }}
            >
              {sample.name}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface.bg }]}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.xl,
              fontFamily: theme.typography.fontFamily.semibold,
            },
          ]}
        >
          Border Radius
        </Text>
        <View style={styles.radiusGrid}>
          {borderRadiusSamples.map((sample) => (
            <View key={sample.name} style={styles.radiusContainer}>
              <View
                style={[
                  styles.radiusBox,
                  {
                    backgroundColor: theme.colors.primary.bg,
                    borderRadius: sample.value,
                  },
                ]}
              />
              <Text
                style={[
                  styles.radiusLabel,
                  {
                    color: theme.colors.text.muted,
                    fontSize: theme.typography.fontSize.xs,
                    fontFamily: theme.typography.fontFamily.normal,
                  },
                ]}
              >
                {sample.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.surface.bg }]}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.xl,
              fontFamily: theme.typography.fontFamily.semibold,
            },
          ]}
        >
          Accessibility
        </Text>
        <View style={styles.accessibilityInfo}>
          <Text
            style={{
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.sm,
              fontFamily: theme.typography.fontFamily.normal,
            }}
          >
            Text / Background Contrast
          </Text>
          <Text
            style={{
              color: theme.colors.text.muted,
              fontSize: theme.typography.fontSize.sm,
              fontFamily: theme.typography.fontFamily.normal,
            }}
          >
            Ratio: {contrastCheck.ratio}:1
          </Text>
          <Text
            style={{
              color: contrastCheck.meetsAA
                ? theme.colors.feedback.success.bg
                : theme.colors.feedback.danger.bg,
              fontSize: theme.typography.fontSize.sm,
              fontFamily: theme.typography.fontFamily.medium,
            }}
          >
            WCAG Level: {contrastCheck.level}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 10,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {},
  section: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  button: {
    borderWidth: 1,
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  swatchContainer: {
    alignItems: 'center',
    width: 100,
  },
  swatch: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderWidth: 1,
  },
  swatchLabel: {
    marginBottom: 2,
  },
  swatchValue: {
    fontSize: 10,
  },
  typographyRow: {
    marginBottom: 16,
  },
  spacingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  spacingBar: {},
  radiusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  radiusContainer: {
    alignItems: 'center',
  },
  radiusBox: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  radiusLabel: {},
  accessibilityInfo: {
    gap: 8,
  },
});
