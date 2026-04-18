import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, Zap, Shield, Target } from 'lucide-react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { spacing, radius } from '../styles/spacing';

const intervals = [
  { name: 'Daily', icon: Heart, key: 'daily' },
  { name: 'Weekly', icon: Zap, key: 'weekly' },
  { name: 'Monthly', icon: Shield, key: 'monthly' },
];

export default function FrequencySelector({ onSelectionChange }) {
  // Store a single selected key or null
  const [selectedInterval, setSelectedInterval] = useState(null);

  const toggleInitervalPillar = (key) => {
    // If clicking the same one, deselect it; otherwise, select the new one
    const newSelection = selectedInterval === key ? null : key;
    
    setSelectedInterval(newSelection);
    if (onSelectionChange) onSelectionChange(newSelection);
  };

  return (
    <View style={styles.grid}>
      {intervals.map((item) => {
        // Simple equality check for active state
        const isActive = selectedInterval === item.key;
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
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: spacing.xs,
  },
  card: {
    width: '30%', 
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