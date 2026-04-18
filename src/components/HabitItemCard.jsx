import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { Target, Check, Heart, Briefcase, Users } from 'lucide-react-native';

import Stack from "./Stack";

import typography from "../styles/typography";
import layout from "../styles/layout";
import colors from "../styles/colors";
import { spacing } from "../styles/spacing";


const PILLAR_ICONS = {
  "LOVE": Heart,
  "SKILL": Target,
  "WEALTH": Briefcase,
  "WORLD": Users,
};

export default function HabitItemCard({ tasks }) { 
  const [checkedItems, setCheckedItems] = useState({});

  const toggleIsChecked = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View>
        <Stack size="" style={[layout.cardXxxs, { flexDirection :'row', justifyContent: 'space-between', alignItems: 'center' }]} >
            <Text style={typography.light}>Active Items</Text>
            <Text style={typography.label}> {tasks.length} Pending items</Text>
        </Stack>

      {/* Map through the passed-in tasks instead of HABIT_DATA */}
      {tasks.map((habit) => {
        const isChecked = checkedItems[habit.id] || false;
        
        // Select icon based on the pillar string from DB, fallback to Target
        const HabitIcon = PILLAR_ICONS[habit.pillar] || Target;

        return (
          <Stack key={habit.id} size="sm" style={layout.cardXxs}>
            <View style={[styles.cardInternal, isChecked && { opacity: 0.4 }]}>
              <View style={styles.topRow}>
                <View style={styles.mainContent}>
                  <View style={styles.iconBox}>
                    <HabitIcon size={20} color={colors.secondary} />
                  </View>
                  <View style={styles.textGroup}>
                    {/* habit.taskItem is the field name in your DB */}
                    <Text style={typography.light}>{habit.taskItem}</Text> 
                    <Text style={typography.label}>Pillar: {habit.pillar}</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  onPress={() => toggleIsChecked(habit.id)}
                  style={styles.checkboxWrapper}
                >
                  <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                    {isChecked && <Check size={16} color={colors.surface} strokeWidth={3} />}
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.sliderRow}>
                <Text style={typography.label}>INTENSITY {habit.intensity}/10</Text>
                <Slider
                  style={styles.slider}
                  value={habit.intensity} 
                  disabled={isChecked}
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
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
    backgroundColor: '#000',
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
});