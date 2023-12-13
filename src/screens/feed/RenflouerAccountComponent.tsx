//disabling eslint for this file
/* eslint-disable  */
import React, {useState, useContext, useEffect} from 'react';
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
import {Color, boxShadow} from '../../assets/GlobalStyles';
import {CustomDialogContext} from '../../component/atom/CustomDialog';
import axios from 'axios';
import CustomView from '../../component/atom/CustomView';
import {useStripe} from '@stripe/stripe-react-native';

const RenflouerAccountComponent: React.FC = () => {
  const {handleSetIsVisible} = useContext(CustomDialogContext);
  const {lang, _setLoading} = useLang();
  const {user, usersPayment, handleGetUserPayment} = useAuth();
  const [value, setValue] = useState('12500');
  const [option, setOptions] = useState('');
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

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
      const url = link ?? 'https://pote-kole.web.app';
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

  const fetchPaymentSheetParams = async () => {
    let data = {
      user: {
        email: user?.email,
        name: user?.name,
        phone: user?.phone,
        address: {
          line1: user?.address,
          city: user?.city,
          country: 'htg',
        },
      },
      phone: user?.phone,
      name: user?.name,
      amount: value,
      tipAmount: 0,
      user_id: user?.id,
      date: new Date().getUTCMilliseconds(),
    };

    let url = `https://create-payment-intent-q7q3rskmgq-uc.a.run.app`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'PoteKOLE.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });

    if (!error) {
      _setLoading(true);
    }
  };

  const stripePayment = async () => {
    // create stripe payment in react native
    initializePaymentSheet();
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
                width: '40%',
                borderColor: 'white',
                fontSize: 29,
                fontWeight: 'bold',
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
        <CustomView style={styles.separator}>
          <TextComponent color="#333">
            Selectionner une option de paiement
          </TextComponent>
        </CustomView>

        <ListItem
          text="Payer par Carte de credit"
          icon="card-outline"
          fontSize={15}
          onPress={stripeWebPayment}
          // onPress={stripePayment}
          color="#333"
          fontWeight="bold"
          containerStyle={styles.containerListStyle}
          iconStyle={styles.iconStyle}
        />

        <ListItem
          text="Payer par Moncash"
          icon="card-outline"
          fontSize={15}
          onPress={createMoncashPAyment}
          color="#333"
          fontWeight="bold"
          containerStyle={styles.containerListStyle}
          iconStyle={styles.iconStyleMoncash}
        />

        <ListItem
          text="Payer par Natcash"
          icon="card-outline"
          fontSize={15}
          color={'#333'}
          // onPress={createMoncashPAyment}
          onPress={() => setOptions('natcash')}
          fontWeight="bold"
          containerStyle={styles.containerListStyle}
          iconStyle={styles.iconStyleNatcash}
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
    flex: 1,
    marginBottom: 8,
    paddingRight: 16,
    width: '98%',
    borderColor: '#999',
    borderWidth: 0.1,
    borderRadius: 4,
    margin: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerListStyle: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 22,
    marginLeft: 0,
    marginBottom: 12,
    borderRadius: 112,
    borderWidth: 1,
    borderColor: '#333',
  },
  iconStyle: {
    color: '#004ABD',
  },
  iconStyleMoncash: {
    color: '#ee352a',
  },
  iconStyleNatcash: {
    color: '#F1822F',
  },
  separator: {
    marginHorizontal: 8,
    marginVertical: 16,
    alignItems: 'flex-start',
  },
  baseStyle: {},
});
export default RenflouerAccountComponentWithLoading;
