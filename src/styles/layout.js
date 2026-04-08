

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
    height: height * 0.55,
    backgroundColor: colors.neutral,
    padding: spacing.xl,
  },
  cardSm: {
    width: width,
    height: height * 0.35,
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
    height: height * 0.55,
    backgroundColor: colors.tertiary,
    padding: spacing.xl,
},
cardSmTertiary: {
    marginVertical: spacing.xl,
    width: width,
    height: height * 0.35,
    backgroundColor: colors.tertiary,
    padding: spacing.xl,
  },
  cardLgDark: {
    flex: 1,
    justifyContent: 'center',
    width: width,
    height: height,
    backgroundColor: colors.bg,
    padding: spacing.xl,
  },
  cardMdDark: {
    flex: 1,
    justifyContent: 'center',
    width: width,
    height: height * 0.55,
    backgroundColor: colors.bg,
    borderColor: colors.secondary,
    padding: spacing.xl,
  },
  cardSmDark: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: spacing.xl,
    width: width,
    height: height * 0.3,
    backgroundColor: colors.bg,
    padding: spacing.xl,
  },

});

export default layout;