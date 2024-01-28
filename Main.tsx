import React from 'react';
import MainNavigation from './src/navigations/MainNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoarding from './src/screens/onboarding/Onboarding';
import Welcome from './src/screens/auth/Welcome';
import SignUp from './src/screens/auth/SignUp';
import CreateAccount from './src/screens/auth/CreateAccount';
import ForgetPassword from './src/screens/auth/ForgetPassword';

const Stack = createStackNavigator();

export default function Main() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
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
}
