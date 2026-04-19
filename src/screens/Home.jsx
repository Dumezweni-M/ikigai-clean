// import "./global.css";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import typography from '../styles/typography';
import layout from '../styles/layout';
import ScrollVertical from '../components/ScrollVertical';
import Stack from '../components/Stack';
import Button from '../components/Buttons';
import colors from '../styles/colors';
import Navbar from '../components/Navbar';
import ActivityGraph from '../components/ContriGraph';
import SpikesGraph from '../components/LineChart';
import Header from '../components/Header';
import ScreenWrapper from '../components/ScreenWrapper';
import ProgressRings from '../components/ProgressRings';
import { useNavigation } from '@react-navigation/native';
import ActivePillarHero from '../components/ActivePillarHero';

import { useQuery } from '@apollo/client';
import { GET_COMPLETIONS } from '../graphql/queries';



function Home() {
    const Navigation = useNavigation();
    const { data, loading } = useQuery(GET_COMPLETIONS);

    if (data) {
    console.log("RAW DATA FROM SERVER:", data);
    }

    if ( loading) return null; // Or a loading spinner

  return (
    <ScreenWrapper>      

            {/* Introduction Hero Section */}
            <Stack style={layout.cardSm}>
                <ActivePillarHero/>
            </Stack>

            {/* Weekly Flow State */}
            <Stack size='lg' style={layout.cardMd}>
                <Text style={typography.h2}>Flow State</Text>
                <SpikesGraph completions={data?.taskCompletions} />
            </Stack>


            {/* Equilibrium Radar*/}
            <Stack size='lg' style={layout.cardLgTertiary}>
                <Text style={typography.h2}>Equilibrium Radar</Text>
                <Text style={typography.label}>"Where intention goes, energy flows."</Text>
                <ProgressRings/>
                <Text style={typography.body}>"Your energy is a finite currency. The pillars show where you're spending it."</Text>
            </Stack>
            
            

            {/* Activity Heatmap  */}
            <Stack size='lg' style={layout.cardMdTertiary}>
                <Text style={typography.h2}>Activity Heat Map</Text>
                <Text style={typography.body}>Your annual pulse</Text>
                <ActivityGraph/>
                <Text style={typography.body}>Average Baseline</Text>
            </Stack>

    </ScreenWrapper>
  );
}

export default Home;