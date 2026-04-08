import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Menu, Orbit } from 'lucide-react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { spacing, radius } from '../styles/spacing';

export default function Header() {
  return (
    <View style={styles.container}>

      {/* Left — Hamburger + Logo */}
      <View style={styles.left}>
        <TouchableOpacity onPress={() => console.log('Open Drawer')}>
          <Menu size={28} color={colors.black} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={[typography.h2, colors.text]}>IKIGAI</Text>
      </View>

      {/* Right — Orbit icon */}
      <TouchableOpacity>
        <View style={styles.orbitBtn}>
          <Orbit size={14} color={colors.neutral} strokeWidth={1.5} />
        </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.neutral,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
    width: '100%',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    color: colors.text,
    marginLeft: spacing.xs,
  },
  orbitBtn: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: radius.md,
    borderTopLeftRadius: 0,
  },
});