

import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';
import { radius, spacing } from './spacing';

const { width, height } = Dimensions.get('window');

const layout = StyleSheet.create({
  cardLg: {
    width: width,
    height: height,
    backgroundColor: colors.bg,
    padding: spacing.lg,
  },
  cardMd: {
    width: width,
    height: height * 0.6,
    backgroundColor: colors.bg,
    borderRadius: radius.xl,
    padding: spacing.lg,
  },
  cardSm: {
    width: width,
    height: height * 0.3,
    backgroundColor: colors.neutral,
    borderRadius: radius.xl,
    padding: spacing.xxl,
  },
});

export default layout;