import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import Navbar from './Navbar';
import Header from './Header';
import ScrollVertical from './ScrollVertical';

export default function ScreenWrapper({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      <Header/>
      <ScrollVertical>
        {children}
      </ScrollVertical>
      <Navbar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral,
  },
});