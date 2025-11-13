import { Theme } from '@theme/tokens';

export function getThemeColors(theme: Theme) {
  return {
    background: theme.colors.surface.bg,
    surface: theme.colors.surface.bg,
    text: theme.colors.text.primary,
    textSecondary: theme.colors.text.muted,
    primary: theme.colors.primary.bg,
    onPrimary: theme.colors.primary.fg,
    border: theme.colors.surface.border,
  };
}
