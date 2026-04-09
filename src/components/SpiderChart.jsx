import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { spacing } from '../styles/spacing';

const screenWidth = Dimensions.get("window").width;

const SpiderChart = () => {
  // Raw stats for the 4 pillars
  const stats = {
    physical: 0.85,
    mental: 0.92,
    social: 0.65,
    purpose: 0.78
  };

  // The "YOU" ring is the average of the 4 pillars (each contributes 25%)
  const youValue = (stats.physical + stats.mental + stats.social + stats.purpose) / 4;

  const pillars = [
    { label: "YOU", value: youValue, color: colors.secondary }, // Master Gold Ring
    { label: "Physical", value: stats.physical, color: "rgba(0, 0, 0, 0.8)" },
    { label: "Mental", value: stats.mental, color: "rgba(0, 0, 0, 0.6)" },
    { label: "Social", value: stats.social, color: "rgba(0, 0, 0, 0.4)" },
    { label: "Purpose", value: stats.purpose, color: "rgba(0, 0, 0, 0.2)" }
  ];

  const data = {
    labels: pillars.map(p => p.label),
    data: pillars.map(p => p.value),
    colors: pillars.map(p => p.color)
  };

  const chartConfig = {
    backgroundGradientFrom: colors.bg,
    backgroundGradientTo: colors.bg,
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    // Base color for labels inside the chart-kit logic (if any show up)
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => colors.black,
  };

  return (
    <View style={styles.outerContainer}>
      <ProgressChart
        data={data}
        width={screenWidth - spacing.xl * 2}
        height={240}
        strokeWidth={12} // Thinner stroke to accommodate 5 rings
        radius={28}
        chartConfig={chartConfig}
        hideLegend={true}
        withCustomBarColorFromData={true}
      />

      <View style={styles.legendContainer}>
        {pillars.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.indicator, { backgroundColor: item.color }]} />
            <View>
              {/* Force color to colors.black per your style guide */}
              <Text style={[typography.label, { color: colors.black }]}>
                {item.label}
              </Text>
              <Text style={[typography.h2, { color: colors.black, fontSize: 18 }]}>
                {Math.round(item.value * 100)}%
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    marginBottom: spacing.md,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.sm,
  },
});

export default SpiderChart;