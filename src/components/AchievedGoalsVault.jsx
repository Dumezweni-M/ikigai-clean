import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_ACHIEVED_GOALS } from '../graphql/queries';
import typography from '../styles/typography';
import  Stack  from './Stack';
import layout from '../styles/layout';
import { spacing } from '../styles/spacing';
import colors from '../styles/colors';
import ScrollVerical from './ScrollVertical';


export default function AchievedGoalsVault() {

  const { loading, error, data } = useQuery(GET_ACHIEVED_GOALS);

  if (loading) return <Text style={typography.label}>LOADING...</Text>;
  if (error) return <Text style={typography.label}>ERROR</Text>;

  const totalCompleted = data?.achievedGoals?.length || 0;




return (
    <ScrollVerical style={styles.container}>
        <Stack size="lg" style={[layout.cardXxxs, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={typography.light}>Tasks Completed</Text>
        <Text style={typography.light}>Total: {totalCompleted}</Text>
      </Stack>
      {data?.achievedGoals.map((goal) => (
        <View key={goal.id} style={[layout.cardXxxs, { backgroundColor: colors.neutral }]}>
          <View>
            <Text style={typography.light}>{goal.title}</Text>
            <Text style={typography.label}>{goal.pillar}</Text>
          </View>
          
          <View style={styles.stats}>
            <Text style={typography.label}>Average Intesity: {goal.avgIntensity.toFixed(1)}</Text>
            <Text style={typography.label}>Days: {goal.finalCount}</Text>
          </View>

          <Text style={typography.label}>
            Achieved :
            {new Date(goal.achievedAt).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </ScrollVerical>
  );
}

const styles = StyleSheet.create({

  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  stats: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 8,
  },
  date: {
    ...typography.label,
    fontSize: 9,
    marginTop: 8,
    opacity: 0.5,
  }
});