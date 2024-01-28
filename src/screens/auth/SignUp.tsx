import {useEffect, useState} from 'react';

import {
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
import {isNullOrEmpty} from '../../utils/isNullOrEmpty';

const width = Dimensions.get('window').width;

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAppleSignInAvailable, setIsAppleSignInAvailable] = useState(false);
  let {login, user} = useAuth();

  // handle login with google account
  // 	const handleLoginWithGoogle = async () => {
  // 		Alert.alert("Coming soon");
  // 		return;
  // 		try {
  // 			// Get the Auth instance
  // 			const auth = getAuth();
  //
  // 			// Create a GoogleAuthProvider instance
  // 			const provider = new GoogleAuthProvider();
  //
  // 			// Sign in with Google using a pop-up window
  // 			const result = await signInWithPopup(auth, provider);
  //
  // 			// You can access the user information from the result
  // 			const user = result.user;
  //
  // 			// Optionally, you can perform additional actions after successful login
  // 			console.log("Successfully logged in with Google:", user);
  // 		} catch (error) {
  // 			// Handle errors
  // 			console.error("Error during Google login:", error.message);
  // 			alert(error.message);
  // 		}
  // 	};

  // const handleLoginWithApple = async () => {
  // 	Alert.alert("Coming soon");
  // 	return;
  // 	try {
  // 		await AppleAuthentication.signInAsync({
  // 			requestedScopes: [
  // 				AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  // 				AppleAuthentication.AppleAuthenticationScope.EMAIL,
  // 			],
  // 		});
  // 	} catch (error) {
  // 		console.error("Error during Apple login:", error.message);
  // 	}
  // };

  const handleSignUp = async () => {
    try {
      await login({email, password});
    } catch (error) {
      console.log(error);
    }
    // sign up with email and password
  };

  const goToCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  useEffect(() => {
    if (!isNullOrEmpty(user)) {
      navigation.navigate('MainNavigation');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
              Login with {isAppleSignInAvailable ? 'Apple' : 'Google'}
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
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
              <TextComponent fontSize={12} color="#fff">
                Mot de passe oublie ?
              </TextComponent>
            </TouchableOpacity>

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
              onPress={handleSignUp}>
              <TextComponent color="#fff">Connecter</TextComponent>
            </TouchableOpacity>

            <TextComponent fontSize={12} color="#fff" style={styles.signText}>
              {' '}
              Pas encore inscrit ?{' '}
            </TextComponent>

            <TouchableOpacity
              style={[
                styles.signButton,
                {
                  backgroundColor: Color.black,
                  borderColor: Color.black,
                  padding: 12,
                  marginTop: 16,
                  width: width - 64,
                },
              ]}
              onPress={goToCreateAccount}>
              <TextComponent color="#fff"> Creer un compte</TextComponent>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 16,
            }}>
            <TouchableOpacity
              style={[styles.signButton, {backgroundColor: Color.primary}]}>
              <Icon
                name="logo-google"
                size={24}
                color="#fff"
                style={styles.phoneNumberIcon}
              />
              <TextComponent color="#fff">Login with google</TextComponent>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.signButton, {backgroundColor: Color.primary}]}>
              <Icon
                name="logo-apple"
                size={24}
                color="#fff"
                style={styles.phoneNumberIcon}
              />
              <TextComponent color="#fff">Login with apple</TextComponent>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUp;

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
