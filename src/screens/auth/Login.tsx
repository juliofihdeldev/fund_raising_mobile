import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthContext';
import {Color} from '../../assets/GlobalStyles';
import CustomImage from '../../component/atom/CustomImage';
import TextComponent from '../../component/atom/CustomText';

const Login: React.FC = ({navigation}: any) => {
  const {user} = useAuth();

  const handleGoogleLogin = async () => {
    // Handle Google login logic
    navigation.navigate('PhoneLogin');
  };

  const handlePhoneNumberSignUp = () => {
    // Handle phone number sign up logic
    navigation.navigate('PhoneLogin');
  };
  useEffect(() => {
    if (user) {
      auth().signOut();
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerImage}>
        <CustomImage image="" style={styles.logo} />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.WelcomeBox}>
          <TextComponent fontSize={32} color="white" fontWeight="bold">
            Fè byen jodi a la nati ap remet ou sa demen
          </TextComponent>
          <TextComponent style={styles.textWelcome} color="white">
            Ann mete dekote yon 100 Goud pou moun yo ki ka nan plus bezwen pase
            n.
          </TextComponent>
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
            <TextComponent style={[styles.signText]} color="white">
              Sign Up with Phone Number
            </TextComponent>
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
            <TextComponent style={styles.signText}>
              {' '}
              Continue without an account{' '}
            </TextComponent>
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
    flex: 3,
    width: '100%',
    backgroundColor: Color.black,
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
