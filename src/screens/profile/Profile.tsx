import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import TextComponent from '../../component/atom/CustomText';
import {Color} from '../../assets/GlobalStyles';
import CustomSeparator from '../../component/atom/CustomSeparator';
import ListItem from '../../component/atom/ListItem';
import CustomButton from '../../component/atom/CustomButton';
import CustomImage from '../../component/atom/CustomImage';
import {isNullOrEmpty} from '../../utils/isNullOrEmpty';
import {Root} from 'react-native-alert-notification';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {useLang} from '../../context/LanguageContext';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {currency} from '../../utils/currency';
import CustomDialog from '../../component/atom/CustomDialog';
import RenflouerAccountComponentWithLoading from '../feed/RenflouerAccountComponent';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native-virtualized-view';

const Profile: React.FC = ({navigation}: any) => {
  const {user, usersPayment, handleGetUserPayment} = useAuth();
  const [monCashMenu, setMonCashMenu] = React.useState(false);
  const {lang} = useLang();

  const goToCreate = () => {
    navigation.navigate('Create');
  };

  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: lang.success,
      textBody: lang.sucess_login_message,
    });
  };

  const isLoginFn = () => {
    return !isNullOrEmpty(user);
  };

  const comingSoon = () => {
    Alert.alert('', 'Features Coming soon');
  };

  const sleep = async (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const handleAddMoney = () => {
    setMonCashMenu(true);
  };

  useFocusEffect(
    useCallback(() => {
      handleGetUserPayment();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]),
  );

  const openLink = async (link: string) => {
    try {
      const url = link ?? 'https://github.com/proyecto26';
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // // iOS Properties
          // dismissButtonStyle: 'cancel',
          // preferredBarTintColor: Color.secondary,
          // preferredControlTintColor: 'white',
          // readerMode: false,
          // animated: true,
          // modalPresentationStyle: 'pageSheet',
          // modalTransitionStyle: 'coverVertical',
          // modalEnabled: true,
          // enableBarCollapsing: false,
          // Android Properties
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
      } else await Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onClose = () => {
    setMonCashMenu(false);
  };

  const usersPaymentAmount = usersPayment.reduce(
    (sum, item) => sum + (item.amount || 0),
    0,
  );

  return (
    <Root>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {monCashMenu && (
            <CustomDialog onClose={onClose}>
              <View style={localStyle.width}>
                <ListItem
                  text="Fermer"
                  icon="close-outline"
                  color={Color.black}
                  onPress={onClose}
                  fontSize={19}
                  containerStyle={[styles.container]}
                  iconStyle={[styles.customIcon, {color: Color.black}]}
                />
                <RenflouerAccountComponentWithLoading />
              </View>
            </CustomDialog>
          )}

          <View style={styles.containerProfile}>
            {!isLoginFn() ? (
              <View>
                <TextComponent
                  fontSize={25}
                  color={Color.secondary}
                  fontWeight="bold">
                  {lang?.hiStranger}
                </TextComponent>
                <TextComponent fontSize={15}>
                  {lang?.Kreye_kont_komanse_kolekte}
                </TextComponent>
                <CustomButton
                  title={lang.login}
                  onPress={() => navigation.navigate('SignUp')}
                  buttonStyle={{
                    backgroundColor: Color.secondary,
                    marginTop: 16,
                    borderRadius: 26,
                    width: 150,
                  }}
                  textStyle={{color: '#fff'}}
                />
              </View>
            ) : (
              <View>
                <TextComponent
                  fontSize={27}
                  color={Color.secondary}
                  fontWeight="bold">
                  {user?.name || lang?.stranger}
                </TextComponent>
                <TextComponent>{user?.email || user.phone}</TextComponent>

                <TextComponent
                  fontSize={21}
                  fontWeight="bold"
                  color={Color.primary}>
                  {currency(Number(usersPaymentAmount))}
                </TextComponent>
                {user?.name === '' && (
                  <CustomButton
                    title={lang?.edit_account}
                    onPress={() => navigation.navigate('ProfileEdit')}
                    buttonStyle={{
                      backgroundColor: Color.primary,
                      marginTop: 16,
                      borderRadius: 26,
                      width: '80%',
                    }}
                    textStyle={{color: '#fff'}}
                  />
                )}
                <CustomButton
                  title={lang?.addMoney}
                  onPress={handleAddMoney}
                  buttonStyle={{
                    backgroundColor: Color.primary,
                    marginTop: 16,
                    borderRadius: 26,
                  }}
                  textStyle={{color: '#fff'}}
                />
              </View>
            )}
            {isLoginFn() && (
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileEdit')}>
                <CustomImage image={user?.image} style={styles.profile} />
              </TouchableOpacity>
            )}
          </View>

          <CustomSeparator />

          <TextComponent color={Color.black} fontWeight="bold">
            Manage
          </TextComponent>
          <CustomSeparator />
          {isLoginFn() && (
            <ListItem
              text={lang?.startFundraising}
              icon="card-outline"
              onPress={goToCreate}
              fontSize={17}
              color={Color.black}
              containerStyle={styles.containerList}
              iconStyle={styles.customIcon}
            />
          )}

          {isLoginFn() && (
            <ListItem
              text={lang?.myFundraisings}
              icon="person-outline"
              onPress={() => navigation.navigate('History')}
              fontSize={17}
              color={Color.black}
              containerStyle={styles.containerList}
              iconStyle={styles.customIcon}
            />
          )}

          <CustomSeparator />

          <TextComponent color={Color.black} fontWeight="bold">
            {lang?.settings}
          </TextComponent>
          <CustomSeparator />

          <ScrollView>
            <ListItem
              text={lang?.myTerms}
              icon="document-outline"
              onPress={() =>
                openLink(
                  'https://pote-kole.web.app/politique_de_confidentialite.html',
                )
              }
              fontSize={17}
              color={Color.black}
              containerStyle={styles.containerList}
              iconStyle={styles.customIcon}
            />

            <ListItem
              text={lang?.myPrivacy}
              icon="copy-outline"
              onPress={() => openLink('https://pote-kole.web.app/terms.html')}
              fontSize={17}
              color={Color.black}
              containerStyle={styles.containerList}
              iconStyle={styles.customIcon}
            />

            {/* <ListItem
            text={lang?.dark_mode}
            icon="document-outline"
            onPress={comingSoon}
            fontSize={17}
            color={Color.black}
            containerStyle={styles.containerList}
            iconStyle={styles.customIcon}
          /> */}

            <ListItem
              text={lang?.myAbout}
              icon="information-circle-outline"
              onPress={() => openLink('https://pote-kole.web.app/main.html')}
              fontSize={17}
              color={Color.black}
              containerStyle={styles.containerList}
              iconStyle={styles.customIcon}
            />

            <ListItem
              text={lang?.language}
              icon="language-outline"
              fontSize={17}
              onPress={comingSoon}
              color={Color.black}
              containerStyle={styles.containerList}
              iconStyle={styles.customIcon}
            />

            {isLoginFn() && (
              <ListItem
                text={lang?.logout}
                icon="exit-outline"
                onPress={() =>
                  Alert.alert(lang?.logout, lang?.are_you_sure, [
                    {text: 'Sign out', onPress: () => handleLogout()},
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                    },
                  ])
                }
                fontSize={17}
                color={Color.black}
                containerStyle={styles.containerList}
                iconStyle={styles.customIcon}
              />
            )}
            <CustomSeparator />
            <View
              style={{
                flex: 1,
                position: 'fixed',
              }}>
              {isLoginFn() && (
                <ListItem
                  onPress={comingSoon}
                  text={lang?.efase_kont}
                  icon="trash-bin-outline"
                  fontSize={17}
                  color="#888"
                  containerStyle={styles.containerList}
                  iconStyle={[styles.customIcon, {color: '#888'}]}
                />
              )}

              {isLoginFn() && user?.role == '1' && (
                <ListItem
                  text={'Register payment moncash'}
                  icon="wallet-outline"
                  onPress={() =>
                    navigation.navigate('UserMoncashPaymentRegister')
                  }
                  fontSize={17}
                  color={Color.black}
                  containerStyle={styles.containerList}
                  iconStyle={styles.customIcon}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Root>
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
    backgroundColor: Color.white,
    padding: 20,
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

export default Profile;
