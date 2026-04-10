import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { Target, Check, Heart, Briefcase, Users } from 'lucide-react-native';

import ScreenWrapper from "../components/ScreenWrapper";
import ScrollVertical from "../components/ScrollVertical";
import Header from "../components/Header";
import Stack from "../components/Stack";
import Button from "../components/Buttons";
import SatisfactionSlide from "../components/SatisfactionSlide";

import typography from "../styles/typography";
import layout from "../styles/layout";
import colors from "../styles/colors";
import { spacing } from "../styles/spacing";

// Dummy content items
const HABIT_DATA = [
  { id: 1, title: "Morning Meditation", pillar: "SPIRITUAL BALANCE", icon: Target },
  { id: 2, title: "Strategic Planning", pillar: "PROFESSIONAL SKILL", icon: Briefcase },
  { id: 3, title: "Community Support", pillar: "WORLD NEEDS", icon: Users },
  { id: 4, title: "Heartfelt Journaling", pillar: "LOVE & SELF", icon: Heart },
];

export default function HabitItemCard() {
  const navigation = useNavigation();
  
  // Track checked state for each ID
  const [checkedItems, setCheckedItems] = useState({});

  const toggleIsChecked = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <ScreenWrapper>


      <ScrollVertical>
          <Stack size="" style={[layout.cardXxxs, { flexDirection :'row', justifyContent: 'space-between', alignItems: 'center' }]} >
          <Text style={typography.light}>Active Items</Text>
            <Text style={typography.label}> 4 Pending items</Text>
          </Stack>
        {HABIT_DATA.map((habit) => {
          const isChecked = checkedItems[habit.id] || false;
          const HabitIcon = habit.icon;

          return (
            <Stack key={habit.id} size="sm" style={layout.cardXxs}>
              <View style={[styles.cardInternal, isChecked && { opacity: 0.4 }]}>
                {/* Header Row */}
                <View style={styles.topRow}>
                  <View style={styles.mainContent}>
                    {/* Sharp Square Icon */}
                    <View style={styles.iconBox}>
                      <HabitIcon size={20} color={colors.secondary} />
                    </View>

                    {/* Labels */}
                    <View style={styles.textGroup}>
                      <Text style={typography.light}>{habit.title}</Text>
                      <Text style={typography.label}>PILLAR: {habit.pillar}</Text>
                    </View>
                  </View>

                  {/* Checkbox */}
                  <TouchableOpacity 
                    activeOpacity={0.8} 
                    onPress={() => toggleIsChecked(habit.id)}
                    style={styles.checkboxWrapper}
                  >
                    <View style={[
                      styles.checkbox, 
                      isChecked && styles.checkboxActive
                    ]}>
                      {isChecked && <Check size={16} color={colors.surface} strokeWidth={3} />}
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Slider Row */}
                <View style={styles.sliderRow}>
                  <Text style={typography.label}>INTENSITY 1-10</Text>
                  <Slider
                    style={styles.slider}
                    disabled={isChecked}
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    minimumTrackTintColor={colors.primary}
                    thumbTintColor={colors.primary}
                  />
                </View>
              </View>
            </Stack>
          );
        })}

        <Stack size="lg" style={layout.cardSm}>
          <SatisfactionSlide/>
        </Stack>

        <Stack size="lg" style={layout.cardXs}>
          <Button 
            label="Confirm" 
            variant="inverted" 
            onPress={() => navigation.navigate("Home")} 
          />
        </Stack>
      </ScrollVertical>
    </ScreenWrapper>
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