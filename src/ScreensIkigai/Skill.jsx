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

export default function Initiate() {
    const Navigation = useNavigation();
    return (
        <ScreenWrapper>
            <Header/>
            <ScrollVertical>
                <Stack size="lg" style={layout.cardMd}>
                    <Text style={typography.h1}>What is your current pursuit?</Text>
                    <Text style={typography.body}>Share your current focus or area/s of interest.</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.border }}>
                        <TextInput style={typography.body} placeholder="" />
                    </View>

                </Stack>
                <Stack size="md" style={layout.cardSmTertiary}>
                        <Text style={typography.body}>Select 1 or more pillars that align with your current pursuit:</Text>
                        <PillarSelector/>
                        
                </Stack>


                <Stack size="lg" style={layout.cardSm}>
                        <Text style={typography.body}>You can always add more interests later. Lets Proceed!</Text>
                        <Button label="Continue" variant="cta" onPress={() => Navigation.navigate("Home")} />    
                </Stack>

            </ScrollVertical>

        </ScreenWrapper>
    )
}