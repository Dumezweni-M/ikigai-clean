import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from '@react-native-community/slider';
import { Target, Check } from 'lucide-react-native';
import { useState } from "react";
import { GET_TASKS } from "../graphql/queries.js"


import Navbar from "../components/Navbar";
import ScreenWrapper from "../components/ScreenWrapper";
import ScrollVertical from "../components/ScrollVertical";
import Header from "../components/Header";
import Stack from "../components/Stack";
import Button from "../components/Buttons";
import HabitItemCard from "../components/HabitItemCard";

import typography from "../styles/typography";
import layout from "../styles/layout";
import colors from "../styles/colors";
import { spacing } from "../styles/spacing";



export default function Reflect() {
const navigation = useNavigation();
  
  
const toggleIsChecked = () => {
    setIsChecked(prev => !prev);
  };

  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <Text>Loading tasks...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const tasks = data.taskItems;

  return (
    <ScreenWrapper>
      <ScrollVertical>
        <Stack size="lg" style={layout.cardXs}>
          <Text style={typography.label}>April 21, 2026 - Tuesday</Text>
          <Text style={typography.h1}>Reflection</Text>
        </Stack>


        {/* Passing of Habit Items list */}
        <Stack size="sm">
          <HabitItemCard tasks={tasks} /> 
        </Stack>

        <Stack size="lg" style={layout.cardXs}>
          <Button 
            label="Confirm" 
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