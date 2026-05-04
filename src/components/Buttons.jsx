// src/components/Button.jsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';

export default function Button({ label, variant = 'primary', onPress, style }) {
  return (

    // A versatile button component with multiple variants for different use cases.
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
  borderRadius: 0,
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
  noir: {
  backgroundColor: colors.primary,
  borderWidth: 1,
  borderColor: colors.secondary,
  fontSize: 24,
  },
  cta: {
  backgroundColor: colors.primary,
  borderWidth: 1,
  borderColor: colors.secondary,
  paddingVertical: 18,
  paddingHorizontal: 48,
  borderRadius: 0,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: 28,
  marginBottom: 28,
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
  noirLabel: { color: colors.secondary },
  ctaLabel: { 
  color: colors.secondary,
  fontSize: 16,
  fontWeight: '800',
  letterSpacing: 2,
  fontFamily: 'InterTight-ExtraBold',
  },
});