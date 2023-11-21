import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {GlobalStyles} from './GlobalStyle';
import TextComponent from '../../component/atom/CustomText';
import CustomButton from '../../component/atom/CustomButton';
import ListItem from '../../component/atom/ListItem';
import firebase from '@react-native-firebase/app';
import {useAuth} from '../../context/AuthContext';
import {Color} from '../../assets/GlobalStyles';
import {currency} from '../../utils/currency';
import firestore from '@react-native-firebase/firestore';
import CustomDialog from '../../component/atom/CustomDialog';
import {Root, ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '../../navigations/MainNavigation';
import {useLang} from '../../context/LanguageContext';
import withLoadingModal from '../../component/HOC/Loading';
import RenflouerAccountComponentWithLoading from './RenflouerAccountComponent';
import {useFocusEffect} from '@react-navigation/native';
import ActionSheet from '../../component/HOC/ActionSheet';
import ThankYou from '../../component/HOC/ThankYou';
import Modal from 'react-native-modal';

// Use a local emulator in development
// if (__DEV__) {
//   // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
//   firebase.functions().useEmulator('localhost', 5001);
// }

type PaymentFormScreenNavigationProp = StackNavigationProp<
  FeedStackParamList,
  'FeedDetails'
>;

interface Props {
  navigation: PaymentFormScreenNavigationProp;
  setLoading: (isLoading: boolean) => void;
}

const PaymentForm: React.FC<Props> = ({route, navigation, setLoading}: any) => {
  const {lang} = useLang();
  const {
    name,
    amount,
    collect,
    id,
    image,
    user: {name: user_name, email, id: user_id},
  } = route?.params?.project;

  navigation.setOptions({
    title: name as string,
  });

  const {user, usersPayment, handleGetUserPayment} = useAuth();
  const [value, setValue] = React.useState('');
  const [monCashMenu, setMonCashMenu] = React.useState(false);
  const [tipAmount, setTipAmount] = useState(100);
  const [selectTips, setSelectTips] = useState(10);

  const [actionSheet, setActionSheet] = useState(false);
  const closeActionSheet = () => {
    setActionSheet(false);
    navigation.goBack();
  };

  const handleSelectTips = (percentage: number) => {
    const tipCal = (percentage * Number(value)) / 100;
    setTipAmount(tipCal);
    setSelectTips(percentage);
  };

  useEffect(() => {
    const tipCal = (selectTips * Number(value)) / 100;
    setTipAmount(tipCal);
    setSelectTips(selectTips);
  }, [value]);

  const handleShowMenuPayment = () => {
    setMonCashMenu(!monCashMenu);
  };

  const usersPaymentAmount = usersPayment?.reduce(
    (sum, item) => sum + (item.amount || 0),
    0,
  );

  useFocusEffect(
    useCallback(() => {
      handleGetUserPayment();
    }, []),
  );

  const handlePaymentFromAccount = () => {
    setLoading(true);

    // check if value if a valid number
    if (isNaN(Number(value))) return;
    if (usersPaymentAmount < Number(value)) {
      Alert.alert('Attention', "Tu n'as pas assez d'argent.");
      setLoading(false);
      return;
    }

    try {
      const save_donation_object = {
        user_name: user.name,
        user_email: user.email,
        user_id: user.id,
        project_name: name,
        amount: Number(value),
        project_image: image,
        project_id: id,
        image: user?.image,
        tipAmount: tipAmount,
        status: 'Approved',
        payment_method: 'Account',
      };

      // Save donation in database
      const ref_fundraising = firestore().collection('fundraising');
      const donationRef = firestore().collection('donations');

      donationRef.add(save_donation_object);

      // Add porject to users donation list
      const userRef = firestore().collection('users');
      userRef.doc(user?.id!).update({
        donations:
          firebase.firestore.FieldValue.arrayUnion(save_donation_object),
      });

      let amountToRemoveFormAccount = Number(value) + Number(tipAmount);

      firestore().collection('Payments').add({
        amount: -amountToRemoveFormAccount,
        user_name: user.name,
        user_email: user.email,
        user_id: user.id,
        tips: tipAmount,
        date: new Date().toDateString().toString(),
        status: 'Approval',
      });

      // Update fundraising collect and donation
      ref_fundraising.doc(id).update({
        collect: Number(collect) + Number(value),
        donation:
          firebase.firestore.FieldValue.arrayUnion(save_donation_object),
      });

      firestore()
        .collection('mail')
        .add({
          to: user_name,
          message: {
            subject: `Donation for ${save_donation_object?.project_name}`,
            html: `<p>Hi ${user.name},</p>
        <p>You have received a donation of ${amount} gourdes from you for the ${save_donation_object.project_name}.</p>
        <p>Thank you for using Potekole.</p>
        <p>Potekole Team</p>`,
          },
        });

      setLoading(false);

      setActionSheet(true);
    } catch (e) {
      // Handle any errors raised by presentPaymentSheet
      console.log('error', e);
      Alert.alert('Error', JSON.stringify(e));
      setLoading(false);
    }
  };

  const onClose = () => {
    setMonCashMenu(false);
  };

  return (
    <Root>
      <SafeAreaView style={GlobalStyles.container}>
        <Modal
          isVisible={actionSheet}
          animationIn="fadeInUp"
          coverScreen={true}
          onBackdropPress={closeActionSheet}
          onBackButtonPress={closeActionSheet}
          style={{
            margin: 0,
            justifyContent: 'flex-end',
            backfaceVisibility: 'hidden',
          }}>
          <ActionSheet
            component={
              <ThankYou
                message={`Merci ${
                  user.name
                } d'avoir aidez  ${user_name} avec ${currency(
                  Number(value),
                )} Pour sa collect de fond.`}
              />
            }
            actionItems={[]}
            onCancel={closeActionSheet}
          />
        </Modal>

        {monCashMenu && (
          <CustomDialog onClose={onClose}>
            <View style={localStyle.width}>
              <ListItem
                text="Fermer"
                icon="close-outline"
                color={Color.black}
                onPress={onClose}
                fontSize={19}
                containerStyle={[GlobalStyles.containerList]}
                iconStyle={[GlobalStyles.customIcon, {color: Color.black}]}
              />

              <RenflouerAccountComponentWithLoading />
            </View>
          </CustomDialog>
        )}

        <ScrollView>
          <View style={GlobalStyles.contentText}>
            <TextComponent
              fontFamily="Montserrat-Bold"
              style={{
                fontSize: 19,
                marginTop: 16,
              }}>
              Compte: {currency(Number(usersPaymentAmount))}
            </TextComponent>

            <CustomButton
              title="Renflouer son compte"
              onPress={handleShowMenuPayment}
              buttonStyle={{
                backgroundColor: Color.blue,
                width: '60%',
                borderRadius: 12,
                marginTop: 16,
              }}
              textStyle={{color: '#fff'}}
            />

            <TextComponent
              style={[GlobalStyles.goalTextBold, {marginTop: 12}]}
              numberOfLines={3}>
              {name}
            </TextComponent>

            <TextComponent
              style={{
                marginTop: 12,
                fontSize: 15,
              }}
              numberOfLines={2}>
              {user_name} {lang?.need} {currency(Number(amount))}
            </TextComponent>

            <View style={GlobalStyles.contentTextPrice}>
              <TextComponent
                fontSize={25}
                fontWeight="bold"
                numberOfLines={2}
                style={{
                  position: 'absolute',
                  left: 16,
                  top: 28,
                }}>
                HTG
              </TextComponent>

              <TextComponent
                fontSize={25}
                fontWeight="bold"
                numberOfLines={2}
                style={{
                  position: 'absolute',
                  right: 24,
                  top: 28,
                }}>
                {value}
              </TextComponent>

              <TextInput
                keyboardType="numeric"
                style={{
                  height: 60,
                  width: 300,
                  borderRadius: 26,
                  color: 'transparent',
                  position: 'absolute',
                  top: 16,
                  zIndex: 5,
                  paddingHorizontal: 320,
                }}
                onChangeText={text => setValue(text)}
              />

              <View
                style={{
                  height: 60,
                  borderColor: '#eee',
                  borderWidth: 2,
                  width: '100%',
                  borderRadius: 26,
                  marginTop: 16,
                  marginBottom: 16,
                }}
              />
            </View>

            <TextComponent
              fontFamily="Montserrat-Bold"
              style={{
                fontSize: 21,
                marginTop: 16,
                marginHorizontal: 8,
              }}>
              {!isNaN(Number(value)) ? currency(Number(value)) : 0}
            </TextComponent>

            <TextComponent>{lang?.deduction_pourcetange}</TextComponent>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextComponent
                  style={{
                    marginTop: 16,
                    marginHorizontal: 8,

                    fontSize: 19,
                    fontWeight: 'bold',
                  }}>
                  Tips
                </TextComponent>
                <TextComponent
                  style={{
                    marginTop: 16,
                    marginHorizontal: 8,
                  }}>
                  {!isNaN(Number(value)) ? currency(tipAmount) : 0}
                </TextComponent>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 16,
                }}>
                <CustomButton
                  title="0%"
                  onPress={() => handleSelectTips(0)}
                  buttonStyle={[
                    styles.tipsButton,
                    {
                      backgroundColor:
                        selectTips === 0 ? Color.primary : '#333',
                    },
                  ]}
                  textStyle={styles.textButton}
                />
                <CustomButton
                  title="10%"
                  onPress={() => handleSelectTips(10)}
                  buttonStyle={[
                    styles.tipsButton,
                    {
                      backgroundColor:
                        selectTips === 10 ? Color.primary : '#333',
                    },
                  ]}
                  textStyle={styles.textButton}
                />
                <CustomButton
                  title="20%"
                  onPress={() => handleSelectTips(20)}
                  buttonStyle={[
                    styles.tipsButton,
                    {
                      backgroundColor:
                        selectTips === 20 ? Color.primary : '#333',
                    },
                  ]}
                  textStyle={styles.textButton}
                />
                <CustomButton
                  title="30%"
                  onPress={() => handleSelectTips(30)}
                  buttonStyle={[
                    styles.tipsButton,
                    {
                      backgroundColor:
                        selectTips === 30 ? Color.primary : '#333',
                    },
                  ]}
                  textStyle={styles.textButton}
                />
              </View>
            </View>

            <CustomButton
              title="Effectuer le Don"
              onPress={handlePaymentFromAccount}
              disabled={value === '' || value === '0' || Number(value) < 250}
              buttonStyle={{
                backgroundColor: !(
                  value === '' ||
                  value === '0' ||
                  Number(value) < 250
                )
                  ? Color.primary
                  : '#eee',
                width: '100%',
                borderRadius: 26,
                marginTop: 16,
              }}
              textStyle={{color: '#fff'}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Root>
  );
};

const styles = StyleSheet.create({
  containerList: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    paddingVertical: 12,
    backgroundColor: Color.white,
  },

  customIcon: {
    marginRight: 10,
    fontSize: 28,
    color: Color.blue,
  },
  tipsButton: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 100,
    width: 90,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

const localStyle = StyleSheet.create({
  width: {
    width: '100%',

    backgroundColor: Color.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 200,
  },
  textColored: {
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

const PaymentFormWithLoading = withLoadingModal(PaymentForm, 'Please wait...');

export default PaymentFormWithLoading;
