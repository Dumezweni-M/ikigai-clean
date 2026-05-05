// import "./global.css";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import typography from '../styles/typography';
import layout from '../styles/layout';
import Stack from '../components/Stack';
import colors from '../styles/colors';

import ActivityGraph from '../components/ContriGraph';
import SpikesGraph from '../components/LineChart';
import ScreenWrapper from '../components/ScreenWrapper';
import ProgressRings from '../components/EquilibruimRadar';
import { useNavigation } from '@react-navigation/native';
import ActivePillarHero from '../components/ActivePillarHero';
import PillarDeficitChart from '../components/PillarDeficitChart';

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


            <Stack>
                <PillarDeficitChart/>
            </Stack>

            

            
           
            {/* Activity Heatmap  */}
            <Stack size='lg' style={layout.cardMdDark}>
                <Text style={[typography.h2, { color: colors.white }]}>Activity Heat Map</Text>
                <Text style={[typography.body, { color: colors.white }]}>Your annual pulse</Text>
                <ActivityGraph/>
            </Stack>

    </ScreenWrapper>
  );
}

export default Home;