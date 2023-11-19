import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import CustomButton from '../atom/CustomButton';
import { Color } from '../../assets/GlobalStyles';

const PRIMARY_COLOR = 'rgb(0,98,255)';
const WHITE = '#ffffff';
const BORDER_COLOR = '#DBDBDB';

interface ActionItem {
  id: number | string;
  label: string;
  onPress: () => void;
}

interface ActionSheetProps {
  actionItems: ActionItem[];
  onCancel?: () => void;
  actionTextColor?: string;
  component: React.ReactNode;
}

const ActionSheet: React.FC<ActionSheetProps> = ({ actionItems , component,onCancel, actionTextColor}) => {


  const actionSheetItems = [
    ...actionItems,
    {
      id: '#cancel',
      label: 'Cancel',
      onPress: onCancel
    }
  ];

  return (
    <View style={styles.modalContent}>
      <View  style={styles.actionSheetView}>
            {component}
      </View>

      <CustomButton
        title="Fermer"
        onPress={onCancel}
        textStyle={styles.textStyle}
        buttonStyle={[
            {
              width: '30%',
              marginTop: 16,
              marginBottom: 16,
              backgroundColor: Color.primary,
              borderRadius: 8,
            },
          ]}
          textStyle={{color: 'white', fontSize: 15}}
      />
 

      {/* {actionSheetItems?.length &&
        actionSheetItems.map((actionItem, index) => {
          return (
            <TouchableHighlight
              style={[
                styles.actionSheetView,
                index === 0 && {
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                },
                index === actionSheetItems.length - 2 && {
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                },
                index === actionSheetItems.length - 1 && {
                  borderBottomWidth: 0,
                  backgroundColor: WHITE,
                  marginTop: 8,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                }
              ]}
              underlayColor={'#f7f7f7'}
              key={index}
              onPress={actionItem.onPress}
            >
              <Text allowFontScaling={false} style={[
                styles.actionSheetText,
                actionTextColor && {
                  color: actionTextColor
                },
                index === actionSheetItems.length - 1 && {
                  color: '#fa1616',
                }
              ]}>
                {actionItem.label}
              </Text>
            </TouchableHighlight>
          );
        })} */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    height: 320

  },
  actionSheetText: {
    fontSize: 18,
    color: PRIMARY_COLOR
  },
  textStyle: {
    fontSize: 15,
    color: Color.secondary
  },
  actionSheetView: {
    backgroundColor: 'white',
    width:'90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_COLOR
  }
});

export default ActionSheet;
