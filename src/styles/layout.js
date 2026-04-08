

import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';
import { radius, spacing } from './spacing';

const { width, height } = Dimensions.get('window');

const layout = StyleSheet.create({
  cardLg: {
    width: width,
    height: height * 0.8,
    backgroundColor: colors.neutral,
    padding: spacing.xl,
  },
  cardMd: {
    width: width,
    height: height * 0.6,
    backgroundColor: colors.neutral,
    padding: spacing.xl,
  },
  cardSm: {
    width: width,
    height: height * 0.4,
    backgroundColor: colors.neutral,
    padding: spacing.xl,
  },
  cardLgTertiary: {
    width: width,
    height: height,
    backgroundColor: colors.tertiary,
    padding: spacing.xl,
},
cardMdTertiary: {
    width: width,
    height: height * 0.6,
    backgroundColor: colors.tertiary,
    padding: spacing.xl,
},
cardSmTertiary: {
    marginVertical: spacing.xl,
    width: width,
    height: height * 0.3,
    backgroundColor: colors.tertiary,
    padding: spacing.xl,
  },

});

export default layout;