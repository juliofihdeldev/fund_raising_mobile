import React from 'react';
import {useLang} from '../../context/LanguageContext';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Color} from '../../assets/GlobalStyles';
// Define the props for the loading modal HOC
interface LoadingModalProps {
  isLoading: boolean;
}

// HOC function that takes a component as an argument and returns a new component
const withLoadingFresh = <T extends LoadingModalProps>(
  WrappedComponent: React.ComponentType<T>,
) => {
  return (restProps: Omit<T, keyof LoadingModalProps>) => {
    const {isLoading, _setLoading} = useLang();

    const setIsLoadingState = (isComponentLoading: boolean) => {
      _setLoading(isComponentLoading);
    };

    return (
      <View style={{flex: 1}}>
        <WrappedComponent {...restProps} setLoading={setIsLoadingState} />
        {isLoading && (
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={isLoading} size="large" />
          </View>
        )}
      </View>
    );
  };
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  activityIndicatorWrapper: {
    backgroundColor: Color.white,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withLoadingFresh;
