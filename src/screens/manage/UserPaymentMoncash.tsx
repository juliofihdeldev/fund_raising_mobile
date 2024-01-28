import React from 'react';
import {View, StyleSheet, TextInput, Dimensions, Alert} from 'react-native';
import {Color} from '../../assets/GlobalStyles';
import TextComponent from '../../component/atom/CustomText';
import {useFunding} from '../../context/FundingContext';
import {useLang} from '../../context/LanguageContext';
import withLoadingModal from '../../component/HOC/Loading';
import CustomButton from '../../component/atom/CustomButton';
import {isNullOrEmpty} from '../../utils/isNullOrEmpty';
import UserModalList from '../../component/UserModalList';
import {useAuth} from '../../context/AuthContext';
import ItemUser from '../../component/ItemUser';
import {currency} from '../../utils/currency';

const UserMoncashPaymentRegister: React.FC = ({
  navigation,
  setLoading,
}: any) => {
  const {lang} = useLang();

  const [amount, setAmount] = React.useState('0');

  const [showMenu, setShowMenu] = React.useState(false);
  const {current_select_user} = useAuth();

  navigation.setOptions({
    title: 'Enregistrer Moncash Payment',
  });

  const handleSelectUser = () => {
    setShowMenu(true);
  };

  const {handleAdduserMoncashPayment} = useFunding();

  const runAddMoncashPayment = () => {
    try {
      setLoading(true);
      handleAdduserMoncashPayment({
        amount: Number(amount),
        user_id: current_select_user?.id,
        tipAmount: 0,
        user: current_select_user,
        status: 'Need approval',
        paymentType: 'moncash',
      });
      setLoading(false);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSubmitMoncashPayment = () => {
    if (isNaN(amount)) return;

    Alert.alert(lang?.information, 'Èske ou vle enregistre Payment sa a?', [
      {
        text: lang?.cancel,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: lang?.yes,
        onPress: () => {
          runAddMoncashPayment();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {showMenu && <UserModalList onClose={() => setShowMenu(false)} />}

      <View style={styles.containerPosition}>
        <CustomButton
          title={'Selectionner utilisateur'}
          onPress={handleSelectUser}
          buttonStyle={{
            backgroundColor: Color.dimgray,
            width: '60%',
            borderRadius: 26,
            marginTop: 16,
          }}
          textStyle={{color: '#fff'}}
        />
        <View
          style={{
            paddingHorizontal: 12,
          }}>
          <TextComponent fontSize={15}>{lang?.selected_user}</TextComponent>

          {!isNullOrEmpty(current_select_user) && (
            <ItemUser item={current_select_user} contactButton={() => null} />
          )}
        </View>

        <TextInput
          placeholder="0.00"
          keyboardType="numeric"
          value={amount}
          onChangeText={amount => setAmount(amount)}
          placeholderTextColor={'#333'}
          style={{
            height: 60,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 16,
            width: Dimensions.get('window').width - 64,
            paddingHorizontal: 12,
            marginLeft: 8,
            marginTop: 16,
            fontSize: 17,
            paddingLeft: 16,
            fontWeight: 'bold',
            color: Color.black,
            fontFamily: 'Montserrat-Bold',
          }}
        />

        <TextComponent
          style={{
            fontSize: 21,
            fontWeight: 'bold',
            color: Color.black,
            padding: 16,
            borderRadius: 8,
          }}>
          {currency(amount)}
        </TextComponent>

        <CustomButton
          size="small"
          title={'Enregistrer  Payment'}
          onPress={handleSubmitMoncashPayment}
          disabled={isNullOrEmpty(current_select_user) || Number(amount) < 250}
          buttonStyle={{
            backgroundColor:
              isNullOrEmpty(current_select_user) || Number(amount) < 250
                ? 'transparent'
                : Color.primary,
            width: 200,
            borderRadius: 26,
            marginTop: 16,
          }}
          textStyle={{color: '#fff'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  containerPosition: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  map: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const UserMoncashPaymentRegisterWithLoading = withLoadingModal(
  UserMoncashPaymentRegister,
  'Loading ...',
);
export default UserMoncashPaymentRegisterWithLoading;
