import React from 'react';
import MainNavigation from './src/navigations/MainNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoarding from './src/screens/onboarding/Onboarding';

const Stack = createStackNavigator();

const IntoStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoarding">
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="MainNavigation"
        component={MainNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function Main() {
  return <IntoStackNavigation />;
}
