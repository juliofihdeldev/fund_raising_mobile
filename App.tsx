import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import Main from './Main';
import {useColorScheme} from 'react-native';
import {AuthContextProvider} from './src/context/AuthContext';
import Main from './Main';
import {LangContextProvider} from './src/context/LanguageContext';
import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {FundingContextProvider} from './src/context/FundingContext';
import {Color} from './src/assets/GlobalStyles';
import {StatusBar} from 'react-native';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
import {ErrorBoundary} from 'react-error-boundary';
import {StripeProvider} from '@stripe/stripe-react-native';
import ErrorComponent from './src/component/molecules/ErrorComponent';
import SplashScreen from 'react-native-splash-screen';
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

function fallbackRender({error}: any) {
  return <ErrorComponent title="Error" description={error} />;
}

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Color.grayLight : Color.grayLight,
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <StripeProvider
      publishableKey="pk_test_5MB9slbqt3eAefweXS0LWH67"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="org.potekole.ede" // required for Apple Pay
    >
      <NavigationContainer theme={theme}>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <LangContextProvider>
            <AuthContextProvider>
              <FundingContextProvider>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                  backgroundColor={backgroundStyle.backgroundColor}
                />
                <Main />
              </FundingContextProvider>
            </AuthContextProvider>
          </LangContextProvider>
        </ErrorBoundary>
      </NavigationContainer>
    </StripeProvider>
  );
}
