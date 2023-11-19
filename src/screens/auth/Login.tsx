import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthContext';
import {Color} from '../../assets/GlobalStyles';

const Login: React.FC = ({navigation}) => {
  const {login} = useAuth();

  const handleGoogleLogin = async () => {
    // Handle Google login logic
    navigation.navigate('PhoneLogin');
  };

  const handlePhoneNumberSignUp = () => {
    // Handle phone number sign up logic
    navigation.navigate('PhoneLogin');
  };

  function onAuthStateChanged(user: any) {
    if (user) {
      login();
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={require('../assets/images/funding.jpg')}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.WelcomeBox}>
          <Text style={styles.textWelcomeTitle}>
            è byen jodi a la nati ap remet ou sa demen
          </Text>
          <Text style={styles.textWelcome}>
            Ann mete dekote yon 100 Goud pou moun yo ki ka nan plus bezwen pase
            n.
          </Text>
        </View>

        <View style={styles.buttonsPhone}>
          <TouchableOpacity
            style={[styles.signButton, {backgroundColor: '#112E38'}]}
            onPress={handlePhoneNumberSignUp}>
            <Icon
              name="call"
              size={24}
              color="#ffffff"
              style={styles.phoneNumberIcon}
            />
            <Text style={[styles.signText, {color: '#ffffff'}]}>
              Sign Up with Phone Number
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsGoogle}>
          <TouchableOpacity
            style={[styles.signButton, {backgroundColor: '#ffffff'}]}
            onPress={handleGoogleLogin}>
            <Icon
              name="logo-google"
              size={24}
              color="black"
              style={styles.phoneNumberIcon}
            />
            <Text style={styles.signText}> Continue without an account </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    width: '100%',
    backgroundColor: Color.blue,
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
  textWelcomeTitle: {
    alignItems: 'center',
    fontSize: 27,
    lineHeight: 31,
    fontFamily: 'calibri',
    fontWeight: 'bold',
    color: '#ffffff',
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
    padding: 16,
    backgroundColor: '#DDDDDD',
    borderRadius: 32,
    marginBottom: 16,
  },
  phoneNumberIcon: {
    marginRight: 12,
  },
  signText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
