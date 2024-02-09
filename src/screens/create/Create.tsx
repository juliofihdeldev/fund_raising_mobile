import React, {useEffect} from 'react';
import {View, StyleSheet, Modal, Alert} from 'react-native';
import CustomButton from '../../component/atom/CustomButton';
import {Color} from '../../assets/GlobalStyles';
import Location from './Location-SP1';
import RaisingAmount from './RaisingAmount-SP2';
import RaisingStory from './RaisingStorySP3';
import RaisingMedia from './RaisingMedia';
import RaisingConfirmation from './RaisingConfirmation';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '../../navigations/MainNavigation';
import {useLang} from '../../context/LanguageContext';
import withLoadingModal from '../../component/HOC/Loading';
import {useFunding} from '../../context/FundingContext';

type CreateScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  'Profile'
>;

interface Props {
  navigation: CreateScreenNavigationProp;
}

const Create: React.FC<Props> = ({navigation}) => {
  const [step, setStep] = React.useState(0);
  const {handleSaveState, state} = useFunding();
  const {lang} = useLang();

  // Hide tab bar

  useEffect(() => {
    navigation.addListener('focus', () => {
      setStep(0);
    });
  }, [navigation]);

  const handleNextStep = () => {
    if (step === 4) {
      if (isNaN(state?.amount!)) {
        Alert.alert(lang?.error, lang.amount_is_required);
        return;
      }

      Alert.alert(lang?.warning, lang?.confirm_message, [
        {
          text: lang?.confirm,
          onPress: () => {
            handleSaveState();
            setTimeout(() => {
              navigation.navigate('Feed');
            }, 1000);
          },
        },
        {
          text: lang?.cancel,
          style: 'cancel',
          onPress: () => {},
        },
      ]);
      return;
    }
    const currentStep = step + 1;
    setStep(currentStep);
  };

  return (
    // <Modal animationType="slide" transparent={false} visible={true}>
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <CustomButton
          title="Annuler"
          onPress={() => {
            navigation.goBack();
          }}
          buttonStyle={{
            backgroundColor: Color.secondary,
            width: '25%',
            height: 44,
            borderRadius: 89,
          }}
          textStyle={{color: '#fff'}}
        />
      </View>

      <View style={styles.containerBody}>
        {step === 0 ? (
          <Location />
        ) : step === 1 ? (
          <RaisingAmount />
        ) : step === 2 ? (
          <RaisingStory />
        ) : step === 3 ? (
          <RaisingMedia />
        ) : step === 4 ? (
          <RaisingConfirmation />
        ) : (
          <Location />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: Color.gray_400,
          paddingVertical: 16,
          paddingHorizontal: 16,
        }}>
        <CustomButton
          title={step === 0 ? 'Annuler' : 'Back'}
          onPress={() => {
            if (step === 0) {
              navigation.goBack();
              return;
            }
            const currentStep = step - 1;
            setStep(currentStep);
          }}
          buttonStyle={{
            backgroundColor: Color.secondary,
            width: '28%',
            borderRadius: 26,
          }}
          textStyle={{color: '#fff'}}
        />
        <CustomButton
          title={step !== 4 ? 'Next' : lang?.word_finish}
          disabled={step === 5}
          onPress={handleNextStep}
          buttonStyle={{
            margin: 4,
            backgroundColor: Color.primary,
            borderRadius: 26,
            minWidth: 100,
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
    marginTop: 24,
  },
  containerBody: {
    flex: 1,
    backgroundColor: Color.white,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Color.white,
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

const CreateWithLoading = withLoadingModal(Create);
export default CreateWithLoading;
