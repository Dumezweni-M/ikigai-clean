// src/styles/typography.js

import { StyleSheet } from 'react-native';
import colors from './colors';

const typography = StyleSheet.create({
  h1: {
    fontFamily: 'InterTight-Black',
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: -0.05 * 48,
    textTransform: 'uppercase',
    color: colors.black,
  },
  h2: {
    fontFamily: 'InterTight-ExtraBold',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.02 * 24,
    textTransform: 'uppercase',
    color: colors.black,
  },
  body: {
    fontFamily: 'InterTight-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16 * 1.6,
    color: colors.black,
  },
  label: {
    fontFamily: 'InterTight-Bold',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.1 * 10,
    textTransform: 'uppercase',
    color: colors.black,
  },
  light: {
    fontFamily: 'InterTight-Light',
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 16 * 1.6,
    color: colors.black,
  },
});

export default typography;