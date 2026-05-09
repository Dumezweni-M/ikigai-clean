import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import colors from '../styles/colors';
import pillarColors from '../styles/pillarColors';
import typography from '../styles/typography';
import { spacing } from '../styles/spacing';

import {  useQuery } from '@apollo/client';
import { GET_COMPLETIONS } from '../graphql/queries'; 
import { calculateStats, getSortedPillars } from '../utils/progressRingsUtils'

const screenWidth = Dimensions.get("window").width;

const ProgressRings = () => {
const { data: completionData, loading } = useQuery(GET_COMPLETIONS, {
    fetchPolicy: 'cache-and-network'
  });

  // Use the Utility to get decayed stats and levels
  const { stats } = React.useMemo(() => {
    return calculateStats(completionData?.taskCompletions || []);
  }, [completionData]);

  // Use the Utility to handle sorting and the "Balance" calculation
  const sortedPillars = React.useMemo(() => {
    const sorted = getSortedPillars(stats);

    // Map the labels to their specific UI colors for the chart
    return sorted.map(p => {
      let pillarColor;
      switch(p.label.toLowerCase()) {
        case 'love': pillarColor = pillarColors.Love; break;
        case 'skill': pillarColor = pillarColors.Skill; break;
        case 'wealth': pillarColor = pillarColors.Wealth; break;
        case 'needs': pillarColor = pillarColors.World; break;
        default: pillarColor = 'rgb(45, 52, 54)'; // Balance color
      }
      return { ...p, color: pillarColor };
    });
  }, [stats]);

  const chartConfig = {
    backgroundGradientFrom: colors.bg || "#ffffff",
    backgroundGradientTo: colors.bg || "#ffffff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => colors.black || "#000000",
  };

  if (loading) return null;

  const data = {
    labels: sortedPillars.map(p => p.label),
    data: sortedPillars.map(p => p.value),
    colors: sortedPillars.map(p => p.color)
  };

  return (
    <View style={styles.outerContainer}>
      <ProgressChart
        data={data}
        width={screenWidth - spacing.xl * 1}
        height={260}
        strokeWidth={13} // Thinner stroke to accommodate 5 rings
        radius={45}
        chartConfig={chartConfig}
        hideLegend={true}
        withCustomBarColorFromData={true}
        style={styles.rotatedChart}
      />

      <View style={styles.legendContainer}>
        {sortedPillars.map((item, index) => (
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
    justifyContent: 'space-evenly',
    width: '120%',
    borderColor: colors.border,
    // borderWidth: 1,
    borderRadius: 8,
    marginLeft: 19, // Adjust to align with the chart
    padding: spacing.sm,
    marginTop: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    // borderWidth: 1,
    alignItems: 'center',
    width: '20%',
    marginBottom: spacing.sm,
  },
  indicator: {
    width: 6,
    height: 30,
    borderRadius: 5,
    marginRight: spacing.sm,
  },
  rotatedChart: {
    // For 9 o'clock start:
    transform: [{ rotate: '180deg' }],
  },
});

export default ProgressRings;