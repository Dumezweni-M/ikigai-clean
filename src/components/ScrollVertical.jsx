import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import colors from '../styles/colors';

export default function ScrollVertical({ children, style }) {
  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
  },
});