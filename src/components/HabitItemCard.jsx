import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { Target, Check } from 'lucide-react-native';
import { useState } from "react";

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

export default function HabitItemCard() {
  const Navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  

const toggleIsChecked = () => {
    setIsChecked(prev => !prev);
  };


  
  return (
    <ScreenWrapper>
      
{/* Habit Card Section */}
        <View size="lg" style={layout.cardXs}>
          {/* Added conditional style for dimming here */}
          <View style={[styles.cardXs, isChecked && { opacity: 0.4 }]}>
            {/* Header Row */}
            <View style={styles.topRow}>
              <View style={styles.mainContent}>
                
                {/* Sharp Square Icon */}
                <View style={styles.iconBox}>
                  <Target size={30} color={colors.tertiary} />
                </View>

                {/* Labels */}
                <View style={styles.textGroup}>
                  <Text style={typography.light}>Morning Meditation</Text>
                  <Text style={typography.label}>PILLAR: SPIRITUAL BALANCE</Text>
                </View>
              </View>

              {/* Checkbox */}
              <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={toggleIsChecked}
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
                disabled={isChecked} // Prevents interaction when dimmed
                minimumValue={1}
                maximumValue={10}
                step={1}
                minimumTrackTintColor={colors.primary}
                thumbTintColor={colors.primary}
              />
            </View>
          </View>
        </View>

        
            <Stack size="lg" style={layout.cardSm}>
                <SatisfactionSlide/>
            </Stack>

            <Stack size="lg" style={layout.cardXs}>
                <Button label="Confirm" variant="cta" onPress={() => Navigation.navigate("Home")} />    
            </Stack>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  habitCard: {
    paddingVertical: spacing.md,
    backgroundColor: colors.tertiary,
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
    backgroundColor: colors.black,
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
    borderWidth: 1.8,
    borderColor: '#000',
    borderRadius: 0,
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