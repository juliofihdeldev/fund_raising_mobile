import * as React from 'react';

import MainNavigation from './src/navigations/MainNavigation';
import Login from './src/screens/auth/Login';
import PhoneLoginWithLoading from './src/screens/auth/PhoneLogin';
import Build from './src/screens/Build';
import Feed from './src/screens/feed/Feed';
import Profile from './src/screens/profile/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoarding from './src/screens/onboarding/Onboarding';

// create a stack navigator for the screens

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
  return <MainNavigation />;
  return <IntoStackNavigation />;
}
