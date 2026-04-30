import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import colors from '../styles/colors';
import pillarColors from '../styles/pillarColors';
import typography from '../styles/typography';
import { spacing } from '../styles/spacing';

import {  useQuery } from '@apollo/client';
import { GET_COMPLETIONS } from '../graphql/queries'; 

const screenWidth = Dimensions.get("window").width;

const ProgressRings = () => {
const { data: completionData, loading } = useQuery(GET_COMPLETIONS);

const stats = React.useMemo(() => {

    const totals = { love: 0, wealth: 0, skill: 0, needs: 0 };
    
    if (!completionData?.taskCompletions) return totals;

    completionData.taskCompletions.forEach(c => {
      const p = c.pillar?.toLowerCase(); 
      if (totals.hasOwnProperty(p)) {
        totals[p] += c.intensity || 1;
      }
    });

    const getProgress = (points) => (points % 500) / 500;

    return {
      love: getProgress(totals.love),
      wealth: getProgress(totals.wealth),
      skill: getProgress(totals.skill),
      needs: getProgress(totals.needs),
    };
  }, [completionData]);

  const sortedPillars = React.useMemo(() => {
    const basePillars = [
      { label: "love", value: stats.love, color: pillarColors.Love },
      { label: "skill", value: stats.skill, color: pillarColors.Skill },
      { label: "wealth", value: stats.wealth, color: pillarColors.Wealth },
      { label: "needs", value: stats.needs, color: pillarColors.World }
    ];

    // DYNAMIC ORDERING: Lowest value becomes the outermost ring
    const sorted = [...basePillars].sort((a, b) => b.value - a.value);

    // "YOU" (Average)
    const youValue = (stats.love + stats.wealth + stats.skill + stats.needs) / 4;
    
    return [{ label: "Balance", value: youValue, color: 'rgb(45, 52, 54)' }, ...sorted];
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
});

export default ProgressRings;