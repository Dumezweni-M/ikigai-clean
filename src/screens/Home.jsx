// import "./global.css";

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import typography from '../styles/typography';
import layout from '../styles/layout';
import ScrollVertical from '../components/ScrollVertical';
import Stack from '../components/Stack';
import Button from '../components/Buttons';


function Home() {
  return (
    <View style={styles.container}>
        <ScrollVertical>

            {/* Introduction Hero Section */}
            <Stack style={layout.cardSm}>
                <Text style={typography.label}>State of Mind</Text>
                <Text style={typography.h1}>3 of 4 pillars active</Text>
                <Text style={typography.body}>Flow state achieved in 16 consecutive sessions. Balance is reaching optimal equilibrium</Text>
            </Stack>

            {/* Equilibrium Radar*/}
            <Stack size='lg' style={layout.cardMdTertiary}>
                <Text style={typography.h2}>Equilibrium Radar</Text>
                <Text style={typography.label}>State of Mind</Text>
                <Text style={typography.body}>Flow state achieved in 16 consecutive sessions. Balance is reaching optimal equilibrium</Text>
            </Stack>


            <Stack size='lg' style={layout.cardLg}>
                <Text style={typography.label}>State of Mind</Text>
                <Text style={typography.h1}>DEEP WORK: Meditation</Text>
                <Text style={typography.body}>Lets take a  moment to center ourselves</Text>
                <Text style={typography.h1}>05:00 MINS</Text>
                <Button label="ENTER THE VOID"   variant="primary"   onPress={() => {}} />
            </Stack>
            
        </ScrollVertical>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
    padding: 20,
  },
  text: {
    fontSize: 24,
  },
});

export default Home;