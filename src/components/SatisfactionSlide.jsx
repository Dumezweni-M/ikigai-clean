import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Slider from '@react-native-community/slider';

import typography from "../styles/typography";
import colors from "../styles/colors";
import { spacing } from "../styles/spacing";
import layout from "../styles/layout";
import ScreenWrapper from "./ScreenWrapper";
import ScrollVertical from "./ScrollVertical";

export default function SatisfactionSlide() {
  const [value, setValue] = useState(5);

  return (
    <ScreenWrapper>
        <ScrollVertical>
            <View style={layout.cardXs}>
            <Text style={[typography.h2, {color: colors.black}]}>In this Moment</Text>
            
            <View style={styles.labelRow}>
                <Text style={typography.label}>
                Overall Satisfaction: {value}/10
                </Text>
            </View>

            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={10}
                value={value}
                onValueChange={setValue}
                step={1}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.border}
                thumbTintColor={colors.primary}
            />
            
            {/* Optional: Min/Max indicators to match habit style symmetry */}
            <View style={styles.footerRow}>
                <Text style={styles.helperText}>LOW</Text>
                <Text style={styles.helperText}>HIGH</Text>
            </View>
            </View>

        </ScrollVertical>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  labelRow: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  slider: {
    width: '100%',
    height: 50,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2, // Pull closer to slider (go negative)
  },
  helperText: {
    ...typography.label,
    fontSize: 12,
    opacity: 1,
    color: colors.black,
  },
});