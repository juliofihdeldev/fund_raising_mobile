import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import {Color} from '../../assets/GlobalStyles';
import Clipboard from '@react-native-clipboard/clipboard';
import ListItem from '../../component/atom/ListItem';
import CustomButton from '../../component/atom/CustomButton';
import { useLang } from '../../context/LanguageContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../navigations/MainNavigation';
import CustomDialog from '../../component/atom/CustomDialog';
import { feedStyles } from '../feed/GlobalStyle';

type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const CashProcessComponent: React.FC<Props> = ({onClose,  type}:any) => {
  const {user } = useAuth();
  const {lang} = useLang();
  
  const addToclipboard = async (text: string) => {
    await Clipboard.setString(text);
    onClose();
  }
  
  
  return (
      <View style={styles.container}>
          <CustomDialog onClose={onClose}>
            <View style={localStyle.width}>
              <ListItem
                text="Fermer"
                icon="close-outline"
                color={Color.black}
                onPress={onClose}
                fontSize={19}
                containerStyle={[feedStyles.containerList]}
                iconStyle={[feedStyles.customIcon, {color:Color.black}]}
              />
        
              <ListItem
                text={`Fè yon transfè sou ${type?.toUpperCase()} POTE KOLE kont lan se +509 3777 7777`}
                icon="card-outline"
                fontSize={17}
                color={Color.black}
                containerStyle={[feedStyles.containerList, {width: '90%'}]}
                iconStyle={[feedStyles.customIcon, {color:Color.black}]}
              />

              <ListItem
                text={`1- Wap voye kod transaksyon an pou nou sou +509 3777 0000. Avek ID User w lan  ki se ${user.id} \n\n2- Epi Nimewo telefòn ou konnekte sou app lan ${user.phone} `}
                icon="warning-outline"
                color={Color.black}
                fontSize={17}
                containerStyle={[feedStyles.containerList, {width: '90%'}]}
                iconStyle={[feedStyles.customIcon,{color:Color.black}]}
              />

            <CustomButton
              title="Klike pou w kopye model mesaj la"
              onPress={()=>addToclipboard(`Mwen fè Depot ${type?.toUpperCase()} kise 000000 HTG sou compte Potekole lan.
               \n\nId kolèt: ${user.id} \n\nNimewo telefòn mwen konnèkte sou ap
               p lan: ${user.phone}\n\nNon mwen se ${user.name}.\n\ID Transaksyon an se: 0000000000000000`)}
              
              buttonStyle={{
                backgroundColor: '#5B5BB1',
                width: '100%',
                borderRadius: 26,
                marginTop: 16,
              }}
              textStyle={{color: '#fff'}}
            />

            </View>
          </CustomDialog>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: Color.white,
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: Color.white,
  },
  bar: {
    width: 'auto',
    height: 1,
    marginVertical: 24,
    marginBottom: 24,
  },
  containerProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.primary,
  },
  email: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 8,
  },
  margin: {
    marginTop: 16,
  },

  containerList: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    paddingVertical: 12,
  },
  customContainer: {
    backgroundColor: Color.white,
  },
  customIcon: {
    marginRight: 10,
    fontSize: 28,
  },
});

const localStyle = StyleSheet.create({
  width: {
    width: '100%',
    marginTop:100,
    backgroundColor:Color.white,
    padding:20
  },
  textColored: {
    color: 'red',
    fontSize: 13,
  },
  buttonStyle: {
    backgroundColor: Color.white,
    width: '100%',
    borderRadius: 26,
    marginTop: 16,
    marginLeft: 16,
  },
});

export default CashProcessComponent;
