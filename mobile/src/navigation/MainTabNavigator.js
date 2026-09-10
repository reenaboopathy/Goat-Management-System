import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../constants/theme';

import DashboardScreen from '../screens/dashboard/DashboardScreen';
import GoatsStackNavigator from './GoatsStackNavigator';
import WeightStackNavigator from './WeightStackNavigator';
import EventsStackNavigator from './EventsStackNavigator';
import SalesStackNavigator from './SalesStackNavigator';
import ReportsScreen from '../screens/reports/ReportsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textFaint,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.borderLight,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10.5,
          ...FONTS.bold,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'ellipse';

          if (route.name === 'DashboardTab') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'GoatsTab') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'WeightTab') {
            iconName = focused ? 'scale' : 'scale-outline';
          } else if (route.name === 'EventsTab') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'SalesTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'ReportsTab') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen
        name="GoatsTab"
        component={GoatsStackNavigator}
        options={{ tabBarLabel: 'Goats' }}
      />
      <Tab.Screen
        name="WeightTab"
        component={WeightStackNavigator}
        options={{ tabBarLabel: 'Weigh Scale' }}
      />
      <Tab.Screen
        name="EventsTab"
        component={EventsStackNavigator}
        options={{ tabBarLabel: 'Events' }}
      />
      <Tab.Screen
        name="SalesTab"
        component={SalesStackNavigator}
        options={{ tabBarLabel: 'Sales' }}
      />
      <Tab.Screen
        name="ReportsTab"
        component={ReportsScreen}
        options={{ tabBarLabel: 'Reports' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}
