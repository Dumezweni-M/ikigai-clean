import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';

import Scale  from 'lucide-react-native/dist/esm/icons/scale';
import Sprout from 'lucide-react-native/dist/esm/icons/sprout';
import Waves  from 'lucide-react-native/dist/esm/icons/waves';
import Target from 'lucide-react-native/dist/esm/icons/target';
import Compass from 'lucide-react-native/dist/esm/icons/compass';

const NavItems = [
  { name: 'Home', icon: Compass },
  { name: 'Love', icon: Scale },
  { name: 'Skill', icon: Sprout },
  { name: 'World', icon: Waves },
  { name: 'Wealth', icon: Target },
];

export default function Navbar() {
  return (
    <View style={styles.container}>
      {NavItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => console.log(`Navigating to ${item.name}`)}
        >
          <item.icon size={24} color={colors.secondary} strokeWidth={2} />
          <Text style={styles.label}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  backgroundColor: colors.bg,
  paddingVertical: 20,
  borderTopWidth: 0.5,
  borderTopColor: colors.border,
  alignSelf: 'stretch',
},
item: {
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  // borderWidth: 0.5,
  },
  label: {
    ...typography.label,
    color: colors.neutral,
    fontSize: 10,
    border: 1,
  },
});