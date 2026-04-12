import React from "react";

import ScreenWrapper from "../components/ScreenWrapper";
import ScrollVertical from "../components/ScrollVertical";
import Header from "../components/Header";
import  Stack  from "../components/Stack";
import typography from "../styles/typography";
import layout from "../styles/layout";
import Button from "../components/Buttons";
import { Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../styles/colors";
import Navbar from "../components/Navbar";

export default function Catalysts() {
    const Navigation = useNavigation();
    return (
        <ScreenWrapper>
            <ScrollVertical>
                <Stack size="lg" style={layout.cardXs}>
                    <Text style={typography.h1}>Catalysts</Text>
                    {/* <Text style={typography.body}>Share your current focus or area/s of interest.</Text> */}
                </Stack>

                {/* Meditation Timer */}
                <Stack size='lg' style={layout.cardMdTertiary}>
                    <Text style={typography.label}>State of Mind</Text>
                    <Text style={typography.h1}>DEEP WORK: Meditation</Text>
                    <Text style={typography.body}>Lets take a  moment to center ourselves</Text>
                    <Text style={typography.h1}>05:00 MINS</Text>
                    <Button label="Start" variant="cta" onPress={() => Navigation.navigate("HabitUpdate")} />  
                </Stack>

                <Stack size='lg' style={layout.cardMd}>
                    <Text style={typography.label}>Resilience</Text>
                    <Text style={typography.h1}>Rejection Therapy</Text>
                    <Text style={typography.body}>Ask for something small you expect a "no" for.</Text>
                    <Button label="Accept Task" variant="cta" onPress={() => Navigation.navigate("Experiments")} />  
                </Stack>

                <Stack size='lg' style={layout.cardMdTertiary}>
                    <Text style={typography.label}>Angels</Text>
                    <Text style={typography.h1}>Anonymous Service</Text>
                    <Text style={typography.body}>Perform one small, invisible act of kindness.</Text>
                    <Button label="Accept Task" variant="cta" onPress={() => Navigation.navigate("Experiments")} />  
                </Stack>

                <Stack size='lg' style={layout.cardMd}>
                    <Text style={typography.label}>Fluidity</Text>
                    <Text style={typography.h1}>"Yes, and..."</Text>
                    <Text style={typography.body}>In every conversation for 2 hours, you must use the improv rule "Yes, and..." to build on others' ideas instead of contradicting them.</Text>
                    <Button label="Accept Task" variant="cta" onPress={() => Navigation.navigate("Experiments")} />  
                </Stack>

            </ScrollVertical>
        </ScreenWrapper>
    )
}