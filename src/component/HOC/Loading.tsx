import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {useLang} from '../../context/LanguageContext';
import {Color} from '../../assets/GlobalStyles';

// Define the props for the loading modal HOC
interface LoadingModalProps {
  isLoading: boolean;
}

// HOC function that takes a component as an argument and returns a new component
const withLoadingModal = <T extends LoadingModalProps>(
  WrappedComponent: React.ComponentType<T>,
  loadingMessage?: string,
) => {
  return (restProps: Omit<T, keyof LoadingModalProps>) => {
    const {isLoading, _setLoading} = useLang();

    const setIsLoadingState = (isComponentLoading: boolean) => {
      _setLoading(isComponentLoading);
    };

    return (
      <View style={{flex: 1}}>
        <WrappedComponent {...restProps} setLoading={setIsLoadingState} />
        <Modal transparent={true} animationType="none" visible={isLoading}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator animating={isLoading} size="large" />
              <Text>{loadingMessage || 'Loading...'}</Text>
            </View>
          </View>
        </Modal>
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
    borderRadius: 10,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withLoadingModal;
