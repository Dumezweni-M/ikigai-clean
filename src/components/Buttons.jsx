// src/components/Button.jsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';

export default function Button({ label, variant = 'primary', onPress, style }) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, styles[`${variant}Label`]]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
base: {
  paddingVertical: 14,
  paddingHorizontal: 24,
  borderRadius: 6,
  alignItems: 'left',
  justifyContent: 'center',
  alignSelf: 'flex-start',
},

  // variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.tertiary,
  },
  inverted: {
    backgroundColor: colors.surface,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },

  // labels
  label: {
    ...typography.label,
    fontSize: 14,
  },
  primaryLabel:   { color: colors.neutral },
  secondaryLabel: { color: colors.primary },
  invertedLabel:  { color: colors.neutral },
  outlinedLabel:  { color: colors.primary },
});