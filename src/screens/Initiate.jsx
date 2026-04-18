import React from "react";
import { Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client"
import { useState } from "react";

import ScreenWrapper from "../components/ScreenWrapper";
import ScrollVertical from "../components/ScrollVertical";
import Stack from "../components/Stack";
import typography from "../styles/typography";
import layout from "../styles/layout";
import Button from "../components/Buttons";
import colors from "../styles/colors";
import PillarSelector from "../components/PillarSelector";
import FrequencySelector from "../components/FrequencySelector";



const CREATE_TASK = gql`
  mutation CreateTask($taskItem: String!, $pillar: String!, $intensity: Int!, $interval: String!) {
    createTaskItem(taskItem: $taskItem, pillar: $pillar, intensity: $intensity, interval: $interval) {
      id
    }
  }
`;

export default function Initiate() {
    const Navigation = useNavigation();

    const [pillar, setPillar] = useState(null)
    const [intention, setIntention] = useState("")
    const [frequency, setFrequency] = useState("Daily")

    const [addTask, { loading, error }] = useMutation(CREATE_TASK, {
        onCompleted: () => {
            console.log("Mutation successful!");
            Navigation.navigate("Update");
        },
        refetchQueries: ["taskItems"],
        onError: (err) => {
            console.log("Full Mutation Error Object:", JSON.stringify(err, null, 2));
        }
    });

    const handleActivate = () => {
        // 1. Validation check
        if (!intention || intention.trim() === "") {
            console.log("Validation failed: No intention");
            return;
        }

        console.log("Executing mutation now...");
        addTask({
            variables: {
                taskItem: intention,
                pillar: pillar || pillar,
                intensity: 1,
                interval: frequency
            }
        });
    };



    return (
            <ScrollVertical>

                {/* Select Pillar  */}
                <Stack size="lg" style={layout.cardMd}>
                    <Text style={typography.h1}>Select a pillar</Text>
                    <PillarSelector onSelect={setPillar} current={pillar} />
                </Stack>
                
                {/* Set your task  */}
                <Stack size="md" style={layout.cardXs}>
                    <Text style={typography.h2}>Add another intention</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: colors.border }}>
                        <TextInput
                            style={typography.light}
                            placeholder="Set your intention"
                            value={intention}
                            onChangeText={setIntention}
                        />
                    </View>
                </Stack>

                {/* Select Frequency */}
                <Stack size="xxl" style={layout.cardMd}>
                    <Text style={typography.h2}>Set your horizon</Text>
                    <FrequencySelector onSelect={setFrequency} current={frequency} />
                </Stack>

                {/* Add to list */}
                <Stack size="lg" style={layout.cardSmDark}>
                    <Button
                        label="Activate"
                        variant="cta"
                        onPress={handleActivate}
                        disabled={loading}
                    />
                </Stack>

            </ScrollVertical>
    )
}