import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import Initiate from '../screens/Initiate';
import Activity from '../screens/Activity';
import Create from '../screens/Create';
import Catalysts from '../screens/Catalysts';
import Overview from '../screens/Overview';



const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="Overview" component={Overview} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Catalysts" component={Catalysts} />
      <Stack.Screen name="Initiate" component={Initiate} />
    </Stack.Navigator>
  );
}