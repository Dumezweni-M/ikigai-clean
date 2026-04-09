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
import SpiderChart from '../components/SpiderChart';



function Home() {
  return (
    <ScreenWrapper>
        <Header/>
        <ScrollVertical>

            {/* Introduction Hero Section */}
            <Stack style={layout.cardSm}>
                <Text style={typography.label}>State of Mind</Text>
                <Text style={typography.h1}>3 of 4 pillars active</Text>
                <Text style={typography.body}>Flow state achieved in 16 consecutive sessions. Balance is reaching optimal equilibrium</Text>
            </Stack>

            {/* Weekly Flow State */}
            <Stack size='lg' style={layout.cardMd}>
                <Text style={typography.h2}>Flow State</Text>
                <SpikesGraph/>
            </Stack>


            {/* Equilibrium Radar*/}
            <Stack size='lg' style={layout.cardLgTertiary}>
                <Text style={typography.label}>State of Mind</Text>
                <Text style={typography.h2}>Equilibrium Radar</Text>
                <SpiderChart/>
                <Text style={typography.body}>Flow state achieved in 16 consecutive sessions. Balance is reaching optimal equilibrium</Text>
            </Stack>
            
            

            {/* Activity Heatmap  */}
            <Stack size='lg' style={layout.cardMdTertiary}>
                <Text style={typography.h2}>Activity Heat Map</Text>
                <Text style={typography.body}>Your annual pulse</Text>
                <ActivityGraph/>
                <Text style={typography.body}>Average Baseline</Text>
            </Stack>


            {/* Meditation Timer */}
            <Stack size='lg' style={layout.cardMd}>
                <Text style={typography.label}>State of Mind</Text>
                <Text style={typography.h1}>DEEP WORK: Meditation</Text>
                <Text style={typography.body}>Lets take a  moment to center ourselves</Text>
                <Text style={typography.h1}>05:00 MINS</Text>
                <Button label="ENTER THE VOID"   variant="primary"   onPress={() => {}} />
            </Stack>


        </ScrollVertical>
        <Navbar/>
    </ScreenWrapper>
  );
}

export default Home;