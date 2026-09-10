import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeightRecordingScreen from '../screens/weight/WeightRecordingScreen';
import WeightHistoryScreen from '../screens/weight/WeightHistoryScreen';

const Stack = createNativeStackNavigator();

export default function WeightStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="WeightRecording" component={WeightRecordingScreen} />
      <Stack.Screen name="WeightHistory" component={WeightHistoryScreen} />
    </Stack.Navigator>
  );
}
