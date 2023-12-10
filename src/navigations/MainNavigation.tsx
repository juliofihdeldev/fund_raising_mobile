/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from '../screens/feed/Feed';
import {Color, boxShadow} from '../assets/GlobalStyles';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/profile/Profile';
import ProfileEdit from '../screens/profile/ProfileEdit';
import PhoneLoginWithLoading from '../screens/auth/PhoneLogin';
import CreateWithLoading from '../screens/create/Create';
import EditProjectWithLoading from '../screens/create/EditProject';
import History from '../screens/feed/ProjectHistory';
import ManageFundrasing from '../screens/manage/MangeFundrasing';
import PaymentFormWithLoading from '../screens/feed/PaymentForm';
import FeedDetailsWithLoading from '../screens/feed/FeedDetails';
import Favorite from '../screens/favoris/Favorite';
import Search from '../screens/feed/Search';
import UserMoncashPaymentRegisterWithLoading from '../screens/manage/UserPaymentMoncash';
import AllFundraising from '../screens/feed/AllFundRasing';
import Login from '../screens/auth/Login';

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
  PhoneLogin: undefined;
  Create: undefined;
  Feed: undefined;
  EditProject: undefined;
  Search: undefined;
  UserMoncashPaymentRegister: undefined;
  AllFundraising: undefined;
  ProfileScreen: undefined;
  Login: undefined;
};

export type FeedStackParamList = {
  Feed: undefined;
  Home: undefined;
  FeedDetails: undefined;
  Profile: undefined;
  Favorite: undefined;
  ProfileTab: undefined;
  Payment: undefined;
  Search: undefined;
  EditProject: undefined;
  ManageFundrasing: undefined;
  AllFundraising: undefined;
  Create: undefined;
  Login: undefined;
};

const Tab = createMaterialBottomTabNavigator<FeedStackParamList>();
const Stack = createStackNavigator<FeedStackParamList>();

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
        component={FeedDetailsWithLoading}
      />
      <Stack.Screen
        name="Payment"
        options={{
          presentation: 'modal',
        }}
        component={PaymentFormWithLoading}
      />
      <Stack.Screen
        name="Search"
        options={{
          presentation: 'modal',
        }}
        component={Search}
      />

      <Stack.Screen
        name="EditProject"
        options={{
          presentation: 'modal',
        }}
        component={EditProjectWithLoading}
      />

      <Stack.Screen
        name="ManageFundrasing"
        options={{
          presentation: 'modal',
        }}
        component={ManageFundrasing}
      />
      <Stack.Screen
        name="Create"
        component={CreateWithLoading}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="AllFundraising"
        component={AllFundraising}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
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
      <Stack.Screen
        name="Create"
        component={CreateWithLoading}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="EditProject" component={EditProjectWithLoading} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="ManageFundrasing" component={ManageFundrasing} />
      <Stack.Screen
        name="UserMoncashPaymentRegister"
        component={UserMoncashPaymentRegisterWithLoading}
      />
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="AllFundraising"
        component={AllFundraising}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default function MainNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor={Color.primary}
      inactiveColor={'#333'}
      theme={{colors: {secondaryContainer: Color.primary}}}
      labeled={false}
      // shifting={true}
      barStyle={[
        {
          backgroundColor: Color.white,
          height: 80,
          borderTopColor: '#eee',
          borderTopWidth: 1,
        },
        boxShadow,
      ]}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={{
          tabBarLabel: 'Explorer',
          tabBarIcon: ({color}) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Rechercher',
          tabBarIcon: ({color}) => (
            <Ionicons name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Preferences',
          tabBarIcon: ({color}) => (
            <Ionicons name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarAccessibilityLabel: 'Profile',
          tabBarLabel: 'Compte',

          tabBarIcon: ({color}) => (
            <Ionicons name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
