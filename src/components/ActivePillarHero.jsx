import React from "react"
import { View, Text, StyleSheet } from 'react-native';
import typography from '../styles/typography';
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../graphql/queries";

export default function ActivePillarHero() {
    const { data, loading } = useQuery(GET_TASKS)

    const tasks = data?.taskItems || [];

    // 1. Create the Tally (Frequency Map)
    const pillarFrequencies = tasks.reduce((acc, t) => {
        if (t.pillar) {
            const name = t.pillar.trim().toLowerCase();
            acc[name] = (acc[name] || 0) + 1;
        }
        return acc;
    }, {});

    // 2. Calculate unique count from the keys of our tally
    const activePillarsCount = Object.keys(pillarFrequencies).length;

    // 3. Debugging logs
    console.log("Detailed Breakdown:", pillarFrequencies);

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