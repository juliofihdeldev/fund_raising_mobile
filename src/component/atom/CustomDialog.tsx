import React from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Modal,
  ScrollView,
} from 'react-native';

interface CustomViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  orientation?: 'horizontal' | 'vertical';
  isVisible?: boolean;
  onClose?: () => void;
}

// create context for that component to update isVisible props
export const CustomDialogContext = React.createContext(false);

const CustomDialog: React.FC<CustomViewProps> = ({children, onClose}) => {
  const handleSetIsVisible = () => {
    onClose;
  };

  return (
    <CustomDialogContext.Provider value={{handleSetIsVisible}}>
      <Modal testID="custom-dialog" onDismiss={onClose} transparent={true}>
        <View style={styles.centeredView} testID="backdrop">
          <View style={styles.modalView} />
          <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.container}>{children}</View>
          </ScrollView>
        </View>
      </Modal>
    </CustomDialogContext.Provider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 62,
  },

  modalView: {
    height: '35%',
    bottom: 0,
    zIndex: 10000,
    padding: 16,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default CustomDialog;
