import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { spacing, radius } from '../styles/spacing';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: colors.bg,
  backgroundGradientTo: colors.bg,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(227, 195, 82, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(248, 248, 248, ${opacity})`,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: colors.bg,
  },
};


// const data = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [
//     {
//       data: [0, 0, 0, 0, 0, 0, 0],
//       color: (opacity = 1) => colors.secondary, // Intensity Gold
//       strokeWidth: 1,
//     },
//     {
//       data: [0, 0, 0, 0, 0, 0, 0],
//       color: (opacity = 1) => `rgba(248, 248, 248, ${opacity})`, // Neutral White
//       strokeWidth: 1,
//     },
//     {
//       data: [0, 0, 0, 0, 0, 0, 0],
//       color: (opacity = 1) => `rgba(160, 160, 160, ${opacity})`, // Muted Gray
//       strokeWidth: 1,
//     },
//     {
//       data: [0, 0, 0, 0, 0, 0, 0],
//       color: (opacity = 1) => `rgba(160, 160, 160, ${opacity})`, // Muted Gray
//       strokeWidth: 1,
//     },
//   ],
//   legend: ['Love', 'Skill', 'World', 'Wealth'], // Match the order of datasets
// };


export default function SpikesGraph( {completions = []}) {

  if (!completions || completions.length === 0) {
    return (
      <View style={[styles.container, { height: 220, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.secondary }}>Waiting for activity data...</Text>
      </View>
    );
  }

  const processCompletions = () => {
    const testCompletions = [{ completedAt: '2026-04-20', pillar: 'Love' }];
    // Initialize 7 days (Mon-Sun) for each pillar
    const counts = {
      Love: [0, 0, 0, 0, 0, 0, 0],
      Skill: [0, 0, 0, 0, 0, 0, 0],
      World: [0, 0, 0, 0, 0, 0, 0],
      Wealth: [0, 0, 0, 0, 0, 0, 0],
    };

  completions.forEach((c) => {
      if (!c.completedAt || !c.pillar) return;

      const dateString = c.completedAt.replace(' ', 'T');
      const date = new Date(dateString);
      
      let dayIndex = date.getDay() - 1; 
      if (dayIndex === -1) dayIndex = 6; 

      // 2. Normalization: Handle "love" vs "Love"
      const p = c.pillar.charAt(0).toUpperCase() + c.pillar.slice(1).toLowerCase();

      if (counts[p]) {
        counts[p][dayIndex] += 1;
      }
    });

    return counts;
  };

  const pillarData = processCompletions();

  // 3. Mapping Processed Data to the Chart Structure
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: pillarData.Love,
        color: (opacity = 1) => colors.secondary || '#E3C352', // Gold
        strokeWidth: 1,
      },
      {
        data: pillarData.Skill,
        color: (opacity = 1) => `rgba(248, 248, 248, ${opacity})`, // White
        strokeWidth: 1,
      },
      {
        data: pillarData.World,
        color: (opacity = 1) => `rgba(160, 160, 160, ${opacity})`, // Muted Gray
        strokeWidth: 1,
      },
      {
        data: pillarData.Wealth,
        color: (opacity = 1) => `rgba(80, 80, 80, ${opacity})`, // Dark Gray
        strokeWidth: 1,
      },
    ],
    legend: ['Love', 'Skill', 'World', 'Wealth'],
  };

  
  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth - spacing.xl * 1}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          borderRadius: radius.lg,
          marginLeft: -34,
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
    borderRadius: radius.lg,
  },
});