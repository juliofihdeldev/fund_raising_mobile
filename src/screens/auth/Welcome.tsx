import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Color} from '../../assets/GlobalStyles';
import TextComponent from '../../component/atom/CustomText';
import {tell_story} from '../../assets/images';
import {useLang} from '../../context/LanguageContext';
import {useAuth} from '../../context/AuthContext';
import {isNullOrEmpty} from '../../utils/isNullOrEmpty';

const Welcome: React.FC = ({navigation}: any) => {
  const {user} = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    if (isLoading) return;
    // Handle phone number sign up logic
    navigation.navigate('SignUp');
  };

  const handleGoogleLogin = async () => {
    if (isLoading) return;

    // Handle Google login logic

    navigation.navigate('MainNavigation');
  };

  const handleMoreInformation = () => {
    navigation.navigate('OnBoarding');
  };

  const {lang} = useLang();

  useLayoutEffect(() => {
    setIsLoading(true);
    if (!isNullOrEmpty(user)) {
      setIsLoading(false);
      navigation.navigate('MainNavigation');
    } else {
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerImage}>
        <Image source={tell_story} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.WelcomeBox}>
          <TextComponent fontSize={32} color="#000" fontWeight="bold">
            PoteKOLE
          </TextComponent>
          <TextComponent
            fontSize={23}
            color="#000"
            fontWeight="bold"
            style={styles.signText}>
            Fè byen jodi a la nati ap remet ou sa demen
          </TextComponent>
          <TextComponent
            fontSize={17}
            color="#000"
            fontWeight="bold"
            style={styles.signText}>
            Ann sere yon 100 Goud pou moun yo ki ka nan plus bezwen pase n.
          </TextComponent>
          <TextComponent
            fontSize={17}
            color="#000"
            fontWeight="bold"
            style={styles.signText}>
            Imajine w a 100 Goud ou ka sove vi yon moun ki nan bezwen.
          </TextComponent>
        </View>

        <View style={styles.buttonsPhone}>
          <TouchableOpacity
            disabled={isLoading}
            style={[styles.signButton, {backgroundColor: '#112E38'}]}
            onPress={handleSignUp}>
            <Icon
              name="call"
              size={24}
              color="#ffffff"
              style={styles.phoneNumberIcon}
            />
            <TextComponent color="white">
              {/* {lang.sign_up_with_phone_number} */}
              Creer un compte
            </TextComponent>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.buttonsPhone}>
					<TouchableOpacity
						style={[
							styles.signButton,
							{ backgroundColor: Color.secondaryLight },
						]}
						onPress={handleMoreInformation}
					>
						<Icon
							name="help-circle"
							size={24}
							color="#ffffff"
							style={styles.phoneNumberIcon}
						/>
						<TextComponent color="white">
							Plus d'informations sur PoteKOLE
						</TextComponent>
					</TouchableOpacity>
				</View> */}

        <View style={styles.buttonsGoogle}>
          <TouchableOpacity
            disabled={isLoading}
            style={[styles.signButton, {backgroundColor: Color.primary}]}
            onPress={handleGoogleLogin}>
            <Icon
              name="person-circle"
              size={24}
              color="#fff"
              style={styles.phoneNumberIcon}
            />
            <TextComponent color="#fff">
              {lang.continue_without_creating_an_account}
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
    padding: 16,
    backgroundColor: '#DDDDDD',
    borderRadius: 32,
    marginBottom: 16,
  },
  phoneNumberIcon: {
    marginRight: 12,
  },
  signText: {
    marginTop: 16,
  },
});

export default Welcome;
