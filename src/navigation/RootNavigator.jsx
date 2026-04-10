import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import Initiate from '../screens/Initiate';
import CreateHabit from '../screens/CreateHabit';
import Love from '../ScreensIkigai/Love';
import Skill from '../ScreensIkigai/Skill';
import World from '../ScreensIkigai/World';
import Wealth from '../ScreensIkigai/Wealth';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateHabit" component={CreateHabit} />
      <Stack.Screen name="Initiate" component={Initiate} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Skill" component={Skill} />
      <Stack.Screen name="World" component={World} />
      <Stack.Screen name="Wealth" component={Wealth} />  */}
    </Stack.Navigator>
  );
}