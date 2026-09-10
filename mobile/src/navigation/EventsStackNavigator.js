import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventsListScreen from '../screens/events/EventsListScreen';
import AddEventScreen from '../screens/events/AddEventScreen';
import EditEventScreen from '../screens/events/EditEventScreen';

const Stack = createNativeStackNavigator();

export default function EventsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="EventsList" component={EventsListScreen} />
      <Stack.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="EditEvent"
        component={EditEventScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
