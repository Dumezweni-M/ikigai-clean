import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import ScrollVertical from '../components/ScrollVertical';
import AchievedGoalsVault from '../components/AchievedGoalsVault';
import Stack from '../components/Stack';
import typography from '../styles/typography';
import { Text } from 'react-native';
import layout from '../styles/layout';
import LineGraph from '../components/LineChart';
import ProgressRings from '../components/EquilibruimRadar';






export default function Overview() {
    return (
        <ScreenWrapper>
            <ScrollVertical>
                
                {/* Page heading */}
                <Stack size='sm' style={layout.cardXxs}>
                    <Text style={typography.h1}>Overview</Text>
                    <Text style={typography.label}>Energy is never lost; it is merely transferred from one state to another</Text>
                </Stack>

                {/* Equilibrium Radar*/}
                <Stack size='lg' style={layout.cardLg}>
                    <Text style={typography.h2}>Equilibrium Radar</Text>
                    <Text style={typography.label}>"Where intention goes, energy flows."</Text>
                    <ProgressRings/>
                    <Text style={typography.body}>Your energy is a finite currency. The pillars show where you're spending it.</Text>
                </Stack>


                {/* Individual Task Data */}
                <Stack>
                    <AchievedGoalsVault />
                </Stack>



            </ScrollVertical>
        </ScreenWrapper>
    )
}