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

  //Sets intensity/fulfilment level locally for immediate UI feedback, before syncing with DB on checkbox toggle
  const [ localIntensities, setLocalIntensities ] = useState({})

  const toggleIsChecked = (id) => {
    const habit = tasks.find(t => t.id === id);
    // setCheckedItems(prev => ({ ...prev, [id]: newStatus }));

    // Only fire the database sync when the user checks the item
    if (!habit.isCompleted && onComplete) {
      const finalIntensity = localIntensities[id] ?? tasks.find(t => t.id === id).intensity;
      onComplete(id, finalIntensity);
    }
  };

  

  const handleSliderChange = (id, value) => {
    setLocalIntensities(prev => ({ ...prev, [id]: value }));
  };


  return (
    <View>
        <Stack size="" style={[layout.cardXxxs, { flexDirection :'row', justifyContent: 'space-between', alignItems: 'center' }]} >
            <Text style={typography.light}>Active Items</Text>
            <Text style={typography.label}> {tasks.length} Pending items</Text>
        </Stack>

      {tasks.map((habit) => {
        // Step 3: Determine "Locked" state from DB/Apollo field
        // Adjust 'isCompleted' to match your actual GraphQL field (e.g., isCompletedToday)
        console.log(`Task: ${habit.taskItem}, isCompleted:`, habit.isCompleted);
        const isChecked = habit.isChecked || habit.isCompleted; // Fallback to DB value if local state is not set
        
        const displayIntensity = localIntensities[habit.id] ?? habit.intensity;
        
        // Handle case-insensitive icon lookup
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
              {/* Always show Task Title */}
              <Text style={typography.light}>{habit.taskItem}</Text>
              
              {/* Always show Pillar */}
              <Text style={typography.label}>Pillar: {habit.pillar}</Text>
              
              {/* Conditional Metrics displayed underneath */}
              {habit.duration && (
                <Text style={typography.label}>Min Duration: {habit.duration} mins</Text>
              )}

              {habit.targetDays && (
                <Text style={typography.label}>
                  Completed: {habit.completions?.length || 0} of {habit.targetDays} days
                </Text>
              )}
            </View>
                </View>

                <TouchableOpacity 
                  onPress={() => toggleIsChecked(habit.id)}
                  style={styles.checkboxWrapper}
                  disabled={isChecked}
                >
                  <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                    {isChecked && <Check size={16} color={colors.surface} strokeWidth={3} />}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Slider Logic */}
              <View style={styles.sliderRow}>
                <Text style={typography.label}>Fulfilment {displayIntensity}/10</Text>
                <Slider
                  style={styles.slider}
                  value={habit.intensity} 
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  textGroup: {
    marginLeft: spacing.md,
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