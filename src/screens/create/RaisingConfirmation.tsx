import React from 'react';
import {Color} from '../../assets/GlobalStyles';
import TextComponent from '../../component/atom/CustomText';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import CustomSeparator from '../../component/atom/CustomSeparator';
import {useFunding} from '../../context/FundingContext';
import { useLang } from '../../context/LanguageContext';
import { currency } from '../../utils/currency';
import CustomView from '../../component/atom/CustomView';

const RaisingConfirmation: React.FC = () => {
  const {state} = useFunding();
  const  {lang} =useLang()
  return (
    <View style={styles.container}>
      <TextComponent
        fontFamily='Montserrat-Bold'
        style={{
          color: Color.black,
          width: '100%',
          justifyContent:'flex-start',

          borderRadius: 8,
          marginLeft: 32,
        }}>
        {lang?.recap}
      </TextComponent>
      <CustomView 
        style={{
          paddingVertical: 16,
          paddingHorizontal: 16,
        }}
      >
  
        <ScrollView style={{flex: 16}}>
          <CustomSeparator />
          <TextComponent
            fontFamily='Montserrat-Bold'
            style={{
              color: Color.black,
              fontSize: 17,
              borderRadius: 8,
              marginTop: 16,
            }}>
            {currency(state?.amount)}  {'\n'}
            {'\n'}
            {state?.name} {state?.location}
          </TextComponent>

          <TextComponent
            style={{
              color: Color.black,
              marginTop: 16,
              borderRadius: 8,
              textAlign: 'justify',
            }}>
            {state?.description}
          </TextComponent>

          <TextComponent
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 8,
              backgroundColor: Color.secondaryLight,
              color: '#fff',
              fontSize: 15,
              textAlign: 'left',
            }}>
            {'Konfime ke tout enfomasyon ou mete yo koret,\npa bliye ke ou pap ka odifye yo apre ke ou fin pibliye Kolèt lan.'}
          </TextComponent>
          <CustomSeparator />
        </ScrollView>
      </CustomView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default RaisingConfirmation;
