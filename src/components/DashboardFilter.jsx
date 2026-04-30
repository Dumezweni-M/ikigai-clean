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
import layout from '../styles/layout';
import { spacing } from '../styles/spacing';

const NavItems = [
  { name: 'All', icon: Target },
  { name: 'Love', icon: Sparkle },
  { name: 'Skill', icon: Compass },
  { name: 'Wealth', icon: Scale },
  { name: 'World', icon: Waves },
];


export default function DashboardFilter({ selectedPillar, onSelect }) {
  return (
    <View style={styles.container}>
      {NavItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.item, 
            selectedPillar === item.name && { backgroundColor: colors.secondary } // Visual feedback
          ]}
          onPress={() => onSelect(item.name)}
        >
          <Text style={[
            styles.h1, 
            selectedPillar === item.name && { color: colors.white }
          ]}>
            {item.name}
          </Text>
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
  alignSelf: 'stretch',
  width: '100%',
},
item: {
  alignItems: 'center',
  justifyContent: 'center',
  // borderWidth: 0.5,
  width: '18%',
  padding: 4,
  },
});