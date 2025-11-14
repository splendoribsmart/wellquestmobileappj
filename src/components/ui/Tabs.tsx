import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@theme/index';

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
}

export function Tabs({ tabs, activeKey, onChange }: TabsProps) {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: theme.colors.surface.alt,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing[1],
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={{
              paddingVertical: theme.spacing[2],
              paddingHorizontal: theme.spacing[4],
              borderRadius: theme.borderRadius.md,
              backgroundColor: isActive ? theme.colors.surface.bg : 'transparent',
              marginRight: theme.spacing[1],
            }}
            activeOpacity={theme.opacity.pressed}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontFamily: isActive
                  ? theme.typography.fontFamily.semibold
                  : theme.typography.fontFamily.medium,
                color: isActive ? theme.colors.text.primary : theme.colors.text.muted,
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
