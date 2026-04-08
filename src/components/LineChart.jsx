import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { spacing, radius } from '../styles/spacing';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [2, 5, 2, 8, 10, 3, 4],
      color: (opacity = 1) => `rgba(227, 195, 82, ${opacity})`,
      strokeWidth: 3,
    },
  ],
  legend: ['Daily Intensity'],
};

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

export default function SpikesGraph() {
  return (
    <View style={styles.container}>
      {/* <Text style={[typography.h2, styles.title]}>Activity Spikes</Text> */}
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