import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { StackedBarChart } from 'react-native-chart-kit';
import colors from '../styles/colors';
import typography from '../styles/typography';
import { spacing } from '../styles/spacing';
import pillarColors from '../styles/pillarColors';
import { useQuery } from '@apollo/client';
import { GET_TASKS, GET_COMPLETIONS } from '../graphql/queries';
import layout from '../styles/layout';

const screenWidth = Dimensions.get("window").width;

const PillarDeficitChart = () => {
  // ALL hooks must be called before any return
  const { data: taskData, loading: taskLoading } = useQuery(GET_TASKS, {
    fetchPolicy: 'cache-and-network',
  });

  const { data: completionData, loading: completionLoading } = useQuery(GET_COMPLETIONS, {
    fetchPolicy: 'cache-and-network',
  });

  const chartData = React.useMemo(() => {
    if (!taskData?.taskItems || !completionData?.taskCompletions) return null;

    const pillars = {
      love:   { current: 0, target: 0 },
      skill:  { current: 0, target: 0 },
      wealth: { current: 0, target: 0 },
      world:  { current: 0, target: 0 },
    };

    // Targets from taskItems
    taskData.taskItems.forEach(task => {
      const p = task.pillar?.toLowerCase();
      const key = p === 'needs' ? 'world' : p;
      if (key && pillars[key] !== undefined) {
        pillars[key].target += task.targetDays || 0;
      }
    });

    // Count each completion event as 1 day completed
    completionData.taskCompletions.forEach(completion => {
      const p = completion.pillar?.toLowerCase();
      const key = p === 'needs' ? 'world' : p;
      if (key && pillars[key] !== undefined) {
        pillars[key].current += 1;
      }
    });

    const labels = ["LOVE", "SKILL", "WEALTH", "WORLD"];
    const chartValues = labels.map(label => {
      const stats = pillars[label.toLowerCase()];
      const gap = Math.max(0, stats.target - stats.current);
      return [stats.current, gap];
    });

   

    return {
      labels,
      legend: ["FILLED", "THE GAP"],
      data: chartValues,
      barColors: [
        pillarColors.Skill,   '',
        pillarColors.Skill,  'rgba(0,0,0,0.07)',
        pillarColors.Wealth, 'rgba(0,0,0,0.07)',
        pillarColors.World,  'rgba(0,0,0,0.0)',
      ],
    };
  }, [taskData, completionData]);

  const chartConfig = {
    backgroundGradientFrom: colors.neutral,
    backgroundGradientTo: colors.neutral,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => colors.black,
    barPercentage: 1.2,
    propsForBackgroundLines: {
      strokeDasharray: "0.5",
      stroke: "rgba(0,0,0,0.05)"
    }
  };

  // Early return AFTER all hooks
  if (taskLoading || completionLoading || !chartData) return null;

  return (
    <View style={layout.cardMd}>
      <View style={styles.header}>
        <Text style={typography.h2}>Progress</Text>
        <Text style={typography.label}>Filling the potential of your targets</Text>
      </View>

      <StackedBarChart
        data={chartData}
        width={screenWidth - spacing.xl }
        height={265}
        xLabelsOffset={9}
        yLabelsOffset={20}
        chartConfig={chartConfig}
        style={styles.chart}
        hideLegend={true}
      />

      {chartData.labels.map((label, index) => {
        
        const pillarColor = pillarColors[pillarKey] || colors.black;
        const pillarKey = label.charAt(0) + label.slice(1).toLowerCase();

        const filled = chartData.data[index][0];
        const gap    = chartData.data[index][1];
        const total  = filled + gap;

        const percentage = total > 0 ? Math.round((filled / total) * 100) : 0;

        return (
          <View key={label} style={styles.statBox}>
            <Text style={[typography.label, { color: pillarColors[pillarKey] }]}>
              {label}
            </Text>
            <Text style={typography.label}>
              {filled}/{total} ACTIONS
            </Text>
            <Text style={[typography.label, { color: pillarColors[pillarKey], fontSize: 15 }]}>
          {percentage}%
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.md,
  },
  chart: {
    marginVertical: spacing.sm,
    marginLeft: -15,
  },
  statBox: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  }
});

export default PillarDeficitChart;