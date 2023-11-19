//disabling eslint for this file
/* eslint-disable  */
import React, {useState, useContext} from 'react';
import {View, Alert, Linking, StyleSheet} from 'react-native';
import {GlobalStyles} from './GlobalStyle';
import ListItem from '../../component/atom/ListItem';
import {useAuth} from '../../context/AuthContext';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useLang} from '../../context/LanguageContext';
import withLoadingModal from '../../component/HOC/Loading';
import CashProcessComponent from '../payment/CashProcessComponent';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import TextAreaInput from '../../component/atom/TextAreaInput';
import TextComponent from '../../component/atom/CustomText';
import {Color} from '../../assets/GlobalStyles';
import {CustomDialogContext} from '../../component/atom/CustomDialog';
import axios from 'axios';

const RenflouerAccountComponent: React.FC = () => {
  const {handleSetIsVisible} = useContext(CustomDialogContext);
  const {lang, _setLoading} = useLang();
  const {user, usersPayment, handleGetUserPayment} = useAuth();
  const [value, setValue] = useState('12500');
  const [option, setOptions] = useState('');

  const createMoncashPAyment = async () => {
    _setLoading(true);
    // change that to an api function call firabase
    let url = `https://create-moncash-payment-q7q3rskmgq-uc.a.run.app`;
    try {
      let responce = await axios.post(
        `${url}`,
        {
          amount: value,
          user_id: user?.id,
          date: new Date().getUTCMilliseconds(),
        },
        {
          headers: {'Cache-Control': 'no-cache'},
        },
      );

      let paymentResponce = responce.data;

      if (!paymentResponce?.urlRedirection) {
        Alert.alert('Error', 'Error With Moncash Payment');
        _setLoading(false);
        return;
      }

      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(paymentResponce?.urlRedirection, {
          showTitle: true,
          toolbarColor: 'red',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: false,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
        await sleep(800);
        handleSetIsVisible();
      } else await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
    }
    _setLoading(false);
  };

  const onClose = () => {
    setOptions('');
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const stripeWebPayment = async () => {
    if (Number(value) < 250) {
      Alert.alert('Error', 'Montant insuffisant');
      return;
    }
    try {
      let link = `https://pote-kole.web.app/stripe_pay.html?amount=${value}&user_id=${user?.id}&phone=${user?.phone}&name=${user?.name}`;
      const url = link ?? 'https://github.com/proyecto26';
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          showTitle: true,
          toolbarColor: 'white',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: false,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            // 'my-custom-header': 'my custom header value'
          },
        });
        await sleep(800);
        handleSetIsVisible();
      } else await Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Root>
      <View>
        <View>
          <TextComponent
            style={{
              margin: 8,
            }}>
            Montant
          </TextComponent>

          <View style={styles.viewStyle}>
            <TextAreaInput
              value={value}
              onChangeText={setValue}
              placeholder="Montant"
              numberOfLines={1}
              autoFocus={true}
              keyboardType={'numeric'}
              style={{
                width: '80%',
                borderColor: 'white',
                fontSize: 29,
                height: 60,
              }}
            />
            <TextComponent
              fontWeight="bold"
              fontSize={27}
              style={{
                marginLeft: 8,
                marginTop: 16,
                fontSize: 29,
                height: 60,
              }}>
              HTG
            </TextComponent>
          </View>
        </View>

        <ListItem
          text="Payer par Carte de credit"
          icon="card-outline"
          fontSize={17}
          onPress={stripeWebPayment}
          color="white"
          containerStyle={[
            GlobalStyles.containerList,
            {
              width: '100%',
              backgroundColor: Color.primary,
              padding: 12,
              marginLeft: 0,
              marginBottom: 12,
              borderRadius: 32,
            },
          ]}
          iconStyle={[GlobalStyles.customIcon, {color: 'white'}]}
        />

        <ListItem
          text="Payer par Moncash"
          icon="card-outline"
          fontSize={17}
          //  onPress={() => setOptions('moncash')}
          onPress={createMoncashPAyment}
          color="#fff"
          containerStyle={[
            GlobalStyles.containerList,
            {
              width: '100%',
              backgroundColor: '#ee352a',
              padding: 12,
              marginLeft: 0,
              marginBottom: 12,
              borderRadius: 32,
            },
          ]}
          iconStyle={[GlobalStyles.customIcon, {color: 'white'}]}
        />

        <ListItem
          text="Payer par Natcash"
          icon="card-outline"
          fontSize={17}
          color={'white'}
          // onPress={createMoncashPAyment}
          onPress={() => setOptions('natcash')}
          containerStyle={[
            GlobalStyles.containerList,
            {
              width: '100%',
              backgroundColor: '#ff8a30',
              padding: 12,
              marginLeft: 0,
              marginBottom: 12,
              borderRadius: 32,
            },
          ]}
          iconStyle={[GlobalStyles.customIcon, {color: 'white'}]}
        />

        {option == 'moncash' && (
          <CashProcessComponent onClose={onClose} type="moncash" />
        )}
        {option == 'natcash' && (
          <CashProcessComponent onClose={onClose} type="natcash" />
        )}
      </View>
    </Root>
  );
};

const RenflouerAccountComponentWithLoading = withLoadingModal(
  RenflouerAccountComponent,
  'Please wait...',
);

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    margin: 4,
    paddingRight: 16,
    width: '98%',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 4,
  },
});
export default RenflouerAccountComponentWithLoading;
