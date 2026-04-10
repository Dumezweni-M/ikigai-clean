import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, Zap, Shield, Target } from 'lucide-react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { spacing, radius } from '../styles/spacing';

const pillars = [
  { name: 'Love', icon: Heart, key: 'love' },
  { name: 'Skill', icon: Zap, key: 'skill' },
  { name: 'World', icon: Shield, key: 'world' },
  { name: 'Wealth', icon: Target, key: 'wealth' },
];

export default function PillarSelector({ onSelectionChange }) {
  // Store selected keys in an array
  const [selectedPillars, setSelectedPillars] = useState([]);

  const togglePillar = (key) => {
    let newSelection;
    if (selectedPillars.includes(key)) {
      // Remove if already selected
      newSelection = selectedPillars.filter(p => p !== key);
    } else {
      // Add if not selected
      newSelection = [...selectedPillars, key];
    }
    
    setSelectedPillars(newSelection);
    if (onSelectionChange) onSelectionChange(newSelection);
  };

  return (
    <View style={styles.grid}>
      {pillars.map((item) => {
        const isActive = selectedPillars.includes(item.key);
        return (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.card,
              isActive && styles.cardActive
            ]}
            onPress={() => togglePillar(item.key)}
            activeOpacity={0.8}
          >
            <item.icon 
              size={22} 
              color={isActive ? colors.primary : colors.secondary} 
              strokeWidth={2.5} 
            />
            <Text style={[
              typography.label, 
              styles.label,
              { color: isActive ? colors.primary : colors.text }
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: spacing.xs,
  },
  card: {
    width: '46%', 
    paddingVertical: spacing.md, 
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md, // Gap between rows
    borderWidth: 1,
    borderRadius: radius.md,
    borderColor: colors.border,
  },
  cardActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  label: {
    marginTop: spacing.xs,
    fontSize: 10, // Matching your label style guide
  },
});