import React from 'react';
import { useRef, useEffect } from 'react';
import { ContributionGraph } from 'react-native-chart-kit';
import { Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import { spacing, radius } from '../styles/spacing';
import { useQuery, gql } from '@apollo/client';
import { GET_COMPLETIONS } from '../graphql/queries';
import { processCompletions, getCurrentWeekOffset} from '../utils/activityGraphUtils'
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


const squareSize = 7;
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
    const xOffset = getCurrentWeekOffset(squareSize, gutterSize);

    // 3. Scroll to position after a short delay to ensure layout is ready
    setTimeout(() => {
      scrollRef.current?.scrollTo({ x: xOffset, animated: true });
    }, 500);
  }, []);

  // Verify processCompletions transforms raw data correctly
  const { data, loading, error } = useQuery(GET_COMPLETIONS);
  // Debug raw data and processed data for verification
  if (loading) return null;
  if (error) {
    console.error("Heatmap Query Error:", error);
    return null;
  }
  // Debug raw data and processed data for verification
  const rawCompletions = data?.taskCompletions || [];
  const liveData = processCompletions(rawCompletions);


  return (

    // A horizontally scrollable contribution graph that visualizes user activity throughout the year, with automatic scrolling to the current week.
    <View style={styles.container}>
      <ScrollView 
        horizontal showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        >
        {/* Contribution Graph configuration */}
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