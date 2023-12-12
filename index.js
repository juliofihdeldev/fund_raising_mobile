import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Build from './src/screens/Build';
import Login from './src/screens/auth/Welcome';
import {AuthContextProvider} from './src/context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications

const ToTestOnly = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);
// Todo: 1. Handle add fundraiser like twitter (add fundraiser button)
//  * Accept 5 images
//  * Show loading indicator in Feed Screen  ----------------- 90%
//  * User can load add receive donation
//  * show process on how to add money to wallet
