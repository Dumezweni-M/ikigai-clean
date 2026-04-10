import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Heart, Zap, Shield } from 'lucide-react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { spacing, radius } from '../styles/spacing';

const pillars = [
  { name: 'Daily', icon: Heart, key: 'daily' },
  { name: 'Weekly', icon: Zap, key: 'weekly' },
  { name: 'Monthly', icon: Shield, key: 'monthly' },
];

export default function FrequencySelector({ onSelectionChange, onValueChange }) {
  const [selectedInterval, setSelectedInterval] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(15);
  const [days, setDays] = useState(3);

  const togglePillar = (key) => {
    const newSelection = selectedInterval === key ? null : key;
    setSelectedInterval(newSelection);
    if (onSelectionChange) onSelectionChange(newSelection);
  };

  // Sync values to parent
  useEffect(() => {
    if (onValueChange) {
      const value = selectedInterval === 'daily' ? { hours, minutes } : { days };
      onValueChange(value);
    }
  }, [hours, minutes, days, selectedInterval]);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {pillars.map((item) => {
          const isActive = selectedInterval === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.card, isActive && styles.cardActive]}
              onPress={() => togglePillar(item.key)}
              activeOpacity={0.8}
            >
              <item.icon 
                size={22} 
                color={isActive ? colors.primary : colors.secondary} 
                strokeWidth={2.5} 
              />
              <Text style={[typography.label, styles.label, { color: isActive ? colors.primary : colors.text }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedInterval === 'daily' && (
        <View style={styles.sliderContainer}>
          {/* Hours Slider */}
          <View style={styles.sliderRow}>
            <Text style={typography.label}>Hours</Text>
            <Text style={[typography.label, { color: colors.primary }]}>{hours}h</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={23}
            step={1}
            value={hours}
            onValueChange={setHours}
            minimumTrackTintColor={colors.primary}
            thumbTintColor={colors.primary}
          />

          {/* Minutes Slider */}
          <View style={[styles.sliderRow, { marginTop: spacing.sm }]}>
            <Text style={typography.label}>Minutes</Text>
            <Text style={[typography.label, { color: colors.primary }]}>{minutes}m</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={59}
            step={1}
            value={minutes}
            onValueChange={setMinutes}
            minimumTrackTintColor={colors.primary}
            thumbTintColor={colors.primary}
          />
        </View>
      )}

      {(selectedInterval === 'weekly' || selectedInterval === 'monthly') && (
        <View style={styles.sliderContainer}>
          <View style={styles.sliderRow}>
            <Text style={typography.label}>{selectedInterval === 'weekly' ? 'Days per week' : 'Days per month'}</Text>
            <Text style={[typography.label, { color: colors.primary }]}>{days} days</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={selectedInterval === 'weekly' ? 7 : 30}
            step={1}
            value={days}
            onValueChange={setDays}
            minimumTrackTintColor={colors.primary}
            thumbTintColor={colors.primary}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
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
    borderWidth: 1,
    borderRadius: radius.md,
    borderColor: colors.border,
  },
  cardActive: { backgroundColor: colors.secondary, borderColor: colors.secondary },
  label: { marginTop: spacing.xs, fontSize: 10 },
  sliderContainer: { marginTop: spacing.md, paddingHorizontal: spacing.xs },
  sliderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  slider: { width: '100%', height: 40 },
});