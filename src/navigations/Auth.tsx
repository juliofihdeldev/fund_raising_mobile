import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/auth/Welcome';
import PhoneLoginWithLoading from '../screens/auth/PhoneLogin';
import MainNavigation from './MainNavigation';
import SignUp from '../screens/auth/SignUp';
import CreateAccount from '../screens/auth/CreateAccount';
import ForgetPassword from '../screens/auth/ForgetPassword';

const Stack = createStackNavigator();

export default function Auth() {
  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        headerShown: false,
      }}>
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
        name="PhoneLogin"
        component={PhoneLoginWithLoading}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="MainNavigation" component={MainNavigation} />
    </Stack.Navigator>
  );
}
