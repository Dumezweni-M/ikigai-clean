import React from 'react';
import { View } from 'react-native';

const gaps = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 36,
};

export default function Stack({ children, size = 'sm', gap, direction = 'column', style }) {
  const resolvedGap = gap ?? gaps[size];

  return (
    <View style={[{ gap: resolvedGap, flexDirection: direction }, style]}>
      {children}
    </View>
  );
}