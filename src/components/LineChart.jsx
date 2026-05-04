import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import pillarColors from '../styles/pillarColors';
import typography from '../styles/typography';
import { spacing, radius } from '../styles/spacing';
import { useState } from 'react';
import { processLineCompletions } from '../utils/lineGraphUtils';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: colors.bg,
  backgroundGradientTo: colors.bg,
  decimalPlaces: 1,
  color: (opacity = 0.2) => `rgba(227, 195, 82, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(248, 248, 248, ${opacity})`,
  propsForDots: {
    r: '2',
    strokeWidth: '0',
    stroke: colors.secondary,
  },
};

const PILLAR_COLORS = {
  All:    colors.tertiary,
  Love:   pillarColors.Love,
  Skill:  pillarColors.Skill,
  World:  pillarColors.World,
  Wealth: pillarColors.Wealth,
};

const ALL_PILLARS = ['All', 'Love', 'Skill', 'World', 'Wealth'];

export default function LineGraph({ completions = [] }) {

  const [activePillars, setActivePillars] = useState({
    All: true, Love: true, Skill: true, World: true, Wealth: true,
  });

  if (!completions || completions.length === 0) {
    return (
      <View style={[styles.container, { height: 220, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.secondary }}>Waiting for activity data...</Text>
      </View>
    );
  }

  const pillarData = processLineCompletions(completions);

  const togglePillar = (name) => {
    // Clicking All resets everything to visible
    if (name === 'All') {
      setActivePillars({ All: true, Love: true, Skill: true, World: true, Wealth: true });
      return;
    }

    setActivePillars(prev => {
      const next = { ...prev, [name]: !prev[name] };
      // If nothing would be active, reset all
      const anyActive = ALL_PILLARS.some(p => next[p]);
      return anyActive ? next : { All: true, Love: true, Skill: true, World: true, Wealth: true };
    });
  };

  const allDatasets = [
    { key: 'All',    data: pillarData.All,    strokeWidth: 0.5 },
    { key: 'Love',   data: pillarData.Love,   strokeWidth: 1 },
    { key: 'Skill',  data: pillarData.Skill,  strokeWidth: 1 },
    { key: 'World',  data: pillarData.World,  strokeWidth: 1 },
    { key: 'Wealth', data: pillarData.Wealth, strokeWidth: 1 },
  ];

  // Filter datasets to only active pillars, inject flat zero for inactive
  // so the chart doesn't shift index positions
  const datasets = allDatasets.map(({ key, data, strokeWidth }) => ({
    data: activePillars[key] ? data : [0, 0, 0, 0, 0, 0, 0],
    color: activePillars[key]
      ? (opacity = 1) => PILLAR_COLORS[key]
      : (opacity = 1) => 'transparent',
    strokeWidth: activePillars[key] ? strokeWidth : 0,
  }));

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets,
  };

  return (
    <View style={styles.container}>

      {/* Clickable Legend */}
      <View style={styles.legendRow}>
        {ALL_PILLARS.map(name => (
          <TouchableOpacity
            key={name}
            onPress={() => togglePillar(name)}
            style={[
              styles.legendItem,
              !activePillars[name] && styles.legendItemInactive,
            ]}
          >
            <View style={[styles.legendDot, { backgroundColor: PILLAR_COLORS[name] }]} />
            <Text style={[
              styles.legendLabel,
              activePillars[name] && styles.legendLabelInactive,
            ]}>
              {name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* <View style={styles.topDaysRow}>
        {chartData.labels.map(day => (
          <Text key={day} style={styles.dayText}>{day}</Text>
        ))}
      </View> */}

      <LineChart
        data={chartData}
        width={screenWidth - 6}
        height={250}
        segments={4}
        chartConfig={chartConfig}
        bezier
        xLabelsOffset={10}
        yLabelsOffset={30}
        fromZero={true}
        fromNumber={10} // Maybe base this on 24 hour cycle in future?
        style={{
          marginLeft: -45,
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral,
    padding: spacing.md,
    borderRadius: radius.xl,
    marginVertical: spacing.md,
  },
  title: {
    marginBottom: spacing.md,
    color: colors.neutral,
  },
  chart: {
    borderRadius: radius.sm,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'transparent',
  },
  legendItemInactive: {
    opacity: 0.3,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    color: colors.primary,
    fontSize: 18,
  },
  legendLabelInactive: {
    color: colors.primary,
  },
  topDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 0,
    marginBottom: 10,
    marginLeft: -122,
    width: '120%',
    borderColor: 'white',
    borderWidth: 1,
  },
});