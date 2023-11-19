import React, { Children } from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';


import { Color } from '../../assets/GlobalStyles';

// create type CustomAlertProps
interface CustomAlertProps {
  isLoading: boolean;
}


// HOC function that takes a component as an argument and returns a new component
const CustomAlert  = ({children}) =>  {

  const onClose = () => {
    setIsLoading(false);
  }
  const [isLoading, setIsLoading] = React.useState(false);
 
  return (
    <View style={{ flex: 1 }}>
      <Modal
        onDismiss={onClose}
        transparent={true}
        animationType="none"
        visible={isLoading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
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

export default CustomAlert;
