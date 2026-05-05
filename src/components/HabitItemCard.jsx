import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { Target, Check, Heart, Briefcase, Users, Banknote, Zap } from 'lucide-react-native';

import Stack from "./Stack";

import typography from "../styles/typography";
import layout from "../styles/layout";
import colors from "../styles/colors";
import { spacing } from "../styles/spacing";


const PILLAR_ICONS = {
  "LOVE": Heart,
  "SKILL": Zap,
  "WEALTH": Banknote,
  "WORLD": Users,
  "All": Target,
};

export default function HabitItemCard({ tasks, onComplete }) { 
  const [localIntensities, setLocalIntensities] = useState({});

  const toggleIsChecked = (id) => {
    const habit = tasks.find(t => t.id === id);
    if (!habit.isCompleted && onComplete) {
      const finalIntensity = localIntensities[id] ?? habit.intensity;
      onComplete(id, finalIntensity);
    }
  };

  const handleSliderChange = (id, value) => {
    setLocalIntensities(prev => ({ ...prev, [id]: value }));
  };

  return (
    <View>
      <Stack size="lg" style={[layout.cardXxxs, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={typography.light}>Active Items</Text>
        <Text style={typography.label}>{tasks.length} Pending items</Text>
      </Stack>

      {tasks.map((habit) => {
        const isChecked = habit.isChecked || habit.isCompleted;
        const displayIntensity = localIntensities[habit.id] ?? habit.intensity;
        
        // Logical check: Has the user moved the slider in this session?
        const hasMovedSlider = localIntensities[habit.id] !== undefined;

        const iconKey = Object.keys(PILLAR_ICONS).find(
          key => key.toLowerCase() === habit.pillar?.toLowerCase()
        );
        const HabitIcon = PILLAR_ICONS[iconKey] || Target;

        return (
          <Stack key={habit.id} size="sm" style={layout.cardXxs}>
            <View style={[styles.cardInternal, isChecked ? { opacity: 0.4 } : { opacity: 1 }]}>
              <View style={styles.topRow}>
                <View style={styles.mainContent}>
                  <View style={styles.iconBox}>
                    <HabitIcon size={20} color={colors.secondary} />
                  </View>

                  <View style={styles.textGroup}>
                    {/* Task Title */}
                    <Text style={typography.light}>{habit.taskItem}</Text>
                    
                    {/* Pillar */}
                    <Text style={typography.label}>Pillar: {habit.pillar}</Text>
                    
                    {/* Duration */}
                    {habit.duration && (
                      <Text style={typography.label}>Min Duration: {habit.duration} mins</Text>
                    )}

                    {/* Target Days Logic - Ensure this exists! */}
                    {habit.targetDays ? (
                      <Text style={typography.label}>
                        Completed: {habit.completions?.length || 0} of {habit.targetDays} days
                      </Text>
                    ) : null}
                  </View>
                </View>

                {/* Checkbox is only rendered if task is already checked OR slider has moved */}
                {(isChecked || hasMovedSlider) && (
                  <TouchableOpacity 
                    onPress={() => toggleIsChecked(habit.id)}
                    style={styles.checkboxWrapper}
                    disabled={isChecked}
                  >
                    <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                      {isChecked && <Check size={16} color={colors.surface} strokeWidth={3} />}
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.sliderRow}>
                <Text style={typography.label}>Fulfilment {displayIntensity}/10</Text>
                <Slider
                  style={styles.slider}
                  value={habit.intensity || 5} // Default to middle if no intensity set
                  disabled={isChecked}
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  onValueChange={(val) => handleSliderChange(habit.id, val)}
                  minimumTrackTintColor={colors.secondary}
                  thumbTintColor={colors.secondary}
                />
              </View>
            </View>
          </Stack>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  habitCard: {
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  iconBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 0,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,         // Take up available space
    flexShrink: 1,   // Allow shrinking to force text wrap
    marginRight: 10, 
  },
  textGroup: {
    marginLeft: spacing.md,
    flex: 1,         // Force text within to wrap
  },
  checkboxWrapper: {
    flexShrink: 0,   // Don't let the checkbox get squished
    width: 40, 
    alignItems: 'flex-end'
  },
  pillarLabel: {
    ...typography.light,
    fontSize: 10,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 0,
  },
  checkboxActive: {
    backgroundColor: 'fff',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  intensityLabel: {
    fontSize: 10,
    color: colors.black,
    width: 100,
  },
  slider: {
    flex: 1,
    height: 20,
  },
  cardInternal: {
    width: '100%',
    paddingVertical: spacing.xs,
  },
});