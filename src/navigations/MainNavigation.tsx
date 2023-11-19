/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from '../screens/feed/Feed';
import {Color, boxShadow} from '../assets/GlobalStyles';
import FeedDetails from '../screens/feed/FeedDetails';
import {createStackNavigator} from '@react-navigation/stack';
import Favorite from '../screens/feed/Favorite';
import Profile from '../screens/profile/Profile';
import ProfileEdit from '../screens/profile/ProfileEdit';
import PhoneLoginWithLoading from '../screens/auth/PhoneLogin';
import CreateWithLoading from '../screens/create/Create';
import EditProjectWithLoading from '../screens/create/EditProject';
import History from '../screens/feed/ProjectHistory';
import ManageFundrasing from '../screens/manage/MangeFundrasing';

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
  PhoneLogin: undefined;
  Create: undefined;
  EditProject: undefined;
};

export type FeedStackParamList = {
  Feed: undefined;
  Home: undefined;
  FeedDetails: undefined;
  Profile: undefined;
  Notifications: undefined;
  ProfileTab: undefined;
};

const Tab = createMaterialBottomTabNavigator<FeedStackParamList>();
const Stack = createStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="FeedDetails"
        options={{
          // headerShown: false,
          presentation: 'modal',
        }}
        component={FeedDetails}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="PhoneLogin" component={PhoneLoginWithLoading} />
      <Stack.Screen name="Create" component={CreateWithLoading} />
      <Stack.Screen name="EditProject" component={EditProjectWithLoading} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="ManageFundrasing" component={ManageFundrasing} />
    </Stack.Navigator>
  );
};

export default function MainNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor={Color.gray_100}
      inactiveColor={'#333333'}
      theme={{colors: {secondaryContainer: 'yellow'}}}
      barStyle={[
        {
          backgroundColor: Color.white,
        },
        boxShadow,
      ]}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons name="home-outline" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({color}) => (
            <Ionicons name="heart-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Ionicons name="person-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
