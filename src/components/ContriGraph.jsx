import React from 'react';
import { useRef, useEffect } from 'react';
import { ContributionGraph } from 'react-native-chart-kit';
import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import { spacing, radius } from '../styles/spacing';
import { useQuery, gql } from '@apollo/client';
import { GET_COMPLETIONS } from '../graphql/queries';

const screenWidth = Dimensions.get('window').width;



const chartConfig = {
  backgroundGradientFrom: colors.bg,
  backgroundGradientTo: colors.bg,
  color: (opacity = 1) => `rgba(227, 195, 82, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  propsForDots: { r: '0' },
};

const processData = (taskCompletions) => {
  // 1. Guard clause for empty or undefined data
  if (!taskCompletions || taskCompletions.length === 0) {
    console.log("No completions found to process.");
    return [];
  }

  const map = {};
  
  taskCompletions.forEach(c => {
    // 2. Defensive check for the date field
    if (!c.completedAt) return;

    // 3. Extract YYYY-MM-DD (Handling both ' ' and 'T' separators)
    const date = c.completedAt.split(/[ T]/)[0]; 
    
    const base = 5; 
    const effort = (c.intensity || 1) * 10;
    
    map[date] = (map[date] || 0) + (base + effort);
  });

  const result = Object.keys(map).map(date => ({
    date,
    count: map[date]
  }));

  console.log("Processed data for graph:", result);
  return result;
};



const squareSize = 10;
const gutterSize = 1;
const chartWidth = (53 * (squareSize + gutterSize)) + 80;
const endOf2026 = new Date('2026-12-31')


export default function ActivityGraph() {

  const scrollRef = useRef(null);

  useEffect(() => {
    // 1. Calculate how many weeks have passed this year
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const diffInDays = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(diffInDays / 7);

    // 2. Calculate the X offset
    // (Week Number * (Square + Gutter)) - Offset to center it a bit
    const squareSize = 10;
    const gutterSize = 1;
    const xOffset = currentWeek * (squareSize + gutterSize);

    // 3. Scroll to position after a short delay to ensure layout is ready
    setTimeout(() => {
      scrollRef.current?.scrollTo({ x: xOffset, animated: true });
    }, 500);
  }, []);

  const { data, loading, error } = useQuery(GET_COMPLETIONS);

  if (loading) return null;
  if (error) {
    console.error("Heatmap Query Error:", error);
    return null;
  }

  const rawCompletions = data?.taskCompletions || [];
  const liveData = processData(rawCompletions);


  return (

    
    <View style={styles.container}>
      <ScrollView 
        horizontal showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        >
        <ContributionGraph
         values={liveData.length > 0 ? liveData : [{ date: '2026-01-01', count: 0 }]}
          endDate={endOf2026}
          numDays={365}
          width={chartWidth}
          height={250}
          squareSize={squareSize + 10}
          gutterSize={gutterSize}
          chartConfig={chartConfig}
          accessor='count'
          style={{
          borderRadius: radius.sm,
        }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: colors.bg,
  },
});