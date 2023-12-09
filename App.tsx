import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import Main from './Main';
import {AuthContextProvider} from './src/context/AuthContext';
import Main from './Main';
import {LangContextProvider} from './src/context/LanguageContext';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {FundingContextProvider} from './src/context/FundingContext';
import {Color} from './src/assets/GlobalStyles';
import {StatusBar, Linking} from 'react-native';
// import dynamicLinks from '@react-native-firebase/dynamic-links';

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    // this will turn the 'pill to yellow'
    // to make it 'transparent, you can make it same color as your background
    ...DefaultTheme.colors,
    secondaryContainer: 'transparent',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      {/* <ErrorBoundary onError={errorHandler}> */}
      <LangContextProvider>
        <AuthContextProvider>
          <FundingContextProvider>
            <StatusBar backgroundColor={Color.white} />
            <Main />
          </FundingContextProvider>
        </AuthContextProvider>
      </LangContextProvider>
      {/* </ErrorBoundary> */}
    </NavigationContainer>
  );
}
