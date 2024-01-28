import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Color} from '../../assets/GlobalStyles';
import TextComponent from '../../component/atom/CustomText';
import TextAreaInput from '../../component/atom/TextAreaInput';
import {useFunding} from '../../context/FundingContext';
import { useLang } from '../../context/LanguageContext';

const RaisingStory: React.FC = ({}) => {
  const {state, handleStateManager} = useFunding();
  const {lang} =useLang()
  const [name, setName] = React.useState(state?.name || '');
  const [description, setDescription] = React.useState(
    state?.description || '',
  );

  useEffect(() => {
    handleStateManager({
      name,
      description,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description]);

  return (
    <ScrollView style={styles.container}>
      <TextComponent
        style={{
          color: Color.black,
          marginLeft: 26,
          marginTop: 16,
        }}>
        {lang?.word_tell_us_your_story}
      </TextComponent>
      <View style={styles.containerPosition}>
        <TextComponent
          style={{
            fontSize: 14,
            color: Color.black,
            marginTop: 32,
            marginLeft: 8,
          }}>
          {lang?.word_why_do_you_need_this_fundraising}  </TextComponent>
        <TextAreaInput
          placeholder={lang?.ecrivez_ici}
          maxLength={200}
          defaultValue={state?.name}
          keyboardType="default"
          onChangeText={text => setName(text)}
          style={{
            fontFamily: 'Montserrat-Bold',
            color: Color.black,
            width: '96%',

          }}
        />

        <TextComponent
          style={{
            fontSize: 13,
            width: '100%',
            color: Color.black,
            marginTop: 16,
            padding: 16,
            borderRadius: 8,
          }}>
          {lang?.word_why_do_you_need_this_fundraising_description}
        </TextComponent>

        <TextAreaInput
          placeholder={lang?.ecrivez_ici}
          keyboardType="default"
          defaultValue={state?.description}
          onChangeText={text => setDescription(text)}
          style={{
            width: '96%',
            color: Color.black,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPosition: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 16,
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

export default RaisingStory;
