import React from 'react';
import { ContributionGraph } from 'react-native-chart-kit';
import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const commitsData = [
  { date: '2026-01-02', count: 1 },
  { date: '2026-03-01', count: 2 },
  { date: '2026-03-30', count: 3 },
  { date: '2026-01-05', count: 4 },
  { date: '2026-01-06', count: 5 },
  { date: '2026-01-30', count: 2 },
  { date: '2026-01-31', count: 3 },
  { date: '2026-05-31', count: 3 },
];

const chartConfig = {
  backgroundGradientFrom: colors.bgAlt,
  backgroundGradientTo: colors.bgAlt,
  color: (opacity = 1) => `rgba(227, 195, 82, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  propsForDots: { r: '0' },
};

export default function ActivityGraph() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ContributionGraph
          values={commitsData}
          endDate={new Date('2026-12-31')}
          numDays={365}
          width={1010}
          height={220}
          squareSize={16}
          gutterSize={2}
          chartConfig={chartConfig}
          accessor='count'
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 1,
    backgroundColor: colors.neutral,
  },
});