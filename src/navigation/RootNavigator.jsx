import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import Initiate from '../screens/Initiate';
import Reflect from '../screens/Update';
import Create from '../screens/Create';
import Catalysts from '../screens/Catalysts';
import Dashboard from '../screens/Dashboard'



const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Update" component={Reflect} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Catalysts" component={Catalysts} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Reflect" component={Reflect} />
      <Stack.Screen name="Initiate" component={Initiate} />
      {/* {/* <Stack.Screen name="World" component={World} /> */}
    </Stack.Navigator>
  );
}