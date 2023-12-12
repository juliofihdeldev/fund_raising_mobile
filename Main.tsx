import React from 'react';
import MainNavigation from './src/navigations/MainNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoarding from './src/screens/onboarding/Onboarding';
import Login from './src/screens/auth/Welcome';
import PhoneLoginWithLoading from './src/screens/auth/PhoneLogin';
import Welcome from './src/screens/auth/Welcome';

const Stack = createStackNavigator();

const IntoStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />

      <Stack.Screen
        name="PhoneLogin"
        component={PhoneLoginWithLoading}
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

      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default function Main() {
  return <IntoStackNavigation />;
}
