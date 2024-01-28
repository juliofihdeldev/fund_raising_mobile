import {useEffect, useState} from 'react';

import {
  Alert,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {GoogleAuthProvider} from 'firebase/auth';
// import { auth } from "../../../firebaseConfig";
import {Color} from '../../assets/GlobalStyles';
// google provider
import TextComponent from '../../component/atom/CustomText';
import {blurBackground, tell_story} from '../../assets/images';
import TextAreaInput from '../../component/atom/TextAreaInput';
import {useAuth} from '../../context/AuthContext';
import withLoadingModal from '../../component/HOC/Loading';
import {isNullOrEmpty} from '../../utils/isNullOrEmpty';

const width = Dimensions.get('window').width;

const CreateAccountComponent = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');
  const [isAppleSignInAvailable, setIsAppleSignInAvailable] = useState(false);
  let {createAccount, user} = useAuth();

  useEffect(() => {}, []);

  // handle login with google account
  const handleLoginWithGoogle = async () => {
    Alert.alert('Coming soon');
    return;
  };

  const handleLoginWithApple = async () => {
    Alert.alert('Coming soon');
    return;
  };
  useEffect(() => {
    if (!isNullOrEmpty(user)) {
      navigation.navigate('MainNavigation');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const showAlert = message => {
    Alert.alert(message);
  };

  const isValidEmail = email => {
    return email.includes('@');
  };

  const handleCreateAccount = async () => {
    if (email === '' && password === '') {
      showAlert('Email and Password is required');
    } else if (password === '') {
      showAlert('Password is required');
    } else if (email === '') {
      showAlert('Email is required');
    } else if (password !== confirmPassword) {
      setErrorPassword('Password does not match');
      showAlert('Password does not match');
    } else if (!isValidEmail(email)) {
      showAlert('Email is not valid');
    } else {
      createAccount({email, password});
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.primary,
      }}>
      <ImageBackground
        source={blurBackground}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.buttonsGoogle}>
          <View style={{marginTop: 80}}>
            <TextComponent fontSize={17} color="#fff" fontWeight="bold">
              S'inscrire{' '}
            </TextComponent>
            <TextComponent fontSize={42} color="#fff" fontWeight="bold">
              PoteKOLE
            </TextComponent>
          </View>

          <View
            style={{
              width: width,
            }}>
            <TextInput
              placeholder="Email"
              onChangeText={text => {
                setEmail(text);
              }}
              value={email}
              placeholderTextColor={Color.white}
              style={styles.textInput}></TextInput>

            <TextInput
              placeholder="Mot de passe"
              placeholderTextColor={Color.white}
              secureTextEntry={true}
              onChangeText={text => {
                setPassword(text);
              }}
              value={password}
              style={styles.textInput}></TextInput>

            <TextInput
              placeholder="Confirm Mot de passe"
              placeholderTextColor={Color.white}
              secureTextEntry={true}
              onChangeText={text => {
                setConfirmPassword(text);
              }}
              value={confirmPassword}
              style={styles.textInput}></TextInput>

            <TextComponent fontSize={12} color="red">
              {errorPassword}
            </TextComponent>

            <TouchableOpacity
              style={[
                styles.signButton,
                {
                  backgroundColor: Color.secondary,
                  borderColor: Color.secondary,
                  padding: 12,
                  marginTop: 16,
                  width: width - 64,
                },
              ]}
              onPress={handleCreateAccount}>
              <TextComponent color="#fff">S'inscrire</TextComponent>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 16,
            }}>
            <TouchableOpacity
              style={[styles.signButton, {backgroundColor: Color.primary}]}
              onPress={handleLoginWithGoogle}>
              <Icon
                name="logo-google"
                size={24}
                color="#fff"
                style={styles.phoneNumberIcon}
              />
              <TextComponent color="#fff">Login with google</TextComponent>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signButton, {backgroundColor: Color.primary}]}
              onPress={handleLoginWithApple}>
              <Icon
                name="logo-apple"
                size={24}
                color="#fff"
                style={styles.phoneNumberIcon}
              />
              <TextComponent color="#fff">Login with apple</TextComponent>
            </TouchableOpacity>

            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={5}
              style={styles.button}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  // signed in
                } catch (e) {
                  if (e.code === 'ERR_REQUEST_CANCELED') {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const CreateAccount = withLoadingModal(
  CreateAccountComponent,
  'Please wait...',
);

export default CreateAccount;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerImage: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.2,
  },
  buttonsContainer: {
    flex: 3,
    width: '100%',
    backgroundColor: Color.white,
  },
  WelcomeBox: {
    padding: 26,
  },
  buttonsGoogle: {
    marginHorizontal: 32,
  },
  buttonsPhone: {
    marginHorizontal: 32,
  },

  textWelcome: {
    alignItems: 'center',
    marginTop: 16,
    lineHeight: 21,
    fontSize: 19,
    color: '#ffffff',
    fontFamily: 'calibri',
  },
  signButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#DDDDDD',
    borderRadius: 32,
    marginBottom: 16,
    borderColor: Color.white,
    borderWidth: 1,
  },
  phoneNumberIcon: {
    marginRight: 12,
  },
  signText: {
    marginTop: 16,
  },
  button: {
    width: 160,
  },
  textInput: {
    color: Color.white,
    borderRadius: 8,
    marginBottom: 16,
    height: 40,
    paddingHorizontal: 10,
    width: width - 64,
    borderColor: Color.white,
    borderWidth: 1,
  },
});
