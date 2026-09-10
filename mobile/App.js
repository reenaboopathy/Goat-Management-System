import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { ScaleProvider } from './src/context/ScaleContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ScaleProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </ScaleProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
