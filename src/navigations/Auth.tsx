import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/auth/Welcome';
import PhoneLoginWithLoading from '../screens/auth/PhoneLogin';
import MainNavigation from './MainNavigation';

const Stack = createStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="PhoneLogin" component={PhoneLoginWithLoading} />
      <Stack.Screen name="MainNavigation" component={MainNavigation} />
    </Stack.Navigator>
  );
}
