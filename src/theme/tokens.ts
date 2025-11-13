export const baseColors = {
  primary: '#208f90',
  primaryLight: '#3abfbf',
  secondary: '#3abfbf',
  success: '#16a34a',
  warning: '#f59e42',
  danger: '#dc2626',
  backgroundBase: '#f3f2ee',
  surface: '#ffffff',
  textPrimary: '#1e293b',
  textMuted: '#64748b',
  black: '#000000',
  white: '#ffffff',
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

export type ThemeMode = 'light' | 'dark' | 'high-contrast';

export interface ColorToken {
  bg: string;
  fg: string;
  border: string;
}

export interface ThemeColors {
  primary: ColorToken;
  secondary: ColorToken;
  surface: {
    bg: string;
    alt: string;
    border: string;
  };
  text: {
    primary: string;
    muted: string;
    inverse: string;
  };
  feedback: {
    success: ColorToken;
    warning: ColorToken;
    danger: ColorToken;
  };
  outline: {
    focus: string;
  };
  overlay: {
    backdrop: string;
  };
  state: {
    hover: {
      bg: string;
    };
    active: {
      bg: string;
    };
    selection: {
      bg: string;
    };
    skeleton: {
      bg: string;
      fg: string;
    };
  };
}

export const lightTheme: ThemeColors = {
  primary: {
    bg: baseColors.primary,
    fg: baseColors.white,
    border: baseColors.primary,
  },
  secondary: {
    bg: baseColors.secondary,
    fg: baseColors.white,
    border: baseColors.secondary,
  },
  surface: {
    bg: baseColors.surface,
    alt: baseColors.backgroundBase,
    border: baseColors.gray[200],
  },
  text: {
    primary: baseColors.textPrimary,
    muted: baseColors.textMuted,
    inverse: baseColors.white,
  },
  feedback: {
    success: {
      bg: baseColors.success,
      fg: baseColors.white,
      border: baseColors.success,
    },
    warning: {
      bg: baseColors.warning,
      fg: baseColors.white,
      border: baseColors.warning,
    },
    danger: {
      bg: baseColors.danger,
      fg: baseColors.white,
      border: baseColors.danger,
    },
  },
  outline: {
    focus: baseColors.primaryLight,
  },
  overlay: {
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  state: {
    hover: {
      bg: baseColors.gray[100],
    },
    active: {
      bg: baseColors.gray[200],
    },
    selection: {
      bg: 'rgba(32, 143, 144, 0.1)',
    },
    skeleton: {
      bg: baseColors.gray[200],
      fg: baseColors.gray[300],
    },
  },
};

export const darkTheme: ThemeColors = {
  primary: {
    bg: baseColors.primaryLight,
    fg: baseColors.gray[900],
    border: baseColors.primaryLight,
  },
  secondary: {
    bg: baseColors.secondary,
    fg: baseColors.gray[900],
    border: baseColors.secondary,
  },
  surface: {
    bg: baseColors.gray[900],
    alt: baseColors.gray[800],
    border: baseColors.gray[700],
  },
  text: {
    primary: baseColors.gray[50],
    muted: baseColors.gray[400],
    inverse: baseColors.gray[900],
  },
  feedback: {
    success: {
      bg: '#22c55e',
      fg: baseColors.gray[900],
      border: '#22c55e',
    },
    warning: {
      bg: '#fbbf24',
      fg: baseColors.gray[900],
      border: '#fbbf24',
    },
    danger: {
      bg: '#ef4444',
      fg: baseColors.white,
      border: '#ef4444',
    },
  },
  outline: {
    focus: baseColors.primaryLight,
  },
  overlay: {
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
  state: {
    hover: {
      bg: baseColors.gray[800],
    },
    active: {
      bg: baseColors.gray[700],
    },
    selection: {
      bg: 'rgba(58, 191, 191, 0.2)',
    },
    skeleton: {
      bg: baseColors.gray[800],
      fg: baseColors.gray[700],
    },
  },
};

export const highContrastTheme: ThemeColors = {
  primary: {
    bg: '#000000',
    fg: '#ffffff',
    border: '#ffffff',
  },
  secondary: {
    bg: '#1a1a1a',
    fg: '#ffffff',
    border: '#ffffff',
  },
  surface: {
    bg: '#ffffff',
    alt: '#f0f0f0',
    border: '#000000',
  },
  text: {
    primary: '#000000',
    muted: '#4a4a4a',
    inverse: '#ffffff',
  },
  feedback: {
    success: {
      bg: '#006400',
      fg: '#ffffff',
      border: '#ffffff',
    },
    warning: {
      bg: '#cc6600',
      fg: '#ffffff',
      border: '#ffffff',
    },
    danger: {
      bg: '#cc0000',
      fg: '#ffffff',
      border: '#ffffff',
    },
  },
  outline: {
    focus: '#0000ff',
  },
  overlay: {
    backdrop: 'rgba(0, 0, 0, 0.9)',
  },
  state: {
    hover: {
      bg: '#e6e6e6',
    },
    active: {
      bg: '#cccccc',
    },
    selection: {
      bg: '#0066ff',
    },
    skeleton: {
      bg: '#e0e0e0',
      fg: '#cccccc',
    },
  },
};

export const typography = {
  fontFamily: {
    normal: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
    '5xl': 56,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    heading: -0.8,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
};

export const borderRadius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

export const borderWidth = {
  hairline: 0.5,
  thin: 1,
  thick: 2,
};

export const opacity = {
  pressed: 0.7,
  disabled: 0.4,
};

export const focusRing = {
  width: 2,
  offset: 2,
};

export interface Theme {
  colors: ThemeColors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  borderWidth: typeof borderWidth;
  opacity: typeof opacity;
  focusRing: typeof focusRing;
}

export const themes: Record<ThemeMode, Theme> = {
  light: {
    colors: lightTheme,
    typography,
    spacing,
    borderRadius,
    shadows,
    borderWidth,
    opacity,
    focusRing,
  },
  dark: {
    colors: darkTheme,
    typography,
    spacing,
    borderRadius,
    shadows,
    borderWidth,
    opacity,
    focusRing,
  },
  'high-contrast': {
    colors: highContrastTheme,
    typography,
    spacing,
    borderRadius,
    shadows,
    borderWidth,
    opacity,
    focusRing,
  },
};
