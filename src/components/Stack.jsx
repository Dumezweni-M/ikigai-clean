import React from 'react';
import { View } from 'react-native';

const gaps = {
  sm: 10,
  md: 14,
  lg: 22,
};

export default function Stack({ children, size = 'md', gap, direction = 'column', style }) {
  const resolvedGap = gap ?? gaps[size];

  return (
    <View style={[{ gap: resolvedGap, flexDirection: direction }, style]}>
      {children}
    </View>
  );
}