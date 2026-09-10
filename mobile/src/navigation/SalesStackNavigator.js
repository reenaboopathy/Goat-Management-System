import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SalesListScreen from '../screens/sales/SalesListScreen';
import AddSaleScreen from '../screens/sales/AddSaleScreen';

const Stack = createNativeStackNavigator();

export default function SalesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="SalesList" component={SalesListScreen} />
      <Stack.Screen
        name="AddSale"
        component={AddSaleScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
