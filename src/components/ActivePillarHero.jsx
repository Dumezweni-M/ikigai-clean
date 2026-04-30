import React from "react"
import { View, Text, StyleSheet } from 'react-native';
import typography from '../styles/typography';
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../graphql/queries";
import { getPillarFrequencies, getActivePillarsCount } from "../utils/pillarUtils";


export default function ActivePillarHero() {
    const { data, loading } = useQuery(GET_TASKS)
    const tasks = data?.taskItems || [];
    const pillarFrequencies = getPillarFrequencies(tasks)
    const activePillarsCount = getActivePillarsCount(tasks)


    console.log("Detailed Breakdown:", pillarFrequencies);

    return (
        <View>
            <Text style={typography.label}>State of Mind</Text>
            <Text style={typography.h1}>{loading ? "--" : activePillarsCount} of 4 pillars active</Text>
            <Text style={typography.body}>Flow is not a reward for hard work but the result of removing friction. If you can't focus, don't try harder, simplify the environment."</Text>
            <Text style={typography.label}> It’s a design problem, not a character flaw</Text>
        </View>
    )
}