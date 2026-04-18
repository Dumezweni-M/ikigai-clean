import React from "react"
import { View, Text, StyleSheet } from 'react-native';
import typography from '../styles/typography';
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../graphql/queries";

export default function ActivePillarHero () {
    const { data, loading } = useQuery(GET_TASKS)

    const tasks = data?.taskItems || [];
    const activePillarsCount = new Set(
    tasks
      .filter(t => t.pillar) // Ensure the pillar exists to avoid errors
      .map(t => t.pillar.trim().toLowerCase())
    ).size;

    console.log("Unique Pillars detected:", Array.from(new Set(tasks.map(t => t.pillar?.trim().toLowerCase()))));

    // Purely for debuggin purposes
    // const pillarDetails = tasks.reduce((acc, task) => {
    // const name = task.pillar;
    // acc[name] = (acc[name] || 0) + 1;
    // return acc;
    // }, {});
    // console.log("--- Pillar Breakdown ---");
    // console.log("Total Unique Count:", Object.keys(pillarDetails).length);
    // console.table(pillarDetails);


    return (
        <View>
            <Text style={typography.label}>State of Mind</Text>
            <Text style={typography.h1}>{loading ? "--" : activePillarsCount} of 4 pillars active</Text>
            <Text style={typography.body}>Flow is not a reward for hard work but the result of removing friction. If you can't focus, don't try harder, simplify the environment."</Text>
            <Text style={typography.label}> It’s a design problem, not a character flaw</Text>
        </View>
    )
}