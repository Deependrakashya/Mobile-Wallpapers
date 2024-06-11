import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screems/home'
import FullScreen from '../screems/fullScreen'
const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Index" component={HomeScreen}   options={{headerShown:false}} /> */}
      <Stack.Screen name="Home" component={Home}   options={{headerShown:false}} />

      <Stack.Screen name="FullScreen" component={FullScreen}  options={{headerShown:false}} />
    </Stack.Navigator>
  );
}
