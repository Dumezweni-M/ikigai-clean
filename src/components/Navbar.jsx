import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';

import Scale  from 'lucide-react-native/dist/esm/icons/scale';
// import Sprout from 'lucide-react-native/dist/esm/icons/sprout';
import Waves  from 'lucide-react-native/dist/esm/icons/waves';
import Target from 'lucide-react-native/dist/esm/icons/target';
import Compass from 'lucide-react-native/dist/esm/icons/compass';
import Sparkle from 'lucide-react-native/dist/esm/icons/sparkle';

const NavItems = [
  { name: 'Home', icon: Compass },
  { name: 'Activity', icon: Sparkle },
  { name: 'Overview', icon: Waves },
  { name: 'Catalysts', icon: Scale },
  { name: 'Create', icon: Target },
];


export default function Navbar() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {NavItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.item}
          onPress={() => navigation.navigate(item.name)}
        >
          <item.icon size={20} color={colors.secondary} strokeWidth={0.9} />
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
  width: '15%'
  },
  label: {
    ...typography.label,
    color: colors.neutral,
    fontSize: 10,
    border: 1,
  },
});