function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const v = val / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return 0;
  }

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

export function meetsWCAG_AA(
  textColor: string,
  backgroundColor: string,
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(textColor, backgroundColor);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

export function meetsWCAG_AAA(
  textColor: string,
  backgroundColor: string,
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(textColor, backgroundColor);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

export interface ContrastCheckResult {
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  level: 'fail' | 'AA' | 'AAA';
}

export function checkContrast(
  textColor: string,
  backgroundColor: string,
  isLargeText = false
): ContrastCheckResult {
  const ratio = getContrastRatio(textColor, backgroundColor);
  const meetsAA = meetsWCAG_AA(textColor, backgroundColor, isLargeText);
  const meetsAAA = meetsWCAG_AAA(textColor, backgroundColor, isLargeText);

  let level: 'fail' | 'AA' | 'AAA' = 'fail';
  if (meetsAAA) {
    level = 'AAA';
  } else if (meetsAA) {
    level = 'AA';
  }

  return {
    ratio: Math.round(ratio * 100) / 100,
    meetsAA,
    meetsAAA,
    level,
  };
}
