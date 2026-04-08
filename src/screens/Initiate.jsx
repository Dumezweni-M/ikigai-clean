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

export default function Initiate() {
    const Navigation = useNavigation();
    return (
        <ScreenWrapper>
            <Header/>
            <ScrollVertical>
                <Stack style={layout.cardLg}>
                    <Text style={typography.h1}>What is your current pursuit?</Text>
                    <Text style={typography.body}>Share your current focus or area/s of interest.</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.border }}>
                        <TextInput style={typography.body} placeholder="" />
                        <Button label="Add" variant="primary" onPress={() => {}} />    
                    </View>
                    {/* There should be a list of interests here - mapped directly to DB -> Mapped to the 4 pillars in next page [ALIGNMENT] */}

                </Stack>
                        <Button label="Continue" variant="cta" onPress={() => Navigation.navigate("Home")} />    
            </ScrollVertical>

        </ScreenWrapper>
    )
}