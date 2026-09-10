import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoatListScreen from '../screens/goats/GoatListScreen';
import GoatDetailScreen from '../screens/goats/GoatDetailScreen';
import AddGoatScreen from '../screens/goats/AddGoatScreen';
import EditGoatScreen from '../screens/goats/EditGoatScreen';

const Stack = createNativeStackNavigator();

export default function GoatsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="GoatList" component={GoatListScreen} />
      <Stack.Screen name="GoatDetail" component={GoatDetailScreen} />
      <Stack.Screen
        name="AddGoat"
        component={AddGoatScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="EditGoat"
        component={EditGoatScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
