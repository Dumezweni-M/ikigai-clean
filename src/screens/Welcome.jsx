import React from "react";

import ScreenWrapper from "../components/ScreenWrapper";
import ScrollVertical from "../components/ScrollVertical";
import Header from "../components/Header";
import  Stack  from "../components/Stack";
import typography from "../styles/typography";
import layout from "../styles/layout";
import Button from "../components/Buttons";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../styles/colors";
import { Heart, Gem, Globe, Banknote } from 'lucide-react-native';


export default function Welcome() {
    const navigation = useNavigation();

    return (
            <ScrollVertical>


                {/* Introduction Hero Section */}
                <Stack style={layout.cardSm}>
                    <Text style={typography.label}>Welcome</Text>
                    <Text style={typography.h1}>Find Your Center</Text>
                    {/* <Text style={typography.body}>IMAGE</Text> */}
                </Stack>

                {/* Introduction Hero Section */}
                <Stack style={layout.cardMdDark}>
                    <Text style={[typography.h2, { color: colors.neutral }]}>The framework of a meaningful life is built upon intersecting structural pillars</Text>
                    <Text style={[typography.body, { color: colors.secondary }]}>Harmony is not found in excess but in the precise alignment of internal drive and external utility</Text>
                </Stack>

                {/* Pillar 1 - Love */}
                <Stack style={layout.cardMd}>
                    <Text style={typography.label}>Pillar 01</Text>
                    <Heart size={30} color={colors.secondary} strokeWidth={1.5} />
                    <Text style={typography.h1}>Love</Text>
                    <Text style={typography.h2}>Passion & Mission</Text>
                    <Text style={typography.body}>The emotional foundation.</Text>
                    <Text style={typography.body}>Identifying the craft, people and environments that naturally resonate with your core identity.</Text>
                </Stack>

                {/* Pillar 2 - Skill */}
                <Stack style={layout.cardMdTertiary}>
                    <Text style={typography.label}>Pillar 02</Text>
                    <Gem size={30} color={colors.secondary} strokeWidth={1.5} />
                    <Text style={typography.h1}>Skill</Text>
                    <Text style={typography.h2}>Passion & Profession</Text>
                    <Text style={typography.body}>The technical discipline.</Text>
                    <Text style={typography.body}>Continuous refinement of your unique capabilities until mastery becomes your natural state.</Text>
                </Stack>
                {/* Pillar 3 - Wealth */}
                <Stack style={layout.cardMd}>
                    <Text style={typography.label}>Pillar 04</Text>
                    <Banknote size={30} color={colors.secondary} strokeWidth={1.5} />
                    <Text style={typography.h1}>Wealth</Text>
                    <Text style={typography.h2}>Profession & Vocation</Text>
                    <Text style={typography.body}>The sustainable energy.</Text>
                    <Text style={typography.body}>Ensuring your contribution is valued and provides the resources for continued growth.</Text>
                </Stack>

                {/* Pillar 4 - Need */}
                <Stack style={layout.cardMdTertiary}>
                    <Text style={typography.label}>Pillar 03</Text>
                    <Globe size={30} color={colors.secondary} strokeWidth={1.5} />
                    <Text style={typography.h1}>World Needs</Text>
                    <Text style={typography.h2}>Mission & Vocation</Text>
                    <Text style={typography.body}>The societal bridge.</Text>
                    <Text style={typography.body}>Understanding how your mastery solves existing problems and creates value for the collective.</Text>
                </Stack>


                {/* Call to action*/}
                <Stack style={layout.cardMd}>
                    <Text style={typography.label}>Reflection</Text>
                    <Text style={typography.h2}>Ready to construct your intentional reality?</Text>
                    <Button label="IM READY"   variant="cta"   onPress={() => navigation.navigate("Initiate")} />
                </Stack>





            </ScrollVertical>
    )
};


