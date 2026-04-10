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
import PillarSelector from "../components/PillarSelector";
import FrequencySelector from "../components/FrequencySelector";

export default function HabitCreate() {
    const Navigation = useNavigation();
    return (
        <ScreenWrapper>
            <Header/>
            <ScrollVertical>
                <Stack size="lg" style={layout.cardMd}>
                    <Text style={typography.h1}>Select a pillar</Text>
                    {/* <Text style={typography.body}>Share your current focus or area/s of interest.</Text> */}

                        <PillarSelector/>

                </Stack>
                

                {/* Select Pillars */}
                <Stack size="md" style={layout.cardXs}>
                        <Text style={typography.h2}>Add another intention</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.border }}>
                        <TextInput style={typography.light} placeholder="Set your intention" />
                    </View>
                </Stack>


                {/* Select Frequency */}
                <Stack size="xxl" style={layout.cardMd}>
                    <Text style={typography.h2}>Set your horizon</Text>
                        <FrequencySelector/>
                </Stack>


                <Stack size="lg" style={layout.cardSmDark}>
                        <Button label="Activate" variant="cta" onPress={() => Navigation.navigate("Home")} />    
                </Stack>

            </ScrollVertical>

        </ScreenWrapper>
    )
}