import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screems/home'
import FullScreen from '../screems/fullScreen'
import Explore from './explore';
const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
     
      <Stack.Screen name="Home" component={Home}   options={{headerShown:false}} />
      <Stack.Screen name="Explore" component={Explore}   options={{headerShown:false}} />
      <Stack.Screen name="FullScreen" component={FullScreen}  options={{headerShown:false}} />

    </Stack.Navigator>
  );
}
