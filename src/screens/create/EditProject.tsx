import React from 'react';
import {View, ScrollView, StyleSheet, Dimensions, Alert} from 'react-native';
import RaisingStory from './RaisingStorySP3';
import RaisingAmount from './RaisingAmount-SP2';
import RaisingMedia from './RaisingMedia';
import {useFunding} from '../../context/FundingContext';
import CustomButton from '../../component/atom/CustomButton';
import {Color} from '../../assets/GlobalStyles';
import Location from './Location-SP1';
import withLoadingModal from '../../component/HOC/Loading';
import {useLang} from '../../context/LanguageContext';

const EditProject: React.FC = ({route, navigation}) => {
  const {handleStateManager, updateFundraising, state} = useFunding();
  const {lang} = useLang();
  const {
    name,
    amount,
    location,
    category,
    video_url,
    id,
    description,
    image,
    user: {},
    list_images,
  } = route.params.project;

  React.useEffect(() => {
    handleStateManager({
      name,
      amount,
      location,
      category,
      video_url,
      id,
      description,
      image,
      list_images,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params.project]);

  navigation.setOptions({
    title: lang.edit_collet,

    headerRight: () => (
      <CustomButton
        title="Anrejistre"
        onPress={saveChanges}
        buttonStyle={{
          backgroundColor: Color.primary,
          width: 'auto',
          marginRight: 8,
          borderRadius: 8,
        }}
        textStyle={styles.textColor}
      />
    ),
  });

  const saveChanges = () => {
    Alert.alert(lang.warning, lang.are_you_sure, [
      {
        text: 'Anile',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => {
          updateFundraising(id);
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Location />
        <RaisingAmount />
        <RaisingStory />
        <RaisingMedia />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: 300,
    borderRadius: 12,
  },
  textColor: {
    color: '#fff',
  },
});

const EditProjectWithLoading = withLoadingModal(EditProject, '');
export default EditProjectWithLoading;
