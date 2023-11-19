import React from 'react';
import {
  View,
  Alert,
  StyleSheet,
} from 'react-native';

import { ProjectType} from '../../types/Index';
import {Color} from '../../assets/GlobalStyles';
import {useFunding} from '../../context/FundingContext';
import {useAuth} from '../../context/AuthContext';
import CustomDialog from '../../component/atom/CustomDialog';
import ListItem from '../../component/atom/ListItem';
import CustomSeparator from '../../component/atom/CustomSeparator';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '../../navigations/MainNavigation';
import { feedStyles } from '../feed/GlobalStyle';
import { useLang } from '../../context/LanguageContext';

type FeedDetailsScreenNavigationProp = StackNavigationProp<FeedStackParamList, 'FeedDetails'>;

interface Props {
  navigation: FeedDetailsScreenNavigationProp;
}

const ManageOption: React.FC<Props> = ({ navigation,onClose, projects}) => {
  const {user} = useAuth();
  const {lang} = useLang();

  const {
    updateFundraisingStatus,
  } = useFunding();

  const goToEdit = () => {
    onClose();
    navigation.navigate('EditProject', {
      project: projects
    });
  };

  const registerMoncashPayment = () => {
    onClose();
    navigation.navigate('MoncashPaymentRegister', {
      project: projects
    });
  }

  const handleUpdateStatus = (data: ProjectType) => {
    Alert.alert(lang?.warning, lang.are_you_sure, [
      {
        text: lang?.yes,
        onPress: () => {
          updateFundraisingStatus(projects?.id, data);
          navigation.goBack();
        },
      },
      {
        text: lang?.no,
        onPress: () => {},
      },
    ]);
  };

  const goToManage = () => {
    onClose();
    navigation.navigate('ManageFundrasing', {
      project: projects
    });
  }

  return (
    <CustomDialog onClose={onClose}>
      <View style={localStyle.width}>
        <ListItem
          text={lang?.close}
          icon="close-outline" color={Color.black}
          onPress={onClose}
          containerStyle={[feedStyles.containerList]}
          iconStyle={feedStyles.customIcon}
        />
        <ListItem
          text={lang?.edit_collet}
          icon="create-outline" color={Color.black}
          onPress={goToEdit}
    
          containerStyle={[feedStyles.containerList]}
          iconStyle={feedStyles.customIcon}
        />
            
        <ListItem
          text={lang?.deactive_collet}
          icon="trash-outline"
          color={Color.black}
          onPress={() => {
            handleUpdateStatus({
              status: 'Canceled',
            });
          }}
    
          containerStyle={[feedStyles.containerList]}
          iconStyle={feedStyles.customIcon}
        />

        {user.role === '1' && (
          <View
            style={{
              width: '100%',
            }}>
         
            <CustomSeparator />
            <ListItem
              text={lang?.active_collet}
              icon="checkmark-done-outline" 
              color={Color.black}
              onPress={() => {
                handleUpdateStatus({
                  status: 'Active',
                });
              }}
        
              containerStyle={[feedStyles.containerList]}
              iconStyle={feedStyles.customIcon}
            />

            <ListItem
              text={lang?.deactive_collet}
              icon="airplane-outline" 
              color={Color.black}
              onPress={() => {
                handleUpdateStatus({
                  status: 'Canceled',
                });
              }}
        
              containerStyle={[feedStyles.containerList]}
              iconStyle={feedStyles.customIcon}
            />
            
            <ListItem
              text={lang?.myFundraisings}
              icon="settings-outline"
              color={Color.black} 
              onPress={goToManage}
    
              containerStyle={[feedStyles.containerList]}
              iconStyle={feedStyles.customIcon}
            />
            
            <ListItem
              text={lang?.block_redraw_collet}
              icon="cash-outline"
              color={Color.black} 
              onPress={() => {
                handleUpdateStatus({
                  allow_cash_transfer: false,
                });
              }}
        
              containerStyle={[feedStyles.containerList]}
              iconStyle={feedStyles.customIcon}
            />
            <CustomSeparator />
          </View>
        )}
      </View>
    </CustomDialog>   

  );
};

export default ManageOption;
const localStyle = StyleSheet.create({
  width: {
    width: '100%',
    backgroundColor: Color.white,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});
