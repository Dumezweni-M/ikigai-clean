import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_TASKS } from "../graphql/queries.js"
import { COMPLETE_TASK } from "../graphql/mutations.js"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { Target, Check } from 'lucide-react-native';
import { useState } from "react";
import { isCheckedInCurrentCycle } from "../utils/timeHelpers.js";

import Navbar from "../components/Navbar";
import ScreenWrapper from "../components/ScreenWrapper";
import ScrollVertical from "../components/ScrollVertical";
import Header from "../components/Header";
import Stack from "../components/Stack";
import Button from "../components/Buttons";
import HabitItemCard from "../components/HabitItemCard";
import DashboardFilter from "../components/DashboardFilter";

import typography from "../styles/typography";
import layout from "../styles/layout";
import colors from "../styles/colors";
import { spacing } from "../styles/spacing";

export default function Reflect() {
const navigation = useNavigation();
const [activePillar, setActivePillar] = useState("All");

const [completeTask] = useMutation(COMPLETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }], // Refreshes the list automatically
    onCompleted: () => console.log("Task successfully updated in Neon!"),
    onError: (err) => console.error("Mutation error:", err.message),
  });

const toggleIsChecked = () => {
    setIsChecked(prev => !prev);
  };

  const { loading, error, data } = useQuery(GET_TASKS, {
    fetchPolicy: 'network-only', // Always fetch fresh data from the server
    // fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Text>Loading tasks...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;


  const customResetHour = 12; // Set to 0 for midnight reset, adjust as needed
  const customResetMinute = 36; 

  // Determine if each task is checked based on the most recent completion date and the current cycle, then filter and sort tasks for display
  const allTasks = (data?.taskItems || []).map(task => {
    const status = isCheckedInCurrentCycle(task.lastCompletedAt, customResetHour, customResetMinute);
    return {
      ...task,
      isChecked: status,    // Keep for your sorting logic
      isCompleted: status,  // Add for your toggleIsChecked logic
    };
  });

  // Filter task then sort 
const filteredTasks = [...allTasks]
  .filter(task => 
    activePillar === "All" || task.pillar?.toLowerCase() === activePillar.toLowerCase()
  )
  .sort((a, b) => (a.isChecked === b.isChecked ? 0 : a.isChecked ? 1 : -1));

    const tasks = data?.taskItems || [];

  return (
    <ScreenWrapper>
      <ScrollVertical>

        <Stack size="sm" style={layout.cardXxs}>
          <Text style={typography.h1}>Reflection</Text>
          <Text style={typography.label}>Select the intesity of each task you completed before marking it as done. Tasks will be greyed out until midnight before being reactivated.  </Text>
        </Stack>

        {/* Dash board filter to exclude tasks based on pillar */}
        {/* <Stack size='sm' style={layout.cardXxxs}> */}
          <DashboardFilter
            selectedPillar={activePillar}
            onSelect={setActivePillar}
          />
        {/* </Stack> */}


        {/* Passing of Habit Items list */}
        <Stack size="sm" >
          <HabitItemCard
            tasks={filteredTasks}
            onComplete={(id, intensity) => {
              console.log(`Task ID: ${id}, Intensity: ${intensity}`);
              completeTask({
              variables: {
                taskId: id,
                intensity: intensity
              }
            });
            }} 
          />
        </Stack>

        <Stack size="lg" style={layout.cardXs}>
          <Button 
            label="Back to Dashboard" 
            variant="inverted" 
            onPress={() => navigation.navigate("Home")} 
          />
        </Stack>

      </ScrollVertical>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  habitCard: {
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    // backgroundColor: colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 0,
  },
  textGroup: {
    marginLeft: spacing.md,
  },
  pillarLabel: {
    ...typography.light,
    fontSize: 10,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 0,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  intensityLabel: {
    fontSize: 10,
    color: colors.black,
    width: 100,
  },
  slider: {
    flex: 1,
    height: 20,
  },
});